import type { OrderOfDrawSequence, Tube } from "@/types/content";
import { CLSI_ORDER_OF_DRAW } from "@/data/study/orderOfDraw";
import { getTube } from "@/data/tubes/tubes";
import { createRandom, shuffle } from "@/lib/scoring/selection";

/**
 * Order of Draw drill logic.
 *
 * Kept away from React so the grading rules can be tested directly and reused
 * by future drill modes (what-comes-next, find-the-misplaced-tube, timed) —
 * see `OrderOfDrawMode`.
 */

export type OrderOfDrawMode =
  | "arrange"
  | "what-comes-next"
  | "find-misplaced"
  | "complete-sequence";

export const ORDER_OF_DRAW_MODES: {
  id: OrderOfDrawMode;
  name: string;
  description: string;
  available: boolean;
}[] = [
  {
    id: "arrange",
    name: "Arrange the sequence",
    description: "Put all six positions in the correct collection order.",
    available: true,
  },
  {
    id: "what-comes-next",
    name: "What comes next?",
    description: "Given a partial sequence, pick the tube that follows.",
    available: false,
  },
  {
    id: "find-misplaced",
    name: "Find the misplaced tube",
    description: "One tube is out of position. Spot it.",
    available: false,
  },
  {
    id: "complete-sequence",
    name: "Complete the sequence",
    description: "Fill the gaps in a partially built sequence.",
    available: false,
  },
];

/** One draggable/tappable card in the drill. */
export type DrillCard = {
  /** Matches `OrderOfDrawStep.position`, which is the answer key. */
  stepId: number;
  position: number;
  name: string;
  tubes: Tube[];
  rationale: string;
};

export function buildDrillCards(
  sequence: OrderOfDrawSequence = CLSI_ORDER_OF_DRAW,
): DrillCard[] {
  return sequence.steps.map((step) => ({
    stepId: step.position,
    position: step.position,
    name: step.name,
    tubes: step.tubeIds.map(getTube),
    rationale: step.rationale,
  }));
}

/**
 * Shuffles the cards, guaranteeing the starting order is not already correct.
 *
 * With six cards there is a 1-in-720 chance of shuffling into the answer,
 * which would be a confusing first impression. One reshuffle attempt with a
 * bumped seed removes it.
 */
export function shuffleCards(cards: DrillCard[], seed: number): DrillCard[] {
  const shuffled = shuffle(cards, createRandom(seed));
  if (cards.length > 1 && isCorrectOrder(shuffled)) {
    return shuffle(cards, createRandom(seed + 1));
  }
  return shuffled;
}

export function isCorrectOrder(cards: DrillCard[]): boolean {
  return cards.every((card, index) => card.position === index + 1);
}

export type CardResult = {
  card: DrillCard;
  /** Where the student put it, 1-based. */
  placedAt: number;
  correct: boolean;
};

export type OrderOfDrawResult = {
  results: CardResult[];
  correctCount: number;
  total: number;
  accuracy: number;
  perfect: boolean;
  /** Cards that ended up in the wrong slot, for the feedback list. */
  misplaced: CardResult[];
};

export function gradeOrder(submitted: DrillCard[]): OrderOfDrawResult {
  const results: CardResult[] = submitted.map((card, index) => ({
    card,
    placedAt: index + 1,
    correct: card.position === index + 1,
  }));

  const correctCount = results.filter((result) => result.correct).length;

  return {
    results,
    correctCount,
    total: results.length,
    accuracy: results.length === 0 ? 0 : correctCount / results.length,
    perfect: correctCount === results.length && results.length > 0,
    misplaced: results.filter((result) => !result.correct),
  };
}

/** Moves a card between slots, used by both drag-and-drop and tap-to-move. */
export function moveCard<T>(items: T[], from: number, to: number): T[] {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= items.length ||
    to >= items.length
  ) {
    return items;
  }
  const next = items.slice();
  const [moved] = next.splice(from, 1);
  if (moved === undefined) {
    return items;
  }
  next.splice(to, 0, moved);
  return next;
}

/** Swaps two slots. What the keyboard controls and the tap-two-cards flow use. */
export function swapCards<T>(items: T[], a: number, b: number): T[] {
  if (a === b || a < 0 || b < 0 || a >= items.length || b >= items.length) {
    return items;
  }
  const next = items.slice();
  const first = next[a];
  const second = next[b];
  if (first === undefined || second === undefined) {
    return items;
  }
  next[a] = second;
  next[b] = first;
  return next;
}
