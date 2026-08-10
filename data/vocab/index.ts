import type { VocabCategoryId, VocabTerm } from "@/types/vocab";
import { WORD_PART_TERMS } from "./terms/wordParts";
import { BLOOD_COMPOSITION_TERMS } from "./terms/bloodComposition";
import { TUBE_ADDITIVE_TERMS } from "./terms/tubeAdditives";
import { HEMATOLOGY_CONDITION_TERMS } from "./terms/hematologyConditions";
import { VASCULAR_ANATOMY_TERMS } from "./terms/vascularAnatomy";
import { PROCEDURE_TERMS } from "./terms/procedureEquipment";
import { COMPLICATION_TERMS } from "./terms/complications";
import { SPECIMEN_HANDLING_TERMS } from "./terms/specimenHandling";
import { LAB_TEST_TERMS } from "./terms/labTests";
import { SAFETY_TERMS } from "./terms/safetyCompliance";

/**
 * The vocabulary bank.
 *
 * Original definitions written for this platform. Nothing here is copied from
 * a textbook, a glossary, or a commercial study set; where a term has a
 * standard technical meaning, it is stated in our own words at the level a
 * phlebotomy student needs it.
 */
export const VOCAB_TERMS: VocabTerm[] = [
  ...WORD_PART_TERMS,
  ...BLOOD_COMPOSITION_TERMS,
  ...TUBE_ADDITIVE_TERMS,
  ...HEMATOLOGY_CONDITION_TERMS,
  ...VASCULAR_ANATOMY_TERMS,
  ...PROCEDURE_TERMS,
  ...COMPLICATION_TERMS,
  ...SPECIMEN_HANDLING_TERMS,
  ...LAB_TEST_TERMS,
  ...SAFETY_TERMS,
];

const TERM_MAP = new Map(VOCAB_TERMS.map((term) => [term.id, term]));

export function findVocabTerm(id: string): VocabTerm | undefined {
  return TERM_MAP.get(id);
}

/** Resolves ids to terms, silently dropping ids that no longer exist. */
export function resolveVocabTerms(ids: string[]): VocabTerm[] {
  return ids
    .map((id) => TERM_MAP.get(id))
    .filter((term): term is VocabTerm => term !== undefined);
}

export function getTermsByCategory(category: VocabCategoryId): VocabTerm[] {
  return VOCAB_TERMS.filter((term) => term.category === category);
}

export function getTermsByTag(tag: string): VocabTerm[] {
  return VOCAB_TERMS.filter((term) => term.tags.includes(tag));
}

export function countTermsByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const term of VOCAB_TERMS) {
    counts[term.category] = (counts[term.category] ?? 0) + 1;
  }
  return counts;
}

export type VocabIntegrityIssue = {
  termId: string;
  problem: string;
};

/**
 * Structural checks over the vocabulary bank.
 *
 * Run as a test rather than at import time. Two of these matter more than the
 * rest: duplicate definitions would make a multiple-choice item unanswerable,
 * and a dangling related-term id would render a link to nothing.
 */
export function checkVocabIntegrity(
  terms: VocabTerm[] = VOCAB_TERMS,
): VocabIntegrityIssue[] {
  const issues: VocabIntegrityIssue[] = [];
  const ids = new Set<string>();
  const definitions = new Map<string, string>();
  const displayTerms = new Map<string, string>();
  const knownIds = new Set(terms.map((term) => term.id));

  for (const term of terms) {
    if (ids.has(term.id)) {
      issues.push({ termId: term.id, problem: "duplicate id" });
    }
    ids.add(term.id);

    if (term.term.trim().length === 0) {
      issues.push({ termId: term.id, problem: "empty term" });
    }

    if (term.definition.trim().length < 15) {
      issues.push({ termId: term.id, problem: "definition too short" });
    }

    if (!term.definition.trim().endsWith(".")) {
      issues.push({ termId: term.id, problem: "definition is not a sentence" });
    }

    if (term.sources.length === 0) {
      issues.push({ termId: term.id, problem: "no source references" });
    }

    const definitionKey = normalizeKey(term.definition);
    const duplicateDefinition = definitions.get(definitionKey);
    if (duplicateDefinition) {
      issues.push({
        termId: term.id,
        problem: `definition duplicates "${duplicateDefinition}"`,
      });
    }
    definitions.set(definitionKey, term.id);

    const termKey = normalizeKey(term.term);
    const duplicateTerm = displayTerms.get(termKey);
    if (duplicateTerm) {
      issues.push({
        termId: term.id,
        problem: `term name duplicates "${duplicateTerm}"`,
      });
    }
    displayTerms.set(termKey, term.id);

    for (const alias of term.aliases ?? []) {
      if (normalizeKey(alias) === termKey) {
        issues.push({
          termId: term.id,
          problem: `alias "${alias}" repeats the term itself`,
        });
      }
    }

    for (const relatedId of [
      ...(term.relatedTermIds ?? []),
      ...(term.confusableWithIds ?? []),
    ]) {
      if (relatedId === term.id) {
        issues.push({ termId: term.id, problem: "references itself" });
      }
      if (!knownIds.has(relatedId)) {
        issues.push({
          termId: term.id,
          problem: `references unknown term "${relatedId}"`,
        });
      }
    }
  }

  return issues;
}

function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Review-status tally, surfaced on the methodology page. */
export function getVocabReviewStatusSummary(
  terms: VocabTerm[] = VOCAB_TERMS,
): Record<string, number> {
  const summary: Record<string, number> = {};
  for (const term of terms) {
    summary[term.reviewStatus] = (summary[term.reviewStatus] ?? 0) + 1;
  }
  return summary;
}
