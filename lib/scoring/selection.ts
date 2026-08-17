import type { CertificationId, Question } from "@/types/content";
import type { PracticeConfig, QuestionStat } from "@/types/study";
import type { StoredProgress } from "@/lib/storage/schema";
import { getQuestionsForCertification } from "@/data/questions";
import { DOMAINS } from "@/data/certifications/domains";
import { rankWeakest } from "@/lib/progress/mastery";
import type { DomainMastery } from "@/types/study";

/**
 * Session generation.
 *
 * All of it is deterministic given a seed, which matters for two reasons:
 * tests can assert on exact output, and a resumed session rebuilds the same
 * question list rather than quietly reshuffling under the student.
 */

/** Mulberry32. Small, fast, and good enough for shuffling a question list. */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: T[], random: () => number): T[] {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const a = result[i];
    const b = result[j];
    if (a === undefined || b === undefined) continue;
    result[i] = b;
    result[j] = a;
  }
  return result;
}

export type SelectionContext = {
  certificationId: CertificationId;
  progress: StoredProgress;
  mastery: DomainMastery[];
  seed: number;
};

/**
 * Picks the questions for a session.
 *
 * Falls back rather than failing: a "missed questions" session for a student
 * with nothing missed returns unseen questions instead of an empty list, and
 * every mode tops up from the wider pool if its own filter is too narrow. A
 * student who asked for ten questions gets ten.
 */
export function selectQuestions(
  config: PracticeConfig,
  context: SelectionContext,
): Question[] {
  const pool = getQuestionsForCertification(config.certificationId);
  const random = createRandom(context.seed);
  const stats = context.progress.questionStats;

  const primary = filterForMode(config, pool, stats, context, random);
  const chosen = shuffle(primary, random).slice(0, config.questionCount);

  if (chosen.length >= config.questionCount) {
    return chosen;
  }

  // Top up from the rest of the pool, preferring questions seen least often so
  // a short session does not repeat the same three items.
  const takenIds = new Set(chosen.map((question) => question.id));
  const remainder = shuffle(
    pool.filter((question) => !takenIds.has(question.id)),
    random,
  ).sort(
    (a, b) => (stats[a.id]?.attempts ?? 0) - (stats[b.id]?.attempts ?? 0),
  );

  return [...chosen, ...remainder].slice(0, config.questionCount);
}

function filterForMode(
  config: PracticeConfig,
  pool: Question[],
  stats: Record<string, QuestionStat>,
  context: SelectionContext,
  random: () => number,
): Question[] {
  switch (config.mode) {
    case "quick-10":
    case "all-domains":
      return pool;

    case "domain":
      return config.domainId
        ? pool.filter((question) => question.domain === config.domainId)
        : pool;

    case "unseen":
      return pool.filter((question) => stats[question.id] === undefined);

    case "missed":
      // Questions whose most recent answer was wrong. Once a question is
      // answered correctly it leaves this pool, which is the behavior that
      // makes "missed questions" a shrinking, finishable list.
      return pool.filter((question) => {
        const stat = stats[question.id];
        return stat !== undefined && !stat.lastCorrect;
      });

    case "weak-areas": {
      const weakest = rankWeakest(context.mastery)
        .filter((entry) => entry.level !== "strong")
        .slice(0, WEAK_AREA_DOMAINS)
        .map((entry) => entry.domain);

      if (weakest.length === 0) {
        return pool;
      }

      // Share out the session by rank rather than pooling the weak areas
      // together. Pooling lets bank size decide the mix — the area with the
      // most questions written for it wins — which is not what a student asked
      // for when they picked "my weak areas".
      const quotas = allocateByRank(weakest.length, config.questionCount);
      const selected: Question[] = [];

      weakest.forEach((domainId, rank) => {
        const inDomain = pool.filter((question) => question.domain === domainId);
        // Prefer questions that have not been mastered in this area.
        const unmastered = inDomain.filter(
          (question) => (stats[question.id]?.streak ?? 0) < 2,
        );
        const ordered = shuffle(
          unmastered.length > 0 ? unmastered : inDomain,
          random,
        );
        selected.push(...ordered.slice(0, quotas[rank] ?? 0));
      });

      // Short quotas (a small area, or one nearly mastered) are topped up from
      // the other weak areas before `selectQuestions` reaches for the wider
      // pool, so a weak-areas session stays a weak-areas session.
      if (selected.length < config.questionCount) {
        const takenIds = new Set(selected.map((question) => question.id));
        const rest = pool.filter(
          (question) =>
            weakest.includes(question.domain) && !takenIds.has(question.id),
        );
        selected.push(...shuffle(rest, random));
      }

      return selected;
    }
  }
}

