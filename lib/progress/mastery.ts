import type { DomainId } from "@/types/content";
import type {
  AttemptRecord,
  DomainMastery,
  MasteryLevel,
  QuestionStat,
} from "@/types/study";
import type { StoredProgress } from "@/lib/storage/schema";
import { DOMAINS, domainName } from "@/data/certifications/domains";
import { countQuestionsByDomain } from "@/data/questions";
import { DEFAULT_CERTIFICATION_ID } from "@/data/certifications";

/**
 * Mastery calculation.
 *
 * Design constraints, in priority order:
 *
 * 1. Exposure gates level. Nobody reaches "Strong" from three lucky answers.
 * 2. Recent performance counts for more than old performance, because the
 *    point of the number is to predict what happens tomorrow.
 * 3. The whole thing is explainable in a sentence, which the UI shows. A
 *    score a student cannot interpret is not feedback.
 */

export const MASTERY_RULES = {
  /** Attempts considered per domain. Older attempts fall out entirely. */
  recentWindow: 40,
  /** Weight multiplier per step back in time. 0.94^39 ≈ 0.09. */
  decay: 0.94,
  /** Below this many attempts, a domain can only be "learning". */
  minAttemptsForDeveloping: 5,
  proficient: {
    attempts: 12,
    distinctQuestions: 8,
    accuracy: 0.8,
  },
  strong: {
    attempts: 20,
    distinctQuestions: 12,
    accuracy: 0.9,
    /** Share of seen questions answered right twice in a row. */
    repeatMasteryRatio: 0.5,
  },
  developingAccuracy: 0.6,
} as const;

export const MASTERY_ORDER: MasteryLevel[] = [
  "not-started",
  "learning",
  "developing",
  "proficient",
  "strong",
];

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  "not-started": "Not started",
  learning: "Learning",
  developing: "Developing",
  proficient: "Proficient",
  strong: "Strong",
};

/**
 * Recency-weighted accuracy over a list of attempts ordered oldest-first.
 *
 * Weight decays by `decay` for each step back from the most recent attempt,
 * so a bad week three months ago stops dragging the number down.
 */
export function weightedAccuracy(
  attempts: AttemptRecord[],
  rules = MASTERY_RULES,
): number {
  const window = attempts.slice(-rules.recentWindow);
  if (window.length === 0) {
    return 0;
  }

  let weightedCorrect = 0;
  let totalWeight = 0;

  for (let i = 0; i < window.length; i += 1) {
    const attempt = window[i];
    if (!attempt) continue;
    // Index 0 is the oldest in the window, so distance from the newest is
    // (length - 1 - i).
    const weight = Math.pow(rules.decay, window.length - 1 - i);
    totalWeight += weight;
    if (attempt.correct) {
      weightedCorrect += weight;
    }
  }

  return totalWeight === 0 ? 0 : weightedCorrect / totalWeight;
}

type MasteryInputs = {
  attempts: number;
  distinctQuestions: number;
  accuracy: number;
  repeatMastered: number;
};

export function masteryLevelFor(
  inputs: MasteryInputs,
  rules = MASTERY_RULES,
): MasteryLevel {
  if (inputs.attempts === 0) {
    return "not-started";
  }
  if (inputs.attempts < rules.minAttemptsForDeveloping) {
    return "learning";
  }

  const repeatRatio =
    inputs.distinctQuestions === 0
      ? 0
      : inputs.repeatMastered / inputs.distinctQuestions;

  if (
    inputs.attempts >= rules.strong.attempts &&
    inputs.distinctQuestions >= rules.strong.distinctQuestions &&
    inputs.accuracy >= rules.strong.accuracy &&
    repeatRatio >= rules.strong.repeatMasteryRatio
  ) {
    return "strong";
  }

  if (
    inputs.attempts >= rules.proficient.attempts &&
    inputs.distinctQuestions >= rules.proficient.distinctQuestions &&
    inputs.accuracy >= rules.proficient.accuracy
  ) {
    return "proficient";
  }

  if (inputs.accuracy >= rules.developingAccuracy) {
    return "developing";
  }

  return "learning";
}

