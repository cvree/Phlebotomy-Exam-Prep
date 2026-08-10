import type {
  AttemptRecord,
  DrillAttempt,
  MockResult,
  SessionSummary,
  StudyStreak,
} from "@/types/study";
import type { VocabCardState, VocabSessionSummary } from "@/types/vocab";
import type { StoredProgress } from "@/lib/storage/schema";

/**
 * Pure updates to the progress record.
 *
 * Nothing here touches storage, React, or the clock — timestamps arrive as
 * arguments. That is what makes the study engine testable without mocking a
 * browser.
 */

export function recordAttempt(
  progress: StoredProgress,
  attempt: AttemptRecord,
): StoredProgress {
  const existing = progress.questionStats[attempt.questionId];
  const stat = existing ?? {
    questionId: attempt.questionId,
    domain: attempt.domain,
    attempts: 0,
    correct: 0,
    streak: 0,
    lastCorrect: false,
    lastAttemptAt: attempt.at,
  };

  return {
    ...progress,
    attempts: [...progress.attempts, attempt],
    questionStats: {
      ...progress.questionStats,
      [attempt.questionId]: {
        ...stat,
        domain: attempt.domain,
        attempts: stat.attempts + 1,
        correct: stat.correct + (attempt.correct ? 1 : 0),
        // A wrong answer resets the run. Two correct answers in a row is what
        // we treat as evidence of retention, not one lucky guess.
        streak: attempt.correct ? stat.streak + 1 : 0,
        lastCorrect: attempt.correct,
        lastAttemptAt: attempt.at,
      },
    },
  };
}

export function recordAttempts(
  progress: StoredProgress,
  attempts: AttemptRecord[],
): StoredProgress {
  return attempts.reduce(recordAttempt, progress);
}

export function recordSession(
  progress: StoredProgress,
  summary: SessionSummary,
): StoredProgress {
  return {
    ...progress,
    sessions: [...progress.sessions, summary],
    streak: updateStreak(progress.streak, summary.completedAt),
  };
}

export function recordDrillAttempt(
  progress: StoredProgress,
  attempt: DrillAttempt,
): StoredProgress {
  return {
    ...progress,
    drills: [...progress.drills, attempt],
    streak: updateStreak(progress.streak, attempt.at),
  };
}

export function recordMockResult(
  progress: StoredProgress,
  result: MockResult,
): StoredProgress {
  return {
    ...progress,
    mockResults: [...progress.mockResults, result],
  };
}

/**
 * Applies graded vocabulary reviews.
 *
 * The new card states arrive already computed — `gradeCard` in
 * `lib/vocab/scheduler.ts` owns the scheduling maths, and this only writes the
 * result. Keeping the two apart is what lets the schedule be tested by
 * asserting on dates without a storage layer in the way.
 */
export function recordVocabReviews(
  progress: StoredProgress,
  cards: VocabCardState[],
): StoredProgress {
  if (cards.length === 0) return progress;

  const next = { ...progress.vocab.cards };
  for (const card of cards) {
    next[card.termId] = card;
  }

  return {
    ...progress,
    vocab: { ...progress.vocab, cards: next },
  };
}

export function recordVocabSession(
  progress: StoredProgress,
  summary: VocabSessionSummary,
): StoredProgress {
  const matchBests = { ...progress.vocab.matchBests };

  if (summary.mode === "match" && summary.matchMs !== undefined) {
    const previous = matchBests[summary.setId];
    if (previous === undefined || summary.matchMs < previous) {
      matchBests[summary.setId] = summary.matchMs;
    }
  }

  return {
    ...progress,
    vocab: {
      ...progress.vocab,
      sessions: [...progress.vocab.sessions, summary],
      matchBests,
    },
    streak: updateStreak(progress.streak, summary.completedAt),
  };
}

/** Clears the schedule for one set without touching the rest of the bank. */
export function resetVocabSet(
  progress: StoredProgress,
  termIds: string[],
): StoredProgress {
  const cards = { ...progress.vocab.cards };
  for (const termId of termIds) {
    delete cards[termId];
  }
  return { ...progress, vocab: { ...progress.vocab, cards } };
}

/** YYYY-MM-DD in the viewer's local timezone — a "study day" is a local day. */
export function toLocalDayKey(iso: string): string {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daysBetween(fromKey: string, toKey: string): number {
  const from = Date.parse(`${fromKey}T00:00:00`);
  const to = Date.parse(`${toKey}T00:00:00`);
  if (Number.isNaN(from) || Number.isNaN(to)) {
    return Number.POSITIVE_INFINITY;
  }
  return Math.round((to - from) / 86_400_000);
}

/**
 * Advances the study streak.
 *
 * Same day: unchanged. Next day: +1. Any larger gap: back to 1. Studying is
 * the only thing that moves it — there is no penalty mechanic and no reward
 * beyond the count itself.
 */
export function updateStreak(streak: StudyStreak, at: string): StudyStreak {
  const today = toLocalDayKey(at);

  if (streak.lastStudyDate === null) {
    return { current: 1, longest: Math.max(1, streak.longest), lastStudyDate: today };
  }

  const gap = daysBetween(streak.lastStudyDate, today);

  if (gap <= 0) {
    return { ...streak, lastStudyDate: today };
  }

  const current = gap === 1 ? streak.current + 1 : 1;
  return {
    current,
    longest: Math.max(current, streak.longest),
    lastStudyDate: today,
  };
}

/**
 * The streak as it should be *displayed*.
 *
 * The stored value is only correct on the day it was written. Shown two days
 * later without this adjustment, a broken streak would still read "4".
 */
export function currentStreak(streak: StudyStreak, todayIso: string): number {
  if (streak.lastStudyDate === null) {
    return 0;
  }
  const gap = daysBetween(streak.lastStudyDate, toLocalDayKey(todayIso));
  return gap <= 1 ? streak.current : 0;
}
