import { describe, expect, it } from "vitest";
import {
  buildDrillCards,
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
