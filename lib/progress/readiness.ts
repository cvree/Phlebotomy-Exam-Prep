import type {
  DomainMastery,
  Readiness,
  ReadinessComponent,
  ReadinessLevel,
} from "@/types/study";
import type { StoredProgress } from "@/lib/storage/schema";
import { MASTERY_ORDER } from "./mastery";

/**
 * Study readiness.
 *
 * This is a study-coverage indicator, not a prediction. It answers "how much
 * of this material have you demonstrated, recently, across the whole
 * syllabus?" — it does not and cannot answer "will you pass?". No claim about
 * pass probability is made anywhere in the product, and the formula below is
 * the whole of it: five components, fixed weights, no hidden terms.
 */

export const READINESS_WEIGHTS = {
  /** Breadth: are you working across the syllabus, or only your favourites? */
  coverage: 30,
  /** Depth: recent accuracy, weighted by mastery level rather than raw %. */
  accuracy: 30,
  /** Volume: have you done enough for the other numbers to mean anything? */
  volume: 20,
  /** Retention: questions answered correctly more than once. */
  retention: 10,
  /** Mock: full-length performance under time pressure. */
  mock: 10,
} as const;

/** Attempts at which the volume component saturates. */
export const VOLUME_TARGET = 150;

export const READINESS_THRESHOLDS: { level: ReadinessLevel; min: number }[] = [
  { level: "strong", min: 80 },
  { level: "proficient", min: 60 },
  { level: "developing", min: 35 },
  { level: "learning", min: 1 },
  { level: "not-started", min: 0 },
];

export const READINESS_LABELS: Record<ReadinessLevel, string> = {
  "not-started": "Not started",
  learning: "Learning",
  developing: "Developing",
  proficient: "Proficient",
  strong: "Strong",
};

export const READINESS_BLURBS: Record<ReadinessLevel, string> = {
  "not-started": "Answer your first ten questions and this starts working.",
  learning:
    "You've begun. Keep going until every area has at least a handful of questions behind it.",
  developing:
    "Real progress. The gaps are now specific rather than general — work the weakest areas.",
  proficient:
    "Consistent across most of the syllabus. Full-length mock exams are the useful next step.",
  strong:
    "Broad, recent, and repeated. Keep the weakest area from slipping and stay in practice.",
};

/** Mastery level as a 0–1 score, used by the accuracy component. */
function masteryScore(mastery: DomainMastery): number {
  const index = MASTERY_ORDER.indexOf(mastery.level);
  return index / (MASTERY_ORDER.length - 1);
}

export function calculateReadiness(
  progress: StoredProgress,
  mastery: DomainMastery[],
): Readiness {
  const totalAttempts = progress.attempts.length;

  if (totalAttempts === 0) {
    return {
      level: "not-started",
      score: 0,
      components: [],
      limitingFactor:
        "No practice data yet. A ten-question session is enough to start.",
    };
  }

  // Coverage: share of areas at Developing or better. Breadth is what a mock
  // exam actually tests, and it is where most students are weakest.
  const covered = mastery.filter(
    (entry) => MASTERY_ORDER.indexOf(entry.level) >= MASTERY_ORDER.indexOf("developing"),
  ).length;
  const coverageScore = mastery.length === 0 ? 0 : covered / mastery.length;

  // Accuracy: average mastery score across areas you have actually attempted.
  const attempted = mastery.filter((entry) => entry.attempts > 0);
  const accuracyScore =
    attempted.length === 0
      ? 0
      : attempted.reduce((sum, entry) => sum + masteryScore(entry), 0) /
        mastery.length;

  const volumeScore = Math.min(1, totalAttempts / VOLUME_TARGET);

  const seen = Object.values(progress.questionStats);
  const repeated = seen.filter((stat) => stat.streak >= 2).length;
  const retentionScore = seen.length === 0 ? 0 : repeated / seen.length;

  // Mock: best of the three most recent mock exams, so one bad afternoon does
  // not erase a run of good ones — but an old good result does not carry
  // forever either.
  const recentMocks = progress.mockResults.slice(-3);
  const bestMock = recentMocks.reduce((best, result) => {
    const pct = result.total === 0 ? 0 : result.correct / result.total;
    return Math.max(best, pct);
  }, 0);

  const components: ReadinessComponent[] = [
    {
      id: "coverage",
      label: "Syllabus coverage",
      score: coverageScore,
      maxPoints: READINESS_WEIGHTS.coverage,
      points: coverageScore * READINESS_WEIGHTS.coverage,
      detail: `${covered} of ${mastery.length} areas at Developing or better.`,
    },
    {
      id: "accuracy",
      label: "Mastery depth",
      score: accuracyScore,
      maxPoints: READINESS_WEIGHTS.accuracy,
      points: accuracyScore * READINESS_WEIGHTS.accuracy,
      detail: `Average mastery across all ${mastery.length} areas, counting untouched areas as zero.`,
    },
    {
      id: "volume",
      label: "Practice volume",
      score: volumeScore,
      maxPoints: READINESS_WEIGHTS.volume,
      points: volumeScore * READINESS_WEIGHTS.volume,
      detail: `${totalAttempts} of ${VOLUME_TARGET} questions answered.`,
    },
    {
      id: "retention",
      label: "Retention",
      score: retentionScore,
      maxPoints: READINESS_WEIGHTS.retention,
      points: retentionScore * READINESS_WEIGHTS.retention,
      detail: `${repeated} of ${seen.length} seen questions answered correctly twice running.`,
    },
    {
      id: "mock",
      label: "Mock exam",
      score: bestMock,
      maxPoints: READINESS_WEIGHTS.mock,
      points: bestMock * READINESS_WEIGHTS.mock,
      detail:
        recentMocks.length === 0
          ? "No mock exam taken yet."
          : `Best of your last ${recentMocks.length} mock exam${recentMocks.length === 1 ? "" : "s"}: ${Math.round(bestMock * 100)}%.`,
    },
  ];

  const score = Math.round(
    components.reduce((sum, component) => sum + component.points, 0),
  );

  const limiting = components
    .slice()
    .sort((a, b) => b.maxPoints - b.points - (a.maxPoints - a.points))[0];

  return {
    level: levelForScore(score),
    score,
    components,
    limitingFactor: limiting
      ? `${limiting.label} is holding this back the most. ${limiting.detail}`
      : "Keep practising across all areas.",
  };
}

export function levelForScore(score: number): ReadinessLevel {
  for (const threshold of READINESS_THRESHOLDS) {
    if (score >= threshold.min) {
      return threshold.level;
    }
  }
  return "not-started";
}

export function readinessLabel(level: ReadinessLevel): string {
  return READINESS_LABELS[level];
}
