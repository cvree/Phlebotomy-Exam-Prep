import type { DomainId } from "@/types/content";
import type { AttemptRecord } from "@/types/study";
import { createEmptyProgress, type StoredProgress } from "@/lib/storage/schema";
import { recordAttempts } from "@/lib/progress/mutations";

export const T0 = "2026-01-01T09:00:00.000Z";

export function emptyProgress(now = T0): StoredProgress {
  return createEmptyProgress(now);
}

/**
 * Builds a run of attempts against distinct question ids.
 *
 * `correctPattern` is applied cyclically, so `[true, true, false]` gives a
 * repeatable 2-in-3 accuracy without hand-writing every attempt.
 */
export function attemptsFor(options: {
  domain: DomainId;
  count: number;
  correctPattern: boolean[];
  /** Reuse the same N question ids, to exercise repeat-mastery rules. */
  distinctQuestions?: number;
  startAt?: string;
  prefix?: string;
}): AttemptRecord[] {
  const {
    domain,
    count,
    correctPattern,
    distinctQuestions = count,
    startAt = T0,
    prefix = domain,
  } = options;

  const base = Date.parse(startAt);
  const attempts: AttemptRecord[] = [];

  for (let i = 0; i < count; i += 1) {
    const correct = correctPattern[i % correctPattern.length] ?? true;
    attempts.push({
      questionId: `${prefix}-q${i % distinctQuestions}`,
      domain,
      choiceId: "a",
      correct,
      at: new Date(base + i * 60_000).toISOString(),
      sessionId: "session-1",
      sessionKind: "practice",
    });
  }

  return attempts;
}

export function progressWith(attempts: AttemptRecord[]): StoredProgress {
  return recordAttempts(emptyProgress(), attempts);
}
