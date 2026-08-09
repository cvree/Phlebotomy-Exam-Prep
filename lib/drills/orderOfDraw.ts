import type { OrderOfDrawSequence, Tube } from "@/types/content";
import { CLSI_ORDER_OF_DRAW } from "@/data/study/orderOfDraw";
import { getTube } from "@/data/tubes/tubes";
import { createRandom, shuffle } from "@/lib/scoring/selection";

/**
 * Order of Draw drill logic.
 *
 * Kept away from React so the grading rules can be tested directly and shared
 * by all four modes.
 *
 * Every mode is built on a *round*: a randomly-sized subset of the canonical
 * sequence, where each position also shows a random selection of the tubes
 * that sit at it. A round that is always the same six cards showing the same
 * tubes is memorable as a picture, which is not the skill being trained — the
 * skill is knowing the relative order of whatever tubes you happen to be
 * holding. See `buildRound`.
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
    description: "Put a randomly-sized set of positions in collection order.",
    available: true,
  },
  {
    id: "what-comes-next",
    name: "What comes next?",
    description: "Given a partial sequence, pick the tube that follows.",
    available: true,
  },
  {
    id: "find-misplaced",
    name: "Find the misplaced tube",
    description: "One tube is out of position. Spot it.",
    available: true,
  },
  {
    id: "complete-sequence",
    name: "Complete the sequence",
    description: "Fill the gaps in a partially built sequence.",
    available: true,
  },
];

export function getOrderOfDrawMode(id: OrderOfDrawMode) {
  const mode = ORDER_OF_DRAW_MODES.find((entry) => entry.id === id);
  if (!mode) {
    throw new Error(`Unknown order of draw mode: ${id}`);
  }
  return mode;
}

/** One draggable/tappable card in the drill. */
export type DrillCard = {
  /** Canonical `OrderOfDrawStep.position`. Stable identity and React key. */
  stepId: number;
  /** Where this position sits in the full six-step sequence. */
  canonicalPosition: number;
  /** Expected 1-based slot within *this round*. The answer key. */
  rank: number;
  name: string;
  /** The tube variants shown this round — often a subset of `allTubes`. */
  tubes: Tube[];
  /** Every tube that sits at this position, for the teaching panel. */
  allTubes: Tube[];
  rationale: string;
};

/** Round sizes we draw from. "mixed" picks one at random per round. */
export const ROUND_SIZES = [4, 5, 6] as const;

export type RoundSize = (typeof ROUND_SIZES)[number];
export type RoundSizeSetting = RoundSize | "mixed";

export const ROUND_SIZE_SETTINGS: {
  id: RoundSizeSetting;
  label: string;
  detail: string;
}[] = [
  { id: "mixed", label: "Mixed", detail: "Random size every round" },
  { id: 4, label: "4", detail: "Four positions" },
  { id: 5, label: "5", detail: "Five positions" },
  { id: 6, label: "6", detail: "The full sequence" },
];

export type RoundOptions = {
  /** Number of positions to include, or "mixed" to randomize per round. */
  size?: RoundSizeSetting;
  sequence?: OrderOfDrawSequence;
  /**
   * Show every tube at each position instead of a random selection. Used by
   * the answer key, where hiding variants would be unhelpful.
   */
  allTubes?: boolean;
};

/**
 * Builds the full six-card set, one card per position, every tube shown.
 *
 * This is the canonical reference — the answer key and the "correct sequence"
 * list both render from it. Practice rounds come from `buildRound`.
 */
export function buildDrillCards(
  sequence: OrderOfDrawSequence = CLSI_ORDER_OF_DRAW,
): DrillCard[] {
  return sequence.steps.map((step, index) => {
    const tubes = step.tubeIds.map(getTube);
    return {
      stepId: step.position,
      canonicalPosition: step.position,
      rank: index + 1,
      name: step.name,
      tubes,
      allTubes: tubes,
      rationale: step.rationale,
    };
  });
}

/**
 * Builds one practice round: a random subset of positions, each showing a
 * random selection of its tubes.
 *
 * Returned in correct rank order. Callers shuffle for display.
 */
export function buildRound(
  seed: number,
  options: RoundOptions = {},
): { cards: DrillCard[]; size: number } {
  const sequence = options.sequence ?? CLSI_ORDER_OF_DRAW;
  const random = createRandom(seed);
  const steps = sequence.steps;

  const requested = options.size ?? "mixed";
  const target =
    requested === "mixed" ? pickRoundSize(random) : requested;
  const size = Math.max(1, Math.min(target, steps.length));

  // Pick which positions appear, then restore canonical order so ranks run
  // 1..n in the sequence's own direction.
  const chosen = shuffle(steps, random)
    .slice(0, size)
    .sort((a, b) => a.position - b.position);

  return {
    size,
    cards: chosen.map((step, index) => {
      const allTubes = step.tubeIds.map(getTube);
      return {
        stepId: step.position,
        canonicalPosition: step.position,
        rank: index + 1,
        name: step.name,
        tubes: options.allTubes ? allTubes : pickTubes(allTubes, random),
        allTubes,
        rationale: step.rationale,
      };
    }),
  };
}

