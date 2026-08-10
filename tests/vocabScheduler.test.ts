import { describe, expect, it } from "vitest";
import type { VocabCardState, VocabTerm } from "@/types/vocab";
import {
  SCHEDULER,
  bucketTerms,
  buildDueQueue,
  countDue,
  createCard,
  describeInterval,
  gradeCard,
  gradeFromOutcome,
  isDue,
} from "@/lib/vocab/scheduler";

const NOW = new Date("2026-03-01T09:00:00.000Z");

function at(offsetMs: number): Date {
  return new Date(NOW.getTime() + offsetMs);
}

const MINUTE = 60_000;
const DAY = 86_400_000;

function term(id: string, overrides: Partial<VocabTerm> = {}): VocabTerm {
  return {
    id,
    term: id,
    category: "word-parts",
    definition: `Definition of ${id}.`,
    difficulty: 1,
    tags: [],
    sources: [{ label: "test" }],
    reviewStatus: "needs-review",
    version: 1,
    ...overrides,
  };
}

/** Walks a card through repeated "good" answers, advancing the clock each time. */
function learnFully(termId: string, steps: number): VocabCardState {
  let card = gradeCard(undefined, termId, "good", NOW);
  let clock = NOW.getTime();
  for (let i = 1; i < steps; i += 1) {
    clock = Date.parse(card.dueAt);
    card = gradeCard(card, termId, "good", new Date(clock));
  }
  return card;
}

describe("createCard", () => {
  it("starts a term in learning, due immediately", () => {
    const card = createCard("t1", NOW);
    expect(card.stage).toBe("learning");
    expect(card.reviews).toBe(0);
    expect(card.ease).toBe(SCHEDULER.startingEase);
    expect(isDue(card, NOW)).toBe(true);
  });
});

describe("gradeCard — learning steps", () => {
  it("walks a new term through the learning steps on 'good'", () => {
    const first = gradeCard(undefined, "t1", "good", NOW);
    expect(first.stage).toBe("learning");
    expect(first.step).toBe(1);
    expect(first.dueAt).toBe(at(SCHEDULER.learningStepsMinutes[1]! * MINUTE).toISOString());

    const second = gradeCard(first, "t1", "good", NOW);
    expect(second.stage).toBe("review");
    expect(second.intervalDays).toBe(SCHEDULER.graduatingIntervalDays);
    expect(second.dueAt).toBe(at(DAY).toISOString());
  });

  it("repeats the current step on 'hard' rather than advancing it", () => {
    const first = gradeCard(undefined, "t1", "good", NOW);
    const held = gradeCard(first, "t1", "hard", NOW);
    expect(held.step).toBe(first.step);
    expect(held.stage).toBe("learning");
  });

  it("graduates immediately on 'easy'", () => {
    const card = gradeCard(undefined, "t1", "easy", NOW);
    expect(card.stage).toBe("review");
    expect(card.intervalDays).toBe(SCHEDULER.easyGraduatingIntervalDays);
    expect(card.ease).toBeGreaterThan(SCHEDULER.startingEase);
  });

  it("counts a first 'again' as a miss without counting a lapse", () => {
    const card = gradeCard(undefined, "t1", "again", NOW);
    expect(card.stage).toBe("learning");
    expect(card.lapses).toBe(0);
    expect(card.correct).toBe(0);
    expect(card.reviews).toBe(1);
    expect(card.dueAt).toBe(at(SCHEDULER.relearnStepMinutes * MINUTE).toISOString());
  });
});

