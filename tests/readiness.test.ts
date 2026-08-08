import { describe, expect, it } from "vitest";
import { calculateAllMastery } from "@/lib/progress/mastery";
import {
  READINESS_WEIGHTS,
  calculateReadiness,
  levelForScore,
} from "@/lib/progress/readiness";
import { DOMAIN_IDS } from "@/data/certifications/domains";
import { attemptsFor, emptyProgress, progressWith } from "./helpers";
import type { MockResult } from "@/types/study";

describe("calculateReadiness", () => {
  it("reports not-started with no attempts", () => {
    const progress = emptyProgress();
    const readiness = calculateReadiness(progress, calculateAllMastery(progress));
    expect(readiness.level).toBe("not-started");
    expect(readiness.score).toBe(0);
    expect(readiness.components).toHaveLength(0);
  });

  it("stays low when a student is excellent at one area and absent elsewhere", () => {
    // The failure mode the coverage weighting exists to prevent.
    const progress = progressWith(
      attemptsFor({
        domain: "order-of-draw",
        count: 40,
        correctPattern: [true],
        distinctQuestions: 11,
      }),
    );
    const readiness = calculateReadiness(progress, calculateAllMastery(progress));

    expect(readiness.score).toBeLessThan(45);
    expect(readiness.limitingFactor).toMatch(/coverage|Mastery depth/i);
  });

  it("rises as coverage broadens", () => {
    const narrow = progressWith(
      attemptsFor({
        domain: "order-of-draw",
        count: 20,
        correctPattern: [true],
        distinctQuestions: 10,
      }),
    );

    const broad = progressWith(
      DOMAIN_IDS.flatMap((domain) =>
        attemptsFor({
          domain,
          count: 20,
          correctPattern: [true],
          distinctQuestions: 10,
          prefix: domain,
        }),
      ),
    );

    const narrowScore = calculateReadiness(narrow, calculateAllMastery(narrow)).score;
    const broadScore = calculateReadiness(broad, calculateAllMastery(broad)).score;

    expect(broadScore).toBeGreaterThan(narrowScore + 30);
  });

  it("never exceeds 100 and never drops below 0", () => {
    const progress = progressWith(
      DOMAIN_IDS.flatMap((domain) =>
        attemptsFor({
          domain,
          count: 60,
          correctPattern: [true],
          distinctQuestions: 10,
          prefix: domain,
        }),
      ),
    );
    const readiness = calculateReadiness(progress, calculateAllMastery(progress));
    expect(readiness.score).toBeLessThanOrEqual(100);
    expect(readiness.score).toBeGreaterThanOrEqual(0);
  });

  it("scores the mock component from the best of the last three results", () => {
    const base = progressWith(
      attemptsFor({
        domain: "order-of-draw",
        count: 10,
        correctPattern: [true],
      }),
    );

    const withMocks = {
      ...base,
      mockResults: [
        mockResult(0.9),
        mockResult(0.4),
        mockResult(0.5),
      ],
    };

    const readiness = calculateReadiness(withMocks, calculateAllMastery(withMocks));
    const mock = readiness.components.find((component) => component.id === "mock");

    expect(mock?.score).toBeCloseTo(0.9, 5);
    expect(mock?.points).toBeCloseTo(0.9 * READINESS_WEIGHTS.mock, 5);
  });

  it("names a limiting factor drawn from the components", () => {
    const progress = progressWith(
      attemptsFor({
        domain: "safety-infection-control",
        count: 8,
        correctPattern: [true, false],
      }),
    );
    const readiness = calculateReadiness(progress, calculateAllMastery(progress));
    expect(readiness.limitingFactor.length).toBeGreaterThan(10);
    expect(
      readiness.components.some((component) =>
        readiness.limitingFactor.startsWith(component.label),
      ),
    ).toBe(true);
  });
});

describe("levelForScore", () => {
  it("maps scores to labels at the documented thresholds", () => {
    expect(levelForScore(0)).toBe("not-started");
    expect(levelForScore(1)).toBe("learning");
    expect(levelForScore(34)).toBe("learning");
    expect(levelForScore(35)).toBe("developing");
    expect(levelForScore(59)).toBe("developing");
    expect(levelForScore(60)).toBe("proficient");
    expect(levelForScore(79)).toBe("proficient");
    expect(levelForScore(80)).toBe("strong");
    expect(levelForScore(100)).toBe("strong");
  });
});

function mockResult(percent: number): MockResult {
  const total = 50;
  const correct = Math.round(total * percent);
  return {
    id: `mock-${percent}`,
    certificationId: "nha-cpt",
    questionIds: [],
    answers: {},
    flagged: [],
    total,
    correct,
    incorrect: total - correct,
    unanswered: 0,
    byDomain: {},
    startedAt: "2026-01-01T09:00:00.000Z",
    completedAt: "2026-01-01T10:00:00.000Z",
    durationSeconds: 3600,
    secondsUsed: 3000,
  };
}