/** How many areas a weak-areas session spreads across. */
const WEAK_AREA_DOMAINS = 3;

/**
 * Splits `total` across `count` ranked buckets, weighted toward rank 0.
 *
 * Weights run count, count-1, … 1, so three areas split a twelve-question
 * session 6/4/2: the weakest area gets the most attention without the other
 * two disappearing. Largest-remainder allocation keeps the parts summing to
 * exactly `total`.
 */
export function allocateByRank(count: number, total: number): number[] {
  if (count <= 0 || total <= 0) return [];

  const weights = Array.from({ length: count }, (_, i) => count - i);
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);

  const exact = weights.map((weight) => (weight / weightTotal) * total);
  const quotas = exact.map((value) => Math.floor(value));
  let allocated = quotas.reduce((sum, value) => sum + value, 0);

  const byRemainder = exact
    .map((value, index) => ({ index, remainder: value - Math.floor(value) }))
    .sort((a, b) => b.remainder - a.remainder);

  for (const entry of byRemainder) {
    if (allocated >= total) break;
    quotas[entry.index] = (quotas[entry.index] ?? 0) + 1;
    allocated += 1;
  }

  return quotas;
}

export type MockExamOptions = {
  /**
   * Questions the student has already seen on recent mock papers. They are
   * used only after fresh ones in the same domain run out, so consecutive
   * papers are new material rather than a reshuffle of the same fifty.
   */
  recentQuestionIds?: string[];
};

/**
 * Question ids used by the most recent mock exams.
 *
 * Reaches back over `paperCount` papers rather than only the last one, so
 * sitting three exams in a week gives three genuinely different papers.
 */
export function recentMockQuestionIds(
  progress: StoredProgress,
  paperCount = 3,
): string[] {
  return progress.mockResults
    .slice(-paperCount)
    .flatMap((result) => result.questionIds);
}

/**
 * Builds a mock exam paper.
 *
 * Distribution follows each domain's `practiceWeight` using largest-remainder
 * allocation, so the counts always sum to exactly the requested total instead
 * of drifting by a question or two from rounding.
 *
 * Within a domain, questions the student has not met on a recent paper are
 * offered first. That keeps repeat papers fresh while never shortening one:
 * once a domain's fresh questions are exhausted the recent ones are used, so
 * the paper is always the full requested length.
 */
export function buildMockExam(
  certificationId: CertificationId,
  questionCount: number,
  seed: number,
  options: MockExamOptions = {},
): Question[] {
  const pool = getQuestionsForCertification(certificationId);
  const random = createRandom(seed);
  const recent = new Set(options.recentQuestionIds ?? []);

  const byDomain = new Map<string, Question[]>();
  for (const question of pool) {
    const existing = byDomain.get(question.domain) ?? [];
    existing.push(question);
    byDomain.set(question.domain, existing);
  }

  const weightTotal = DOMAINS.reduce(
    (sum, domain) => sum + domain.practiceWeight,
    0,
  );

  const allocations = DOMAINS.map((domain) => {
    const exact = (domain.practiceWeight / weightTotal) * questionCount;
    const available = (byDomain.get(domain.id) ?? []).length;
    return {
      domainId: domain.id,
      exact,
      base: Math.min(Math.floor(exact), available),
      remainder: exact - Math.floor(exact),
      available,
    };
  });

  let allocated = allocations.reduce((sum, entry) => sum + entry.base, 0);
  const byRemainder = allocations
    .slice()
    .sort((a, b) => b.remainder - a.remainder);

  // Distribute the leftover slots to the largest fractional remainders, then
  // to anyone with capacity if slots are still unfilled.
  for (const entry of byRemainder) {
    if (allocated >= questionCount) break;
    if (entry.base < entry.available) {
      entry.base += 1;
      allocated += 1;
    }
  }
  while (allocated < questionCount) {
    const withCapacity = allocations.find(
      (entry) => entry.base < entry.available,
    );
    if (!withCapacity) break;
    withCapacity.base += 1;
    allocated += 1;
  }

  const paper: Question[] = [];
  for (const entry of allocations) {
    const questions = shuffle(byDomain.get(entry.domainId) ?? [], random);
    // Stable partition: fresh questions first, recently-seen ones behind them.
    // Both halves stay shuffled, so a repeat paper is not a predictable
    // re-run of the last one's leftovers.
    const fresh = questions.filter((question) => !recent.has(question.id));
    const seen = questions.filter((question) => recent.has(question.id));
    paper.push(...[...fresh, ...seen].slice(0, entry.base));
  }

  return shuffle(paper, random);
}
