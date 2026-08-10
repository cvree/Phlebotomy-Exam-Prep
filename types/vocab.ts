/**
 * Vocabulary types.
 *
 * A vocabulary term is a *study object*, not a flashcard. The same term is
 * rendered as a flashcard, a multiple-choice item, a typed-recall prompt, a
 * match tile, and a glossary entry — so everything a mode might need to ask
 * about lives on the term, and the modes are projections over it.
 *
 * Clinical facts live here as data and are governed by the same review
 * lifecycle as questions and tubes (`ReviewStatus`).
 */

import type {
  Difficulty,
  DomainId,
  ReviewStatus,
  SourceReference,
} from "./content";

export type VocabCategoryId =
  | "word-parts"
  | "blood-composition"
  | "tube-additives"
  | "hematology-conditions"
  | "vascular-anatomy"
  | "procedure-equipment"
  | "complications"
  | "specimen-handling"
  | "lab-tests"
  | "safety-compliance";

/** One morpheme of a term, e.g. `{ part: "-emia", meaning: "blood condition" }`. */
export type WordPart = {
  part: string;
  meaning: string;
};

/**
 * The structure a term belongs to.
 *
 * This is the "…and what is it a part of?" relationship students are actually
 * tested on: EDTA belongs to the lavender tube; the median cubital vein
 * belongs to the antecubital fossa. It is a first-class field because it is a
 * first-class question type.
 */
export type PartOfRelation = {
  /** Short answer, e.g. "Lavender / purple tube". */
  label: string;
  /** One sentence on the nature of the relationship. */
  detail: string;
};

export type VocabTerm = {
  id: string;
  term: string;
  /**
   * Other spellings and abbreviations that count as the same answer when a
   * student types it. Also used to keep the multiple-choice generator from
   * offering two options that mean the same thing.
   */
  aliases?: string[];
  /** Rough phonetic respelling, e.g. "pol-ee-sy-THEE-mee-uh VAIR-uh". */
  pronunciation?: string;
  category: VocabCategoryId;
  /**
   * The definition. One sentence, self-contained, and short enough to sit on
   * the back of a card — this is the string the student is graded against.
   */
  definition: string;
  /** Optional second paragraph shown on the expanded term view only. */
  detail?: string;
  partOf?: PartOfRelation;
  /** Morphology breakdown. The reason `-emia` words stop needing memorizing. */
  wordParts?: WordPart[];
  /** Why a phlebotomist specifically cares. */
  clinicalRelevance?: string;
  mnemonic?: string;
  /**
   * Terms that are genuinely easy to confuse with this one. Used first when
   * generating distractors, because a plausible wrong answer is what makes a
   * multiple-choice item worth answering.
   */
  confusableWithIds?: string[];
  relatedTermIds?: string[];
  /** Links vocabulary to the same study taxonomy as the question bank. */
  domain?: DomainId;
  difficulty: Difficulty;
  tags: string[];
  sources: SourceReference[];
  reviewStatus: ReviewStatus;
  lastReviewedAt?: string;
  version: number;
};

export type VocabCategory = {
  id: VocabCategoryId;
  name: string;
  shortName: string;
  /** One sentence a student can use to decide whether they need this set. */
  description: string;
  /** Route of a related study guide, when one exists. */
  studyHref?: string;
};

/**
 * A studiable collection of terms.
 *
 * Category sets are generated; curated sets (high-yield, sound-alikes) are
 * declared. Both are the same shape so the set page never branches.
 */
export type VocabSet = {
  id: string;
  name: string;
  /** Shown on the set card. */
  tagline: string;
  description: string;
  kind: "category" | "curated";
  termIds: string[];
  /** Present for category sets. */
  categoryId?: VocabCategoryId;
  studyHref?: string;
};

// --- Spaced repetition -----------------------------------------------------

/**
 * How well a term was recalled.
 *
 * Four grades, matching what students already understand from every other
 * spaced-repetition tool. Modes that only know right/wrong map onto
 * `again`/`good`.
 */
export type VocabGrade = "again" | "hard" | "good" | "easy";

export type VocabStage = "learning" | "review" | "relearning" | "mastered";

/** Per-term scheduling state. Terms never studied have no entry. */
export type VocabCardState = {
  termId: string;
  stage: VocabStage;
  /** Index into the learning steps while `stage` is learning/relearning. */
  step: number;
  /** Consecutive correct recalls. Reset by a lapse. */
  streak: number;
  /** Total gradings. */
  reviews: number;
  correct: number;
  /** Times a graduated card was forgotten. */
  lapses: number;
  /** SM-2 style ease factor, clamped to a sane band. */
  ease: number;
  /** Current scheduling interval in days. Sub-day steps store 0. */
  intervalDays: number;
  /** ISO timestamp the card next becomes due. */
  dueAt: string;
  /** ISO timestamp of the most recent grading. */
  lastReviewedAt: string;
};

export type VocabStudyMode = "flashcards" | "learn" | "write" | "match" | "test";

export type VocabSessionSummary = {
  id: string;
  setId: string;
  mode: VocabStudyMode;
  /** Terms judged in this session. */
  total: number;
  correct: number;
  /** Terms that moved from unseen to seen. */
  newTerms: number;
  startedAt: string;
  completedAt: string;
  durationMs: number;
  /** Match mode only: completion time in milliseconds. */
  matchMs?: number;
};

/** Rolled-up state for one set, used on set cards and the hub. */
export type VocabSetProgress = {
  setId: string;
  total: number;
  /** Terms with any scheduling state. */
  seen: number;
  /** Terms at stage "review" or better. */
  familiar: number;
  mastered: number;
  due: number;
  /** 0–1, mastered-weighted. */
  completion: number;
};
