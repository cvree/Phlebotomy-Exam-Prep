import { describe, expect, it } from "vitest";
import {
  QUESTIONS,
  checkBankIntegrity,
  countQuestionsByDomain,
  getQuestionsForCertification,
  resolveQuestions,
} from "@/data/questions";
import { DOMAINS, DOMAIN_IDS } from "@/data/certifications/domains";
import { MOCK_EXAM_FORMS } from "@/data/certifications";
import { TUBES } from "@/data/tubes/tubes";
import { CLSI_ORDER_OF_DRAW } from "@/data/study/orderOfDraw";

describe("question bank integrity", () => {
  it("has no structural problems", () => {
    expect(checkBankIntegrity()).toEqual([]);
  });

  it("assigns every question to a known domain", () => {
    const unknown = QUESTIONS.filter(
      (question) => !DOMAIN_IDS.includes(question.domain),
    );
    expect(unknown).toEqual([]);
  });

  it("covers every domain with enough questions for a ten-question session", () => {
    const counts = countQuestionsByDomain("nha-cpt");
    for (const domain of DOMAIN_IDS) {
      expect(counts[domain] ?? 0).toBeGreaterThanOrEqual(10);
    }
  });

  it("holds enough questions in every area for three full-length papers", () => {
    // A student sitting repeated mock exams should meet new material each
    // time. The longest form allocates by `practiceWeight`, so each area needs
    // roughly three papers' worth of its own share before repeats begin.
    const longest = Math.max(
      ...MOCK_EXAM_FORMS.map((form) => form.questionCount),
    );
    const weightTotal = DOMAINS.reduce(
      (sum, domain) => sum + domain.practiceWeight,
      0,
    );
    const counts = countQuestionsByDomain("nha-cpt");

    for (const domain of DOMAINS) {
      const perPaper = Math.ceil(
        (domain.practiceWeight / weightTotal) * longest,
      );
      expect(
        counts[domain.id] ?? 0,
        `${domain.id} needs ${perPaper * 3} for three full papers`,
      ).toBeGreaterThanOrEqual(perPaper * 3);
    }
  });

  it("writes distractor explanations for the great majority of questions", () => {
    // A wrong answer without a reason is a score, not feedback. This is a
    // floor rather than a requirement on every item, because a handful of
    // recall questions have distractors that need no explaining.
    const withWhy = QUESTIONS.filter(
      (question) => Object.keys(question.choiceExplanations ?? {}).length > 0,
    );
    expect(withWhy.length / QUESTIONS.length).toBeGreaterThan(0.9);
  });

  it("gives every question four answer choices", () => {
    const wrongCount = QUESTIONS.filter(
      (question) => question.choices.length !== 4,
    );
    expect(wrongCount.map((question) => question.id)).toEqual([]);
  });

  it("spreads questions across all three difficulty levels in every domain", () => {
    for (const domain of DOMAIN_IDS) {
      const inDomain = QUESTIONS.filter((question) => question.domain === domain);
      const levels = new Set(inDomain.map((question) => question.difficulty));
      expect(levels.size, `${domain} difficulty spread`).toBeGreaterThanOrEqual(
        2,
      );
    }
  });

  it("marks all clinical content as awaiting review rather than reviewed", () => {
    // A guard against content silently being promoted to "reviewed" without a
    // human actually reviewing it.
    const claimingReview = QUESTIONS.filter(
      (question) =>
        question.reviewStatus === "reviewed" ||
        question.reviewStatus === "published",
    );
    expect(claimingReview.map((question) => question.id)).toEqual([]);
  });

  it("never labels a question as a real exam question", () => {
    const forbidden = /\b(actual|real|official|leaked)\s+exam\s+question/i;
    const offenders = QUESTIONS.filter(
      (question) =>
        forbidden.test(question.stem) || forbidden.test(question.explanation),
    );
    expect(offenders).toEqual([]);
  });
});

describe("question lookup", () => {
  it("resolves known ids and drops unknown ones", () => {
    const first = QUESTIONS[0];
    expect(first).toBeDefined();
    const resolved = resolveQuestions([first!.id, "does-not-exist"]);
    expect(resolved).toHaveLength(1);
    expect(resolved[0]?.id).toBe(first!.id);
  });

  it("returns only questions tagged for the requested certification", () => {
    const forNha = getQuestionsForCertification("nha-cpt");
    expect(forNha.length).toBe(QUESTIONS.length);
    expect(getQuestionsForCertification("ascp-pbt")).toHaveLength(0);
  });
});

describe("tube and sequence data", () => {
  it("gives every tube in the order of draw a matching position", () => {
    for (const step of CLSI_ORDER_OF_DRAW.steps) {
      for (const tubeId of step.tubeIds) {
        const tube = TUBES.find((entry) => entry.id === tubeId);
        expect(tube, `missing tube ${tubeId}`).toBeDefined();
        expect(tube?.orderOfDrawPosition).toBe(step.position);
      }
    }
  });

  it("numbers the sequence contiguously from one", () => {
    const positions = CLSI_ORDER_OF_DRAW.steps.map((step) => step.position);
    expect(positions).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("names a color in text for every tube, so nothing depends on color alone", () => {
    for (const tube of TUBES) {
      expect(tube.colorNames.length).toBeGreaterThan(0);
      expect(tube.additive.length).toBeGreaterThan(0);
    }
  });

  it("carries a source reference on every tube", () => {
    for (const tube of TUBES) {
      expect(tube.sources.length).toBeGreaterThan(0);
    }
  });
});
