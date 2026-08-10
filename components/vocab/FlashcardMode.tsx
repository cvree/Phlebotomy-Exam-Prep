"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VocabGrade, VocabTerm } from "@/types/vocab";
import { createRandom, shuffle } from "@/lib/scoring/selection";
import {
  GradeButtons,
  NextReview,
  StageBadge,
  TermDetail,
  TermMeta,
  useVocabStudy,
} from "./shared";
import { Button, Card, Meter, cx } from "@/components/shared/ui";

/**
 * Flashcards.
 *
 * The card is a button: the whole surface flips, because on a phone that is
 * the target a thumb actually finds. Keyboard users get space to flip and
 * 1–4 to grade, which is the muscle memory anyone who has used a spaced
 * repetition tool already has.
 *
 * Grading is what feeds the scheduler, so the four buttons appear only after
 * the answer has been seen — grading a card you have not looked at is how a
 * review schedule becomes fiction.
 */
export function FlashcardMode({
  terms,
  setId,
}: {
  terms: VocabTerm[];
  setId: string;
}) {
  const { cards, grade, finish } = useVocabStudy(setId, "flashcards");

  const [seed, setSeed] = useState(1);
  const [shuffled, setShuffled] = useState(true);
  const [definitionFirst, setDefinitionFirst] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [graded, setGraded] = useState<Record<string, VocabGrade>>({});
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [done, setDone] = useState(false);
  const flipRef = useRef<HTMLButtonElement>(null);

  const ordered = useMemo(
    () => (shuffled ? shuffle(terms, createRandom(seed)) : terms),
    [terms, shuffled, seed],
  );

  const current = ordered[index];
  const total = ordered.length;

  const restart = useCallback(() => {
    setSeed(Date.now());
    setIndex(0);
    setFlipped(false);
    setGraded({});
    setDone(false);
    setStartedAt(Date.now());
  }, []);

  const advance = useCallback(() => {
    setFlipped(false);
    setIndex((value) => {
      if (value + 1 >= total) {
        setDone(true);
        return value;
      }
      return value + 1;
    });
  }, [total]);

  const handleGrade = useCallback(
    (value: VocabGrade) => {
      if (!current) return;
      grade(current.id, value);
      setGraded((previous) => ({ ...previous, [current.id]: value }));
      advance();
    },
    [current, grade, advance],
  );

  // Record the round once, when the last card has been graded.
  const finishedRef = useRef(false);
  useEffect(() => {
    if (!done || finishedRef.current) return;
    finishedRef.current = true;
    const values = Object.values(graded);
    finish({
      total: values.length,
      correct: values.filter((value) => value !== "again").length,
      newTerms: Object.keys(graded).filter((id) => !cards[id]).length,
      startedAt: new Date(startedAt).toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: Date.now() - startedAt,
    });
  }, [done, graded, cards, finish, startedAt]);

  useEffect(() => {
    if (!done) finishedRef.current = false;
  }, [done]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (done) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        setFlipped((value) => !value);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setFlipped(false);
        setIndex((value) => Math.max(0, value - 1));
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        advance();
        return;
      }
      if (flipped && ["1", "2", "3", "4"].includes(event.key)) {
        event.preventDefault();
        const grades: VocabGrade[] = ["again", "hard", "good", "easy"];
        const chosen = grades[Number(event.key) - 1];
        if (chosen) handleGrade(chosen);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [flipped, done, advance, handleGrade]);

  if (done) {
    return (
      <RoundSummary
        graded={graded}
        terms={ordered}
        onRestart={restart}
        durationMs={Date.now() - startedAt}
      />
    );
  }

  if (!current) {
    return null;
  }

  const front = definitionFirst ? current.definition : current.term;
  const card = cards[current.id];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink-muted">
          {index + 1}
          <span className="text-ink-subtle"> of {total}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          <Toggle
            pressed={definitionFirst}
            onClick={() => {
              setDefinitionFirst((value) => !value);
              setFlipped(false);
            }}
          >
            {definitionFirst ? "Definition first" : "Term first"}
          </Toggle>
          <Toggle
            pressed={shuffled}
            onClick={() => {
              setShuffled((value) => !value);
              setIndex(0);
              setFlipped(false);
            }}
          >
            Shuffle
          </Toggle>
        </div>
      </div>

      <Meter value={index} max={total} className="mb-5" />

      <button
        ref={flipRef}
        type="button"
        onClick={() => setFlipped((value) => !value)}
        aria-expanded={flipped}
        className={cx(
          "block w-full rounded-[var(--radius-lg)] border-2 bg-surface p-6 text-left",
          "shadow-[var(--shadow-card)] transition-colors sm:p-8",
          flipped ? "border-primary" : "border-line hover:border-line-strong",
          "min-h-[18rem] sm:min-h-[22rem]",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <TermMeta
            term={current}
            hidePronunciation={definitionFirst && !flipped}
          />
          <StageBadge card={card} />
        </div>

        {!flipped ? (
          <div className="flex min-h-[10rem] flex-col items-center justify-center text-center sm:min-h-[13rem]">
            <p
              className={cx(
                "font-display leading-tight text-ink",
                definitionFirst
                  ? "text-xl sm:text-2xl"
                  : "text-3xl sm:text-4xl",
              )}
            >
              {front}
            </p>
            <p className="mt-6 text-sm text-ink-subtle">
              Tap the card, or press space, to see the answer
            </p>
          </div>
        ) : (
          <div className="mt-5">
            <p className="mb-4 font-display text-2xl leading-tight text-ink">
              {current.term}
            </p>
            <TermDetail term={current} />
          </div>
        )}
      </button>

      {flipped ? (
        <div className="mt-5">
          <p className="mb-2.5 text-center text-sm text-ink-muted">
            How well did you know it?
          </p>
          <GradeButtons onGrade={handleGrade} />
          <p className="mt-2.5 text-center">
            <NextReview card={card} />
          </p>
        </div>
      ) : (
        <div className="mt-5 flex justify-between gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setFlipped(false);
              setIndex((value) => Math.max(0, value - 1));
            }}
            disabled={index === 0}
          >
            ← Previous
          </Button>
          <Button variant="secondary" onClick={advance}>
            Skip →
          </Button>
        </div>
      )}
    </div>
  );
}

