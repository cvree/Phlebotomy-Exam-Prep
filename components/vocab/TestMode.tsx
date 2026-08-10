"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { VocabTerm } from "@/types/vocab";
import { findVocabTerm } from "@/data/vocab";
import { buildTestPaper, type VocabStudyItem } from "@/lib/vocab/session";
import type { MatchVerdict } from "@/lib/vocab/matching";
import { gradeAgainstBank } from "@/lib/vocab/answerIndex";
import { createRandom, shuffle } from "@/lib/scoring/selection";
import { track } from "@/lib/analytics";
import { Button, Card, Notice, StatTile, cx } from "@/components/shared/ui";
import {
  MultipleChoiceView,
  TrueFalseView,
  WrittenView,
  type Reveal,
} from "./ItemViews";
import { TermDetail, useVocabStudy } from "./shared";

/**
 * Test.
 *
 * Everything on one page, nothing revealed until submit. That is the point:
 * the other modes correct you the moment you are wrong, which is how you
 * learn, and this one does not, which is how you find out what you actually
 * know. Grades still feed the scheduler — an exam-style miss is real evidence.
 */

type Answer = { choiceId?: string; text?: string; boolean?: boolean };

const LENGTHS = [10, 20, 30];

export function TestMode({
  terms,
  pool,
  setId,
}: {
  terms: VocabTerm[];
  pool: VocabTerm[];
  setId: string;
}) {
  const { grade, finish } = useVocabStudy(setId, "test");

  const [length, setLength] = useState(() => Math.min(10, terms.length));
  const [seed, setSeed] = useState(() => Date.now());
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const resultsRef = useRef<HTMLDivElement>(null);

  // Shuffled before slicing, so a 10-question test is a different ten each
  // time rather than the first ten terms of the set forever.
  const paper = useMemo(() => {
    const sample = shuffle(terms, createRandom(seed)).slice(
      0,
      Math.max(length, 1),
    );
    return buildTestPaper(sample, { pool, seed });
  }, [terms, length, pool, seed]);

  const graded = useMemo(
    () => paper.map((item, index) => gradeItem(item, answers[index])),
    [paper, answers],
  );

  const correctCount = graded.filter((entry) => entry.correct).length;
  const answeredCount = graded.filter((entry) => entry.answered).length;

  const submit = useCallback(() => {
    if (submitted) return;
    setSubmitted(true);

    for (const [index, item] of paper.entries()) {
      const result = graded[index];
      if (!result) continue;
      grade(item.termId, result.correct ? "good" : "again");
    }

    finish({
      total: paper.length,
      correct: graded.filter((entry) => entry.correct).length,
      newTerms: 0,
      startedAt: new Date(startedAt).toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: Date.now() - startedAt,
    });

    window.setTimeout(
      () => resultsRef.current?.scrollIntoView({ behavior: "smooth" }),
      0,
    );
  }, [submitted, paper, graded, grade, finish, startedAt]);

  const restart = useCallback(() => {
    setSeed(Date.now());
    setAnswers({});
    setSubmitted(false);
    setStartedAt(Date.now());
    track("vocab_mode_started", { mode: "test", set: setId });
  }, [setId]);

  if (terms.length < 4) {
    return (
      <Notice title="Not enough terms to build a test">
        A test needs at least four terms so that the wrong answers are
        plausible. Pick a larger set.
      </Notice>
    );
  }

  const percent =
    paper.length === 0 ? 0 : Math.round((correctCount / paper.length) * 100);

  return (
    <div>
      {!submitted ? (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-ink">Questions</span>
          {LENGTHS.filter((value) => value <= terms.length).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={length === value}
              onClick={() => {
                setLength(value);
                setAnswers({});
              }}
              className={cx(
                "min-h-9 rounded-full border px-3.5 text-sm font-semibold transition-colors",
                length === value
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-line bg-surface text-ink-muted hover:border-line-strong",
              )}
            >
              {value}
            </button>
          ))}
          <span className="ml-auto text-sm text-ink-subtle">
            {answeredCount} of {paper.length} answered
          </span>
        </div>
      ) : null}

      {submitted ? (
        <div ref={resultsRef}>
          <Card
            className={cx(
              "mb-6 border-2 p-5",
              percent >= 80
                ? "border-success-border bg-success-soft"
                : "border-line",
            )}
          >
            <h3 className="font-display text-3xl">
              {correctCount} / {paper.length}
            </h3>
            <p className="mt-1 text-[0.9375rem] text-ink-muted">
              {percent}%. Every answer below shows the term it was testing.
            </p>
            <dl className="mt-4 grid grid-cols-3 gap-3">
              <StatTile label="Correct" value={String(correctCount)} />
              <StatTile
                label="Missed"
                value={String(paper.length - correctCount)}
              />
              <StatTile
                label="Minutes"
                value={String(
                  Math.max(1, Math.round((Date.now() - startedAt) / 60_000)),
                )}
              />
            </dl>
            <Button size="lg" onClick={restart} className="mt-5 w-full sm:w-auto">
              New test
            </Button>
          </Card>
        </div>
      ) : null}

      <ol className="space-y-4">
        {paper.map((item, index) => {
          const answer = answers[index] ?? {};
          const result = graded[index];
          const reveal: Reveal = submitted
            ? { correct: result?.correct ?? false, verdict: result?.verdict }
            : null;
          const term = findVocabTerm(item.termId);

          return (
            <li key={`${item.termId}-${index}`}>
              <Card className="p-4 sm:p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-ink-subtle">
                  Question {index + 1}
                </p>

                {item.kind === "multiple-choice" ? (
                  <MultipleChoiceView
                    item={item}
                    selectedId={answer.choiceId ?? null}
                    reveal={reveal}
                    onSelect={(choiceId) =>
                      setAnswers((previous) => ({
                        ...previous,
                        [index]: { choiceId },
                      }))
                    }
                  />
                ) : item.kind === "written" ? (
                  <WrittenView
                    item={item}
                    value={answer.text ?? ""}
                    onChange={(text) =>
                      setAnswers((previous) => ({
                        ...previous,
                        [index]: { text },
                      }))
                    }
                    onSubmit={() => undefined}
                    reveal={reveal}
                    autoFocus={false}
                  />
                ) : (
                  <TrueFalseView
                    item={item}
                    answer={answer.boolean ?? null}
                    reveal={reveal}
                    onAnswer={(value) =>
                      setAnswers((previous) => ({
                        ...previous,
                        [index]: { boolean: value },
                      }))
                    }
                  />
                )}

                {submitted && term ? (
                  <div className="mt-4 border-t border-line pt-4">
                    <p
                      className={cx(
                        "mb-2 text-sm font-semibold",
                        result?.correct ? "text-success" : "text-danger",
                      )}
                    >
                      {result?.correct
                        ? "Correct"
                        : `The answer is ${term.term}`}
                    </p>
                    <TermDetail term={term} compact />
                  </div>
                ) : null}
              </Card>
            </li>
          );
        })}
      </ol>

      {!submitted ? (
        <div className="sticky bottom-4 mt-6">
          <Button
            size="lg"
            onClick={submit}
            className="w-full shadow-[var(--shadow-lift)]"
          >
            Submit test
            {answeredCount < paper.length
              ? ` (${paper.length - answeredCount} unanswered)`
              : ""}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

type ItemResult = {
  correct: boolean;
  answered: boolean;
  verdict?: MatchVerdict;
};

function gradeItem(item: VocabStudyItem, answer: Answer | undefined): ItemResult {
  if (item.kind === "multiple-choice") {
    return {
      answered: answer?.choiceId !== undefined,
      correct: answer?.choiceId === item.correctChoiceId,
    };
  }

  if (item.kind === "true-false") {
    return {
      answered: answer?.boolean !== undefined,
      correct: answer?.boolean === item.correct,
    };
  }

  const term = findVocabTerm(item.termId);
  if (!term || answer?.text === undefined) {
    return { answered: false, correct: false };
  }

  const result = gradeAgainstBank(answer.text, term);
  return {
    answered: answer.text.trim().length > 0,
    correct: result.verdict !== "incorrect",
    verdict: result.verdict,
  };
}
