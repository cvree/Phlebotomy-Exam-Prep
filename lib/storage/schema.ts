import type {
  ActiveMockSession,
  ActivePracticeSession,
  AttemptRecord,
  DrillAttempt,
  MockResult,
  QuestionStat,
  SessionSummary,
  StudyStreak,
} from "@/types/study";

export const STORAGE_KEYS = {
  progress: "pep.progress",
  practiceSession: "pep.session.practice",
  mockSession: "pep.session.mock",
  lastMockResult: "pep.result.mock",
} as const;

/** Bump when the persisted shape changes, and add a migration step. */
export const PROGRESS_SCHEMA_VERSION = 2;

/**
 * Caps on stored history.
 *
 * Attempts are the only unbounded collection, and localStorage is typically
 * limited to about 5 MB per origin. 4000 attempts is far more than a student
 * will generate before an exam, and mastery only ever looks at recent history.
 */
export const LIMITS = {
  attempts: 4000,
  sessions: 200,
  drills: 300,
  mockResults: 30,
} as const;

export type StoredProgress = {
  version: number;
  createdAt: string;
  updatedAt: string;
  /** Rolled-up per-question state, keyed by question id. */
  questionStats: Record<string, QuestionStat>;
  /** Newest last. Trimmed from the front when it exceeds `LIMITS.attempts`. */
  attempts: AttemptRecord[];
  sessions: SessionSummary[];
  drills: DrillAttempt[];
  mockResults: MockResult[];
  streak: StudyStreak;
};

export function createEmptyProgress(now: string): StoredProgress {
  return {
    version: PROGRESS_SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    questionStats: {},
    attempts: [],
    sessions: [],
    drills: [],
    mockResults: [],
    streak: { current: 0, longest: 0, lastStudyDate: null },
  };
}

export type StoredPracticeSession = ActivePracticeSession & { version: number };
export type StoredMockSession = ActiveMockSession & { version: number };