/** The sentence shown under a domain's mastery bar. */
function rationaleFor(
  level: MasteryLevel,
  inputs: MasteryInputs,
  rules = MASTERY_RULES,
): string {
  const pct = Math.round(inputs.accuracy * 100);

  switch (level) {
    case "not-started":
      return "No questions answered in this area yet.";
    case "learning":
      if (inputs.attempts < rules.minAttemptsForDeveloping) {
        const needed = rules.minAttemptsForDeveloping - inputs.attempts;
        return `${inputs.attempts} answered. ${needed} more will give this area a meaningful score.`;
      }
      return `${pct}% on recent questions. Below ${Math.round(rules.developingAccuracy * 100)}%, so this is still new ground.`;
    case "developing":
      return `${pct}% on recent questions across ${inputs.distinctQuestions} distinct items. Solid, not yet consistent.`;
    case "proficient":
      return `${pct}% recent accuracy over ${inputs.attempts} attempts. Consistent, but not yet repeated across enough questions for Strong.`;
    case "strong":
      return `${pct}% recent accuracy, ${inputs.repeatMastered} of ${inputs.distinctQuestions} questions answered correctly twice running.`;
  }
}

export function calculateDomainMastery(
  progress: StoredProgress,
  domain: DomainId,
  totalQuestions: number,
  rules = MASTERY_RULES,
): DomainMastery {
  const attempts = progress.attempts.filter(
    (attempt) => attempt.domain === domain,
  );
  const stats = Object.values(progress.questionStats).filter(
    (stat: QuestionStat) => stat.domain === domain,
  );

  const distinctQuestions = stats.length;
  const repeatMastered = stats.filter((stat) => stat.streak >= 2).length;
  const accuracy = weightedAccuracy(attempts, rules);
  const lifetimeCorrect = attempts.filter((attempt) => attempt.correct).length;

  const inputs: MasteryInputs = {
    attempts: attempts.length,
    distinctQuestions,
    accuracy,
    repeatMastered,
  };
  const level = masteryLevelFor(inputs, rules);
  const last = attempts.at(-1);

  return {
    domain,
    level,
    accuracy,
    lifetimeAccuracy:
      attempts.length === 0 ? 0 : lifetimeCorrect / attempts.length,
    attempts: attempts.length,
    seenQuestions: distinctQuestions,
    totalQuestions,
    repeatMastered,
    lastPracticedAt: last ? last.at : null,
    rationale: rationaleFor(level, inputs, rules),
  };
}

export function calculateAllMastery(
  progress: StoredProgress,
  rules = MASTERY_RULES,
): DomainMastery[] {
  const counts = countQuestionsByDomain(DEFAULT_CERTIFICATION_ID);
  return DOMAINS.map((domain) =>
    calculateDomainMastery(progress, domain.id, counts[domain.id] ?? 0, rules),
  );
}

/**
 * Weakest areas first.
 *
 * Domains with no attempts are excluded — "unknown" is not the same as "weak",
 * and telling a student their weakest area is one they have never touched is
 * unhelpful. Untouched domains are surfaced separately as coverage gaps.
 */
export function rankWeakest(mastery: DomainMastery[]): DomainMastery[] {
  return mastery
    .filter((entry) => entry.attempts > 0)
    .slice()
    .sort((a, b) => {
      const levelDelta =
        MASTERY_ORDER.indexOf(a.level) - MASTERY_ORDER.indexOf(b.level);
      if (levelDelta !== 0) return levelDelta;
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return a.attempts - b.attempts;
    });
}

export function rankStrongest(mastery: DomainMastery[]): DomainMastery[] {
  return rankWeakest(mastery).slice().reverse();
}

export function findUntouchedDomains(mastery: DomainMastery[]): DomainMastery[] {
  return mastery.filter((entry) => entry.attempts === 0);
}

export function masteryLabel(level: MasteryLevel): string {
  return MASTERY_LABELS[level];
}

export function describeDomain(id: DomainId): string {
  return domainName(id);
}
