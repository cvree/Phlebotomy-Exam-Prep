import { describe, expect, it } from "vitest";
import {
  allocateByRank,
  buildMockExam,
  createRandom,
  recentMockQuestionIds,
  selectQuestions,
  shuffle,
} from "@/lib/scoring/selection";
import { QUESTIONS, getQuestionsForCertification } from "@/data/questions";
import { calculateAllMastery } from "@/lib/progress/mastery";
import { MOCK_EXAM_FORMS, NHA_CPT, getMockExamForm } from "@/data/certifications";
import type { MockResult } from "@/types/study";
import type { StoredProgress } from "@/lib/storage/schema";
import { attemptsFor, emptyProgress, progressWith } from "./helpers";

function mockResultWith(questionIds: string[], id = "m1"): MockResult {
  return {
    id,
    certificationId: "nha-cpt",
    questionIds,
    answers: {},
    flagged: [],
    total: questionIds.length,
    correct: 0,
    incorrect: 0,
    unanswered: questionIds.length,
    byDomain: {},
    startedAt: "2026-01-01T09:00:00.000Z",
    completedAt: "2026-01-01T10:00:00.000Z",
    durationSeconds: 3600,
    secondsUsed: 3600,
  };
}

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

  it("builds every published mock exam form at its full length", () => {
    for (const form of MOCK_EXAM_FORMS) {
      const paper = buildMockExam("nha-cpt", form.questionCount, 7);
      expect(paper, `form ${form.id}`).toHaveLength(form.questionCount);
      expect(new Set(paper.map((q) => q.id)).size).toBe(form.questionCount);
      // Even the longest paper must still reach every study area.
      expect(new Set(paper.map((q) => q.domain)).size).toBe(10);
    }
  });

  it("prefers questions not seen on a recent paper", () => {
    const first = buildMockExam("nha-cpt", 50, 21);
    const second = buildMockExam("nha-cpt", 50, 22, {
      recentQuestionIds: first.map((q) => q.id),
    });

    const repeated = second.filter((q) =>
      first.some((earlier) => earlier.id === q.id),
    );
    expect(second).toHaveLength(50);
    expect(repeated).toEqual([]);
  });

  it("still returns a full-length paper when fresh questions run out", () => {
    // Every question already seen: freshness must never shorten the paper.
    const everything = getQuestionsForCertification("nha-cpt").map((q) => q.id);
    const paper = buildMockExam("nha-cpt", 50, 23, {
      recentQuestionIds: everything,
    });

    expect(paper).toHaveLength(50);
    expect(new Set(paper.map((q) => q.id)).size).toBe(50);
  });

  it("gives three consecutive full-length papers with no repeated question", () => {
    // The bank has to be deep enough in *every* area to do this, so this test
    // fails if a domain is thinned below three full-length papers' worth.
    const first = buildMockExam("nha-cpt", 100, 31);
    const second = buildMockExam("nha-cpt", 100, 32, {
      recentQuestionIds: first.map((q) => q.id),
    });
    const third = buildMockExam("nha-cpt", 100, 33, {
      recentQuestionIds: [...first, ...second].map((q) => q.id),
    });

    const seen = new Set([...first, ...second, ...third].map((q) => q.id));
    expect(seen.size).toBe(300);
  });
});

describe("recentMockQuestionIds", () => {
  it("collects ids from the most recent papers only", () => {
    const progress: StoredProgress = {
      ...emptyProgress(),
      mockResults: [
        mockResultWith(["old-1"], "m0"),
        mockResultWith(["a-1"], "m1"),
        mockResultWith(["b-1"], "m2"),
        mockResultWith(["c-1"], "m3"),
      ],
    };

    expect(recentMockQuestionIds(progress, 3)).toEqual(["a-1", "b-1", "c-1"]);
  });

  it("returns nothing for a student who has never sat a mock exam", () => {
    expect(recentMockQuestionIds(emptyProgress())).toEqual([]);
  });
});

describe("getMockExamForm", () => {
  it("returns the requested form", () => {
    expect(getMockExamForm(NHA_CPT, "full").questionCount).toBe(100);
    expect(getMockExamForm(NHA_CPT, "quick").questionCount).toBe(25);
  });

  it("falls back to the default form for a missing or unknown id", () => {
    const fallback = getMockExamForm(NHA_CPT, undefined);
    expect(fallback.id).toBe(NHA_CPT.mockExam.defaultFormId);
    expect(getMockExamForm(NHA_CPT, "not-a-form").id).toBe(fallback.id);
  });

  it("defines a default that actually exists among the forms", () => {
    const ids = NHA_CPT.mockExam.forms.map((form) => form.id);
    expect(ids).toContain(NHA_CPT.mockExam.defaultFormId);
  });
});

describe("allocateByRank", () => {
  it("weights the first rank most heavily and sums to the total", () => {
    expect(allocateByRank(3, 12)).toEqual([6, 4, 2]);
  });

  it("always sums to the requested total, including awkward splits", () => {
    for (const total of [7, 10, 13, 25, 50]) {
      for (const count of [1, 2, 3]) {
        const quotas = allocateByRank(count, total);
        expect(quotas).toHaveLength(count);
        expect(quotas.reduce((sum, value) => sum + value, 0)).toBe(total);
      }
    }
  });

  it("returns nothing when there is nothing to allocate", () => {
    expect(allocateByRank(0, 10)).toEqual([]);
    expect(allocateByRank(3, 0)).toEqual([]);
  });
});
