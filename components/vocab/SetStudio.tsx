"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { VocabSet, VocabTerm } from "@/types/vocab";
import { VOCAB_TERMS } from "@/data/vocab";
import { setProgress } from "@/lib/vocab/progress";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { track } from "@/lib/analytics";
import { Button, Card, Notice, cx } from "@/components/shared/ui";
import { FlashcardMode } from "./FlashcardMode";
import { LearnMode } from "./LearnMode";
import { MatchMode } from "./MatchMode";
import { TestMode } from "./TestMode";
import { TermBrowser } from "./TermBrowser";
import { ProgressRing } from "./shared";

/**
 * The set page.
 *
 * One set, five ways to study it, and a browse tab for reading. The mode lives
 * in component state rather than the URL: switching modes is a change of
 * activity within one page, and putting it in the address bar would make the
 * back button undo a round of studying instead of leaving the set.
 */

type ModeId = "flashcards" | "learn" | "write" | "match" | "test" | "browse";

const MODES: { id: ModeId; label: string; blurb: string }[] = [
  {
    id: "flashcards",
    label: "Flashcards",
    blurb: "Flip through at your own pace and grade yourself honestly.",
  },
  {
    id: "learn",
    label: "Learn",
    blurb:
      "Adaptive rounds. Recognition first, typed recall once you have it twice.",
  },
  {
    id: "write",
    label: "Write",
    blurb: "Type every answer. Near-misses on spelling still count.",
  },
  {
    id: "match",
    label: "Match",
    blurb: "Six pairs against the clock.",
  },
  {
    id: "test",
    label: "Test",
    blurb: "Mixed questions, no feedback until you submit.",
  },
  {
    id: "browse",
    label: "Browse",
    blurb: "Read the whole set, search it, and see what you keep missing.",
  },
];

export function SetStudio({
  set,
  terms,
}: {
  set: VocabSet;
  terms: VocabTerm[];
}) {
  const { progress, ready, resetVocabTerms } = useStudyProgress();
  const [mode, setMode] = useState<ModeId>("learn");

  // Distractors come from inside the set when it is big enough to supply
  // plausible ones — a wrong answer from the same area is a real test. Small
  // sets fall back to the whole bank rather than offering three obvious
  // rejects.
  const pool = terms.length >= 8 ? terms : VOCAB_TERMS;

  const stats = useMemo(
    () => setProgress(set, terms, progress.vocab.cards, new Date()),
    [set, terms, progress.vocab.cards],
  );

  useEffect(() => {
    track("vocab_set_viewed", { set: set.id, terms: terms.length });
  }, [set.id, terms.length]);

  const active = MODES.find((entry) => entry.id === mode);

  return (
    <div>
      <Card className="p-5 sm:p-6">
        {/*
          Stacked on a phone. Side by side, the progress ring squeezes a long
          set name into a one-word-per-line column.
        */}
        <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <div className="min-w-0 sm:flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.09em] text-primary">
              {set.kind === "curated" ? "Curated set" : "Study area"}
            </p>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl">{set.name}</h1>
            <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-muted">
              {set.description}
            </p>
          </div>

          {ready ? (
            <div className="flex items-center gap-3">
              <ProgressRing
                value={stats.completion}
                size={56}
                label={`${Math.round(stats.completion * 100)} percent complete`}
              />
              <div>
                <p className="font-display text-2xl leading-none text-ink">
                  {Math.round(stats.completion * 100)}%
                </p>
                <p className="text-xs text-ink-subtle">
                  {stats.mastered} of {stats.total} mastered
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {ready ? (
          <dl className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <MiniStat label="Terms" value={stats.total} />
            <MiniStat label="Seen" value={stats.seen} />
            <MiniStat label="Familiar" value={stats.familiar} />
            <MiniStat
              label="Due now"
              value={stats.due}
              tone={stats.due > 0 ? "primary" : "neutral"}
            />
          </dl>
        ) : null}

        {set.studyHref ? (
          <p className="mt-4 text-sm">
            <Link
              href={set.studyHref}
              className="font-semibold text-primary hover:underline"
            >
              Read the full study guide for this area →
            </Link>
          </p>
        ) : null}
      </Card>

      <nav aria-label="Study mode" className="mt-6">
        <ul className="flex gap-2 overflow-x-auto pb-1">
          {MODES.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                aria-current={mode === entry.id ? "true" : undefined}
                onClick={() => {
                  setMode(entry.id);
                  if (entry.id !== "browse") {
                    track("vocab_mode_started", {
                      mode: entry.id,
                      set: set.id,
                    });
                  }
                }}
                className={cx(
                  "min-h-11 whitespace-nowrap rounded-[var(--radius)] border-2 px-4",
                  "text-sm font-semibold transition-colors",
                  mode === entry.id
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-line bg-surface text-ink-muted hover:border-line-strong",
                )}
              >
                {entry.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {active ? (
        <p className="mt-3 text-sm text-ink-subtle">{active.blurb}</p>
      ) : null}

      {/*
        Nothing studiable renders until stored progress has been read.

        Two reasons, and both are correctness rather than polish: every mode
        seeds its round from the clock, and every queue is built from the
        student's card state — neither of which exists during the static
        prerender. Rendering a round on the server would guarantee a hydration
        mismatch and hand the student a queue built from an empty schedule.
      */}
      <div className="mt-5">
        {!ready ? (
          <div
            className="h-72 animate-pulse rounded-[var(--radius-lg)] bg-surface-muted"
            aria-hidden="true"
          />
        ) : null}
        {ready && mode === "flashcards" ? (
          <FlashcardMode terms={terms} setId={set.id} />
        ) : null}
        {ready && mode === "learn" ? (
          <LearnMode terms={terms} pool={pool} setId={set.id} mode="learn" />
        ) : null}
        {ready && mode === "write" ? (
          <LearnMode
            terms={terms}
            pool={pool}
            setId={set.id}
            mode="write"
            itemType="written"
            emptyHint="Nothing in this set is due for typed recall right now. Come back when the scheduler brings it round, or use Flashcards in the meantime."
          />
        ) : null}
        {ready && mode === "match" ? <MatchMode terms={terms} setId={set.id} /> : null}
        {ready && mode === "test" ? (
          <TestMode terms={terms} pool={pool} setId={set.id} />
        ) : null}
        {ready && mode === "browse" ? (
          <TermBrowser terms={terms} showCategoryFilter={set.kind === "curated"} />
        ) : null}
      </div>

      {ready && stats.seen > 0 ? (
        <div className="mt-10 border-t border-line pt-6">
          <Notice title="Start this set over?">
            Resetting forgets the review schedule for these {stats.total} terms
            only. Your practice questions, drills, and mock exams are untouched.
            <div className="mt-3">
              <Button
                variant="danger"
                onClick={() => {
                  if (
                    window.confirm(
                      `Reset the review schedule for all ${stats.total} terms in "${set.name}"?`,
                    )
                  ) {
                    resetVocabTerms(terms.map((term) => term.id));
                  }
                }}
              >
                Reset this set
              </Button>
            </div>
          </Notice>
        </div>
      ) : null}
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "primary";
}) {
  return (
    <div
      className={cx(
        "rounded-[var(--radius)] border px-3.5 py-2.5",
        tone === "primary"
          ? "border-transparent bg-primary-soft"
          : "border-line bg-surface",
      )}
    >
      <dt className="text-xs font-semibold uppercase tracking-[0.07em] text-ink-subtle">
        {label}
      </dt>
      <dd
        className={cx(
          "mt-0.5 font-display text-xl",
          tone === "primary" ? "text-primary" : "text-ink",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
