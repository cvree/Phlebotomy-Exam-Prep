import { describe, expect, it } from "vitest";
import type { VocabCardState, VocabTerm } from "@/types/vocab";
import { VOCAB_TERMS, findVocabTerm } from "@/data/vocab";
import { setTerms, VOCAB_SETS } from "@/data/vocab/sets";
import { normalizeAnswer } from "@/lib/vocab/matching";
import { createCard } from "@/lib/vocab/scheduler";
import {
  buildLearnItems,
  buildMatchBoard,
  buildMultipleChoiceItem,
  buildTestPaper,
  buildTrueFalseItem,
  buildWrittenItem,
  pickDistractors,
  shouldPromoteToWritten,
} from "@/lib/vocab/session";

const NOW = new Date("2026-03-01T09:00:00.000Z");

function requireTerm(id: string): VocabTerm {
  const term = findVocabTerm(id);
  if (!term) throw new Error(`missing fixture term ${id}`);
  return term;
}

describe("pickDistractors", () => {
  it("offers a term's declared confusables first", () => {
    const plasma = requireTerm("blood-plasma");
    const distractors = pickDistractors(
      plasma,
      VOCAB_TERMS,
      "definition-to-term",
      3,
      1,
    );
    const ids = distractors.map((entry) => entry.id);
    expect(ids).toContain("blood-serum");
  });

  it("never offers the term itself", () => {
    for (const term of VOCAB_TERMS.slice(0, 40)) {
      const distractors = pickDistractors(
        term,
        VOCAB_TERMS,
        "definition-to-term",
        3,
        7,
      );
      expect(distractors.some((entry) => entry.id === term.id)).toBe(false);
    }
  });

  it("never offers two options that read the same", () => {
    for (const term of VOCAB_TERMS) {
      for (const direction of ["definition-to-term", "term-to-definition"] as const) {
        const distractors = pickDistractors(term, VOCAB_TERMS, direction, 3, 3);
        const texts = [term, ...distractors].map((entry) =>
          normalizeAnswer(
            direction === "definition-to-term" ? entry.term : entry.definition,
          ),
        );
        expect(new Set(texts).size).toBe(texts.length);
      }
    }
  });
});

describe("buildMultipleChoiceItem", () => {
  it("marks exactly one choice correct, and it is the subject term", () => {
    for (const term of VOCAB_TERMS.slice(0, 60)) {
      const item = buildMultipleChoiceItem(
        term,
        VOCAB_TERMS,
        "definition-to-term",
        11,
      );
      const correct = item.choices.filter(
        (choice) => choice.id === item.correctChoiceId,
      );
      expect(correct).toHaveLength(1);
      expect(correct[0]?.termId).toBe(term.id);
    }
  });

  it("produces four distinct options for every term in the bank", () => {
    for (const term of VOCAB_TERMS) {
      const item = buildMultipleChoiceItem(
        term,
        VOCAB_TERMS,
        "term-to-definition",
        5,
      );
      expect(item.choices).toHaveLength(4);
      expect(new Set(item.choices.map((choice) => choice.termId)).size).toBe(4);
    }
  });

  it("is deterministic for a given seed", () => {
    const term = requireTerm("add-edta");
    expect(
      buildMultipleChoiceItem(term, VOCAB_TERMS, "definition-to-term", 42),
    ).toEqual(
      buildMultipleChoiceItem(term, VOCAB_TERMS, "definition-to-term", 42),
    );
  });

  it("varies the option order across seeds", () => {
    // EDTA declares three confusables, so the *set* of distractors is fixed by
    // design — those are the mistakes worth offering. Only the order moves.
    const term = requireTerm("add-edta");
    const orders = new Set(
      [1, 2, 3, 4, 5, 6].map((seed) =>
        buildMultipleChoiceItem(term, VOCAB_TERMS, "definition-to-term", seed)
          .choices.map((choice) => choice.termId)
          .join("|"),
      ),
    );
    expect(orders.size).toBeGreaterThan(1);
  });

  it("varies the distractors for a term with no declared confusables", () => {
    const term = requireTerm("add-carryover");
    expect(term.confusableWithIds).toBeUndefined();

    const sets = new Set(
      [1, 2, 3, 4, 5, 6].map((seed) =>
        buildMultipleChoiceItem(term, VOCAB_TERMS, "definition-to-term", seed)
          .choices.map((choice) => choice.termId)
          .sort()
          .join("|"),
      ),
    );
    expect(sets.size).toBeGreaterThan(1);
  });

  it("swaps prompt and answer with the direction", () => {
    const term = requireTerm("add-edta");
    const forward = buildMultipleChoiceItem(
      term,
      VOCAB_TERMS,
      "term-to-definition",
      1,
    );
    expect(forward.prompt).toBe(term.term);
    expect(
      forward.choices.find((choice) => choice.id === forward.correctChoiceId)?.text,
    ).toBe(term.definition);

    const backward = buildMultipleChoiceItem(
      term,
      VOCAB_TERMS,
      "definition-to-term",
      1,
    );
    expect(backward.prompt).toBe(term.definition);
    expect(
      backward.choices.find((choice) => choice.id === backward.correctChoiceId)
        ?.text,
    ).toBe(term.term);
  });

  it("falls back to a smaller board rather than repeating an option", () => {
    const pair = VOCAB_TERMS.slice(0, 2);
    const first = pair[0];
    expect(first).toBeDefined();
    const item = buildMultipleChoiceItem(first!, pair, "definition-to-term", 1);
    expect(item.choices).toHaveLength(2);
    expect(
      item.choices.find((choice) => choice.id === item.correctChoiceId)?.termId,
    ).toBe(first!.id);
  });
});

