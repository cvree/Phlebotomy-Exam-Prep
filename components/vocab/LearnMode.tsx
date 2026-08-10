"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VocabGrade, VocabStudyMode, VocabTerm } from "@/types/vocab";
import { findVocabTerm } from "@/data/vocab";
import { buildDueQueue } from "@/lib/vocab/scheduler";
import {
  buildLearnItems,
  buildMultipleChoiceItem,
  buildWrittenItem,
  type VocabStudyItem,
} from "@/lib/vocab/session";
import { gradeAgainstBank } from "@/lib/vocab/answerIndex";
import { track } from "@/lib/analytics";
import { Button, Card, Meter, Notice, cx } from "@/components/shared/ui";
import {
  MultipleChoiceView,
  WrittenView,
  type Reveal,
} from "./ItemViews";
import { NextReview, StageBadge, TermDetail, TermMeta, useVocabStudy } from "./shared";

/**
 * Learn.
 *
 * The adaptive mode. Terms arrive in the order the scheduler wants them, are
 * asked as multiple choice until the student has them right twice in a row,
 * and are then promoted to typed recall. A term answered wrong comes back
 * before the round ends — once, as multiple choice, because a student who has
 * just been shown the answer needs recognition practice before recall.
 *
 * `itemType` is what makes Write mode a configuration of this component rather
 * than a second implementation of it.
 */
