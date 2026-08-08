"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AttemptRecord,
  DomainMastery,
  DrillAttempt,
  MockResult,
  Readiness,
  Recommendation,
  SessionSummary,
} from "@/types/study";
import type { StoredProgress } from "@/lib/storage/schema";
import { createEmptyProgress } from "@/lib/storage/schema";
import {
  StudyProgressRepository,
  getProgressRepository,
} from "@/lib/storage/progressRepository";
import {
  recordAttempts,
  recordDrillAttempt,
  recordMockResult,
  recordSession,
} from "@/lib/progress/mutations";
import { calculateAllMastery } from "@/lib/progress/mastery";
import { calculateReadiness } from "@/lib/progress/readiness";
import { buildRecommendations } from "@/lib/progress/recommendations";
import { track } from "@/lib/analytics";

type StudyProgressValue = {
  /**
   * False until the first client render has read storage.
   *
   * Every consumer must respect this. Rendering stored progress during
   * hydration would produce a server/client mismatch, and rendering an empty
   * state that then flips to real data reads as a bug to the student.
   */
  ready: boolean;
  progress: StoredProgress;
  mastery: DomainMastery[];
  readiness: Readiness;
  recommendations: Recommendation[];
  repository: StudyProgressRepository;
  saveAttempts: (attempts: AttemptRecord[]) => void;
  saveSession: (summary: SessionSummary) => void;
  saveDrillAttempt: (attempt: DrillAttempt) => void;
  saveMockResult: (result: MockResult) => void;
  resetProgress: () => void;
  exportProgress: () => void;
};

const StudyProgressContext = createContext<StudyProgressValue | null>(null);

export function StudyProgressProvider({ children }: { children: ReactNode }) {
  const repository = useMemo(() => getProgressRepository(), []);
  const [progress, setProgress] = useState<StoredProgress>(() =>
    createEmptyProgress(new Date(0).toISOString()),
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(repository.load());
    setReady(true);
    return repository.subscribe(setProgress);
  }, [repository]);

  const mastery = useMemo(() => calculateAllMastery(progress), [progress]);
  const readiness = useMemo(
    () => calculateReadiness(progress, mastery),
    [progress, mastery],
  );

  // Recommendations depend on "now" only through staleness thresholds measured
  // in days, so pinning the date at render time is stable enough and keeps
  // this from re-running on every tick.
  const recommendations = useMemo(
    () =>
      ready
        ? buildRecommendations({ progress, mastery, readiness, now: new Date() })
        : [],
    [ready, progress, mastery, readiness],
  );

  const saveAttempts = useCallback(
    (attempts: AttemptRecord[]) => {
      if (attempts.length === 0) return;
      repository.update((current) => recordAttempts(current, attempts));
    },
    [repository],
  );

  const saveSession = useCallback(
    (summary: SessionSummary) => {
      repository.update((current) => recordSession(current, summary));
    },
    [repository],
  );

  const saveDrillAttempt = useCallback(
    (attempt: DrillAttempt) => {
      repository.update((current) => recordDrillAttempt(current, attempt));
    },
    [repository],
  );

  const saveMockResult = useCallback(
    (result: MockResult) => {
      repository.update((current) => recordMockResult(current, result));
      repository.writeLastMockResult(result);
    },
    [repository],
  );

  const resetProgress = useCallback(() => {
    repository.reset();
    track("progress_reset");
  }, [repository]);

  const exportProgress = useCallback(() => {
    const blob = new Blob([repository.exportJSON()], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `phlebotomy-exam-prep-progress-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    track("progress_exported");
  }, [repository]);

  const value = useMemo<StudyProgressValue>(
    () => ({
      ready,
      progress,
      mastery,
      readiness,
      recommendations,
      repository,
      saveAttempts,
      saveSession,
      saveDrillAttempt,
      saveMockResult,
      resetProgress,
      exportProgress,
    }),
    [
      ready,
      progress,
      mastery,
      readiness,
      recommendations,
      repository,
      saveAttempts,
      saveSession,
      saveDrillAttempt,
      saveMockResult,
      resetProgress,
      exportProgress,
    ],
  );

  return (
    <StudyProgressContext.Provider value={value}>
      {children}
    </StudyProgressContext.Provider>
  );
}

export function useStudyProgress(): StudyProgressValue {
  const context = useContext(StudyProgressContext);
  if (!context) {
    throw new Error(
      "useStudyProgress must be used inside <StudyProgressProvider>.",
    );
  }
  return context;
}
