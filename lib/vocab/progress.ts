import type {
  VocabCardState,
  VocabSet,
  VocabSetProgress,
  VocabTerm,
} from "@/types/vocab";
import { VOCAB_TERMS } from "@/data/vocab";
import { bucketTerms, countDue } from "./scheduler";

/**
 * Rollups over vocabulary card state.
 *
 * Pure functions over the stored card map, so the hub, the set cards, and the
 * progress dashboard all read the same numbers from the same place instead of
 * each computing their own slightly different version.
 */

/**
 * Set completion, weighted rather than binary.
 *
 * A term the student has seen once is not worth nothing, and it is not worth
 * the same as one they have retained for three weeks. Partial credit keeps the
 * bar moving on day one, which is when a student is most likely to give up.
 */
const WEIGHTS = {
  seen: 0.35,
  familiar: 0.7,
  mastered: 1,
} as const;

export function setProgress(
  set: VocabSet,
  terms: VocabTerm[],
  cards: Record<string, VocabCardState>,
  now: Date,
): VocabSetProgress {
  let seen = 0;
  let familiar = 0;
  let mastered = 0;
  let weighted = 0;

  for (const term of terms) {
    const card = cards[term.id];
    if (!card) continue;

    seen += 1;

    if (card.stage === "mastered") {
      mastered += 1;
      familiar += 1;
      weighted += WEIGHTS.mastered;
    } else if (card.stage === "review") {
      familiar += 1;
      weighted += WEIGHTS.familiar;
    } else {
      weighted += WEIGHTS.seen;
    }
  }

  const total = terms.length;

  return {
    setId: set.id,
    total,
    seen,
    familiar,
    mastered,
    due: countDue(terms, cards, now),
    completion: total === 0 ? 0 : weighted / total,
  };
}

export type VocabOverview = {
  /** Terms in the whole bank. */
  totalTerms: number;
  studied: number;
  mastered: number;
  /** Due right now, across everything. */
  due: number;
  /** Terms never shown. */
  untouched: number;
  /** 0–1 across the whole bank. */
  completion: number;
};

export function vocabOverview(
  cards: Record<string, VocabCardState>,
  now: Date,
  terms: VocabTerm[] = VOCAB_TERMS,
): VocabOverview {
  const buckets = bucketTerms(terms, cards, now);
  let mastered = 0;
  let weighted = 0;
  let studied = 0;

  for (const term of terms) {
    const card = cards[term.id];
    if (!card) continue;
    studied += 1;
    if (card.stage === "mastered") {
      mastered += 1;
      weighted += WEIGHTS.mastered;
    } else if (card.stage === "review") {
      weighted += WEIGHTS.familiar;
    } else {
      weighted += WEIGHTS.seen;
    }
  }

  return {
    totalTerms: terms.length,
    studied,
    mastered,
    due: buckets.learning.length + buckets.review.length,
    untouched: buckets.fresh.length,
    completion: terms.length === 0 ? 0 : weighted / terms.length,
  };
}

/**
 * Terms the student keeps getting wrong.
 *
 * Ranked by lapses first, then by accuracy — a term forgotten three times
 * after being learned is a worse problem than one that has simply been missed
 * on both of its two attempts.
 */
export function troubleTerms(
  cards: Record<string, VocabCardState>,
  limit = 10,
  terms: VocabTerm[] = VOCAB_TERMS,
): { term: VocabTerm; card: VocabCardState; accuracy: number }[] {
  const byId = new Map(terms.map((term) => [term.id, term]));

  return Object.values(cards)
    .filter((card) => card.reviews >= 2 && card.correct < card.reviews)
    .map((card) => ({
      card,
      term: byId.get(card.termId),
      accuracy: card.reviews === 0 ? 0 : card.correct / card.reviews,
    }))
    .filter(
      (entry): entry is { term: VocabTerm; card: VocabCardState; accuracy: number } =>
        entry.term !== undefined,
    )
    .sort((a, b) => {
      if (b.card.lapses !== a.card.lapses) return b.card.lapses - a.card.lapses;
      return a.accuracy - b.accuracy;
    })
    .slice(0, limit);
}
