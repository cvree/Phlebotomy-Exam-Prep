import { describe, expect, it } from "vitest";
import type { VocabCardState, VocabSessionSummary } from "@/types/vocab";
import { createMemoryDriver } from "@/lib/storage/driver";
import { migrateProgress } from "@/lib/storage/migrations";
import { StudyProgressRepository, trim } from "@/lib/storage/progressRepository";
import {
  LIMITS,
  PROGRESS_SCHEMA_VERSION,
  STORAGE_KEYS,
  createEmptyProgress,
} from "@/lib/storage/schema";
import {
  recordVocabReviews,
  recordVocabSession,
  resetVocabSet,
} from "@/lib/progress/mutations";
import { createCard, gradeCard } from "@/lib/vocab/scheduler";
import { setProgress, troubleTerms, vocabOverview } from "@/lib/vocab/progress";
import { VOCAB_TERMS } from "@/data/vocab";
import { findVocabSet, setTerms } from "@/data/vocab/sets";
import { attemptsFor, T0 } from "./helpers";

const NOW = new Date("2026-03-01T09:00:00.000Z");
const NOW_ISO = NOW.toISOString();

function session(
  overrides: Partial<VocabSessionSummary> = {},
): VocabSessionSummary {
  return {
    id: "vocab-1",
    setId: "essentials",
    mode: "learn",
    total: 10,
    correct: 8,
    newTerms: 3,
    startedAt: NOW_ISO,
    completedAt: NOW_ISO,
    durationMs: 120_000,
    ...overrides,
  };
}

describe("migration to v3", () => {
  it("adds vocabulary to a v2 record without touching anything else", () => {
    const v2 = JSON.stringify({
      version: 2,
      createdAt: T0,
      updatedAt: T0,
      questionStats: {},
      attempts: attemptsFor({
        domain: "order-of-draw",
        count: 4,
        correctPattern: [true, false],
      }),
      sessions: [],
      drills: [{ id: "d1", drill: "tube-colors", mode: "x", accuracy: 1, total: 8, correct: 8, perfect: true, at: T0 }],
      mockResults: [],
      streak: { current: 3, longest: 5, lastStudyDate: "2026-01-01" },
      // v2 had no vocab key.
    });

    const { progress, reset, fromVersion } = migrateProgress(v2, NOW_ISO);

    expect(reset).toBe(false);
    expect(fromVersion).toBe(2);
    expect(progress.version).toBe(PROGRESS_SCHEMA_VERSION);
    expect(progress.attempts).toHaveLength(4);
    expect(progress.drills).toHaveLength(1);
    expect(progress.streak).toEqual({
      current: 3,
      longest: 5,
      lastStudyDate: "2026-01-01",
    });
    expect(progress.vocab).toEqual({ cards: {}, sessions: [], matchBests: {} });
  });

  it("carries a v1 record all the way forward", () => {
    const v1 = JSON.stringify({
      version: 1,
      createdAt: T0,
      updatedAt: T0,
      questionStats: {},
      attempts: [],
      sessions: [],
      mockResults: [],
    });

    const { progress, reset } = migrateProgress(v1, NOW_ISO);
    expect(reset).toBe(false);
    expect(progress.version).toBe(3);
    expect(progress.drills).toEqual([]);
    expect(progress.vocab.cards).toEqual({});
  });

  it("preserves stored vocabulary on a same-version read", () => {
    const card = gradeCard(undefined, "add-edta", "good", NOW);
    const stored = JSON.stringify({
      ...createEmptyProgress(T0),
      vocab: { cards: { "add-edta": card }, sessions: [session()], matchBests: { essentials: 9000 } },
    });

    const { progress } = migrateProgress(stored, NOW_ISO);
    expect(progress.vocab.cards["add-edta"]).toEqual(card);
    expect(progress.vocab.sessions).toHaveLength(1);
    expect(progress.vocab.matchBests.essentials).toBe(9000);
  });

  it("replaces a vocabulary payload of the wrong shape rather than trusting it", () => {
    const stored = JSON.stringify({
      ...createEmptyProgress(T0),
      vocab: "not an object",
    });
    const { progress } = migrateProgress(stored, NOW_ISO);
    expect(progress.vocab).toEqual({ cards: {}, sessions: [], matchBests: {} });
  });
});

describe("recordVocabReviews", () => {
  it("writes card state by term id", () => {
    const card = gradeCard(undefined, "add-edta", "good", NOW);
    const progress = recordVocabReviews(createEmptyProgress(T0), [card]);
    expect(progress.vocab.cards["add-edta"]).toEqual(card);
  });

  it("replaces a previous state for the same term", () => {
    const first = gradeCard(undefined, "add-edta", "good", NOW);
    const second = gradeCard(first, "add-edta", "again", NOW);
    const progress = recordVocabReviews(createEmptyProgress(T0), [first, second]);
    expect(Object.keys(progress.vocab.cards)).toEqual(["add-edta"]);
    expect(progress.vocab.cards["add-edta"]?.stage).toBe("learning");
  });

  it("returns the same record when there is nothing to write", () => {
    const empty = createEmptyProgress(T0);
    expect(recordVocabReviews(empty, [])).toBe(empty);
  });
});

