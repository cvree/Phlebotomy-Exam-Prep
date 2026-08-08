import type { Question } from "@/types/content";
import type { AttemptRecord, SessionKind, SessionSummary } from "@/types/study";

export type ScoredAnswer = {
  question: Question;
  choiceId: string | null;
  correct: boolean;
};

export type ScoreBreakdown = {
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  /** 0–1 over the whole paper; unanswered questions count against you. */
  percent: number;
  byDomain: Record<string, { total: number; correct: number }>;
};

export function isCorrect(question: Question, choiceId: string | null): boolean {
  return choiceId !== null && choiceId === question.correctChoiceId;
}

export function scoreAnswers(
  questions: Question[],
  answers: Record<string, string>,
): ScoreBreakdown {
  const byDomain: Record<string, { total: number; correct: number }> = {};
  let correct = 0;
  let unanswered = 0;

  for (const question of questions) {
    const choiceId = answers[question.id] ?? null;
    const right = isCorrect(question, choiceId);

    if (choiceId === null) {
      unanswered += 1;
    }
    if (right) {
      correct += 1;
    }

    const bucket = byDomain[question.domain] ?? { total: 0, correct: 0 };
    bucket.total += 1;
    if (right) {
      bucket.correct += 1;
    }
    byDomain[question.domain] = bucket;
  }

  const total = questions.length;
  return {
    total,
    correct,
    incorrect: total - correct - unanswered,
    unanswered,
    percent: total === 0 ? 0 : correct / total,
    byDomain,
  };
}

export function buildAttempts(
  questions: Question[],
  answers: Record<string, string>,
  meta: { sessionId: string; sessionKind: SessionKind; at: string },
): AttemptRecord[] {
  return questions
    .filter((question) => answers[question.id] !== undefined)
    .map((question) => {
      const choiceId = answers[question.id] ?? null;
      return {
        questionId: question.id,
        domain: question.domain,
        choiceId,
        correct: isCorrect(question, choiceId),
        at: meta.at,
        sessionId: meta.sessionId,
        sessionKind: meta.sessionKind,
      };
    });
}

export function buildSessionSummary(
  breakdown: ScoreBreakdown,
  meta: Omit<SessionSummary, keyof ScoreBreakdown | "byDomain" | "percent">,
): SessionSummary {
  return {
    ...meta,
    total: breakdown.total,
    correct: breakdown.correct,
    unanswered: breakdown.unanswered,
    byDomain: breakdown.byDomain,
  };
}

/**
 * Longest run of consecutive correct answers in a session.
 *
 * The only streak we show during practice. It rewards concentration without
 * inventing a currency.
 */
export function longestCorrectRun(results: ScoredAnswer[]): number {
  let best = 0;
  let run = 0;
  for (const result of results) {
    run = result.correct ? run + 1 : 0;
    best = Math.max(best, run);
  }
  return best;
}
