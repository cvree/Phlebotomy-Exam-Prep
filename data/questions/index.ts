import type { CertificationId, DomainId, Question } from "@/types/content";
import { SAFETY_QUESTIONS } from "./safety";
import { PATIENT_ID_QUESTIONS } from "./patientIdentification";
import { PATIENT_PREP_QUESTIONS } from "./patientPreparation";
import { ANATOMY_QUESTIONS } from "./anatomy";
import { TECHNIQUE_QUESTIONS } from "./technique";
import { ORDER_OF_DRAW_QUESTIONS } from "./orderOfDraw";
import { SPECIMEN_HANDLING_QUESTIONS } from "./specimenHandling";
import { COMPLICATIONS_QUESTIONS } from "./complications";
import { SPECIAL_COLLECTIONS_QUESTIONS } from "./specialCollections";
import { CALIFORNIA_QUESTIONS } from "./californiaRequirements";

/**
 * The question bank.
 *
 * Every item here is an original, certification-style practice question
 * written for this platform. None of it is taken from, reconstructed from, or
 * intended to resemble any real certification exam.
 */
export const QUESTIONS: Question[] = [
  ...SAFETY_QUESTIONS,
  ...PATIENT_ID_QUESTIONS,
  ...PATIENT_PREP_QUESTIONS,
  ...ANATOMY_QUESTIONS,
  ...TECHNIQUE_QUESTIONS,
  ...ORDER_OF_DRAW_QUESTIONS,
  ...SPECIMEN_HANDLING_QUESTIONS,
  ...COMPLICATIONS_QUESTIONS,
  ...SPECIAL_COLLECTIONS_QUESTIONS,
  ...CALIFORNIA_QUESTIONS,
];

const QUESTION_MAP = new Map(QUESTIONS.map((question) => [question.id, question]));

export function findQuestion(id: string): Question | undefined {
  return QUESTION_MAP.get(id);
}

/** Resolves ids to questions, silently dropping ids that no longer exist. */
export function resolveQuestions(ids: string[]): Question[] {
  return ids
    .map((id) => QUESTION_MAP.get(id))
    .filter((question): question is Question => question !== undefined);
}

export function getQuestionsForCertification(
  certificationId: CertificationId,
): Question[] {
  return QUESTIONS.filter((question) =>
    question.certifications.includes(certificationId),
  );
}

export function countQuestionsByDomain(
  certificationId: CertificationId,
): Record<DomainId, number> {
  const counts = {} as Record<DomainId, number>;
  for (const question of getQuestionsForCertification(certificationId)) {
    counts[question.domain] = (counts[question.domain] ?? 0) + 1;
  }
  return counts;
}

export type BankIntegrityIssue = {
  questionId: string;
  problem: string;
};

/**
 * Structural checks over the bank.
 *
 * Run as a test rather than at import time, so a content mistake fails CI
 * loudly instead of breaking the app for a student mid-session.
 */
export function checkBankIntegrity(
  questions: Question[] = QUESTIONS,
): BankIntegrityIssue[] {
  const issues: BankIntegrityIssue[] = [];
  const seen = new Set<string>();

  for (const question of questions) {
    if (seen.has(question.id)) {
      issues.push({ questionId: question.id, problem: "duplicate id" });
    }
    seen.add(question.id);

    if (question.choices.length < 3) {
      issues.push({
        questionId: question.id,
        problem: `only ${question.choices.length} choices`,
      });
    }

    const choiceIds = new Set(question.choices.map((choice) => choice.id));
    if (choiceIds.size !== question.choices.length) {
      issues.push({ questionId: question.id, problem: "duplicate choice ids" });
    }

    if (!choiceIds.has(question.correctChoiceId)) {
      issues.push({
        questionId: question.id,
        problem: "correctChoiceId does not match any choice",
      });
    }

    if (question.explanation.trim().length < 40) {
      issues.push({ questionId: question.id, problem: "explanation too short" });
    }

    if (question.sources.length === 0) {
      issues.push({ questionId: question.id, problem: "no source references" });
    }

    if (question.certifications.length === 0) {
      issues.push({ questionId: question.id, problem: "no certifications" });
    }

    for (const key of Object.keys(question.choiceExplanations ?? {})) {
      if (!choiceIds.has(key)) {
        issues.push({
          questionId: question.id,
          problem: `choiceExplanations references unknown choice "${key}"`,
        });
      }
      if (key === question.correctChoiceId) {
        issues.push({
          questionId: question.id,
          problem: "choiceExplanations should describe distractors, not the key",
        });
      }
    }
  }

  return issues;
}

/** Review-status tally, surfaced on the methodology page. */
export function getReviewStatusSummary(
  questions: Question[] = QUESTIONS,
): Record<string, number> {
  const summary: Record<string, number> = {};
  for (const question of questions) {
    summary[question.reviewStatus] = (summary[question.reviewStatus] ?? 0) + 1;
  }
  return summary;
}
