import type {
  VocabCardState,
  VocabGrade,
  VocabStage,
  VocabTerm,
} from "@/types/vocab";

/**
 * Spaced repetition.
 *
 * An SM-2 derivative, kept deliberately small and entirely pure: a grade and a
 * timestamp go in, a new card state comes out. Nothing here reads a clock,
 * touches storage, or knows what a React component is, which is what makes the
 * whole schedule testable by asserting on dates.
 *
 * Why intervals rather than a simple "got it / missed it" counter: a student
 * revising for a certification is not trying to be right today, they are
 * trying to still be right in three weeks. Interval growth is the only part of
 * the design that models that directly.
 */

export const SCHEDULER = {
  /** Minutes between the steps a card walks through before it graduates. */
  learningStepsMinutes: [10, 1440],
  /** Interval, in days, awarded when a card graduates on "good". */
  graduatingIntervalDays: 1,
  /** Interval, in days, awarded when a card graduates straight out on "easy". */
  easyGraduatingIntervalDays: 3,
  /** Minutes a lapsed card waits before its first relearning step. */
  relearnStepMinutes: 10,
  startingEase: 2.5,
  minimumEase: 1.3,
  maximumEase: 2.8,
  easePenaltyAgain: 0.2,
  easePenaltyHard: 0.15,
  easeBonusEasy: 0.15,
  hardIntervalFactor: 1.2,
  easyIntervalBonus: 1.3,
  /** Nothing is scheduled further out than this. */
  maximumIntervalDays: 180,
  /** Interval at which a card is treated as genuinely retained. */
  masteredIntervalDays: 21,
  /** Consecutive correct recalls also required before "mastered". */
  masteredStreak: 4,
} as const;

const MINUTE_MS = 60_000;
const DAY_MS = 86_400_000;

/** The state a term starts in the first time it is shown. */
export function createCard(termId: string, now: Date): VocabCardState {
  const nowIso = now.toISOString();
  return {
    termId,
    stage: "learning",
    step: 0,
    streak: 0,
    reviews: 0,
    correct: 0,
    lapses: 0,
    ease: SCHEDULER.startingEase,
    intervalDays: 0,
    dueAt: nowIso,
    lastReviewedAt: nowIso,
  };
}

function clampEase(ease: number): number {
  return Math.min(
    SCHEDULER.maximumEase,
    Math.max(SCHEDULER.minimumEase, Number(ease.toFixed(3))),
  );
}

function addMinutes(now: Date, minutes: number): string {
  return new Date(now.getTime() + minutes * MINUTE_MS).toISOString();
}

function addDays(now: Date, days: number): string {
  return new Date(now.getTime() + days * DAY_MS).toISOString();
}

function roundInterval(days: number): number {
  return Math.min(
    SCHEDULER.maximumIntervalDays,
    Math.max(1, Math.round(days * 100) / 100),
  );
}

/**
 * Whether a card has earned the "mastered" label.
 *
 * Both conditions are required on purpose. A long interval alone can be
 * reached by a card that was easy from the start and has only been seen twice;
 * a long streak alone can be earned inside a single session. Retention needs
 * both distance and repetition.
 */
function stageFor(intervalDays: number, streak: number): VocabStage {
  return intervalDays >= SCHEDULER.masteredIntervalDays &&
    streak >= SCHEDULER.masteredStreak
    ? "mastered"
    : "review";
}

/**
 * Applies a grade to a card.
 *
 * `card` may be undefined, which is how a brand-new term is graded without the
 * caller having to create one first.
 */
export function gradeCard(
  card: VocabCardState | undefined,
  termId: string,
  grade: VocabGrade,
  now: Date,
): VocabCardState {
  const current = card ?? createCard(termId, now);
  const nowIso = now.toISOString();
  const correct = grade !== "again";

  const base = {
    ...current,
    termId,
    reviews: current.reviews + 1,
    correct: current.correct + (correct ? 1 : 0),
    streak: correct ? current.streak + 1 : 0,
    lastReviewedAt: nowIso,
  };

  // --- Forgotten -----------------------------------------------------------
  if (grade === "again") {
    const wasGraduated = current.stage === "review" || current.stage === "mastered";
    return {
      ...base,
      stage: wasGraduated ? "relearning" : "learning",
      step: 0,
      lapses: current.lapses + (wasGraduated ? 1 : 0),
      ease: clampEase(current.ease - SCHEDULER.easePenaltyAgain),
      intervalDays: 0,
      dueAt: addMinutes(now, SCHEDULER.relearnStepMinutes),
    };
  }

  // --- Still being learned -------------------------------------------------
  if (current.stage === "learning" || current.stage === "relearning") {
    if (grade === "easy") {
      const intervalDays = SCHEDULER.easyGraduatingIntervalDays;
      return {
        ...base,
        stage: stageFor(intervalDays, base.streak),
        step: 0,
        ease: clampEase(current.ease + SCHEDULER.easeBonusEasy),
        intervalDays,
        dueAt: addDays(now, intervalDays),
      };
    }

    // "hard" repeats the current step rather than advancing it.
    const nextStep = grade === "good" ? current.step + 1 : current.step;
    const stepMinutes = SCHEDULER.learningStepsMinutes[nextStep];

    if (stepMinutes !== undefined) {
      return {
        ...base,
        stage: current.stage,
        step: nextStep,
        dueAt: addMinutes(now, stepMinutes),
        intervalDays: 0,
      };
    }

    // Walked off the end of the steps: the card graduates.
    const intervalDays = SCHEDULER.graduatingIntervalDays;
    return {
      ...base,
      stage: stageFor(intervalDays, base.streak),
      step: 0,
      intervalDays,
      dueAt: addDays(now, intervalDays),
    };
  }

  // --- Already in review ---------------------------------------------------
  const previousInterval = Math.max(current.intervalDays, 1);

  let ease = current.ease;
  let intervalDays: number;

  if (grade === "hard") {
    ease = clampEase(ease - SCHEDULER.easePenaltyHard);
    intervalDays = roundInterval(previousInterval * SCHEDULER.hardIntervalFactor);
  } else if (grade === "easy") {
    ease = clampEase(ease + SCHEDULER.easeBonusEasy);
    intervalDays = roundInterval(
      previousInterval * ease * SCHEDULER.easyIntervalBonus,
    );
  } else {
    intervalDays = roundInterval(previousInterval * ease);
  }

  return {
    ...base,
    stage: stageFor(intervalDays, base.streak),
    step: 0,
    ease,
    intervalDays,
    dueAt: addDays(now, intervalDays),
  };
}

