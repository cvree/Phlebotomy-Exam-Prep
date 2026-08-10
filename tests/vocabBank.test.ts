import { describe, expect, it } from "vitest";
import {
  VOCAB_TERMS,
  checkVocabIntegrity,
  findVocabTerm,
  getTermsByCategory,
  resolveVocabTerms,
} from "@/data/vocab";
import { VOCAB_CATEGORIES } from "@/data/vocab/categories";
import { VOCAB_SETS, findVocabSet, setTerms, setsContaining } from "@/data/vocab/sets";

describe("vocabulary bank", () => {
  it("passes every structural integrity check", () => {
    expect(checkVocabIntegrity()).toEqual([]);
  });

  it("carries enough terms to make the sets worth studying", () => {
    expect(VOCAB_TERMS.length).toBeGreaterThanOrEqual(120);
  });

  it("places every term in a declared category", () => {
    const known = new Set(VOCAB_CATEGORIES.map((category) => category.id));
    for (const term of VOCAB_TERMS) {
      expect(known.has(term.category)).toBe(true);
    }
  });

  it("gives every category at least eight terms", () => {
    for (const category of VOCAB_CATEGORIES) {
      expect(getTermsByCategory(category.id).length).toBeGreaterThanOrEqual(8);
    }
  });

  it("resolves ids and drops unknown ones", () => {
    const first = VOCAB_TERMS[0];
    expect(first).toBeDefined();
    expect(resolveVocabTerms([first!.id, "not-a-term"])).toHaveLength(1);
    expect(findVocabTerm("not-a-term")).toBeUndefined();
  });
});

describe("vocabulary sets", () => {
  it("resolves every set member", () => {
    for (const set of VOCAB_SETS) {
      expect(setTerms(set)).toHaveLength(set.termIds.length);
    }
  });

  it("has no empty set", () => {
    for (const set of VOCAB_SETS) {
      expect(set.termIds.length).toBeGreaterThan(0);
    }
  });

  it("includes every term in the full glossary", () => {
    const everything = findVocabSet("everything");
    expect(everything?.termIds).toHaveLength(VOCAB_TERMS.length);
  });

  it("keeps the essentials set curated and resolvable", () => {
    const essentials = findVocabSet("essentials");
    expect(essentials).toBeDefined();
    // Hand-declared, so every id must resolve — a typo would silently shrink it.
    expect(setTerms(essentials!)).toHaveLength(essentials!.termIds.length);
    expect(essentials!.termIds.length).toBeGreaterThanOrEqual(40);
    expect(essentials!.termIds.length).toBeLessThanOrEqual(60);
    expect(new Set(essentials!.termIds).size).toBe(essentials!.termIds.length);
  });

  it("places every term in at least one set besides the glossary", () => {
    for (const term of VOCAB_TERMS) {
      expect(setsContaining(term.id).length).toBeGreaterThan(0);
    }
  });
});