export function LearnMode({
  terms,
  pool,
  setId,
  itemType = "adaptive",
  mode = "learn",
  roundLength = 10,
  emptyHint,
}: {
  terms: VocabTerm[];
  pool: VocabTerm[];
  setId: string;
  itemType?: "adaptive" | "multiple-choice" | "written";
  mode?: VocabStudyMode;
  roundLength?: number;
  emptyHint?: string;
}) {
  const { cards, grade, finish } = useVocabStudy(setId, mode);

  const [seed, setSeed] = useState(() => Date.now());
  const [position, setPosition] = useState(0);
  const [typed, setTyped] = useState("");
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const [reveal, setReveal] = useState<Reveal>(null);
  const [extra, setExtra] = useState<VocabStudyItem[]>([]);
  const [results, setResults] = useState<{ termId: string; correct: boolean }[]>(
    [],
  );
  const [startedAt] = useState(() => Date.now());
  const [roundStartedAt, setRoundStartedAt] = useState(() => Date.now());
  const requeued = useRef(new Set<string>());
  const headingRef = useRef<HTMLDivElement>(null);

  // The queue is rebuilt only when the seed changes, so answering a question
  // (which changes `cards`) cannot reshuffle the round in progress.
  const baseItems = useMemo(() => {
    const now = new Date();
    const queue = buildDueQueue(terms, cards, now, {
      limit: roundLength,
      newLimit: Math.max(4, Math.round(roundLength * 0.6)),
    });
    return buildLearnItems(queue, { pool, cards, seed, itemType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms, pool, seed, itemType, roundLength]);

  const items = useMemo(() => [...baseItems, ...extra], [baseItems, extra]);
  const current = items[position];
  const term = current ? findVocabTerm(current.termId) : undefined;
  const finished = position >= items.length;

  const startRound = useCallback(() => {
    setSeed(Date.now());
    setPosition(0);
    setExtra([]);
    setResults([]);
    setReveal(null);
    setTyped("");
    setChoiceId(null);
    requeued.current = new Set();
    setRoundStartedAt(Date.now());
    track("vocab_mode_started", { mode, set: setId });
  }, [mode, setId]);

  const record = useCallback(
    (termId: string, correct: boolean, value: VocabGrade) => {
      grade(termId, value);
      setResults((previous) => [...previous, { termId, correct }]);
    },
    [grade],
  );

  const answerMultipleChoice = useCallback(
    (selected: string) => {
      if (!current || current.kind !== "multiple-choice" || reveal) return;
      setChoiceId(selected);
      const correct = selected === current.correctChoiceId;
      setReveal({ correct });
      record(current.termId, correct, correct ? "good" : "again");
    },
    [current, reveal, record],
  );

  const answerWritten = useCallback(() => {
    if (!current || current.kind !== "written" || reveal || !term) return;
    const result = gradeAgainstBank(typed, term);
    const correct = result.verdict !== "incorrect";
    setReveal({ correct, verdict: result.verdict });
    record(
      current.termId,
      correct,
      result.verdict === "correct"
        ? "good"
        : result.verdict === "close"
          ? "hard"
          : "again",
    );
  }, [current, reveal, term, typed, record]);

  /** "I was right" — the student's judgement wins over string comparison. */
  const override = useCallback(() => {
    if (!current || !reveal || reveal.correct) return;
    grade(current.termId, "good");
    setResults((previous) => {
      const next = [...previous];
      for (let i = next.length - 1; i >= 0; i -= 1) {
        const entry = next[i];
        if (entry && entry.termId === current.termId) {
          next[i] = { ...entry, correct: true };
          break;
        }
      }
      return next;
    });
    setReveal({ correct: true, verdict: "correct" });
    requeued.current.add(current.termId);
  }, [current, reveal, grade]);

  const next = useCallback(() => {
    if (!current) return;

    // A missed term comes back once more in this round, as recognition.
    if (reveal && !reveal.correct && !requeued.current.has(current.termId)) {
      requeued.current.add(current.termId);
      const missedTerm = findVocabTerm(current.termId);
      if (missedTerm) {
        setExtra((previous) => [
          ...previous,
          itemType === "written"
            ? buildWrittenItem(missedTerm)
            : buildMultipleChoiceItem(
                missedTerm,
                pool,
                "definition-to-term",
                seed + previous.length + 7,
              ),
        ]);
      }
    }

    setReveal(null);
    setTyped("");
    setChoiceId(null);
    setPosition((value) => value + 1);
    headingRef.current?.focus();
  }, [current, reveal, itemType, pool, seed]);

  // Recorded from an effect, not during render: `finish` writes to storage and
  // notifies the provider, and a state update during render is a React error
  // waiting to happen.
  const finishedRef = useRef(false);
  useEffect(() => {
    if (!finished || items.length === 0) {
      finishedRef.current = false;
      return;
    }
    if (finishedRef.current) return;
    finishedRef.current = true;
    finish({
      total: results.length,
      correct: results.filter((entry) => entry.correct).length,
      newTerms: results.filter((entry) => !cards[entry.termId]).length,
      startedAt: new Date(roundStartedAt).toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: Date.now() - roundStartedAt,
    });
    // `cards` and `results` are read at the moment the round ends; adding them
    // as dependencies would re-run this on every answer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, items.length]);

  if (items.length === 0) {
    return (
      <Notice title="Nothing due right now" tone="success">
        {emptyHint ??
          "Every term in this set is scheduled for later. Flashcards and Match " +
            "are always available if you want to go through it anyway."}
      </Notice>
    );
  }

  if (finished) {
    return (
      <RoundSummary
        results={results}
        onRestart={startRound}
        durationMs={Date.now() - startedAt}
      />
    );
  }

  if (!current || !term) return null;

  const card = cards[current.termId];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink-muted">
          {Math.min(position + 1, items.length)}
          <span className="text-ink-subtle"> of {items.length}</span>
        </p>
        <p className="text-sm text-ink-muted">
          {results.filter((entry) => entry.correct).length} correct
        </p>
      </div>
      <Meter value={position} max={items.length} className="mb-5" />

      <Card className="p-4 sm:p-6">
        <div
          ref={headingRef}
          tabIndex={-1}
          className="mb-4 flex items-center justify-between gap-3 outline-none"
        >
          <TermMeta term={term} hidePronunciation={reveal === null} />
          <StageBadge card={card} />
        </div>

        {current.kind === "multiple-choice" ? (
          <MultipleChoiceView
            item={current}
            selectedId={choiceId}
            reveal={reveal}
            onSelect={answerMultipleChoice}
          />
        ) : current.kind === "written" ? (
          <WrittenView
            item={current}
            value={typed}
            onChange={setTyped}
            onSubmit={answerWritten}
            reveal={reveal}
          />
        ) : null}

        {reveal ? (
          <div className="mt-5 border-t border-line pt-5">
            <div
              className={cx(
                "mb-3 flex flex-wrap items-center gap-2 text-sm font-semibold",
                reveal.correct ? "text-success" : "text-danger",
              )}
              role="status"
            >
              {reveal.verdict === "close" ? (
                <span className="text-flag">
                  Close enough — the spelling is {term.term}
                </span>
              ) : reveal.correct ? (
                <span>Correct</span>
              ) : (
                <span>Not quite — it is {term.term}</span>
              )}
              <NextReview card={cards[current.termId]} />
            </div>

            <TermDetail term={term} compact />

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button size="lg" onClick={next} autoFocus>
                {position + 1 >= items.length ? "See results" : "Continue"}
              </Button>
              {!reveal.correct && current.kind === "written" ? (
                <Button variant="secondary" size="lg" onClick={override}>
                  I was right
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

function RoundSummary({
  results,
  onRestart,
  durationMs,
}: {
  results: { termId: string; correct: boolean }[];
  onRestart: () => void;
  durationMs: number;
}) {
  const correct = results.filter((entry) => entry.correct).length;
  const missed = [
    ...new Set(
      results.filter((entry) => !entry.correct).map((entry) => entry.termId),
    ),
  ];
  const percent = results.length === 0 ? 0 : Math.round((correct / results.length) * 100);
  const minutes = Math.max(1, Math.round(durationMs / 60_000));

  return (
    <Card
      className={cx(
        "border-2 p-5 sm:p-6",
        percent === 100 ? "border-success-border bg-success-soft" : "border-line",
      )}
    >
      <h3 className="font-display text-2xl">
        {correct} of {results.length} correct
      </h3>
      <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
        {percent}% this round, in about {minutes} minute
        {minutes === 1 ? "" : "s"}. Missed terms are already scheduled to come
        back sooner.
      </p>

      {missed.length > 0 ? (
        <div className="mt-5">
          <h4 className="font-sans text-sm font-semibold text-ink">
            Worth another look
          </h4>
          <ul className="mt-2.5 space-y-2.5">
            {missed.map((termId) => {
              const term = findVocabTerm(termId);
              if (!term) return null;
              return (
                <li
                  key={termId}
                  className="rounded-[var(--radius)] bg-surface px-3.5 py-3"
                >
                  <p className="font-semibold text-ink">{term.term}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">
                    {term.definition}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <Button size="lg" onClick={onRestart} className="mt-6 w-full sm:w-auto">
        Next round
      </Button>
    </Card>
  );
}