describe("gradeCard — review", () => {
  it("multiplies the interval by the ease on 'good'", () => {
    const graduated = learnFully("t1", 2);
    expect(graduated.stage).toBe("review");

    const next = gradeCard(graduated, "t1", "good", new Date(Date.parse(graduated.dueAt)));
    expect(next.intervalDays).toBeCloseTo(
      graduated.intervalDays * graduated.ease,
      2,
    );
  });

  it("grows the interval on every successful review", () => {
    let card = learnFully("t1", 2);
    const intervals: number[] = [card.intervalDays];

    for (let i = 0; i < 5; i += 1) {
      card = gradeCard(card, "t1", "good", new Date(Date.parse(card.dueAt)));
      intervals.push(card.intervalDays);
    }

    for (let i = 1; i < intervals.length; i += 1) {
      expect(intervals[i]!).toBeGreaterThan(intervals[i - 1]!);
    }
  });

  it("never schedules beyond the maximum interval", () => {
    let card = learnFully("t1", 2);
    for (let i = 0; i < 40; i += 1) {
      card = gradeCard(card, "t1", "easy", new Date(Date.parse(card.dueAt)));
    }
    expect(card.intervalDays).toBeLessThanOrEqual(SCHEDULER.maximumIntervalDays);
  });

  it("records a lapse and drops the ease when a graduated card is forgotten", () => {
    const graduated = learnFully("t1", 2);
    const lapsed = gradeCard(graduated, "t1", "again", new Date(Date.parse(graduated.dueAt)));

    expect(lapsed.stage).toBe("relearning");
    expect(lapsed.lapses).toBe(1);
    expect(lapsed.streak).toBe(0);
    expect(lapsed.intervalDays).toBe(0);
    expect(lapsed.ease).toBeLessThan(graduated.ease);
  });

  it("keeps the ease inside its band however it is graded", () => {
    let card = learnFully("t1", 2);
    for (let i = 0; i < 30; i += 1) {
      card = gradeCard(card, "t1", "again", new Date(Date.parse(card.dueAt)));
    }
    expect(card.ease).toBeGreaterThanOrEqual(SCHEDULER.minimumEase);

    let easy = learnFully("t2", 2);
    for (let i = 0; i < 30; i += 1) {
      easy = gradeCard(easy, "t2", "easy", new Date(Date.parse(easy.dueAt)));
    }
    expect(easy.ease).toBeLessThanOrEqual(SCHEDULER.maximumEase);
  });

  it("reaches 'mastered' only with both a long interval and a long streak", () => {
    let card = learnFully("t1", 2);
    while (card.intervalDays < SCHEDULER.masteredIntervalDays) {
      card = gradeCard(card, "t1", "good", new Date(Date.parse(card.dueAt)));
    }
    expect(card.streak).toBeGreaterThanOrEqual(SCHEDULER.masteredStreak);
    expect(card.stage).toBe("mastered");
  });

  it("does not call a card mastered on interval alone", () => {
    // Straight to a long interval with a short streak: easy twice.
    const first = gradeCard(undefined, "t1", "easy", NOW);
    const second = gradeCard(first, "t1", "easy", new Date(Date.parse(first.dueAt)));
    expect(second.streak).toBeLessThan(SCHEDULER.masteredStreak);
    expect(second.stage).toBe("review");
  });
});

describe("gradeFromOutcome", () => {
  it("maps right and wrong onto the four-grade scale", () => {
    expect(gradeFromOutcome(true)).toBe("good");
    expect(gradeFromOutcome(true, { hesitant: true })).toBe("hard");
    expect(gradeFromOutcome(false)).toBe("again");
  });
});

describe("bucketTerms and buildDueQueue", () => {
  const terms = [term("a"), term("b"), term("c"), term("d")];

  it("treats terms with no card as fresh", () => {
    const buckets = bucketTerms(terms, {}, NOW);
    expect(buckets.fresh).toHaveLength(4);
    expect(buckets.review).toHaveLength(0);
    expect(countDue(terms, {}, NOW)).toBe(0);
  });

  it("separates due cards from waiting ones", () => {
    const graduated = learnFully("a", 2);
    const cards = { a: graduated };

    expect(bucketTerms(terms, cards, NOW).waiting.map((t) => t.id)).toEqual(["a"]);
    expect(
      bucketTerms(terms, cards, new Date(Date.parse(graduated.dueAt))).review.map(
        (t) => t.id,
      ),
    ).toEqual(["a"]);
  });

  it("puts learning cards ahead of review cards, and new terms last", () => {
    const learning = gradeCard(undefined, "c", "again", NOW);
    const graduated = learnFully("a", 2);
    const later = new Date(Date.parse(graduated.dueAt) + DAY);

    const queue = buildDueQueue(terms, { a: graduated, c: learning }, later);
    expect(queue[0]?.id).toBe("c");
    expect(queue[1]?.id).toBe("a");
    expect(queue.slice(2).map((t) => t.id).sort()).toEqual(["b", "d"]);
  });

  it("caps new terms so a first session cannot flood the schedule", () => {
    const many = Array.from({ length: 40 }, (_, i) => term(`t${i}`));
    const queue = buildDueQueue(many, {}, NOW, { limit: 20, newLimit: 5 });
    expect(queue).toHaveLength(5);
  });

  it("respects the overall limit", () => {
    const many = Array.from({ length: 40 }, (_, i) => term(`t${i}`));
    const cards: Record<string, VocabCardState> = {};
    for (const entry of many) {
      cards[entry.id] = gradeCard(undefined, entry.id, "again", NOW);
    }
    const queue = buildDueQueue(many, cards, at(30 * MINUTE), { limit: 12 });
    expect(queue).toHaveLength(12);
  });
});

describe("describeInterval", () => {
  it("describes the wait in the coarsest useful unit", () => {
    const card = createCard("t1", NOW);
    expect(describeInterval(card, NOW)).toBe("now");
    expect(describeInterval({ ...card, dueAt: at(20 * MINUTE).toISOString() }, NOW)).toBe(
      "in 20 min",
    );
    expect(describeInterval({ ...card, dueAt: at(5 * 3_600_000).toISOString() }, NOW)).toBe(
      "in 5 h",
    );
    expect(describeInterval({ ...card, dueAt: at(3 * DAY).toISOString() }, NOW)).toBe(
      "in 3 days",
    );
    expect(describeInterval({ ...card, dueAt: at(1 * DAY).toISOString() }, NOW)).toBe(
      "in 1 day",
    );
    expect(describeInterval({ ...card, dueAt: at(90 * DAY).toISOString() }, NOW)).toBe(
      "in 3 months",
    );
  });
});
