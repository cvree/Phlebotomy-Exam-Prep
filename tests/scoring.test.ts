import { describe, expect, it } from "vitest";
import type { Question } from "@/types/content";
import {
  buildAttempts,
  isCorrect,
  longestCorrectRun,
  scoreAnswers,
} from "@/lib/scoring/score";

function question(id: string, domain: Question["domain"]): Question {
  return {
    id,
    certifications: ["nha-cpt"],
    domain,
    difficulty: 1,
    stem: `Stem ${id}`,
    choices: [
      { id: "a", text: "A" },
      { id: "b", text: "B" },
    ],
    correctChoiceId: "a",
    explanation: "Because.",
    tags: [],
    sources: [],
    reviewStatus: "needs-review",
    version: 1,
  };
}

const PAPER: Question[] = [
  question("q1", "order-of-draw"),
  question("q2", "order-of-draw"),
  question("q3", "complications"),
  question("q4", "complications"),
];

describe("isCorrect", () => {
  it("treats an unanswered question as incorrect", () => {
    expect(isCorrect(PAPER[0]!, null)).toBe(false);
  });

  it("matches on choice id", () => {
    expect(isCorrect(PAPER[0]!, "a")).toBe(true);
    expect(isCorrect(PAPER[0]!, "b")).toBe(false);
  });
});

describe("scoreAnswers", () => {
  it("counts correct, incorrect, and unanswered separately", () => {
    const breakdown = scoreAnswers(PAPER, { q1: "a", q2: "b", q3: "a" });
    expect(breakdown.total).toBe(4);
    expect(breakdown.correct).toBe(2);
    expect(breakdown.incorrect).toBe(1);
    expect(breakdown.unanswered).toBe(1);
    // The three categories must always account for the whole paper.
    expect(
      breakdown.correct + breakdown.incorrect + breakdown.unanswered,
    ).toBe(breakdown.total);
  });

  it("counts unanswered questions against the percentage", () => {
    // Two correct out of four, one of which was left blank: 50%, not 66%.
    const breakdown = scoreAnswers(PAPER, { q1: "a", q2: "a", q3: "b" });
    expect(breakdown.percent).toBeCloseTo(0.5, 10);
  });

  it("breaks the score down by domain", () => {
    const breakdown = scoreAnswers(PAPER, { q1: "a", q2: "b", q3: "a", q4: "a" });
    expect(breakdown.byDomain["order-of-draw"]).toEqual({ total: 2, correct: 1 });
    expect(breakdown.byDomain["complications"]).toEqual({ total: 2, correct: 2 });
  });

  it("handles an empty paper without dividing by zero", () => {
    const breakdown = scoreAnswers([], {});
    expect(breakdown.percent).toBe(0);
    expect(breakdown.total).toBe(0);
  });
});

describe("buildAttempts", () => {
  it("records one attempt per answered question and skips blanks", () => {
    const attempts = buildAttempts(PAPER, { q1: "a", q3: "b" }, {
      sessionId: "s1",
      sessionKind: "mock",
      at: "2026-01-01T09:00:00.000Z",
    });

    expect(attempts).toHaveLength(2);
    expect(attempts[0]).toMatchObject({
      questionId: "q1",
      correct: true,
      sessionKind: "mock",
    });
    expect(attempts[1]).toMatchObject({ questionId: "q3", correct: false });
  });
});

describe("longestCorrectRun", () => {
  it("returns zero when nothing is correct", () => {
    expect(
      longestCorrectRun([
        { question: PAPER[0]!, choiceId: "b", correct: false },
        { question: PAPER[1]!, choiceId: "b", correct: false },
      ]),
    ).toBe(0);
  });

  it("finds the longest run, not the final one", () => {
    const results = [true, true, true, false, true].map((correct, index) => ({
      question: PAPER[index % PAPER.length]!,
      choiceId: "a",
      correct,
    }));
    expect(longestCorrectRun(results)).toBe(3);
  });
});
