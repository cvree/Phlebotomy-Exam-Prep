/**
 * Study-session and progress types.
 *
 * These describe what a student *did*. Everything here is persisted locally and
 * is versioned — see `lib/storage/migrations.ts`.
 */

import type { CertificationId, DomainId } from "./content";

export type PracticeMode =
  | "quick-10"
  | "all-domains"
  | "domain"
  | "weak-areas"
  | "missed"
  | "unseen";

export type SessionKind = "practice" | "mock";

export type PracticeConfig = {
  mode: PracticeMode;
  certificationId: CertificationId;
  /** Required when mode is "domain". */
  domainId?: DomainId;
  questionCount: number;
};

/** A single answered question, appended to the attempt log. */
export type AttemptRecord = {
  questionId: string;
  domain: DomainId;
  /** Choice the student picked, or null when they ran out of time / skipped. */
  choiceId: string | null;
  correct: boolean;
  /** ISO timestamp. */
  at: string;
  sessionId: string;
  sessionKind: SessionKind;
};

/** Rolled-up per-question state, so we never rescan the whole attempt log. */
export type QuestionStat = {
  questionId: string;
  domain: DomainId;
  attempts: number;
  correct: number;
  /** How many times in a row it has been answered correctly, most recent run. */
  streak: number;
  lastCorrect: boolean;
  /** ISO timestamp of the most recent attempt. */
  lastAttemptAt: string;
};

export type SessionSummary = {
  id: string;
  kind: SessionKind;
  mode: PracticeMode | "mock";
  certificationId: CertificationId;
  /** Present when the session targeted one area. */
  domainId?: DomainId;
  total: number;
  correct: number;
  /** Questions left blank (mock exams only). */
  unanswered: number;
  startedAt: string;
  completedAt: string;
  /** Per-domain tallies for the results screen and progress rollups. */
  byDomain: Record<string, { total: number; correct: number }>;
};

export type DrillId = "order-of-draw" | "tube-colors";

export type DrillAttempt = {
  id: string;
  drill: DrillId;
  /** Which drill variant produced this attempt. */
  mode: string;
  /** 0–1. */
  accuracy: number;
  /** Items judged in this attempt. */
  total: number;
  correct: number;
  /** Whole attempt correct with no mistakes. */
  perfect: boolean;
  durationMs?: number;
  at: string;
};

export type MasteryLevel =
  | "not-started"
  | "learning"
  | "developing"
  | "proficient"
  | "strong";

export type DomainMastery = {
  domain: DomainId;
  level: MasteryLevel;
  /** 0–1, weighted toward recent attempts. */
  accuracy: number;
  /** 0–1, unweighted lifetime accuracy. */
  lifetimeAccuracy: number;
  attempts: number;
  /** Distinct questions seen in this area. */
  seenQuestions: number;
  /** Distinct questions available in this area. */
  totalQuestions: number;
  /** Questions answered correctly at least twice in a row. */
  repeatMastered: number;
  lastPracticedAt: string | null;
  /** Plain-language reason for the level, shown in the UI. */
  rationale: string;
};

export type ReadinessLevel =
  | "not-started"
  | "learning"
  | "developing"
  | "proficient"
  | "strong";

export type ReadinessComponent = {
  id: "coverage" | "accuracy" | "volume" | "retention" | "mock";
  label: string;
  /** 0–1 raw component score. */
  score: number;
  /** Points this component contributes at a perfect score. */
  maxPoints: number;
  /** Points actually earned. */
  points: number;
  detail: string;
};

export type Readiness = {
  level: ReadinessLevel;
  /** 0–100. */
  score: number;
  components: ReadinessComponent[];
  /** What would move the number most, in plain language. */
  limitingFactor: string;
};

export type Recommendation = {
  id: string;
  /** Short imperative headline, e.g. "Drill Specimen Handling". */
  title: string;
  /** Why we are suggesting it — always explainable from stored data. */
  reason: string;
  ctaLabel: string;
  href: string;
  /** Lower sorts first. */
  priority: number;
};

/** A practice session that can be resumed after a refresh. */
export type ActivePracticeSession = {
  id: string;
  config: PracticeConfig;
  questionIds: string[];
  /** Index of the question currently on screen. */
  index: number;
  /** questionId -> chosen choice id. */
  answers: Record<string, string>;
  /** Questions whose explanation has been revealed. */
  revealed: string[];
  startedAt: string;
};

/** A mock exam that can be resumed after a refresh. */
export type ActiveMockSession = {
  id: string;
  certificationId: CertificationId;
  questionIds: string[];
  index: number;
  answers: Record<string, string>;
  flagged: string[];
  startedAt: string;
  /** Total allowance in seconds. */
  durationSeconds: number;
  /** Seconds left at `lastTickAt`; the clock is reconciled on resume. */
  secondsRemaining: number;
  lastTickAt: string;
  /** True once submitted; kept so the results page can read it. */
  submitted: boolean;
};

export type MockResult = {
  id: string;
  certificationId: CertificationId;
  questionIds: string[];
  answers: Record<string, string>;
  flagged: string[];
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  byDomain: Record<string, { total: number; correct: number }>;
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
  secondsUsed: number;
};

export type StudyStreak = {
  current: number;
  longest: number;
  /** YYYY-MM-DD of the most recent day with any study activity. */
  lastStudyDate: string | null;
};
