import { describe, expect, it } from "vitest";
import {
  currentStreak,
  recordAttempt,
  recordAttempts,
  recordDrillAttempt,
  recordSession,
  toLocalDayKey,
  updateStreak,
} from "@/lib/progress/mutations";
import type { StudyStreak } from "@/types/study";
import { attemptsFor, emptyProgress } from "./helpers";

describe("recordAttempt", () => {
  it("creates a question stat on the first attempt", () => {
    const attempt = attemptsFor({
      domain: "order-of-draw",
      count: 1,
      correctPattern: [true],
    })[0]!;

    const progress = recordAttempt(emptyProgress(), attempt);
    const stat = progress.questionStats[attempt.questionId];

    expect(stat).toMatchObject({ attempts: 1, correct: 1, streak: 1, lastCorrect: true });
    expect(progress.attempts).toHaveLength(1);
  });

  it("does not mutate the record it was given", () => {
    const before = emptyProgress();
    recordAttempt(
      before,
      attemptsFor({ domain: "order-of-draw", count: 1, correctPattern: [true] })[0]!,
    );
    expect(before.attempts).toHaveLength(0);
    expect(before.questionStats).toEqual({});
  });

  it("accumulates a streak and resets it on a wrong answer", () => {
    const attempts = attemptsFor({
      domain: "order-of-draw",
      count: 4,
      correctPattern: [true],
      distinctQuestions: 1,
    });
    const withMiss = attempts.map((attempt, index) =>
      index === 3 ? { ...attempt, correct: false } : attempt,
    );

    const afterThree = recordAttempts(emptyProgress(), attempts.slice(0, 3));
    expect(afterThree.questionStats[attempts[0]!.questionId]?.streak).toBe(3);

    const afterMiss = recordAttempts(emptyProgress(), withMiss);
    const stat = afterMiss.questionStats[attempts[0]!.questionId];
    expect(stat?.streak).toBe(0);
    expect(stat?.attempts).toBe(4);
    expect(stat?.correct).toBe(3);
    expect(stat?.lastCorrect).toBe(false);
  });
});

describe("recordSession and recordDrillAttempt", () => {
  it("appends a session and advances the streak", () => {
    const progress = recordSession(emptyProgress(), {
      id: "s1",
      kind: "practice",
      mode: "quick-10",
      certificationId: "nha-cpt",
      total: 10,
      correct: 7,
      unanswered: 0,
      startedAt: "2026-01-01T09:00:00.000Z",
      completedAt: "2026-01-01T09:10:00.000Z",
      byDomain: {},
    });

    expect(progress.sessions).toHaveLength(1);
    expect(progress.streak.current).toBe(1);
  });

  it("appends a drill attempt and advances the streak", () => {
    const progress = recordDrillAttempt(emptyProgress(), {
      id: "d1",
      drill: "order-of-draw",
      mode: "arrange",
      accuracy: 1,
      total: 6,
      correct: 6,
      perfect: true,
      at: "2026-01-01T09:00:00.000Z",
    });

    expect(progress.drills).toHaveLength(1);
    expect(progress.streak.current).toBe(1);
  });
});

describe("updateStreak", () => {
  const at = (day: string) => `${day}T12:00:00.000Z`;

  it("starts at one", () => {
    const streak = updateStreak(
      { current: 0, longest: 0, lastStudyDate: null },
      at("2026-01-10"),
    );
    expect(streak).toEqual({
      current: 1,
      longest: 1,
      lastStudyDate: toLocalDayKey(at("2026-01-10")),
    });
  });

  it("does not advance twice in the same day", () => {
    const day1: StudyStreak = updateStreak(
      { current: 0, longest: 0, lastStudyDate: null },
      at("2026-01-10"),
    );
    const again = updateStreak(day1, at("2026-01-10"));
    expect(again.current).toBe(1);
  });

  it("advances on the following day", () => {
    let streak = updateStreak(
      { current: 0, longest: 0, lastStudyDate: null },
      at("2026-01-10"),
    );
    streak = updateStreak(streak, at("2026-01-11"));
    streak = updateStreak(streak, at("2026-01-12"));
    expect(streak.current).toBe(3);
    expect(streak.longest).toBe(3);
  });

  it("restarts after a gap but keeps the longest run", () => {
    let streak = updateStreak(
      { current: 0, longest: 0, lastStudyDate: null },
      at("2026-01-10"),
    );
    streak = updateStreak(streak, at("2026-01-11"));
    streak = updateStreak(streak, at("2026-01-12"));
    streak = updateStreak(streak, at("2026-01-20"));

    expect(streak.current).toBe(1);
    expect(streak.longest).toBe(3);
  });
});

describe("currentStreak", () => {
  const at = (day: string) => `${day}T12:00:00.000Z`;

  it("is zero when nothing has been studied", () => {
    expect(
      currentStreak({ current: 0, longest: 0, lastStudyDate: null }, at("2026-01-10")),
    ).toBe(0);
  });

  it("still counts when the last study day was yesterday", () => {
    const streak = updateStreak(
      { current: 4, longest: 5, lastStudyDate: toLocalDayKey(at("2026-01-09")) },
      at("2026-01-10"),
    );
    expect(currentStreak(streak, at("2026-01-11"))).toBe(streak.current);
  });

  it("reports zero once the streak has actually lapsed", () => {
    // The stored value is only correct on the day it was written; displaying
    // it three days later without this adjustment would be a lie.
    const stale: StudyStreak = {
      current: 6,
      longest: 6,
      lastStudyDate: toLocalDayKey(at("2026-01-10")),
    };
    expect(currentStreak(stale, at("2026-01-13"))).toBe(0);
  });
});
