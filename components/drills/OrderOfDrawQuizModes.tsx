"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildCompleteSequence,
  buildFindMisplaced,
  buildWhatComesNext,
  describeTubes,
  gradeCompleteSequence,
  type CompleteSequenceRound,
  type DrillCard,
  type FindMisplacedRound,
  type RoundSizeSetting,
} from "@/lib/drills/orderOfDraw";
import { CLSI_ORDER_OF_DRAW } from "@/data/study/orderOfDraw";
import { track } from "@/lib/analytics";
import { TubeGlyph } from "@/components/shared/TubeGlyph";
import { Badge, Button, ButtonLink, Card, Meter, cx } from "@/components/shared/ui";

/** What a finished attempt reports back to the drill shell. */
export type DrillOutcome = {
  correct: number;
  total: number;
  perfect: boolean;
  durationMs?: number;
};

const WHAT_NEXT_LENGTH = 6;
const FIND_MISPLACED_LENGTH = 5;

/* ------------------------------------------------------------------ */
/* What comes next                                                     */
/* ------------------------------------------------------------------ */

export function WhatComesNextMode({
  onComplete,
}: {
  onComplete: (outcome: DrillOutcome) => void;
}) {
  const [seed, setSeed] = useState(() => Date.now());
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const startedAt = useRef(Date.now());
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Each question gets its own derived seed so a round is reproducible and
  // the questions inside it are independent of one another.
  const rounds = useMemo(
    () =>
      Array.from({ length: WHAT_NEXT_LENGTH }, (_, position) =>
        buildWhatComesNext(seed + position * 613),
      ),
    [seed],
  );
  const round = rounds[index];

  const restart = useCallback(() => {
    setSeed(Date.now());
    setIndex(0);
    setChosen(null);
    setCorrectCount(0);
    setFinished(false);
    startedAt.current = Date.now();
    track("order_draw_started", {
      mode: "what-comes-next",
      count: WHAT_NEXT_LENGTH,
    });
  }, []);

  useEffect(() => {
    track("order_draw_started", {
      mode: "what-comes-next",
      count: WHAT_NEXT_LENGTH,
    });
  }, []);

  const answer = useCallback(
    (stepId: number) => {
      if (chosen !== null || !round) return;
      setChosen(stepId);
      if (stepId === round.answer.stepId) {
        setCorrectCount((value) => value + 1);
      }
    },
    [chosen, round],
  );

  const next = useCallback(() => {
    if (index + 1 >= rounds.length) {
      setFinished(true);
      onComplete({
        correct: correctCount,
        total: rounds.length,
        perfect: correctCount === rounds.length,
        durationMs: Date.now() - startedAt.current,
      });
      return;
    }
    setIndex((value) => value + 1);
    setChosen(null);
    headingRef.current?.focus();
  }, [index, rounds.length, correctCount, onComplete]);

  if (finished) {
    return (
      <RoundSummary
        correct={correctCount}
        total={rounds.length}
        onRetry={restart}
      />
    );
  }

  if (!round) return null;

  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-ink-muted">
          {index + 1}
          <span className="text-ink-subtle"> of {rounds.length}</span>
        </span>
        <span className="text-sm font-medium text-ink-muted">
          {correctCount} correct
        </span>
      </div>
      <Meter value={index} max={rounds.length} />

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 font-display text-xl leading-snug sm:text-2xl"
      >
        You have just drawn these. What comes next?
      </h2>

      <ol className="mt-4 space-y-2">
        {round.given.map((card, position) => (
          <li
            key={card.stepId}
            className="flex items-center gap-3 rounded-[var(--radius)] bg-surface-muted px-3.5 py-2.5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface font-display text-sm font-semibold text-ink-muted">
              {position + 1}
            </span>
            <span className="flex shrink-0 -space-x-2">
              {card.tubes.map((tube) => (
                <TubeGlyph key={tube.id} tube={tube} size="sm" />
              ))}
            </span>
            <span className="min-w-0 flex-1 text-[0.9375rem] text-ink">
              {describeTubes(card)}
            </span>
          </li>
        ))}
        <li className="flex items-center gap-3 rounded-[var(--radius)] border-2 border-dashed border-line-strong px-3.5 py-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft font-display text-sm font-semibold text-primary">
            ?
          </span>
          <span className="text-[0.9375rem] font-medium text-ink-muted">
            Next tube
          </span>
        </li>
      </ol>

      <div className="mt-5 flex flex-col gap-2.5">
        {round.options.map((option) => {
          const isAnswer = option.stepId === round.answer.stepId;
          const isChosen = chosen === option.stepId;
          const revealed = chosen !== null;

          return (
            <button
              key={option.stepId}
              type="button"
              onClick={() => answer(option.stepId)}
              disabled={revealed}
              className={cx(
                "flex min-h-14 items-center gap-3 rounded-[var(--radius)] border-2 bg-surface",
                "px-3.5 py-3 text-left text-[0.9375rem] transition-colors",
                !revealed && "border-line hover:border-primary",
                revealed && isAnswer && "border-success bg-success-soft",
                revealed && isChosen && !isAnswer && "border-danger bg-danger-soft",
                revealed && !isAnswer && !isChosen && "border-line opacity-60",
              )}
            >
              <span className="flex shrink-0 -space-x-2">
                {option.tubes.map((tube) => (
                  <TubeGlyph key={tube.id} tube={tube} size="sm" />
                ))}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink">
                  {describeTubes(option)}
                </span>
                <span className="mt-0.5 block text-xs text-ink-muted">
                  {option.name}
                </span>
              </span>
              {revealed && isAnswer ? (
                <span className="shrink-0 text-xs font-bold uppercase text-success">
                  Correct
                </span>
              ) : null}
              {revealed && isChosen && !isAnswer ? (
                <span className="shrink-0 text-xs font-bold uppercase text-danger">
                  Your answer
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {chosen !== null ? (
        <>
          <Explanation card={round.answer} />
          <Button size="lg" onClick={next} className="mt-5 w-full sm:w-auto">
            {index + 1 >= rounds.length ? "See results" : "Next"}
          </Button>
        </>
      ) : null}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Find the misplaced tube                                             */
/* ------------------------------------------------------------------ */

export function FindMisplacedMode({
  sizeSetting,
  onComplete,
}: {
  sizeSetting: RoundSizeSetting;
  onComplete: (outcome: DrillOutcome) => void;
}) {
  const [seed, setSeed] = useState(() => Date.now());
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const startedAt = useRef(Date.now());
  const headingRef = useRef<HTMLHeadingElement>(null);

  const rounds = useMemo(
    () =>
      Array.from({ length: FIND_MISPLACED_LENGTH }, (_, position) =>
        buildFindMisplaced(seed + position * 877, { size: sizeSetting }),
      ),
    [seed, sizeSetting],
  );
  const round: FindMisplacedRound | undefined = rounds[index];

  const restart = useCallback(() => {
    setSeed(Date.now());
    setIndex(0);
    setChosen(null);
    setCorrectCount(0);
    setFinished(false);
    startedAt.current = Date.now();
    track("order_draw_started", {
      mode: "find-misplaced",
      count: FIND_MISPLACED_LENGTH,
    });
  }, []);

  useEffect(() => {
    track("order_draw_started", {
      mode: "find-misplaced",
      count: FIND_MISPLACED_LENGTH,
    });
  }, []);

  const answer = useCallback(
    (stepId: number) => {
      if (chosen !== null || !round) return;
      setChosen(stepId);
      if (stepId === round.misplacedStepId) {
        setCorrectCount((value) => value + 1);
      }
    },
    [chosen, round],
  );

  const next = useCallback(() => {
    if (index + 1 >= rounds.length) {
      setFinished(true);
      onComplete({
        correct: correctCount,
        total: rounds.length,
        perfect: correctCount === rounds.length,
        durationMs: Date.now() - startedAt.current,
      });
      return;
    }
    setIndex((value) => value + 1);
    setChosen(null);
    headingRef.current?.focus();
  }, [index, rounds.length, correctCount, onComplete]);

  if (finished) {
    return (
      <RoundSummary
        correct={correctCount}
        total={rounds.length}
        onRetry={restart}
      />
    );
  }

  if (!round) return null;

  const misplacedCard = round.cards.find(
    (card) => card.stepId === round.misplacedStepId,
  );

  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-ink-muted">
          {index + 1}
          <span className="text-ink-subtle"> of {rounds.length}</span>
        </span>
        <span className="text-sm font-medium text-ink-muted">
          {correctCount} correct
        </span>
      </div>
      <Meter value={index} max={rounds.length} />

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 font-display text-xl leading-snug sm:text-2xl"
      >
        One tube is out of position. Which one?
      </h2>
      <p className="mt-1.5 text-sm text-ink-muted">
        Everything else is in the right order relative to the rest. Tap the
        single card that does not belong where it is.
      </p>

      <ol className="mt-4 space-y-2.5">
        {round.cards.map((card, position) => {
          const revealed = chosen !== null;
          const isAnswer = card.stepId === round.misplacedStepId;
          const isChosen = chosen === card.stepId;

          return (
            <li key={card.stepId}>
              <button
                type="button"
                onClick={() => answer(card.stepId)}
                disabled={revealed}
                className={cx(
                  "flex w-full min-h-16 items-center gap-3 rounded-[var(--radius-lg)] border-2",
                  "bg-surface px-3 py-3 text-left transition-colors",
                  !revealed && "border-line hover:border-primary",
                  revealed && isAnswer && "border-danger bg-danger-soft",
                  revealed && isChosen && !isAnswer && "border-danger-border bg-danger-soft/40",
                  revealed && !isAnswer && !isChosen && "border-line opacity-60",
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-muted font-display text-base font-semibold text-ink-muted">
                  {position + 1}
                </span>
                <span className="flex shrink-0 -space-x-2">
                  {card.tubes.map((tube) => (
                    <TubeGlyph key={tube.id} tube={tube} size="sm" />
                  ))}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9375rem] font-semibold leading-snug text-ink">
                    {describeTubes(card)}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                    {card.name}
                  </span>
                  {revealed && isAnswer ? (
                    <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-danger">
                      Out of place — belongs at position {round.correctSlot}
                    </span>
                  ) : null}
                  {revealed && isChosen && !isAnswer ? (
                    <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-ink-muted">
                      Your answer
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {chosen !== null ? (
        <>
          <div
            className={cx(
              "mt-5 rounded-[var(--radius)] border-2 px-4 py-3",
              chosen === round.misplacedStepId
                ? "border-success-border bg-success-soft"
                : "border-danger-border bg-danger-soft",
            )}
          >
            <p
              className={cx(
                "text-sm font-bold",
                chosen === round.misplacedStepId ? "text-success" : "text-danger",
              )}
            >
              {chosen === round.misplacedStepId ? "Correct" : "Not quite"}
            </p>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink">
              {misplacedCard ? describeTubes(misplacedCard) : "That card"} was
              shown at position {round.shownAt} but belongs at position{" "}
              {round.correctSlot} of {round.cards.length}.
            </p>
          </div>
          {misplacedCard ? <Explanation card={misplacedCard} /> : null}
          <Button size="lg" onClick={next} className="mt-5 w-full sm:w-auto">
            {index + 1 >= rounds.length ? "See results" : "Next"}
          </Button>
        </>
      ) : null}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Complete the sequence                                               */
/* ------------------------------------------------------------------ */

export function CompleteSequenceMode({
  sizeSetting,
  onComplete,
}: {
  sizeSetting: RoundSizeSetting;
  onComplete: (outcome: DrillOutcome) => void;
}) {
  const [seed, setSeed] = useState(() => Date.now());
  /** Gap rank -> stepId the student placed there. */
  const [placements, setPlacements] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const startedAt = useRef(Date.now());
  const headingRef = useRef<HTMLHeadingElement>(null);

  const round: CompleteSequenceRound = useMemo(
    () => buildCompleteSequence(seed, { size: sizeSetting }),
    [seed, sizeSetting],
  );

  const restart = useCallback(() => {
    setSeed(Date.now());
    setPlacements({});
    setChecked(false);
    startedAt.current = Date.now();
    track("order_draw_started", { mode: "complete-sequence" });
  }, []);

  useEffect(() => {
    track("order_draw_started", { mode: "complete-sequence" });
  }, []);

  const gapRanks = round.slots
    .filter((slot) => slot.card === null)
    .map((slot) => slot.rank);
  const placedStepIds = new Set(Object.values(placements));
  const allPlaced = gapRanks.every((rank) => placements[rank] !== undefined);

  const placeCard = useCallback(
    (stepId: number) => {
      if (checked) return;
      setPlacements((current) => {
        // Already placed somewhere? Tapping it again is a no-op; the student
        // clears a gap by tapping the gap itself.
        if (Object.values(current).includes(stepId)) return current;
        const target = round.slots.find(
          (slot) => slot.card === null && current[slot.rank] === undefined,
        );
        if (!target) return current;
        return { ...current, [target.rank]: stepId };
      });
    },
    [checked, round.slots],
  );

  const clearGap = useCallback(
    (rank: number) => {
      if (checked) return;
      setPlacements((current) => {
        if (current[rank] === undefined) return current;
        const next = { ...current };
        delete next[rank];
        return next;
      });
    },
    [checked],
  );

  const result = useMemo(
    () => gradeCompleteSequence(round, placements),
    [round, placements],
  );

  const check = useCallback(() => {
    setChecked(true);
    onComplete({
      correct: result.correct,
      total: result.total,
      perfect: result.perfect,
      durationMs: Date.now() - startedAt.current,
    });
  }, [result, onComplete]);

  const cardFor = (stepId: number): DrillCard | undefined =>
    round.bank.find((card) => card.stepId === stepId);

  const isSubset = round.slots.length < CLSI_ORDER_OF_DRAW.steps.length;

  return (
    <Card className="p-4 sm:p-6">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-xl leading-snug sm:text-2xl"
      >
        Fill the gaps in the sequence
      </h2>
      <p className="mt-1.5 text-sm text-ink-muted">
        Tap a tube from the bank to drop it into the next gap. Tap a filled gap
        to take it back out.
        {isSubset ? (
          <>
            {" "}
            This round uses {round.slots.length} of the{" "}
            {CLSI_ORDER_OF_DRAW.steps.length} positions.
          </>
        ) : null}
      </p>

      <ol className="mt-5 space-y-2.5">
        {round.slots.map((slot) => {
          if (slot.card) {
            return (
              <li
                key={slot.rank}
                className="flex min-h-16 items-center gap-3 rounded-[var(--radius-lg)] border-2 border-line bg-surface-muted px-3 py-3"
              >
                <SlotNumber>{slot.rank}</SlotNumber>
                <span className="flex shrink-0 -space-x-2">
                  {slot.card.tubes.map((tube) => (
                    <TubeGlyph key={tube.id} tube={tube} size="sm" />
                  ))}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9375rem] font-semibold leading-snug text-ink">
                    {describeTubes(slot.card)}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                    {slot.card.name}
                  </span>
                </span>
              </li>
            );
          }

          const placedStepId = placements[slot.rank];
          const placedCard =
            placedStepId === undefined ? undefined : cardFor(placedStepId);
          const gapResult = checked
            ? result.gaps.find((gap) => gap.rank === slot.rank)
            : undefined;

          return (
            <li key={slot.rank}>
              <button
                type="button"
                onClick={() => clearGap(slot.rank)}
                disabled={checked || placedCard === undefined}
                className={cx(
                  "flex w-full min-h-16 items-center gap-3 rounded-[var(--radius-lg)] border-2 border-dashed",
                  "px-3 py-3 text-left transition-colors disabled:cursor-default",
                  !placedCard && "border-line-strong bg-surface",
                  placedCard && !checked && "border-primary bg-primary-soft",
                  gapResult?.correct && "border-success bg-success-soft border-solid",
                  gapResult && !gapResult.correct && "border-danger bg-danger-soft border-solid",
                )}
              >
                <SlotNumber tone={gapResult ? (gapResult.correct ? "success" : "danger") : "gap"}>
                  {slot.rank}
                </SlotNumber>
                {placedCard ? (
                  <>
                    <span className="flex shrink-0 -space-x-2">
                      {placedCard.tubes.map((tube) => (
                        <TubeGlyph key={tube.id} tube={tube} size="sm" />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-semibold leading-snug text-ink">
                        {describeTubes(placedCard)}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                        {checked
                          ? placedCard.name
                          : "Tap to take this back out"}
                      </span>
                      {gapResult && !gapResult.correct ? (
                        <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-danger">
                          Belongs at position {placedCard.rank}
                        </span>
                      ) : null}
                    </span>
                  </>
                ) : (
                  <span className="flex-1 text-[0.9375rem] font-medium text-ink-muted">
                    Empty — pick a tube below
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {!checked ? (
        <div className="mt-6">
          <h3 className="font-sans text-sm font-semibold text-ink">
            Tube bank
          </h3>
          <div className="mt-2.5 flex flex-wrap gap-2.5">
            {round.bank.map((card) => {
              const used = placedStepIds.has(card.stepId);
              return (
                <button
                  key={card.stepId}
                  type="button"
                  onClick={() => placeCard(card.stepId)}
                  disabled={used}
                  className={cx(
                    "flex min-h-14 items-center gap-2.5 rounded-[var(--radius)] border-2 px-3 py-2.5",
                    "text-left text-[0.9375rem] transition-colors",
                    used
                      ? "border-line bg-surface-muted opacity-40"
                      : "border-line bg-surface hover:border-primary",
                  )}
                >
                  <span className="flex shrink-0 -space-x-2">
                    {card.tubes.map((tube) => (
                      <TubeGlyph key={tube.id} tube={tube} size="sm" />
                    ))}
                  </span>
                  <span className="font-medium text-ink">
                    {describeTubes(card)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {!checked ? (
        <Button
          size="lg"
          onClick={check}
          disabled={!allPlaced}
          className="mt-6 w-full sm:w-auto"
        >
          {allPlaced ? "Check the sequence" : "Fill every gap first"}
        </Button>
      ) : (
        <div
          className={cx(
            "mt-6 rounded-[var(--radius-lg)] border-2 p-4",
            result.perfect
              ? "border-success-border bg-success-soft"
              : "border-danger-border bg-danger-soft",
          )}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <h3
              className={cx(
                "font-display text-xl",
                result.perfect ? "text-success" : "text-danger",
              )}
            >
              {result.perfect
                ? "Every gap correct"
                : `${result.correct} of ${result.total} gaps correct`}
            </h3>
            {result.perfect ? <Badge tone="success">Nailed it</Badge> : null}
          </div>

          <ul className="mt-3 space-y-2 text-sm text-ink">
            {round.bank
              .slice()
              .sort((a, b) => a.rank - b.rank)
              .map((card) => (
                <li
                  key={card.stepId}
                  className="rounded-[var(--radius)] bg-surface px-3.5 py-2.5"
                >
                  <span className="font-semibold">
                    Position {card.rank}: {card.name}
                  </span>
                  <span className="mt-1 block text-ink-muted">
                    {card.rationale}
                  </span>
                </li>
              ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <Button size="lg" onClick={restart} className="flex-1">
              New round
            </Button>
            <ButtonLink
              href="/practice/session?mode=domain&domain=order-of-draw&count=10"
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              Practice the questions
            </ButtonLink>
          </div>
        </div>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function SlotNumber({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gap" | "success" | "danger";
}) {
  return (
    <span
      className={cx(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
        "font-display text-base font-semibold",
        tone === "neutral" && "bg-surface text-ink-muted",
        tone === "gap" && "bg-primary-soft text-primary",
        tone === "success" && "bg-success text-white",
        tone === "danger" && "bg-danger text-white",
      )}
    >
      {children}
    </span>
  );
}

function Explanation({ card }: { card: DrillCard }) {
  return (
    <div className="mt-4 rounded-[var(--radius)] border border-line bg-surface-muted px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
        Why
      </p>
      <p className="mt-1 text-[0.9375rem] font-semibold text-ink">
        {card.name} — position {card.canonicalPosition} of{" "}
        {CLSI_ORDER_OF_DRAW.steps.length} in the full sequence
      </p>
      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink">
        {card.rationale}
      </p>
    </div>
  );
}

function RoundSummary({
  correct,
  total,
  onRetry,
}: {
  correct: number;
  total: number;
  onRetry: () => void;
}) {
  const perfect = correct === total;
  return (
    <Card
      className={cx(
        "border-2 p-5",
        perfect ? "border-success-border bg-success-soft" : "border-line",
      )}
    >
      <h2 className="font-display text-2xl">
        {correct} of {total} correct
      </h2>
      {perfect ? (
        <Badge tone="success" className="mt-2">
          Perfect round
        </Badge>
      ) : null}
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
        {perfect
          ? "The sequence is solid. Try a larger round size, or switch modes to test it from a different angle."
          : "Read the reasoning behind each position rather than re-reciting the list — that is what the harder exam questions are actually testing."}
      </p>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <Button size="lg" onClick={onRetry} className="flex-1">
          Another round
        </Button>
        <ButtonLink
          href="/study/order-of-draw"
          variant="secondary"
          size="lg"
          className="flex-1"
        >
          Read the guide
        </ButtonLink>
      </div>
    </Card>
  );
}
