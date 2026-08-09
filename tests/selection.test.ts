import { describe, expect, it } from "vitest";
import {
  buildMockExam,
  createRandom,
  selectQuestions,
  shuffle,
} from "@/lib/scoring/selection";
import { QUESTIONS, getQuestionsForCertification } from "@/data/questions";
import { calculateAllMastery } from "@/lib/progress/mastery";
import type { StoredProgress } from "@/lib/storage/schema";
import { attemptsFor, emptyProgress, progressWith } from "./helpers";

function contextFor(progress: StoredProgress, seed = 42) {
  return {
    certificationId: "nha-cpt" as const,
    progress,
    mastery: calculateAllMastery(progress),
    seed,
  };
}

describe("createRandom / shuffle", () => {
  it("is deterministic for a given seed", () => {
    const a = shuffle([1, 2, 3, 4, 5, 6, 7, 8], createRandom(7));
    const b = shuffle([1, 2, 3, 4, 5, 6, 7, 8], createRandom(7));
    expect(a).toEqual(b);
  });

  it("produces different orders for different seeds", () => {
    const a = shuffle([1, 2, 3, 4, 5, 6, 7, 8], createRandom(1));
    const b = shuffle([1, 2, 3, 4, 5, 6, 7, 8], createRandom(2));
    expect(a).not.toEqual(b);
  });

  it("preserves every element", () => {
    const input = [1, 2, 3, 4, 5];
    const output = shuffle(input, createRandom(3));
    expect([...output].sort()).toEqual(input);
    // And does not mutate the input.
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("selectQuestions", () => {
  it("returns exactly the requested number of questions", () => {
    const questions = selectQuestions(
      { mode: "quick-10", certificationId: "nha-cpt", questionCount: 10 },
      contextFor(emptyProgress()),
    );
    expect(questions).toHaveLength(10);
  });

  it("never repeats a question inside one session", () => {
    const questions = selectQuestions(
      { mode: "all-domains", certificationId: "nha-cpt", questionCount: 40 },
      contextFor(emptyProgress()),
    );
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
  });

  it("restricts a domain session to that domain", () => {
    const questions = selectQuestions(
      {
        mode: "domain",
        certificationId: "nha-cpt",
        domainId: "order-of-draw",
        questionCount: 10,
      },
      contextFor(emptyProgress()),
    );
    expect(questions).toHaveLength(10);
    expect(questions.every((q) => q.domain === "order-of-draw")).toBe(true);
  });

  it("returns only unseen questions when asked, given enough remain", () => {
    const firstFive = QUESTIONS.slice(0, 5).map((question) => ({
      questionId: question.id,
      domain: question.domain,
      choiceId: "a",
      correct: true,
      at: "2026-01-01T09:00:00.000Z",
      sessionId: "s",
      sessionKind: "practice" as const,
    }));

    const questions = selectQuestions(
      { mode: "unseen", certificationId: "nha-cpt", questionCount: 10 },
      contextFor(progressWith(firstFive)),
    );

    const seenIds = new Set(firstFive.map((attempt) => attempt.questionId));
    expect(questions.every((q) => !seenIds.has(q.id))).toBe(true);
  });

  it("returns only questions whose last answer was wrong in missed mode", () => {
    const wrong = QUESTIONS.slice(0, 8).map((question) => ({
      questionId: question.id,
      domain: question.domain,
      choiceId: "z",
      correct: false,
      at: "2026-01-01T09:00:00.000Z",
      sessionId: "s",
      sessionKind: "practice" as const,
    }));

    const questions = selectQuestions(
      { mode: "missed", certificationId: "nha-cpt", questionCount: 8 },
      contextFor(progressWith(wrong)),
    );

    const missedIds = new Set(wrong.map((attempt) => attempt.questionId));
    expect(questions).toHaveLength(8);
    expect(questions.every((q) => missedIds.has(q.id))).toBe(true);
  });

  it("tops up rather than returning a short session when a filter is too narrow", () => {
    // Only two questions have ever been missed, but fifteen were requested.
    const wrong = QUESTIONS.slice(0, 2).map((question) => ({
      questionId: question.id,
      domain: question.domain,
      choiceId: "z",
      correct: false,
      at: "2026-01-01T09:00:00.000Z",
      sessionId: "s",
      sessionKind: "practice" as const,
    }));

    const questions = selectQuestions(
      { mode: "missed", certificationId: "nha-cpt", questionCount: 15 },
      contextFor(progressWith(wrong)),
    );

    expect(questions).toHaveLength(15);
    expect(new Set(questions.map((q) => q.id)).size).toBe(15);
  });

  it("targets the weakest areas in weak-area mode", () => {
    const progress = progressWith([
      ...attemptsFor({
        domain: "specimen-handling",
        count: 12,
        correctPattern: [false],
      }),
      ...attemptsFor({
        domain: "complications",
        count: 12,
        correctPattern: [false],
      }),
      ...attemptsFor({
        domain: "safety-infection-control",
        count: 20,
        correctPattern: [true],
        distinctQuestions: 11,
      }),
    ]);

    const questions = selectQuestions(
      { mode: "weak-areas", certificationId: "nha-cpt", questionCount: 12 },
      contextFor(progress),
    );

    const weakHits = questions.filter(
      (q) => q.domain === "specimen-handling" || q.domain === "complications",
    );
    expect(weakHits.length).toBeGreaterThanOrEqual(10);
  });

  it("is deterministic for a given seed", () => {
    const config = {
      mode: "quick-10" as const,
      certificationId: "nha-cpt" as const,
      questionCount: 10,
    };
    const a = selectQuestions(config, contextFor(emptyProgress(), 99));
    const b = selectQuestions(config, contextFor(emptyProgress(), 99));
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
  });
});

describe("buildMockExam", () => {
  it("returns exactly the requested number of questions", () => {
    expect(buildMockExam("nha-cpt", 50, 1)).toHaveLength(50);
    expect(buildMockExam("nha-cpt", 25, 2)).toHaveLength(25);
  });

  it("never repeats a question", () => {
    const paper = buildMockExam("nha-cpt", 50, 3);
    expect(new Set(paper.map((q) => q.id)).size).toBe(50);
  });

  it("spreads questions across every domain", () => {
    const paper = buildMockExam("nha-cpt", 50, 4);
    const domains = new Set(paper.map((q) => q.domain));
    expect(domains.size).toBe(10);
  });

  it("caps at the bank size when more are requested than exist", () => {
    const available = getQuestionsForCertification("nha-cpt").length;
    const paper = buildMockExam("nha-cpt", available + 500, 5);
    expect(paper.length).toBe(available);
  });

  it("is deterministic for a given seed", () => {
    expect(buildMockExam("nha-cpt", 30, 11).map((q) => q.id)).toEqual(
      buildMockExam("nha-cpt", 30, 11).map((q) => q.id),
    );
  });
});
