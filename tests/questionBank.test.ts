import { describe, expect, it } from "vitest";
import {
  QUESTIONS,
  checkBankIntegrity,
  countQuestionsByDomain,
  getQuestionsForCertification,
  resolveQuestions,
} from "@/data/questions";
import { DOMAIN_IDS } from "@/data/certifications/domains";
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