function Toggle({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        "min-h-9 rounded-full border px-3 text-sm font-medium transition-colors",
        pressed
          ? "border-primary bg-primary-soft text-primary"
          : "border-line bg-surface text-ink-muted hover:border-line-strong",
      )}
    >
      {children}
    </button>
  );
}

function RoundSummary({
  graded,
  terms,
  onRestart,
  durationMs,
}: {
  graded: Record<string, VocabGrade>;
  terms: VocabTerm[];
  onRestart: () => void;
  durationMs: number;
}) {
  const entries = Object.entries(graded);
  const again = entries.filter(([, value]) => value === "again");
  const byId = new Map(terms.map((term) => [term.id, term]));
  const minutes = Math.max(1, Math.round(durationMs / 60_000));

  return (
    <Card className="p-5 sm:p-6">
      <h3 className="font-display text-2xl">Round complete</h3>
      <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
        {entries.length} card{entries.length === 1 ? "" : "s"} graded in about{" "}
        {minutes} minute{minutes === 1 ? "" : "s"}. Everything you graded is now
        on a review schedule.
      </p>

      {again.length > 0 ? (
        <div className="mt-5">
          <h4 className="font-sans text-sm font-semibold text-ink">
            Coming back soon
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
            {again.map(([termId]) => (
              <li key={termId}>{byId.get(termId)?.term ?? termId}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-5 text-sm text-success">
          Nothing marked Again — a clean round.
        </p>
      )}

      <Button size="lg" onClick={onRestart} className="mt-6 w-full sm:w-auto">
        Go again
      </Button>
    </Card>
  );
}
