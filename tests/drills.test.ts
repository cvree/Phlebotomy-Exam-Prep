import { describe, expect, it } from "vitest";
import {
  buildCompleteSequence,
  buildDrillCards,
  buildFindMisplaced,
  buildRound,
  buildWhatComesNext,
  findRemovableIndices,
  gradeCompleteSequence,
  gradeOrder,
  isCorrectOrder,
  moveCard,
  shuffleCards,
  swapCards,
} from "@/lib/drills/orderOfDraw";
import {
  buildTubeDrill,
  getTubeDrillMode,
  gradeTubeDrill,
} from "@/lib/drills/tubeMastery";
import { CLSI_ORDER_OF_DRAW } from "@/data/study/orderOfDraw";
import { TUBES } from "@/data/tubes/tubes";

describe("order of draw drill", () => {
  const cards = buildDrillCards();

  it("builds one card per position, with its tubes attached", () => {
    expect(cards).toHaveLength(CLSI_ORDER_OF_DRAW.steps.length);
    expect(cards.map((card) => card.canonicalPosition)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(cards.map((card) => card.rank)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(cards.every((card) => card.tubes.length > 0)).toBe(true);
    expect(cards.every((card) => card.rationale.length > 20)).toBe(true);
  });

  it("never starts a student on the correct answer", () => {
    // A 1-in-720 chance of shuffling into the answer would be a confusing
    // first impression, so the shuffle guards against it.
    for (let seed = 0; seed < 200; seed += 1) {
      expect(isCorrectOrder(shuffleCards(cards, seed))).toBe(false);
    }
  });

  it("grades a perfect sequence", () => {
    const result = gradeOrder(cards);
    expect(result.perfect).toBe(true);
    expect(result.accuracy).toBe(1);
    expect(result.misplaced).toEqual([]);
  });

  it("identifies exactly which cards are misplaced and where they belong", () => {
    const swapped = swapCards(cards, 0, 5);
    const result = gradeOrder(swapped);

    expect(result.perfect).toBe(false);
    expect(result.correctCount).toBe(4);
    expect(result.misplaced).toHaveLength(2);

    const first = result.misplaced[0];
    expect(first?.placedAt).toBe(1);
    expect(first?.card.rank).toBe(6);
  });

  it("reports zero accuracy when the whole sequence is reversed", () => {
    const reversed = cards.slice().reverse();
    const result = gradeOrder(reversed);
    expect(result.correctCount).toBe(0);
    expect(result.accuracy).toBe(0);
  });
});

describe("buildRound", () => {
  it("honours a fixed round size", () => {
    for (const size of [4, 5, 6] as const) {
      for (let seed = 0; seed < 20; seed += 1) {
        const round = buildRound(seed, { size });
        expect(round.size).toBe(size);
        expect(round.cards).toHaveLength(size);
      }
    }
  });

  it("varies the round size when mixed", () => {
    // The whole point of the mixed setting: a student cannot learn "six slots".
    const sizes = new Set(
      Array.from({ length: 60 }, (_, seed) => buildRound(seed).size),
    );
    expect(sizes.size).toBeGreaterThan(1);
  });

  it("ranks cards 1..n in canonical sequence order", () => {
    for (let seed = 0; seed < 60; seed += 1) {
      const { cards } = buildRound(seed);
      expect(cards.map((card) => card.rank)).toEqual(
        cards.map((_, index) => index + 1),
      );
      // Ranks follow the real sequence, so a subset is still ordered correctly
      // relative to itself.
      const canonical = cards.map((card) => card.canonicalPosition);
      expect(canonical).toEqual(canonical.slice().sort((a, b) => a - b));
      expect(new Set(canonical).size).toBe(canonical.length);
    }
  });

  it("shows a non-empty subset of each position's real tubes", () => {
    for (let seed = 0; seed < 60; seed += 1) {
      for (const card of buildRound(seed).cards) {
        expect(card.tubes.length).toBeGreaterThan(0);
        expect(card.tubes.length).toBeLessThanOrEqual(card.allTubes.length);
        const allIds = new Set(card.allTubes.map((tube) => tube.id));
        expect(card.tubes.every((tube) => allIds.has(tube.id))).toBe(true);
      }
    }
  });

  it("varies how many tubes represent a multi-tube position", () => {
    // Position 5 (EDTA) holds three interchangeable tubes. Always drawing all
    // three makes the card a fixed silhouette to pattern-match instead of read.
    const counts = new Set<number>();
    for (let seed = 0; seed < 200; seed += 1) {
      const card = buildRound(seed, { size: 6 }).cards.find(
        (entry) => entry.canonicalPosition === 5,
      );
      if (card) counts.add(card.tubes.length);
    }
    expect(counts.size).toBeGreaterThan(1);
  });

  it("shows every tube when asked for the answer key", () => {
    for (const card of buildRound(3, { size: 6, allTubes: true }).cards) {
      expect(card.tubes).toEqual(card.allTubes);
    }
  });

  it("is deterministic for a given seed", () => {
    const describe1 = (seed: number) =>
      buildRound(seed).cards.map(
        (card) => `${card.rank}:${card.tubes.map((tube) => tube.id).join("+")}`,
      );
    expect(describe1(42)).toEqual(describe1(42));
  });

  it("grades a subset round against its own ranks", () => {
    const { cards } = buildRound(11, { size: 4 });
    expect(gradeOrder(cards).perfect).toBe(true);
    expect(gradeOrder(cards.slice().reverse()).correctCount).toBe(0);
  });
});

describe("what comes next", () => {
  it("always offers the answer, with distinct options", () => {
    for (let seed = 0; seed < 80; seed += 1) {
      const round = buildWhatComesNext(seed);
      const ids = round.options.map((option) => option.stepId);
      expect(ids).toContain(round.answer.stepId);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("shows a consecutive run ending immediately before the answer", () => {
    for (let seed = 0; seed < 80; seed += 1) {
      const { given, answer } = buildWhatComesNext(seed);
      expect(given.length).toBeGreaterThan(0);
      const positions = given.map((card) => card.canonicalPosition);
      positions.forEach((position, index) => {
        if (index > 0) expect(position).toBe(positions[index - 1]! + 1);
      });
      expect(positions[positions.length - 1]).toBe(answer.canonicalPosition - 1);
    }
  });

  it("varies how much of the sequence it shows", () => {
    const lengths = new Set(
      Array.from({ length: 80 }, (_, seed) => buildWhatComesNext(seed).given.length),
    );
    expect(lengths.size).toBeGreaterThan(1);
  });
});

describe("find the misplaced tube", () => {
  it("has exactly one defensible answer every time", () => {
    // "Out of place" means removing that one card restores order. An adjacent
    // swap has two valid answers, so the generator must never produce one.
    for (let seed = 0; seed < 120; seed += 1) {
      const round = buildFindMisplaced(seed);
      const solutions = findRemovableIndices(round.cards);
      expect(solutions).toHaveLength(1);
      expect(round.cards[solutions[0]!]?.stepId).toBe(round.misplacedStepId);
    }
  });

  it("reports where the card was shown and where it belongs", () => {
    for (let seed = 0; seed < 120; seed += 1) {
      const round = buildFindMisplaced(seed);
      const shown = round.cards[round.shownAt - 1];
      expect(shown?.stepId).toBe(round.misplacedStepId);
      expect(round.correctSlot).toBe(shown?.rank);
      expect(round.shownAt).not.toBe(round.correctSlot);
    }
  });

  it("does not leave the sequence already in order", () => {
    for (let seed = 0; seed < 120; seed += 1) {
      expect(isCorrectOrder(buildFindMisplaced(seed).cards)).toBe(false);
    }
  });
});

describe("complete the sequence", () => {
  it("banks exactly the cards it removed", () => {
    for (let seed = 0; seed < 80; seed += 1) {
      const round = buildCompleteSequence(seed);
      const gapRanks = round.slots
        .filter((slot) => slot.card === null)
        .map((slot) => slot.rank);
      expect(gapRanks.length).toBeGreaterThanOrEqual(1);
      expect(round.bank).toHaveLength(gapRanks.length);
      expect(round.bank.map((card) => card.rank).sort()).toEqual(
        gapRanks.slice().sort(),
      );
      // Never every slot — the point is filling gaps in a partial sequence.
      expect(gapRanks.length).toBeLessThan(round.slots.length);
    }
  });

  it("scores a fully correct fill as perfect", () => {
    const round = buildCompleteSequence(5);
    const placements = Object.fromEntries(
      round.bank.map((card) => [card.rank, card.stepId]),
    );
    const result = gradeCompleteSequence(round, placements);
    expect(result.perfect).toBe(true);
    expect(result.accuracy).toBe(1);
    expect(result.correct).toBe(round.bank.length);
  });

  it("gives partial credit and flags the wrong gap", () => {
    // Find a round with at least two gaps so swapping produces two errors.
    let round = buildCompleteSequence(5);
    for (let seed = 5; round.bank.length < 2 && seed < 50; seed += 1) {
      round = buildCompleteSequence(seed);
    }
    expect(round.bank.length).toBeGreaterThanOrEqual(2);

    const [first, second] = round.bank;
    const placements: Record<number, number> = Object.fromEntries(
      round.bank.map((card) => [card.rank, card.stepId]),
    );
    // Swap two answers.
    placements[first!.rank] = second!.stepId;
    placements[second!.rank] = first!.stepId;

    const result = gradeCompleteSequence(round, placements);
    expect(result.perfect).toBe(false);
    expect(result.correct).toBe(round.bank.length - 2);
    expect(
      result.gaps.filter((gap) => !gap.correct).map((gap) => gap.rank).sort(),
    ).toEqual([first!.rank, second!.rank].sort());
  });

  it("counts an unfilled gap as wrong", () => {
    const round = buildCompleteSequence(9);
    const result = gradeCompleteSequence(round, {});
    expect(result.correct).toBe(0);
    expect(result.gaps.every((gap) => gap.placedStepId === null)).toBe(true);
  });
});

describe("moveCard", () => {
  const items = ["a", "b", "c", "d"];

  it("moves an item to a later position", () => {
    expect(moveCard(items, 0, 2)).toEqual(["b", "c", "a", "d"]);
  });

  it("moves an item to an earlier position", () => {
    expect(moveCard(items, 3, 1)).toEqual(["a", "d", "b", "c"]);
  });

  it("returns the input untouched for a no-op or out-of-range move", () => {
    expect(moveCard(items, 1, 1)).toBe(items);
    expect(moveCard(items, -1, 2)).toBe(items);
    expect(moveCard(items, 0, 9)).toBe(items);
  });

  it("does not mutate the input", () => {
    moveCard(items, 0, 3);
    expect(items).toEqual(["a", "b", "c", "d"]);
  });
});

describe("swapCards", () => {
  const items = ["a", "b", "c", "d"];

  it("swaps two positions", () => {
    expect(swapCards(items, 0, 3)).toEqual(["d", "b", "c", "a"]);
  });

  it("returns the input untouched for a no-op or out-of-range swap", () => {
    expect(swapCards(items, 2, 2)).toBe(items);
    expect(swapCards(items, 0, 9)).toBe(items);
  });
});

describe("tube mastery drill", () => {
  const mode = getTubeDrillMode("tube-to-additive");

  it("builds the requested number of questions", () => {
    expect(buildTubeDrill(mode, 8, 1)).toHaveLength(8);
  });

  it("never asks about the same tube twice in a round", () => {
    const questions = buildTubeDrill(mode, 8, 2);
    expect(new Set(questions.map((q) => q.tubeId)).size).toBe(8);
  });

  it("always includes the correct answer among the options", () => {
    for (const question of buildTubeDrill(mode, 10, 3)) {
      const correct = question.options.find(
        (option) => option.id === question.correctOptionId,
      );
      expect(correct).toBeDefined();
      expect(correct?.tubeId).toBe(question.tubeId);
    }
  });

  it("never offers two options with the same answer text", () => {
    // Several tubes share an additive — lavender and pink are both EDTA — so
    // de-duplicating by tube alone would produce unanswerable questions.
    for (let seed = 0; seed < 30; seed += 1) {
      for (const question of buildTubeDrill(mode, 8, seed)) {
        const texts = question.options.map((option) => option.text);
        expect(new Set(texts).size).toBe(texts.length);
      }
    }
  });

  it("explains the mechanism after every question", () => {
    for (const question of buildTubeDrill(mode, 8, 4)) {
      expect(question.teaching.length).toBeGreaterThan(30);
      expect(question.teaching).toContain("order of draw");
    }
  });

  it("works in the reverse direction too", () => {
    const reverse = getTubeDrillMode("additive-to-tube");
    const questions = buildTubeDrill(reverse, 6, 5);
    expect(questions).toHaveLength(6);
    for (const question of questions) {
      // Prompt asks about the additive; the answer is a tube name.
      expect(question.promptTube).toBeNull();
      const correct = question.options.find(
        (option) => option.id === question.correctOptionId,
      );
      expect(TUBES.some((tube) => tube.displayName === correct?.text)).toBe(true);
    }
  });

  it("is deterministic for a given seed", () => {
    expect(buildTubeDrill(mode, 8, 77).map((q) => q.tubeId)).toEqual(
      buildTubeDrill(mode, 8, 77).map((q) => q.tubeId),
    );
  });
});

describe("gradeTubeDrill", () => {
  const mode = getTubeDrillMode("tube-to-additive");
  const questions = buildTubeDrill(mode, 5, 9);

  it("scores a perfect round", () => {
    const answers = Object.fromEntries(
      questions.map((question) => [question.tubeId, question.correctOptionId]),
    );
    const grade = gradeTubeDrill(questions, answers);
    expect(grade).toMatchObject({ correct: 5, total: 5, accuracy: 1, perfect: true });
    expect(grade.missedTubeIds).toEqual([]);
  });

  it("lists the tubes that were missed", () => {
    const answers = Object.fromEntries(
      questions.map((question, index) => [
        question.tubeId,
        index === 0 ? "wrong-option" : question.correctOptionId,
      ]),
    );
    const grade = gradeTubeDrill(questions, answers);
    expect(grade.correct).toBe(4);
    expect(grade.perfect).toBe(false);
    expect(grade.missedTubeIds).toEqual([questions[0]!.tubeId]);
  });

  it("treats an unanswered question as missed", () => {
    const grade = gradeTubeDrill(questions, {});
    expect(grade.correct).toBe(0);
    expect(grade.missedTubeIds).toHaveLength(5);
  });
});
