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

export type OrderOfDrawModeConfig = {
  id: OrderOfDrawMode;
  name: string;
  /** Compact label for the mode switcher. */
  shortName: string;
  description: string;
  /** One line of instruction shown above the board. */
  instruction: string;
  /** Items graded in one round. */
  roundLength: number;
  available: boolean;
};

export const ORDER_OF_DRAW_MODES: OrderOfDrawModeConfig[] = [
  {
    id: "arrange",
    name: "Arrange the sequence",
    shortName: "Arrange",
    description: "Put all six positions in the correct collection order.",
    instruction:
      "Drag the cards into the order they are drawn, or use the grip and " +
      "arrow keys. Tap two cards to swap them.",
    roundLength: CLSI_ORDER_OF_DRAW.steps.length,
    available: true,
  },
  {
    id: "what-comes-next",
    name: "What comes next?",
    shortName: "What next",
    description: "Given a partial sequence, pick the tube that follows.",
    instruction:
      "A draw is part-way through. Choose what goes on the needle next.",
    roundLength: CLSI_ORDER_OF_DRAW.steps.length,
    available: true,
  },
  {
    id: "find-misplaced",
    name: "Find the misplaced tube",
    shortName: "Spot the error",
    description: "One tube is out of position. Spot it.",
    instruction:
      "Exactly one card sits in the wrong place. Tap the one that does not belong.",
    roundLength: 5,
    available: true,
  },
  {
    id: "complete-sequence",
    name: "Complete the sequence",
    shortName: "Fill the gaps",
    description: "Fill the gaps in a partially built sequence.",
    instruction:
      "Three positions have been left empty. Put each tube back where it belongs.",
    roundLength: 3,
    available: true,
  },
];

export function getOrderOfDrawMode(id: OrderOfDrawMode): OrderOfDrawModeConfig {
  const mode = ORDER_OF_DRAW_MODES.find((entry) => entry.id === id);
  if (!mode) {
    throw new Error(`Unknown order of draw mode: ${id}`);
  }
  return mode;
}

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

// --- Mode: what comes next? ------------------------------------------------

const NEXT_OPTION_COUNT = 4;

export type NextInSequenceItem = {
  id: string;
  /** Positions already collected, in order. Empty for the opening question. */
  drawn: DrillCard[];
  answer: DrillCard;
  /** The answer plus distractors, shuffled. */
  options: DrillCard[];
  prompt: string;
};

/**
 * Builds one question per position: "this much has been drawn — what is next?"
 *
 * Distractors are preferentially drawn from tubes still in the tray, because
 * "which of the ones I have not collected yet comes first" is the decision a
 * phlebotomist actually makes. Near the end of the sequence there are not
 * enough left, so already-drawn tubes top the options up.
 */
export function buildNextInSequence(
  seed: number,
  sequence: OrderOfDrawSequence = CLSI_ORDER_OF_DRAW,
): NextInSequenceItem[] {
  const cards = buildDrillCards(sequence);
  const order = shuffle(cards, createRandom(seed));

  return order.map((answer, index) => {
    const drawn = cards.filter((card) => card.position < answer.position);
    const remaining = cards.filter((card) => card.position > answer.position);
    const pool = [
      ...shuffle(remaining, createRandom(seed + index * 31 + 7)),
      ...shuffle(drawn, createRandom(seed + index * 53 + 11)),
    ];
    const distractors = pool.slice(0, NEXT_OPTION_COUNT - 1);

    return {
      id: `next-${answer.position}`,
      drawn,
      answer,
      options: shuffle(
        [answer, ...distractors],
        createRandom(seed + index * 17 + 3),
      ),
      prompt:
        drawn.length === 0
          ? "Nothing has been collected yet. What goes on the needle first?"
          : `${drawn.length} position${drawn.length === 1 ? "" : "s"} collected. What is drawn next?`,
    };
  });
}

// --- Mode: find the misplaced tube -----------------------------------------

export type MisplacedItem = {
  id: string;
  /** The sequence as presented, with exactly one card out of place. */
  arrangement: DrillCard[];
  /** Index within `arrangement` of the card that does not belong there. */
  misplacedIndex: number;
  /** Where that card should have been, 1-based. */
  belongsAt: number;
};

