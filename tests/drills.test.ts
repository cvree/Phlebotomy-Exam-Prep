import { describe, expect, it } from "vitest";
import {
  ORDER_OF_DRAW_MODES,
  buildCompleteSequence,
  buildDrillCards,
  buildMisplacedRound,
  buildNextInSequence,
  getOrderOfDrawMode,
  gradeCompleteSequence,
  gradeOrder,
  isCorrectOrder,
  isSoleOutlier,
  moveCard,
  shuffleCards,
  swapCards,
  type DrillCard,
} from "@/lib/drills/orderOfDraw";
import {
  TUBE_DRILL_MODES,
  buildTubeDrill,
  getTubeDrillMode,
  gradeTubeDrill,
} from "@/lib/drills/tubeMastery";
import { CLSI_ORDER_OF_DRAW } from "@/data/study/orderOfDraw";
import { TUBES, findTube } from "@/data/tubes/tubes";

describe("order of draw drill", () => {
  const cards = buildDrillCards();

  it("builds one card per position, with its tubes attached", () => {
    expect(cards).toHaveLength(CLSI_ORDER_OF_DRAW.steps.length);
    expect(cards.map((card) => card.position)).toEqual([1, 2, 3, 4, 5, 6]);
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
    expect(first?.card.position).toBe(6);
  });

  it("reports zero accuracy when the whole sequence is reversed", () => {
    const reversed = cards.slice().reverse();
    const result = gradeOrder(reversed);
    expect(result.correctCount).toBe(0);
    expect(result.accuracy).toBe(0);
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

describe("order of draw modes", () => {
  it("offers every mode as playable", () => {
    expect(ORDER_OF_DRAW_MODES.every((mode) => mode.available)).toBe(true);
    expect(ORDER_OF_DRAW_MODES.every((mode) => mode.roundLength > 0)).toBe(true);
  });

  it("looks a mode up by id and refuses an unknown one", () => {
    expect(getOrderOfDrawMode("find-misplaced").name).toBe(
      "Find the misplaced tube",
    );
    expect(() =>
      getOrderOfDrawMode("nonsense" as "arrange"),
    ).toThrow(/Unknown order of draw mode/);
  });
});

describe("what comes next", () => {
  it("asks about every position exactly once", () => {
    const items = buildNextInSequence(7);
    expect(items).toHaveLength(CLSI_ORDER_OF_DRAW.steps.length);
    expect(new Set(items.map((item) => item.answer.position)).size).toBe(
      items.length,
    );
  });

  it("shows exactly the positions already collected, in order", () => {
    for (const item of buildNextInSequence(11)) {
      expect(item.drawn.map((card) => card.position)).toEqual(
        Array.from({ length: item.answer.position - 1 }, (_, i) => i + 1),
      );
    }
  });

  it("always offers the answer, and never the same card twice", () => {
    for (let seed = 0; seed < 40; seed += 1) {
      for (const item of buildNextInSequence(seed)) {
        const ids = item.options.map((option) => option.stepId);
        expect(ids).toContain(item.answer.stepId);
        expect(new Set(ids).size).toBe(ids.length);
        expect(ids.length).toBeGreaterThanOrEqual(4);
      }
    }
  });

  it("prefers uncollected tubes as distractors", () => {
    // Asking a student to choose between tubes already in the rack teaches
    // nothing, so the options are topped up from those only when the end of
    // the sequence leaves too few to choose from.
    for (const item of buildNextInSequence(3)) {
      const remaining = CLSI_ORDER_OF_DRAW.steps.length - item.answer.position;
      const fromRemaining = item.options.filter(
        (option) => option.position > item.answer.position,
      ).length;
      expect(fromRemaining).toBe(Math.min(remaining, 3));
    }
  });

  it("is deterministic for a given seed", () => {
    expect(buildNextInSequence(99).map((item) => item.answer.position)).toEqual(
      buildNextInSequence(99).map((item) => item.answer.position),
    );
  });
});

describe("find the misplaced tube", () => {
  it("builds the requested number of distinct arrangements", () => {
    const items = buildMisplacedRound(5, 21);
    expect(items).toHaveLength(5);
    const shapes = items.map((item) =>
      item.arrangement.map((card) => card.position).join("-"),
    );
    expect(new Set(shapes).size).toBe(shapes.length);
  });

  it("marks a card that is genuinely out of place", () => {
    for (const item of buildMisplacedRound(5, 33)) {
      const card = item.arrangement[item.misplacedIndex];
      expect(card?.position).toBe(item.belongsAt);
      expect(card?.position).not.toBe(item.misplacedIndex + 1);
    }
  });

  it("never produces a puzzle with two defensible answers", () => {
    // Removing the marked card must restore the sequence — and removing any
    // other card must not. A one-slot displacement fails this, which is why
    // the builder keeps them at least two slots apart.
    for (let seed = 0; seed < 25; seed += 1) {
      for (const item of buildMisplacedRound(5, seed)) {
        const outliers = item.arrangement
          .map((_, index) => index)
          .filter((index) => isSoleOutlier(item.arrangement, index));
        expect(outliers).toEqual([item.misplacedIndex]);
      }
    }
  });

  it("leaves the rest of the sequence in the right relative order", () => {
    for (const item of buildMisplacedRound(4, 44)) {
      const rest = item.arrangement
        .filter((_, index) => index !== item.misplacedIndex)
        .map((card) => card.position);
      expect(rest).toEqual([...rest].sort((a, b) => a - b));
    }
  });
});

describe("complete the sequence", () => {
  const item = buildCompleteSequence(3, 5);

  it("empties the requested number of slots and banks exactly those cards", () => {
    expect(item.gaps).toHaveLength(3);
    expect(item.bank).toHaveLength(3);
    expect(item.slots.filter((slot) => slot === null)).toHaveLength(3);
    expect(new Set(item.bank.map((card) => card.position))).toEqual(
      new Set(item.gaps.map((gap) => gap + 1)),
    );
  });

  it("leaves every given slot holding the card that belongs there", () => {
    item.slots.forEach((card, index) => {
      if (card) expect(card.position).toBe(index + 1);
    });
  });

  it("never empties every slot, however many gaps are asked for", () => {
    const greedy = buildCompleteSequence(99, 5);
    expect(greedy.gaps).toHaveLength(CLSI_ORDER_OF_DRAW.steps.length - 1);
    expect(buildCompleteSequence(0, 5).gaps).toHaveLength(1);
  });

  it("scores a correctly rebuilt sequence", () => {
    const filled = buildDrillCards();
    const grade = gradeCompleteSequence(item, filled);
    expect(grade).toMatchObject({ correct: 3, total: 3, perfect: true });
  });

  it("scores only the gaps, and marks the wrong ones", () => {
    const filled: (DrillCard | null)[] = buildDrillCards();
    const [first, second] = item.gaps;
    if (first === undefined || second === undefined) throw new Error("no gaps");
    const held = filled[first] ?? null;
    filled[first] = filled[second] ?? null;
    filled[second] = held;

    const grade = gradeCompleteSequence(item, filled);
    expect(grade.total).toBe(3);
    expect(grade.correct).toBe(1);
    expect(grade.perfect).toBe(false);
    expect(grade.results.filter((entry) => !entry.correct)).toHaveLength(2);
  });

  it("treats an unfilled gap as wrong rather than throwing", () => {
    const grade = gradeCompleteSequence(item, item.slots);
    expect(grade.correct).toBe(0);
    expect(grade.results.every((entry) => entry.card === null)).toBe(true);
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

describe("tube drill modes", () => {
  it("offers every direction as playable", () => {
    expect(TUBE_DRILL_MODES.every((mode) => mode.available)).toBe(true);
  });

  it("always offers at least three options in every mode", () => {
    for (const mode of TUBE_DRILL_MODES) {
      for (let seed = 0; seed < 12; seed += 1) {
        for (const question of buildTubeDrill(mode, 8, seed)) {
          expect(question.options.length).toBeGreaterThanOrEqual(3);
          expect(
            question.options.some(
              (option) => option.id === question.correctOptionId,
            ),
          ).toBe(true);
        }
      }
    }
  });

  it("asks for a specimen type using only the three answers a student picks between", () => {
    const mode = getTubeDrillMode("tube-to-specimen");
    const allowed = new Set(["Serum", "Plasma", "Whole blood"]);
    for (let seed = 0; seed < 12; seed += 1) {
      for (const question of buildTubeDrill(mode, 8, seed)) {
        for (const option of question.options) {
          expect(allowed.has(option.text)).toBe(true);
        }
      }
    }
  });

  it("never offers a distractor from the same additive family as the answer", () => {
    // "Which tube contains K2 EDTA?" has no single answer while lavender,
    // pink, pearl white, and tan are all on the list. Two *distractors*
    // sharing a family is fine — neither of them is correct.
    const familiesOf = (tubeId: string) => {
      const additive = findTube(tubeId)?.additive.toLowerCase() ?? "";
      return ["edta", "heparin", "citrate", "fluoride", "oxalate"].filter(
        (family) => additive.includes(family),
      );
    };

    for (const modeId of ["tube-to-additive", "additive-to-tube"] as const) {
      const mode = getTubeDrillMode(modeId);
      for (let seed = 0; seed < 20; seed += 1) {
        for (const question of buildTubeDrill(mode, 8, seed)) {
          const subject = new Set(familiesOf(question.tubeId));
          for (const option of question.options) {
            if (option.tubeId === question.tubeId) continue;
            expect(
              familiesOf(option.tubeId).filter((family) => subject.has(family)),
            ).toEqual([]);
          }
        }
      }
    }
  });

  it("never offers a common use that is also true of the tube being asked about", () => {
    const mode = getTubeDrillMode("tube-to-use");
    for (let seed = 0; seed < 20; seed += 1) {
      for (const question of buildTubeDrill(mode, 8, seed)) {
        const subject = findTube(question.tubeId);
        const subjectUses = new Set(
          (subject?.commonUses ?? []).map((use) => use.toLowerCase()),
        );
        for (const option of question.options) {
          if (option.tubeId === question.tubeId) continue;
          expect(subjectUses.has(option.text.toLowerCase())).toBe(false);
        }
      }
    }
  });

  it("teaches the specimen and the usual order alongside the additive", () => {
    for (const question of buildTubeDrill(
      getTubeDrillMode("tube-to-specimen"),
      8,
      6,
    )) {
      expect(question.teaching).toContain("The specimen is");
      expect(question.teaching).toContain("order of draw");
    }
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
