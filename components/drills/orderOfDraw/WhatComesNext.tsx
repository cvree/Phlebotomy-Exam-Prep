"use client";

import { useCallback, useRef, useState } from "react";
import type { NextInSequenceItem } from "@/lib/drills/orderOfDraw";
import { gradeChoiceRound, type ChoiceRoundGrade } from "@/lib/drills/orderOfDraw";
import { Button, Card, Meter, cx } from "@/components/shared/ui";
import { CARD_TONES, CardFace, SlotNumber } from "./SequenceCard";

/**
 * "What comes next?"
 *
 * The arrangement drill asks for the whole sequence at once. This one puts the
 * student mid-draw with tubes already collected and asks for the single next
 * decision — which is the form the decision actually takes at the chair, and
 * the form most exam questions take.
 */
export function WhatComesNext({
  items,
  onComplete,
}: {
  items: NextInSequenceItem[];
  onComplete: (grade: ChoiceRoundGrade) => void;
}) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const item = items[index];
  const revealed = chosen !== null;
  const answeredRight = chosen !== null && chosen === item?.answer.stepId;

  const answer = useCallback(
    (stepId: number) => {
      if (!item || chosen !== null) return;
      setChosen(stepId);
      if (stepId === item.answer.stepId) {
        setCorrect((value) => value + 1);
      }
    },
    [chosen, item],
  );

  const next = useCallback(() => {
    if (index + 1 >= items.length) {
      onComplete(gradeChoiceRound(items.length, correct));
      return;
    }
    setIndex((value) => value + 1);
    setChosen(null);
    headingRef.current?.focus();
  }, [correct, index, items.length, onComplete]);

  if (!item) return null;

  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-ink-muted">
          {index + 1}
          <span className="text-ink-subtle"> of {items.length}</span>
        </span>
        <span className="text-sm font-medium text-ink-muted">
          {correct} correct
        </span>
      </div>
      <Meter value={index} max={items.length} />

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 font-display text-xl leading-snug sm:text-2xl"
      >
        {item.prompt}
      </h2>

      <div className="mt-4 rounded-[var(--radius)] border border-line bg-surface-muted p-3">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-subtle">
          Already collected
        </p>
        {item.drawn.length === 0 ? (
          <p className="mt-2 text-sm text-ink-muted">
            Nothing yet — the needle has just been seated.
          </p>
        ) : (
          <ol className="mt-2 space-y-1.5">
            {item.drawn.map((card, position) => (
              <li key={card.stepId} className="flex items-center gap-2.5">
                <SlotNumber value={position + 1} tone="muted" />
                <span className="min-w-0 text-sm text-ink-muted">{card.name}</span>
              </li>
            ))}
          </ol>
        )}
        <div className="mt-2 flex items-center gap-2.5">
          <SlotNumber value={item.drawn.length + 1} tone="highlight" />
          <span
            className={cx(
              "sequence-gap flex min-h-11 flex-1 items-center rounded-[var(--radius)] px-3",
              "text-sm font-semibold text-primary",
              !revealed && "is-armed",
            )}
          >
            {revealed ? item.answer.name : "Next tube — choose below"}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {item.options.map((option) => {
          const isAnswer = option.stepId === item.answer.stepId;
          const isChosen = chosen === option.stepId;
          const showCorrect = revealed && isAnswer;
          const showWrong = revealed && isChosen && !isAnswer;

          return (
            <button
              key={option.stepId}
              type="button"
              onClick={() => answer(option.stepId)}
              disabled={revealed}
              className={cx(
                "flex min-h-16 items-center gap-3 rounded-[var(--radius-lg)] border-2 px-3 py-3 text-left",
                "transition-colors",
                !revealed && "border-line bg-surface hover:border-primary",
                showCorrect && CARD_TONES.correct,
                showWrong && CARD_TONES.wrong,
                revealed && !showCorrect && !showWrong && CARD_TONES.muted,
              )}
            >
              <CardFace card={option} />
              {showCorrect ? (
                <span className="shrink-0 text-xs font-bold uppercase text-success">
                  Correct
                </span>
              ) : null}
              {showWrong ? (
                <span className="shrink-0 text-xs font-bold uppercase text-danger">
                  Your answer
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {revealed ? (
        <div
          className={cx(
            "mt-5 rounded-[var(--radius)] border px-4 py-3",
            answeredRight
              ? "border-success-border bg-success-soft"
              : "border-line bg-surface-muted",
          )}
        >
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
            Why it sits at position {item.answer.position}
          </p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink">
            {item.answer.rationale}
          </p>
        </div>
      ) : null}

      {revealed ? (
        <Button size="lg" onClick={next} className="mt-5 w-full sm:w-auto">
          {index + 1 >= items.length ? "See results" : "Next"}
        </Button>
      ) : null}
    </Card>
  );
}