describe("buildWrittenItem", () => {
  it("prompts with the definition and answers with the term", () => {
    const term = requireTerm("cond-polycythemia-vera");
    const item = buildWrittenItem(term);
    expect(item.prompt).toBe(term.definition);
    expect(item.answer).toBe(term.term);
  });
});

describe("buildTrueFalseItem", () => {
  it("pairs a false statement with a confusable term's definition", () => {
    const term = requireTerm("blood-plasma");
    let sawFalse = false;

    for (let seed = 0; seed < 25; seed += 1) {
      const item = buildTrueFalseItem(term, VOCAB_TERMS, seed);
      expect(item.term).toBe(term.term);

      if (item.correct) {
        expect(item.definition).toBe(term.definition);
      } else {
        sawFalse = true;
        expect(item.definition).not.toBe(term.definition);
        expect(item.impostorTermId).toBeDefined();
        expect(findVocabTerm(item.impostorTermId!)?.definition).toBe(
          item.definition,
        );
      }
    }

    expect(sawFalse).toBe(true);
  });
});

describe("shouldPromoteToWritten", () => {
  it("keeps a new or shaky term on multiple choice", () => {
    expect(shouldPromoteToWritten(undefined)).toBe(false);
    expect(shouldPromoteToWritten(createCard("t1", NOW))).toBe(false);
  });

  it("promotes once the term has been right twice in a row", () => {
    const card: VocabCardState = { ...createCard("t1", NOW), streak: 2 };
    expect(shouldPromoteToWritten(card)).toBe(true);
  });
});

describe("buildLearnItems", () => {
  const queue = VOCAB_TERMS.slice(0, 6);

  it("asks unseen terms as multiple choice", () => {
    const items = buildLearnItems(queue, { pool: VOCAB_TERMS, cards: {}, seed: 3 });
    expect(items).toHaveLength(queue.length);
    expect(items.every((item) => item.kind === "multiple-choice")).toBe(true);
  });

  it("asks well-known terms as typed recall", () => {
    const cards: Record<string, VocabCardState> = {};
    for (const term of queue) {
      cards[term.id] = { ...createCard(term.id, NOW), streak: 3 };
    }
    const items = buildLearnItems(queue, { pool: VOCAB_TERMS, cards, seed: 3 });
    expect(items.every((item) => item.kind === "written")).toBe(true);
  });

  it("honours a forced item type", () => {
    const items = buildLearnItems(queue, {
      pool: VOCAB_TERMS,
      cards: {},
      seed: 3,
      itemType: "written",
    });
    expect(items.every((item) => item.kind === "written")).toBe(true);
  });
});

describe("buildTestPaper", () => {
  it("mixes the item kinds instead of landing on one by chance", () => {
    const paper = buildTestPaper(VOCAB_TERMS.slice(0, 12), {
      pool: VOCAB_TERMS,
      seed: 9,
    });
    const kinds = new Set(paper.map((item) => item.kind));
    expect(kinds.size).toBe(3);
    expect(paper).toHaveLength(12);
  });

  it("can be restricted to one kind", () => {
    const paper = buildTestPaper(VOCAB_TERMS.slice(0, 8), {
      pool: VOCAB_TERMS,
      seed: 9,
      include: { multipleChoice: true, written: false, trueFalse: false },
    });
    expect(paper.every((item) => item.kind === "multiple-choice")).toBe(true);
  });

  it("asks about each term exactly once", () => {
    const sample = VOCAB_TERMS.slice(0, 20);
    const paper = buildTestPaper(sample, { pool: VOCAB_TERMS, seed: 2 });
    expect(new Set(paper.map((item) => item.termId)).size).toBe(sample.length);
  });
});

describe("buildMatchBoard", () => {
  it("builds two tiles per pair, one of each face", () => {
    const { tiles, pairs } = buildMatchBoard(VOCAB_TERMS, 4, 6);
    expect(pairs).toHaveLength(6);
    expect(tiles).toHaveLength(12);

    for (const pair of pairs) {
      const faces = tiles
        .filter((tile) => tile.termId === pair.id)
        .map((tile) => tile.face)
        .sort();
      expect(faces).toEqual(["definition", "term"]);
    }
  });

  it("shuffles the tiles rather than leaving pairs adjacent", () => {
    const { tiles } = buildMatchBoard(VOCAB_TERMS, 4, 6);
    const adjacentPairs = tiles.filter(
      (tile, index) => tiles[index + 1]?.termId === tile.termId,
    );
    expect(adjacentPairs.length).toBeLessThan(6);
  });

  it("is deterministic for a given seed", () => {
    expect(buildMatchBoard(VOCAB_TERMS, 77, 6)).toEqual(
      buildMatchBoard(VOCAB_TERMS, 77, 6),
    );
  });
});

describe("generated items across every set", () => {
  it("builds an answerable multiple-choice item for every term in every set", () => {
    for (const set of VOCAB_SETS) {
      const terms = setTerms(set);
      const pool = terms.length >= 8 ? terms : VOCAB_TERMS;

      for (const term of terms) {
        const item = buildMultipleChoiceItem(term, pool, "definition-to-term", 13);
        expect(item.choices.length).toBeGreaterThanOrEqual(2);
        expect(
          item.choices.filter((choice) => choice.id === item.correctChoiceId),
        ).toHaveLength(1);
      }
    }
  });
});
