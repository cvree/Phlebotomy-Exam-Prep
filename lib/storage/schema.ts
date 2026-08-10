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
import type { VocabCardState, VocabSessionSummary } from "@/types/vocab";

export const STORAGE_KEYS = {
  progress: "pep.progress",
  practiceSession: "pep.session.practice",
  mockSession: "pep.session.mock",
  lastMockResult: "pep.result.mock",
} as const;

/** Bump when the persisted shape changes, and add a migration step. */
export const PROGRESS_SCHEMA_VERSION = 3;

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
  vocabSessions: 200,
} as const;

/**
 * Vocabulary state.
 *
 * `cards` is a map rather than a list because the scheduler looks terms up by
 * id on every render of every set card; a list would turn the hub into a scan
 * over the whole bank.
 */
export type StoredVocab = {
  cards: Record<string, VocabCardState>;
  sessions: VocabSessionSummary[];
  /** Best Match time in milliseconds, keyed by set id. */
  matchBests: Record<string, number>;
};

export function createEmptyVocab(): StoredVocab {
  return { cards: {}, sessions: [], matchBests: {} };
}

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
  vocab: StoredVocab;
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
    vocab: createEmptyVocab(),
  };
}

export type StoredPracticeSession = ActivePracticeSession & { version: number };
export type StoredMockSession = ActiveMockSession & { version: number };