/**
 * Builds arrangements with a single displaced card.
 *
 * The displacement is always at least two slots. A one-slot displacement is
 * ambiguous — in `2 1 3 4 5 6` either of the first two cards can be called the
 * misplaced one — and a puzzle with two defensible answers teaches nothing.
 */
export function buildMisplacedRound(
  count: number,
  seed: number,
  sequence: OrderOfDrawSequence = CLSI_ORDER_OF_DRAW,
): MisplacedItem[] {
  const cards = buildDrillCards(sequence);
  const items: MisplacedItem[] = [];
  const seen = new Set<string>();

  for (let attempt = 0; items.length < count && attempt < count * 20; attempt += 1) {
    const random = createRandom(seed + attempt * 101);
    const from = Math.floor(random() * cards.length);
    const targets = cards
      .map((_, index) => index)
      .filter((index) => Math.abs(index - from) >= 2);
    const to = targets[Math.floor(random() * targets.length)];
    if (to === undefined) continue;

    const arrangement = moveCard(cards, from, to);
    const key = arrangement.map((card) => card.position).join("-");
    if (seen.has(key)) continue;
    seen.add(key);

    const moved = cards[from];
    if (!moved) continue;

    items.push({
      id: `misplaced-${items.length}`,
      arrangement,
      misplacedIndex: to,
      belongsAt: moved.position,
    });
  }

  return items;
}

/**
 * True when removing `index` leaves the rest of the arrangement in ascending
 * order. The property that makes a misplaced-tube puzzle answerable: it must
 * hold for exactly one card.
 */
export function isSoleOutlier(arrangement: DrillCard[], index: number): boolean {
  const rest = arrangement.filter((_, i) => i !== index);
  return rest.every(
    (card, i) => i === 0 || card.position > (rest[i - 1]?.position ?? 0),
  );
}

// --- Mode: complete the sequence -------------------------------------------

export type CompleteSequenceItem = {
  id: string;
  /** The full sequence, with `null` where a card has been lifted out. */
  slots: (DrillCard | null)[];
  /** The lifted cards, shuffled, for the student to put back. */
  bank: DrillCard[];
  /** Indexes of the empty slots, ascending. */
  gaps: number[];
};

export function buildCompleteSequence(
  gapCount: number,
  seed: number,
  sequence: OrderOfDrawSequence = CLSI_ORDER_OF_DRAW,
): CompleteSequenceItem {
  const cards = buildDrillCards(sequence);
  const safeCount = Math.max(1, Math.min(gapCount, cards.length - 1));
  const gaps = shuffle(
    cards.map((_, index) => index),
    createRandom(seed),
  )
    .slice(0, safeCount)
    .sort((a, b) => a - b);

  const gapSet = new Set(gaps);

  return {
    id: `complete-${seed}`,
    slots: cards.map((card, index) => (gapSet.has(index) ? null : card)),
    bank: shuffle(
      gaps.map((index) => cards[index]).filter((card): card is DrillCard => Boolean(card)),
      createRandom(seed + 991),
    ),
    gaps,
  };
}

export type PlacementResult = {
  /** Slot index the card was placed in. */
  index: number;
  card: DrillCard | null;
  correct: boolean;
};

export type CompleteSequenceGrade = {
  results: PlacementResult[];
  total: number;
  correct: number;
  accuracy: number;
  perfect: boolean;
};

/** Grades only the gaps — the pre-filled slots were never in question. */
export function gradeCompleteSequence(
  item: CompleteSequenceItem,
  filled: (DrillCard | null)[],
): CompleteSequenceGrade {
  const results: PlacementResult[] = item.gaps.map((index) => {
    const card = filled[index] ?? null;
    return { index, card, correct: card?.position === index + 1 };
  });
  const correct = results.filter((result) => result.correct).length;

  return {
    results,
    total: results.length,
    correct,
    accuracy: results.length === 0 ? 0 : correct / results.length,
    perfect: results.length > 0 && correct === results.length,
  };
}

/** Shared shape for the choose-one modes, so the drill host can grade both. */
export type ChoiceRoundGrade = {
  total: number;
  correct: number;
  accuracy: number;
  perfect: boolean;
};

export function gradeChoiceRound(
  total: number,
  correct: number,
): ChoiceRoundGrade {
  return {
    total,
    correct,
    accuracy: total === 0 ? 0 : correct / total,
    perfect: total > 0 && correct === total,
  };
}