function pickRoundSize(random: () => number): RoundSize {
  const index = Math.floor(random() * ROUND_SIZES.length);
  return ROUND_SIZES[Math.min(index, ROUND_SIZES.length - 1)] ?? 6;
}

/**
 * Picks how many of a position's tubes to show, and which.
 *
 * Positions 3, 4, and 5 hold several interchangeable tubes. Always rendering
 * all of them turns each card into a fixed silhouette a student can match
 * without reading it. Showing a random selection means the lavender card and
 * the pink card have to be recognized as the same position on their own
 * merits. Canonical order within the position is preserved so the card still
 * reads naturally.
 */
function pickTubes(tubes: Tube[], random: () => number): Tube[] {
  if (tubes.length <= 1) return tubes;
  const count = 1 + Math.floor(random() * tubes.length);
  const picked = new Set(
    shuffle(tubes, random)
      .slice(0, Math.min(count, tubes.length))
      .map((tube) => tube.id),
  );
  return tubes.filter((tube) => picked.has(tube.id));
}

/**
 * Shuffles the cards, guaranteeing the starting order is not already correct.
 *
 * With six cards there is a 1-in-720 chance of shuffling into the answer,
 * which would be a confusing first impression. Reshuffling with a bumped seed
 * removes it.
 */
export function shuffleCards(cards: DrillCard[], seed: number): DrillCard[] {
  if (cards.length < 2) return cards.slice();
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const shuffled = shuffle(cards, createRandom(seed + attempt));
    if (!isCorrectOrder(shuffled)) return shuffled;
  }
  // Astronomically unlikely. Reverse rather than hand back the answer.
  return cards.slice().reverse();
}

export function isCorrectOrder(cards: DrillCard[]): boolean {
  return cards.every((card, index) => card.rank === index + 1);
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
    correct: card.rank === index + 1,
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

/* ------------------------------------------------------------------ */
/* Mode: what comes next                                               */
/* ------------------------------------------------------------------ */

export type WhatComesNextRound = {
  /** A consecutive run from the sequence, in order, ending before the answer. */
  given: DrillCard[];
  /** Answer options, shuffled. */
  options: DrillCard[];
  answer: DrillCard;
};

const OPTION_COUNT = 4;

/**
 * "You have just drawn these. What is next?"
 *
 * Always built from the full canonical sequence — the question only means
 * something against the real order. The length of the run shown varies, so
 * the student cannot anchor on "the third card is always the answer".
 */
export function buildWhatComesNext(
  seed: number,
  sequence: OrderOfDrawSequence = CLSI_ORDER_OF_DRAW,
): WhatComesNextRound {
  const random = createRandom(seed);
  const all = buildDrillCards(sequence);

  // Never the first position: with nothing shown there is no sequence to read.
  const answerIndex = 1 + Math.floor(random() * (all.length - 1));
  const maxRun = answerIndex;
  const runLength = 1 + Math.floor(random() * maxRun);

  const given = all
    .slice(answerIndex - runLength, answerIndex)
    .map((card) => withRandomTubes(card, random));
  const answer = all[answerIndex]!;

  const distractors = shuffle(
    all.filter((card) => card.stepId !== answer.stepId),
    random,
  ).slice(0, OPTION_COUNT - 1);

  return {
    given,
    answer,
    options: shuffle([answer, ...distractors], random).map((card) =>
      withRandomTubes(card, random),
    ),
  };
}

function withRandomTubes(card: DrillCard, random: () => number): DrillCard {
  return { ...card, tubes: pickTubes(card.allTubes, random) };
}

/* ------------------------------------------------------------------ */
/* Mode: find the misplaced tube                                       */
/* ------------------------------------------------------------------ */

export type FindMisplacedRound = {
  /** The sequence as shown, with exactly one card out of place. */
  cards: DrillCard[];
  /** `stepId` of the card that is in the wrong place. */
  misplacedStepId: number;
  /** Where it was shown, 1-based. */
  shownAt: number;
  /** The 1-based slot it should occupy. */
  correctSlot: number;
};

/**
 * Displaces exactly one card from an otherwise-correct round.
 *
 * "Exactly one out of place" means *removing that one card leaves the rest in
 * order*. Comparing slot-by-slot would flag every card after the displaced one
 * as wrong, which is not what a student sees or means.
 *
 * Adjacent swaps are excluded because they are genuinely ambiguous: in
 * `1 3 2 4`, removing either the 3 or the 2 restores order, so there is no
 * single right answer to mark. Displacement is at least two slots, and the
 * result is verified to have exactly one solution before it is returned.
 */
export function buildFindMisplaced(
  seed: number,
  options: RoundOptions = {},
): FindMisplacedRound {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const candidate = attemptMisplaced(seed + attempt * 101, options);
    if (candidate) return candidate;
  }
  // Fall back to a guaranteed-solvable shape: move the last card to the front.
  const { cards } = buildRound(seed, { ...options, size: 4 });
  const moved = [cards[cards.length - 1]!, ...cards.slice(0, -1)];
  return {
    cards: moved,
    misplacedStepId: moved[0]!.stepId,
    shownAt: 1,
    correctSlot: moved[0]!.rank,
  };
}

