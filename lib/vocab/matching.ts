import type { VocabTerm } from "@/types/vocab";

/**
 * Grading a typed answer.
 *
 * Medical vocabulary is hard to spell and easy to *nearly* spell. A tool that
 * marks "thrombocytopenia" wrong because a student typed "thrombocytopena"
 * teaches nothing except that typing is risky, so near-misses get their own
 * verdict — "close" — which the UI shows as correct-but-check-the-spelling
 * rather than as a failure.
 *
 * The reverse mistake matters more: "leukocytosis" must never be accepted for
 * "leukopenia". The distance thresholds below scale with word length and stay
 * well under the gap between any two real terms in the bank; the test suite
 * asserts that no confusable pair is within tolerance of another.
 */

export type MatchVerdict = "correct" | "close" | "incorrect";

export type MatchResult = {
  verdict: MatchVerdict;
  /** The accepted form the answer matched, when it matched something. */
  matched?: string;
  /** Edit distance to the nearest accepted answer. */
  distance: number;
};

/**
 * Reduces an answer to what it actually says.
 *
 * Case, accents, punctuation, articles, and the parenthetical gloss we add to
 * some terms ("QNS (quantity not sufficient)") are all noise a student should
 * not be penalized for.
 */
export function normalizeAnswer(value: string): string {
  return value
    .normalize("NFD")
    // Combining diacritical marks, stripped so "café" matches "cafe".
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(a|an|the)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Every string that counts as naming this term. */
export function acceptedAnswers(term: VocabTerm): string[] {
  const answers = [term.term, ...(term.aliases ?? [])];

  // A term written as "QNS (quantity not sufficient)" should also be accepted
  // as just "QNS" and as just the expansion.
  const parenthetical = /^(.*?)\s*\((.+)\)\s*$/.exec(term.term);
  if (parenthetical) {
    const [, head, inner] = parenthetical;
    if (head) answers.push(head);
    if (inner) answers.push(inner);
  }

  // "Medial (versus lateral)" style entries name two ideas; accept either.
  const versus = /^(.*?)\s*\(versus\s+(.+?)\)\s*$/i.exec(term.term);
  if (versus) {
    const [, left, right] = versus;
    if (left) answers.push(left);
    if (right) answers.push(right);
  }

  return answers
    .map((answer) => answer.trim())
    .filter((answer) => answer.length > 0);
}

/** Levenshtein distance, two rows at a time. */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i, ...Array<number>(b.length).fill(0)];
    for (let j = 1; j <= b.length; j += 1) {
      const substitution =
        (previous[j - 1] ?? 0) + (a[i - 1] === b[j - 1] ? 0 : 1);
      const deletion = (previous[j] ?? 0) + 1;
      const insertion = (current[j - 1] ?? 0) + 1;
      current[j] = Math.min(substitution, deletion, insertion);
    }
    previous = current;
  }

  return previous[b.length] ?? 0;
}

/**
 * How far off a typed answer may be and still count as a near-miss.
 *
 * Short answers get no tolerance at all: at four characters, one edit is the
 * difference between two different words.
 */
export function tolerance(length: number): number {
  if (length <= 4) return 0;
  if (length <= 8) return 1;
  if (length <= 14) return 2;
  return 3;
}

export type GradeOptions = {
  /**
   * Normalized answers that name some term in the bank.
   *
   * Spelling tolerance is what makes "thrombocytopena" acceptable, and it is
   * also what would make "radial artery" acceptable for "brachial artery" —
   * they are three edits apart. Anything the student typed that is itself the
   * name of a real term is therefore never treated as a near-miss of a
   * different one: they did not misspell it, they answered with the wrong
   * term.
   */
  reserved?: ReadonlySet<string>;
};

export function gradeTypedAnswer(
  input: string,
  term: VocabTerm,
  options: GradeOptions = {},
): MatchResult {
  const typed = normalizeAnswer(input);
  if (typed.length === 0) {
    return { verdict: "incorrect", distance: Number.POSITIVE_INFINITY };
  }

  let best: { answer: string; distance: number } | null = null;

  for (const answer of acceptedAnswers(term)) {
    const target = normalizeAnswer(answer);
    if (target.length === 0) continue;

    if (typed === target) {
      return { verdict: "correct", matched: answer, distance: 0 };
    }

    const distance = editDistance(typed, target);
    if (!best || distance < best.distance) {
      best = { answer, distance };
    }
  }

  if (!best) {
    return { verdict: "incorrect", distance: Number.POSITIVE_INFINITY };
  }

  // Reaching here means the answer was not an exact match for this term, so a
  // hit in `reserved` can only be the name of a different one.
  if (options.reserved?.has(typed)) {
    return { verdict: "incorrect", distance: best.distance };
  }

  const target = normalizeAnswer(best.answer);
  const allowed = tolerance(Math.max(typed.length, target.length));
  const isClose = allowed > 0 && best.distance <= allowed;

  return {
    verdict: isClose ? "close" : "incorrect",
    matched: isClose ? best.answer : undefined,
    distance: best.distance,
  };
}

/**
 * Marks up a typed answer against the correct one, character by character.
 *
 * Used to show a student *where* their spelling diverged instead of only
 * telling them that it did.
 */
export function diffAnswer(
  input: string,
  correct: string,
): { char: string; ok: boolean }[] {
  const typed = input.trim();
  const target = correct.trim();
  return Array.from(typed).map((char, index) => ({
    char,
    ok: (target[index] ?? "").toLowerCase() === char.toLowerCase(),
  }));
}