describe("recordVocabSession", () => {
  it("appends the session and advances the study streak", () => {
    const progress = recordVocabSession(createEmptyProgress(T0), session());
    expect(progress.vocab.sessions).toHaveLength(1);
    expect(progress.streak.current).toBe(1);
  });

  it("keeps only the fastest match time per set", () => {
    let progress = recordVocabSession(
      createEmptyProgress(T0),
      session({ id: "a", mode: "match", matchMs: 21_000 }),
    );
    progress = recordVocabSession(
      progress,
      session({ id: "b", mode: "match", matchMs: 30_000 }),
    );
    expect(progress.vocab.matchBests.essentials).toBe(21_000);

    progress = recordVocabSession(
      progress,
      session({ id: "c", mode: "match", matchMs: 18_500 }),
    );
    expect(progress.vocab.matchBests.essentials).toBe(18_500);
  });

  it("does not record a best time for non-match modes", () => {
    const progress = recordVocabSession(createEmptyProgress(T0), session());
    expect(progress.vocab.matchBests).toEqual({});
  });
});

describe("resetVocabSet", () => {
  it("forgets only the terms it is given", () => {
    const cards = [
      gradeCard(undefined, "add-edta", "good", NOW),
      gradeCard(undefined, "add-heparin", "good", NOW),
    ];
    const progress = recordVocabReviews(createEmptyProgress(T0), cards);
    const after = resetVocabSet(progress, ["add-edta"]);

    expect(after.vocab.cards["add-edta"]).toBeUndefined();
    expect(after.vocab.cards["add-heparin"]).toBeDefined();
  });
});

describe("trim", () => {
  it("caps vocabulary sessions but never card state", () => {
    const cards: Record<string, VocabCardState> = {};
    for (const term of VOCAB_TERMS) {
      cards[term.id] = createCard(term.id, NOW);
    }

    const progress = {
      ...createEmptyProgress(T0),
      vocab: {
        cards,
        sessions: Array.from({ length: LIMITS.vocabSessions + 25 }, (_, i) =>
          session({ id: `s${i}` }),
        ),
        matchBests: {},
      },
    };

    const trimmed = trim(progress);
    expect(trimmed.vocab.sessions).toHaveLength(LIMITS.vocabSessions);
    expect(trimmed.vocab.sessions[0]?.id).toBe("s25");
    expect(Object.keys(trimmed.vocab.cards)).toHaveLength(VOCAB_TERMS.length);
  });
});

describe("repository round-trip", () => {
  it("persists and reloads vocabulary state", () => {
    const driver = createMemoryDriver();
    const repository = new StudyProgressRepository({
      driver,
      clock: () => NOW,
    });

    const card = gradeCard(undefined, "cond-polycythemia-vera", "good", NOW);
    repository.update((current) => recordVocabReviews(current, [card]));

    const raw = driver.read(STORAGE_KEYS.progress);
    expect(raw).toContain("cond-polycythemia-vera");

    const reloaded = new StudyProgressRepository({ driver, clock: () => NOW });
    expect(reloaded.load().vocab.cards["cond-polycythemia-vera"]).toEqual(card);
  });

  it("clears vocabulary along with everything else on reset", () => {
    const driver = createMemoryDriver();
    const repository = new StudyProgressRepository({ driver, clock: () => NOW });
    repository.update((current) =>
      recordVocabReviews(current, [
        gradeCard(undefined, "add-edta", "good", NOW),
      ]),
    );

    expect(repository.reset().vocab.cards).toEqual({});
    expect(repository.load().vocab.cards).toEqual({});
  });
});

describe("rollups", () => {
  it("scores an untouched set at zero and a mastered one at one", () => {
    const set = findVocabSet("essentials");
    expect(set).toBeDefined();
    const terms = setTerms(set!);

    expect(setProgress(set!, terms, {}, NOW).completion).toBe(0);

    const mastered: Record<string, VocabCardState> = {};
    for (const term of terms) {
      mastered[term.id] = {
        ...createCard(term.id, NOW),
        stage: "mastered",
        intervalDays: 30,
        streak: 6,
        dueAt: new Date(NOW.getTime() + 30 * 86_400_000).toISOString(),
      };
    }

    const full = setProgress(set!, terms, mastered, NOW);
    expect(full.completion).toBe(1);
    expect(full.mastered).toBe(terms.length);
    expect(full.due).toBe(0);
  });

  it("gives partial credit for terms that are merely seen", () => {
    const set = findVocabSet("essentials");
    const terms = setTerms(set!);
    const first = terms[0];
    expect(first).toBeDefined();

    const stats = setProgress(
      set!,
      terms,
      { [first!.id]: createCard(first!.id, NOW) },
      NOW,
    );
    expect(stats.seen).toBe(1);
    expect(stats.familiar).toBe(0);
    expect(stats.completion).toBeGreaterThan(0);
    expect(stats.completion).toBeLessThan(1 / terms.length);
  });

  it("counts a card due now in the overview", () => {
    const overview = vocabOverview(
      { "add-edta": createCard("add-edta", NOW) },
      NOW,
    );
    expect(overview.due).toBe(1);
    expect(overview.studied).toBe(1);
    expect(overview.untouched).toBe(VOCAB_TERMS.length - 1);
  });

  it("ranks trouble terms by lapses, then by accuracy", () => {
    const cards: Record<string, VocabCardState> = {
      "add-edta": {
        ...createCard("add-edta", NOW),
        reviews: 4,
        correct: 3,
        lapses: 3,
      },
      "add-heparin": {
        ...createCard("add-heparin", NOW),
        reviews: 4,
        correct: 1,
        lapses: 1,
      },
      "add-sps": {
        ...createCard("add-sps", NOW),
        reviews: 4,
        correct: 2,
        lapses: 1,
      },
      // Never missed: excluded entirely.
      "add-acd": { ...createCard("add-acd", NOW), reviews: 3, correct: 3 },
    };

    const ranked = troubleTerms(cards).map((entry) => entry.term.id);
    expect(ranked).toEqual(["add-edta", "add-heparin", "add-sps"]);
  });
});
