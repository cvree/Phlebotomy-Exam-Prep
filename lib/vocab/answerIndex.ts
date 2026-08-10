import type { VocabTerm } from "@/types/vocab";
import { VOCAB_TERMS } from "@/data/vocab";
import {
  acceptedAnswers,
  gradeTypedAnswer,
  normalizeAnswer,
  type MatchResult,
} from "./matching";

/**
 * Every string that names some term in the bank.
 *
 * Built once at module load. It is what lets the grader tell a misspelling
 * apart from a wrong answer: "thrombocytopena" is nowhere in this set and is
 * accepted as a near-miss, while "radial artery" is in it and is therefore
 * never accepted as a near-miss of "brachial artery", however few edits apart
 * they are.
 *
 * This lives beside the grader rather than inside it so that `matching.ts`
 * stays a pure string library with no dependency on the content bank.
 */
export const BANK_ANSWERS: ReadonlySet<string> = new Set(
  VOCAB_TERMS.flatMap((term) =>
    acceptedAnswers(term).map((answer) => normalizeAnswer(answer)),
  ),
);

/** Grades a typed answer with the whole bank as context. Use this in the UI. */
export function gradeAgainstBank(input: string, term: VocabTerm): MatchResult {
  return gradeTypedAnswer(input, term, { reserved: BANK_ANSWERS });
}
