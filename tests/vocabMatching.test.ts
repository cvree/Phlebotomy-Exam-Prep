import { describe, expect, it } from "vitest";
import type { VocabTerm } from "@/types/vocab";
import { VOCAB_TERMS, findVocabTerm } from "@/data/vocab";
import {
  acceptedAnswers,
  diffAnswer,
  editDistance,
  gradeTypedAnswer,
  normalizeAnswer,
  tolerance,
} from "@/lib/vocab/matching";
import { BANK_ANSWERS, gradeAgainstBank } from "@/lib/vocab/answerIndex";

function requireTerm(id: string): VocabTerm {
  const term = findVocabTerm(id);
  if (!term) throw new Error(`missing fixture term ${id}`);
  return term;
}

describe("normalizeAnswer", () => {
  it("strips case, punctuation, articles, and parentheticals", () => {
    expect(normalizeAnswer("  The  Antecubital Fossa! ")).toBe("antecubital fossa");
    expect(normalizeAnswer("QNS (quantity not sufficient)")).toBe("qns");
    expect(normalizeAnswer("D-dimer")).toBe("d dimer");
  });

  it("strips diacritics", () => {
    expect(normalizeAnswer("ıcterus")).toBe("cterus");
    expect(normalizeAnswer("Café")).toBe("cafe");
  });
});

describe("editDistance", () => {
  it("counts single-character edits", () => {
    expect(editDistance("abc", "abc")).toBe(0);
    expect(editDistance("abc", "abd")).toBe(1);
    expect(editDistance("abc", "ab")).toBe(1);
    expect(editDistance("abc", "abcd")).toBe(1);
    expect(editDistance("", "abcd")).toBe(4);
  });
});

describe("tolerance", () => {
  it("gives short answers no room at all", () => {
    expect(tolerance(3)).toBe(0);
    expect(tolerance(4)).toBe(0);
    expect(tolerance(8)).toBe(1);
    expect(tolerance(14)).toBe(2);
    expect(tolerance(30)).toBe(3);
  });
});

describe("acceptedAnswers", () => {
  it("accepts the term, its aliases, and an abbreviation's expansion", () => {
    const qns = requireTerm("hand-qns");
    const accepted = acceptedAnswers(qns).map(normalizeAnswer);
    expect(accepted).toContain("qns");
    expect(accepted).toContain("quantity not sufficient");
  });

  it("accepts either half of a paired term", () => {
    const pair = requireTerm("anat-medial");
    const accepted = acceptedAnswers(pair).map(normalizeAnswer);
    expect(accepted).toContain("medial");
    expect(accepted).toContain("lateral");
  });
});

describe("gradeTypedAnswer", () => {
  const thrombocytopenia = requireTerm("cond-thrombocytopenia");
  const polycythemia = requireTerm("cond-polycythemia-vera");

  it("accepts an exact answer regardless of case and spacing", () => {
    expect(gradeTypedAnswer("  thrombocytopenia ", thrombocytopenia).verdict).toBe(
      "correct",
    );
    expect(gradeTypedAnswer("POLYCYTHEMIA VERA", polycythemia).verdict).toBe(
      "correct",
    );
  });

  it("accepts an alias", () => {
    expect(gradeTypedAnswer("PV", polycythemia).verdict).toBe("correct");
    expect(gradeTypedAnswer("primary polycythemia", polycythemia).verdict).toBe(
      "correct",
    );
  });

  it("calls a near-miss 'close' rather than wrong", () => {
    const result = gradeTypedAnswer("thrombocytopena", thrombocytopenia);
    expect(result.verdict).toBe("close");
    expect(result.matched).toBe("Thrombocytopenia");
  });

  it("does not accept a different term that merely resembles this one", () => {
    const leukopenia = requireTerm("cond-leukopenia");
    expect(gradeTypedAnswer("leukocytosis", leukopenia).verdict).toBe("incorrect");

    const plasma = requireTerm("blood-plasma");
    expect(gradeTypedAnswer("serum", plasma).verdict).toBe("incorrect");

    const hyper = requireTerm("wp-hyper");
    expect(gradeTypedAnswer("hypo-", hyper).verdict).toBe("incorrect");
  });

  it("rejects an empty answer", () => {
    expect(gradeTypedAnswer("   ", thrombocytopenia).verdict).toBe("incorrect");
  });

  /**
   * The safety property for the whole bank: no term's accepted answers may be
   * close enough to another term's that a student typing one would be credited
   * for the other.
   */
  it("never accepts one bank term as an answer for another", () => {
    const collisions: string[] = [];

    for (const candidate of VOCAB_TERMS) {
      for (const target of VOCAB_TERMS) {
        if (candidate.id === target.id) continue;
        const result = gradeAgainstBank(candidate.term, target);
        if (result.verdict !== "incorrect") {
          collisions.push(`"${candidate.term}" accepted as "${target.term}"`);
        }
      }
    }

    expect(collisions).toEqual([]);
  });
});

describe("BANK_ANSWERS", () => {
  it("contains the name of every term in the bank", () => {
    for (const term of VOCAB_TERMS) {
      expect(BANK_ANSWERS.has(normalizeAnswer(term.term))).toBe(true);
    }
  });

  it("still accepts a genuine misspelling, which is not in the index", () => {
    expect(BANK_ANSWERS.has("thrombocytopena")).toBe(false);
    expect(
      gradeAgainstBank("thrombocytopena", requireTerm("cond-thrombocytopenia"))
        .verdict,
    ).toBe("close");
  });
});

describe("diffAnswer", () => {
  it("marks the characters that diverge", () => {
    const diff = diffAnswer("serrum", "serum");
    expect(diff.map((entry) => entry.ok)).toEqual([
      true,
      true,
      true,
      false,
      false,
      false,
    ]);
  });
});
