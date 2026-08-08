import { describe, expect, it } from "vitest";
import { calculateAllMastery } from "@/lib/progress/mastery";
import { calculateReadiness } from "@/lib/progress/readiness";
import { buildRecommendations } from "@/lib/progress/recommendations";
import { DOMAIN_IDS } from "@/data/certifications/domains";
import type { StoredProgress } from "@/lib/storage/schema";
import type { DrillAttempt } from "@/types/study";
import { attemptsFor, emptyProgress, progressWith } from "./helpers";

const NOW = new Date("2026-02-01T12:00:00.000Z");

function contextFor(progress: StoredProgress) {
  const mastery = calculateAllMastery(progress);
  return {
    progress,
    mastery,
    readiness: calculateReadiness(progress, mastery),
    now: NOW,
  };
}

describe("buildRecommendations", () => {
  it("gives a first-time student exactly one thing to do", () => {
    const recommendations = buildRecommendations(contextFor(emptyProgress()));
    expect(recommendations).toHaveLength(1);
    expect(recommendations[0]?.id).toBe("first-session");
    expect(recommendations[0]?.href).toContain("mode=quick-10");
  });

  it("leads with the weakest area once there is evidence", () => {
    const progress = progressWith([
      ...attemptsFor({
        domain: "specimen-handling",
        count: 12,
        correctPattern: [false, false, true],
      }),
      ...attemptsFor({
        domain: "safety-infection-control",
        count: 12,
        correctPattern: [true],
        distinctQuestions: 8,
      }),
    ]);

    const [first] = buildRecommendations(contextFor(progress));
    expect(first?.id).toBe("weak-specimen-handling");
    expect(first?.href).toContain("domain=specimen-handling");
    // The reason must be traceable to numbers the student can also see.
    expect(first?.reason).toMatch(/\d+% on recent questions/);
  });

  it("suggests reviewing missed questions once enough have accumulated", () => {
    const progress = progressWith(
      attemptsFor({
        domain: "complications",
        count: 12,
        correctPattern: [false],
      }),
    );

    const missed = buildRecommendations(contextFor(progress)).find(
      (recommendation) => recommendation.id === "missed-review",
    );
    expect(missed).toBeDefined();
    expect(missed?.href).toContain("mode=missed");
  });

  it("does not suggest a missed-question review below the threshold", () => {
    const progress = progressWith(
      attemptsFor({
        domain: "complications",
        count: 3,
        correctPattern: [false],
      }),
    );
    const ids = buildRecommendations(contextFor(progress)).map((r) => r.id);
    expect(ids).not.toContain("missed-review");
  });

  it("flags a drill that has never been attempted", () => {
    const progress = progressWith(
      attemptsFor({
        domain: "order-of-draw",
        count: 10,
        correctPattern: [true],
      }),
    );
    const ids = buildRecommendations(contextFor(progress)).map((r) => r.id);
    expect(ids).toContain("drill-order-first");
    expect(ids).toContain("drill-tubes-first");
  });

  it("flags a drill whose recent accuracy has slipped", () => {
    const progress: StoredProgress = {
      ...progressWith(
        attemptsFor({
          domain: "order-of-draw",
          count: 10,
          correctPattern: [true],
        }),
      ),
      drills: [drill("order-of-draw", 0.5, "2026-01-31T12:00:00.000Z")],
    };

    const found = buildRecommendations(contextFor(progress)).find(
      (recommendation) => recommendation.id === "drill-order-accuracy",
    );
    expect(found).toBeDefined();
    expect(found?.reason).toContain("50%");
  });

  it("flags a drill that has gone stale rather than one done yesterday", () => {
    const recent: StoredProgress = {
      ...progressWith(
        attemptsFor({ domain: "order-of-draw", count: 10, correctPattern: [true] }),
      ),
      drills: [drill("order-of-draw", 1, "2026-01-31T12:00:00.000Z")],
    };
    const stale: StoredProgress = {
      ...recent,
      drills: [drill("order-of-draw", 1, "2026-01-01T12:00:00.000Z")],
    };

    expect(
      buildRecommendations(contextFor(recent)).map((r) => r.id),
    ).not.toContain("drill-order-stale");
    expect(
      buildRecommendations(contextFor(stale)).map((r) => r.id),
    ).toContain("drill-order-stale");
  });

  it("surfaces coverage gaps separately from weak areas", () => {
    const progress = progressWith(
      attemptsFor({
        domain: "order-of-draw",
        count: 10,
        correctPattern: [true],
      }),
    );
    const coverage = buildRecommendations(contextFor(progress)).find(
      (recommendation) => recommendation.id.startsWith("coverage-"),
    );
    expect(coverage).toBeDefined();
    expect(coverage?.reason).toContain("areas have no questions");
  });

  it("suggests a mock exam only once readiness justifies the hour", () => {
    const thin = progressWith(
      attemptsFor({ domain: "order-of-draw", count: 6, correctPattern: [true] }),
    );
    expect(
      buildRecommendations(contextFor(thin)).map((r) => r.id),
    ).not.toContain("mock-exam");

    const broad = progressWith(
      DOMAIN_IDS.flatMap((domain) =>
        attemptsFor({
          domain,
          count: 22,
          correctPattern: [true],
          distinctQuestions: 10,
          prefix: domain,
        }),
      ),
    );
    expect(
      buildRecommendations(contextFor(broad)).map((r) => r.id),
    ).toContain("mock-exam");
  });

  it("always returns at least one action", () => {
    const progress = progressWith(
      DOMAIN_IDS.flatMap((domain) =>
        attemptsFor({
          domain,
          count: 25,
          correctPattern: [true],
          distinctQuestions: 12,
          prefix: domain,
        }),
      ),
    );
    expect(buildRecommendations(contextFor(progress)).length).toBeGreaterThan(0);
  });

  it("returns recommendations sorted by priority", () => {
    const progress = progressWith([
      ...attemptsFor({
        domain: "specimen-handling",
        count: 12,
        correctPattern: [false, true],
      }),
    ]);
    const priorities = buildRecommendations(contextFor(progress)).map(
      (recommendation) => recommendation.priority,
    );
    expect(priorities).toEqual([...priorities].sort((a, b) => a - b));
  });
});

function drill(
  id: DrillAttempt["drill"],
  accuracy: number,
  at: string,
): DrillAttempt {
  return {
    id: `${id}-${at}`,
    drill: id,
    mode: "arrange",
    accuracy,
    total: 6,
    correct: Math.round(6 * accuracy),
    perfect: accuracy === 1,
    at,
  };
}