function attemptMisplaced(
  seed: number,
  options: RoundOptions,
): FindMisplacedRound | null {
  // Offset the displacement stream so which card moves is independent of the
  // round-size and tube-variant draws `buildRound` made from `seed`.
  const random = createRandom(seed + 9973);
  const { cards } = buildRound(seed, options);
  if (cards.length < 4) return null;

  const from = Math.floor(random() * cards.length);
  const targets: number[] = [];
  for (let to = 0; to < cards.length; to += 1) {
    if (Math.abs(to - from) >= 2) targets.push(to);
  }
  if (targets.length === 0) return null;
  const to = targets[Math.floor(random() * targets.length)]!;

  const arranged = cards.slice();
  const [moved] = arranged.splice(from, 1);
  if (!moved) return null;
  arranged.splice(to, 0, moved);

  const solutions = findRemovableIndices(arranged);
  if (solutions.length !== 1 || solutions[0] !== to) return null;

  return {
    cards: arranged,
    misplacedStepId: moved.stepId,
    shownAt: to + 1,
    correctSlot: moved.rank,
  };
}

/**
 * Indices whose removal leaves the remaining cards in ascending rank order.
 *
 * Exported for the tests that guard the "exactly one answer" property.
 */
export function findRemovableIndices(cards: DrillCard[]): number[] {
  const indices: number[] = [];
  for (let index = 0; index < cards.length; index += 1) {
    const rest = cards.filter((_, other) => other !== index);
    const ascending = rest.every(
      (card, position) => position === 0 || card.rank > rest[position - 1]!.rank,
    );
    if (ascending) indices.push(index);
  }
  return indices;
}

/* ------------------------------------------------------------------ */
/* Mode: complete the sequence                                         */
/* ------------------------------------------------------------------ */

export type SequenceSlot = {
  /** 1-based slot in this round. */
  rank: number;
  /** The card already in place, or null when the student must fill it. */
  card: DrillCard | null;
};

export type CompleteSequenceRound = {
  slots: SequenceSlot[];
  /** The cards removed from the gaps, shuffled. */
  bank: DrillCard[];
};

/**
 * Removes two or three cards from a round and offers them back shuffled.
 *
 * Harder than arranging, because the surviving cards give partial context
 * rather than the whole picture.
 */
export function buildCompleteSequence(
  seed: number,
  options: RoundOptions = {},
): CompleteSequenceRound {
  const random = createRandom(seed + 4441);
  const { cards } = buildRound(seed, options);

  const maxGaps = Math.max(1, Math.min(3, cards.length - 1));
  const gapCount = Math.min(maxGaps, 2 + Math.floor(random() * 2));
  const gapRanks = new Set(
    shuffle(cards, random)
      .slice(0, gapCount)
      .map((card) => card.rank),
  );

  return {
    slots: cards.map((card) => ({
      rank: card.rank,
      card: gapRanks.has(card.rank) ? null : card,
    })),
    bank: shuffle(
      cards.filter((card) => gapRanks.has(card.rank)),
      createRandom(seed + 7),
    ),
  };
}

export type CompleteSequenceResult = {
  /** Per-gap outcome, in slot order. */
  gaps: { rank: number; placedStepId: number | null; correct: boolean }[];
  total: number;
  correct: number;
  accuracy: number;
  perfect: boolean;
};

/** `placements` maps a gap's rank to the `stepId` the student put there. */
export function gradeCompleteSequence(
  round: CompleteSequenceRound,
  placements: Record<number, number | undefined>,
): CompleteSequenceResult {
  const gaps = round.slots
    .filter((slot) => slot.card === null)
    .map((slot) => {
      const placedStepId = placements[slot.rank] ?? null;
      const expected = round.bank.find((card) => card.rank === slot.rank);
      return {
        rank: slot.rank,
        placedStepId,
        correct: placedStepId !== null && placedStepId === expected?.stepId,
      };
    });

  const correct = gaps.filter((gap) => gap.correct).length;

  return {
    gaps,
    total: gaps.length,
    correct,
    accuracy: gaps.length === 0 ? 0 : correct / gaps.length,
    perfect: gaps.length > 0 && correct === gaps.length,
  };
}

/* ------------------------------------------------------------------ */
/* Shared card helpers                                                 */
/* ------------------------------------------------------------------ */

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

/** Short label for a card's tubes, e.g. "Lavender / pink". */
export function describeTubes(card: DrillCard): string {
  return card.tubes.map((tube) => tube.displayName).join(" · ");
}