/** Maps a plain right/wrong outcome onto the four-grade scale. */
export function gradeFromOutcome(
  correct: boolean,
  options: { hesitant?: boolean } = {},
): VocabGrade {
  if (!correct) return "again";
  return options.hesitant ? "hard" : "good";
}

export function isDue(card: VocabCardState, now: Date): boolean {
  const due = Date.parse(card.dueAt);
  return Number.isNaN(due) || due <= now.getTime();
}

export type DueBuckets = {
  /** Never studied. */
  fresh: VocabTerm[];
  /** Studied, in a learning step, and due now. */
  learning: VocabTerm[];
  /** Graduated and due now. */
  review: VocabTerm[];
  /** Studied and not yet due. */
  waiting: VocabTerm[];
};

/** Splits a set of terms by what the scheduler wants to do with them. */
export function bucketTerms(
  terms: VocabTerm[],
  cards: Record<string, VocabCardState>,
  now: Date,
): DueBuckets {
  const buckets: DueBuckets = { fresh: [], learning: [], review: [], waiting: [] };

  for (const term of terms) {
    const card = cards[term.id];
    if (!card) {
      buckets.fresh.push(term);
    } else if (!isDue(card, now)) {
      buckets.waiting.push(term);
    } else if (card.stage === "learning" || card.stage === "relearning") {
      buckets.learning.push(term);
    } else {
      buckets.review.push(term);
    }
  }

  return buckets;
}

/**
 * The queue for a review session.
 *
 * Order is deliberate: cards already in a learning step come first because
 * they are the closest to being forgotten, then overdue graduated cards
 * (oldest due date first), then new material. Capping new terms per session is
 * what stops the "study everything today" trap that makes a deck collapse a
 * week later.
 */
export function buildDueQueue(
  terms: VocabTerm[],
  cards: Record<string, VocabCardState>,
  now: Date,
  options: { limit?: number; newLimit?: number } = {},
): VocabTerm[] {
  const { limit = 20, newLimit = 8 } = options;
  const buckets = bucketTerms(terms, cards, now);

  const byDueDate = (a: VocabTerm, b: VocabTerm) => {
    const aDue = Date.parse(cards[a.id]?.dueAt ?? "");
    const bDue = Date.parse(cards[b.id]?.dueAt ?? "");
    if (Number.isNaN(aDue) || Number.isNaN(bDue)) return 0;
    return aDue - bDue;
  };

  const queue = [
    ...buckets.learning.sort(byDueDate),
    ...buckets.review.sort(byDueDate),
    ...buckets.fresh.slice(0, newLimit),
  ];

  return queue.slice(0, limit);
}

/** How many terms in this list the scheduler would show right now. */
export function countDue(
  terms: VocabTerm[],
  cards: Record<string, VocabCardState>,
  now: Date,
): number {
  const buckets = bucketTerms(terms, cards, now);
  return buckets.learning.length + buckets.review.length;
}

/**
 * A human-readable next-review time, e.g. "in 3 days".
 *
 * Rounds toward the coarser unit rather than showing "in 47 hours", because
 * the number is context for a decision, not a countdown.
 */
export function describeInterval(card: VocabCardState, now: Date): string {
  const ms = Date.parse(card.dueAt) - now.getTime();
  if (Number.isNaN(ms) || ms <= 0) return "now";
  const minutes = ms / MINUTE_MS;
  if (minutes < 60) return `in ${Math.max(1, Math.round(minutes))} min`;
  const hours = minutes / 60;
  if (hours < 24) return `in ${Math.round(hours)} h`;
  const days = Math.round(hours / 24);
  if (days < 30) return `in ${days} day${days === 1 ? "" : "s"}`;
  const months = Math.round(days / 30);
  return `in ${months} month${months === 1 ? "" : "s"}`;
}
