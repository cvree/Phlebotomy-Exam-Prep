import { describe, expect, it } from "vitest";
import {
  calculateAllMastery,
  calculateDomainMastery,
  findUntouchedDomains,
  masteryLevelFor,
  rankWeakest,
  weightedAccuracy,
} from "@/lib/progress/mastery";
import { attemptsFor, progressWith } from "./helpers";

describe("weightedAccuracy", () => {
  it("returns zero for no attempts", () => {
    expect(weightedAccuracy([])).toBe(0);
  });

  it("returns one when everything is correct", () => {
    const attempts = attemptsFor({
      domain: "safety-infection-control",
      count: 10,
      correctPattern: [true],
    });
    expect(weightedAccuracy(attempts)).toBeCloseTo(1, 10);
  });

  it("weights recent attempts above old ones", () => {
    const improving = attemptsFor({
      domain: "safety-infection-control",
      count: 20,
      // First half wrong, second half right.
      correctPattern: [false],
    }).map((attempt, index) => ({ ...attempt, correct: index >= 10 }));

    const declining = improving.map((attempt, index) => ({
      ...attempt,
      correct: index < 10,
    }));

    // Same lifetime accuracy (50%), opposite trajectories.
    expect(weightedAccuracy(improving)).toBeGreaterThan(0.5);
    expect(weightedAccuracy(declining)).toBeLessThan(0.5);
  });

  it("ignores attempts beyond the recent window", () => {
    const attempts = attemptsFor({
      domain: "safety-infection-control",
      count: 100,
      correctPattern: [true],
    }).map((attempt, index) => ({ ...attempt, correct: index >= 60 }));

    // The 60 oldest are wrong but all fall outside the 40-attempt window.
    expect(weightedAccuracy(attempts)).toBeCloseTo(1, 10);
  });
});

describe("masteryLevelFor", () => {
  it("reports not-started with no attempts", () => {
    expect(
      masteryLevelFor({
        attempts: 0,
        distinctQuestions: 0,
        accuracy: 0,
        repeatMastered: 0,
      }),
    ).toBe("not-started");
  });

  it("will not award a high level on thin evidence", () => {
    // Three perfect answers is not mastery, and this is the specific
    // behavior the product brief calls out.
    expect(
      masteryLevelFor({
        attempts: 3,
        distinctQuestions: 3,
        accuracy: 1,
        repeatMastered: 3,
      }),
    ).toBe("learning");
  });

  it("requires exposure as well as accuracy for proficient", () => {
    expect(
      masteryLevelFor({
        attempts: 11,
        distinctQuestions: 8,
        accuracy: 1,
        repeatMastered: 4,
      }),
    ).not.toBe("proficient");

    expect(
      masteryLevelFor({
        attempts: 12,
        distinctQuestions: 8,
        accuracy: 0.85,
        repeatMastered: 4,
      }),
    ).toBe("proficient");
  });

  it("requires repeated success for strong", () => {
    const base = { attempts: 25, distinctQuestions: 14, accuracy: 0.95 };
    // High accuracy and exposure, but nothing answered right twice running.
    expect(masteryLevelFor({ ...base, repeatMastered: 2 })).toBe("proficient");
    expect(masteryLevelFor({ ...base, repeatMastered: 7 })).toBe("strong");
  });

  it("drops to learning when accuracy falls below the developing floor", () => {
    expect(
      masteryLevelFor({
        attempts: 30,
        distinctQuestions: 20,
        accuracy: 0.4,
        repeatMastered: 1,
      }),
    ).toBe("learning");
  });
});

describe("calculateDomainMastery", () => {
  it("counts distinct questions and repeat mastery from question stats", () => {
    const progress = progressWith(
      attemptsFor({
        domain: "order-of-draw",
        count: 24,
        correctPattern: [true],
        distinctQuestions: 12,
      }),
    );

    const mastery = calculateDomainMastery(progress, "order-of-draw", 11);
    expect(mastery.attempts).toBe(24);
    expect(mastery.seenQuestions).toBe(12);
    // Each of the 12 questions was answered correctly twice.
    expect(mastery.repeatMastered).toBe(12);
    expect(mastery.level).toBe("strong");
    expect(mastery.rationale).toContain("twice running");
  });

  it("holds back Strong when exposure is narrow, however perfect the run", () => {
    // 12 perfect answers over only 6 questions clears the accuracy bar but
    // not the breadth bar — repeatedly acing the same handful of items is not
    // mastery of the area.
    const progress = progressWith(
      attemptsFor({
        domain: "order-of-draw",
        count: 12,
        correctPattern: [true],
        distinctQuestions: 6,
      }),
    );

    const mastery = calculateDomainMastery(progress, "order-of-draw", 11);
    expect(mastery.accuracy).toBeCloseTo(1, 10);
    expect(mastery.level).toBe("developing");
  });

  it("resets a question's streak after a wrong answer", () => {
    const attempts = attemptsFor({
      domain: "order-of-draw",
      count: 3,
      correctPattern: [true],
      distinctQuestions: 1,
    });
    const withMiss = attempts.map((attempt, index) =>
      index === 2 ? { ...attempt, correct: false } : attempt,
    );

    const mastery = calculateDomainMastery(progressWith(withMiss), "order-of-draw", 11);
    expect(mastery.repeatMastered).toBe(0);
  });

  it("gives an explanation a student can read", () => {
    const mastery = calculateDomainMastery(progressWith([]), "complications", 10);
    expect(mastery.level).toBe("not-started");
    expect(mastery.rationale).toBe("No questions answered in this area yet.");
  });
});

describe("weak-area ranking", () => {
  it("ranks lower mastery first and excludes untouched areas", () => {
    const progress = progressWith([
      ...attemptsFor({
        domain: "specimen-handling",
        count: 10,
        correctPattern: [false, false, true],
      }),
      ...attemptsFor({
        domain: "safety-infection-control",
        count: 14,
        correctPattern: [true],
        distinctQuestions: 9,
      }),
    ]);

    const mastery = calculateAllMastery(progress);
    const weakest = rankWeakest(mastery);

    expect(weakest[0]?.domain).toBe("specimen-handling");
    // Untouched domains must not appear — "unknown" is not "weak".
    expect(weakest.every((entry) => entry.attempts > 0)).toBe(true);

    const untouched = findUntouchedDomains(mastery);
    expect(untouched.length).toBe(mastery.length - 2);
  });
});
