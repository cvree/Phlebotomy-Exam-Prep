"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CLSI_ORDER_OF_DRAW, ORDER_OF_DRAW_MNEMONIC } from "@/data/study/orderOfDraw";
import {
  ORDER_OF_DRAW_MODES,
  buildCompleteSequence,
  buildDrillCards,
  buildMisplacedRound,
  buildNextInSequence,
  getOrderOfDrawMode,
  gradeOrder,
  shuffleCards,
  type ChoiceRoundGrade,
  type CompleteSequenceGrade,
  type DrillCard,
  type OrderOfDrawMode,
  type OrderOfDrawResult,
} from "@/lib/drills/orderOfDraw";
import { track } from "@/lib/analytics";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  Notice,
  StatTile,
  cx,
} from "@/components/shared/ui";
import { ReviewStatusNote } from "@/components/shared/ReviewStatusNote";
import { ArrangeBoard } from "./orderOfDraw/ArrangeBoard";
import { CompleteSequence } from "./orderOfDraw/CompleteSequence";
import { FindMisplaced } from "./orderOfDraw/FindMisplaced";
import { WhatComesNext } from "./orderOfDraw/WhatComesNext";

/**
 * Order of Draw drill.
 *
 * Four ways to work the same six positions, because knowing the sequence is
 * four separate skills: building it, continuing it mid-draw, auditing someone
 * else's, and reasoning about what belongs between two known tubes. Each mode
 * records its own attempts, so the stats above the board describe the mode
 * being practised rather than an average across all of them.
 */
export function OrderOfDrawDrill() {
  const { ready, progress, saveDrillAttempt } = useStudyProgress();
  const baseCards = useMemo(() => buildDrillCards(), []);

  const [modeId, setModeId] = useState<OrderOfDrawMode>("arrange");
  const [seed, setSeed] = useState(1);
  const [cards, setCards] = useState<DrillCard[]>([]);
  const [result, setResult] = useState<OrderOfDrawResult | null>(null);
  const [roundGrade, setRoundGrade] = useState<ChoiceRoundGrade | null>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const mode = getOrderOfDrawMode(modeId);

  const startRound = useCallback(
    (nextMode: OrderOfDrawMode = modeId) => {
      const now = Date.now();
      setModeId(nextMode);
      setSeed(now);
      setCards(shuffleCards(baseCards, now));
      setResult(null);
      setRoundGrade(null);
      setStartedAt(now);
      setAnnouncement("");
      track("order_draw_started", { mode: nextMode });
    },
    [baseCards, modeId],
  );

  useEffect(() => {
    startRound("arrange");
    // Only on mount: a round is started, not restarted, when the page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const record = useCallback(
    (grade: {
      accuracy: number;
      total: number;
      correct: number;
      perfect: boolean;
    }) => {
      saveDrillAttempt({
        id: `ood-${Date.now()}`,
        drill: "order-of-draw",
        mode: modeId,
        accuracy: grade.accuracy,
        total: grade.total,
        correct: grade.correct,
        perfect: grade.perfect,
        durationMs: startedAt ? Date.now() - startedAt : undefined,
        at: new Date().toISOString(),
      });
      track("order_draw_completed", {
        mode: modeId,
        correct: grade.correct,
        total: grade.total,
        perfect: grade.perfect,
      });
    },
    [modeId, saveDrillAttempt, startedAt],
  );

  const submitArrangement = useCallback(() => {
    const graded = gradeOrder(cards);
    setResult(graded);
    record({
      accuracy: graded.accuracy,
      total: graded.total,
      correct: graded.correctCount,
      perfect: graded.perfect,
    });
  }, [cards, record]);

  const finishChoiceRound = useCallback(
    (grade: ChoiceRoundGrade) => {
      setRoundGrade(grade);
      record(grade);
    },
    [record],
  );

  const finishGapRound = useCallback(
    (grade: CompleteSequenceGrade) => {
      record(grade);
    },
    [record],
  );

  useEffect(() => {
    if (result || roundGrade) {
      resultRef.current?.focus();
    }
  }, [result, roundGrade]);

  const nextItems = useMemo(
    () => (modeId === "what-comes-next" ? buildNextInSequence(seed) : []),
    [modeId, seed],
  );
  const misplacedItems = useMemo(
    () =>
      modeId === "find-misplaced"
        ? buildMisplacedRound(mode.roundLength, seed)
        : [],
    [mode.roundLength, modeId, seed],
  );
  const gapItem = useMemo(
    () =>
      modeId === "complete-sequence"
        ? buildCompleteSequence(mode.roundLength, seed)
        : null,
    [mode.roundLength, modeId, seed],
  );

  const history = ready
    ? progress.drills.filter(
        (drill) => drill.drill === "order-of-draw" && drill.mode === modeId,
      )
    : [];
  const perfectCount = history.filter((drill) => drill.perfect).length;
  const recent = history.slice(-5);
  const recentAccuracy =
    recent.length === 0
      ? 0
      : recent.reduce((sum, drill) => sum + drill.accuracy, 0) / recent.length;
  const bestTime = history
    .filter((drill) => drill.perfect && drill.durationMs)
    .reduce<number | null>(
      (best, drill) =>
        best === null ? (drill.durationMs ?? null) : Math.min(best, drill.durationMs ?? best),
      null,
    );

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
          Drill
        </p>
        <h1 className="mt-1.5 font-display text-3xl sm:text-4xl">
          Order of Draw
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
          {mode.instruction}
        </p>
      </div>

      {ready && history.length > 0 ? (
        <dl
          className={cx(
            "mt-6 grid grid-cols-2 gap-3",
            modeId === "arrange" ? "sm:grid-cols-4" : "sm:grid-cols-3",
          )}
        >
          <StatTile label="Attempts" value={String(history.length)} />
          <StatTile label="Perfect runs" value={String(perfectCount)} />
          <StatTile
            label="Recent accuracy"
            value={`${Math.round(recentAccuracy * 100)}%`}
            detail={`last ${recent.length}`}
          />
          {modeId === "arrange" ? (
            <StatTile
              label="Best time"
              value={bestTime ? formatDuration(bestTime) : "—"}
              detail="perfect runs only"
            />
          ) : null}
        </dl>
      ) : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <fieldset className="mb-5">
            <legend className="mb-2.5 text-sm font-semibold text-ink">
              Drill mode
            </legend>
            <div className="flex flex-wrap gap-2">
              {ORDER_OF_DRAW_MODES.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => startRound(entry.id)}
                  title={entry.description}
                  aria-pressed={modeId === entry.id}
                  className={cx(
                    "min-h-11 rounded-[var(--radius)] border-2 px-3.5 text-sm font-semibold transition-colors",
                    modeId === entry.id
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-line bg-surface text-ink-muted hover:border-line-strong",
                  )}
                >
                  {entry.shortName}
                </button>
              ))}
            </div>
          </fieldset>

          <p aria-live="polite" className="sr-only">
            {announcement}
          </p>

          {modeId === "arrange" ? (
            <>
              <ArrangeBoard
                cards={cards}
                result={result}
                onChange={setCards}
                announce={setAnnouncement}
              />
              {!result ? (
                <Button
                  size="lg"
                  onClick={submitArrangement}
                  className="mt-6 w-full sm:w-auto"
                >
                  Check my order
                </Button>
              ) : (
                <ArrangeResult
                  result={result}
                  onRetry={() => startRound("arrange")}
                  ref={resultRef}
                />
              )}
            </>
          ) : null}

          {modeId === "what-comes-next" ? (
            roundGrade ? (
              <RoundSummary
                grade={roundGrade}
                onRetry={() => startRound("what-comes-next")}
                ref={resultRef}
              />
            ) : (
              <WhatComesNext
                key={seed}
                items={nextItems}
                onComplete={finishChoiceRound}
              />
            )
          ) : null}

          {modeId === "find-misplaced" ? (
            roundGrade ? (
              <RoundSummary
                grade={roundGrade}
                onRetry={() => startRound("find-misplaced")}
                ref={resultRef}
              />
            ) : (
              <FindMisplaced
                key={seed}
                items={misplacedItems}
                onComplete={finishChoiceRound}
              />
            )
          ) : null}

          {modeId === "complete-sequence" && gapItem ? (
            <CompleteSequence
              key={gapItem.id}
              item={gapItem}
              onComplete={finishGapRound}
              onRestart={() => startRound("complete-sequence")}
            />
          ) : null}
        </div>

        <aside className="space-y-5">
          <Card className="p-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
              Memory device
            </h2>
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              {ORDER_OF_DRAW_MNEMONIC.device}
            </p>
            <p className="mt-1.5 text-sm text-ink-muted">
              {ORDER_OF_DRAW_MNEMONIC.phrase}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
              {ORDER_OF_DRAW_MNEMONIC.note}
            </p>
          </Card>

          <Card className="p-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
              This mode
            </h2>
            <p className="mt-2 text-sm font-semibold text-ink">{mode.name}</p>
            <p className="mt-1 text-sm text-ink-muted">{mode.description}</p>
            {modeId === "arrange" ? (
              <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
                Drag a card with the grip, or press space on it and use the
                arrow keys. Tapping two cards swaps them.
              </p>
            ) : null}
          </Card>

          <Notice title="Read the label, not the cap">
            Tube colors are a convention that varies by manufacturer. Where
            your facility&apos;s procedure manual differs from what you learned
            in class, follow the manual.
          </Notice>

          <Card className="p-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
              Go deeper
            </h2>
            <ul className="mt-2.5 space-y-2 text-sm">
              <li>
                <Link
                  href="/study/order-of-draw"
                  className="font-medium text-primary hover:underline"
                >
                  Order of draw study guide →
                </Link>
              </li>
              <li>
                <Link
                  href="/practice/session?mode=domain&domain=order-of-draw&count=10"
                  className="font-medium text-primary hover:underline"
                >
                  10 order-of-draw questions →
                </Link>
              </li>
              <li>
                <Link
                  href="/drills/tube-colors"
                  className="font-medium text-primary hover:underline"
                >
                  Tube & additive drill →
                </Link>
              </li>
            </ul>
          </Card>

          <ReviewStatusNote
            status={CLSI_ORDER_OF_DRAW.reviewStatus}
            sources={CLSI_ORDER_OF_DRAW.sources}
          />
        </aside>
      </div>
    </div>
  );
}

/** Result panel for the choose-one modes. */
function RoundSummary({
  grade,
  onRetry,
  ref,
}: {
  grade: ChoiceRoundGrade;
  onRetry: () => void;
  ref: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={cx(
        "rounded-[var(--radius-lg)] border-2 p-4 sm:p-5",
        grade.perfect
          ? "border-success-border bg-success-soft"
          : "border-line bg-surface",
      )}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <h2
          className={cx(
            "font-display text-2xl",
            grade.perfect ? "text-success" : "text-ink",
          )}
        >
          {grade.correct} of {grade.total} correct
        </h2>
        {grade.perfect ? <Badge tone="success">Clean round</Badge> : null}
      </div>

      <p className="mt-2 text-[0.9375rem] text-ink-muted">
        {grade.perfect
          ? "Every decision right. Try the arrangement mode against the clock, or move on to the questions."
          : "The rationale under each answer is the part worth re-reading — carryover is what the exam asks about."}
      </p>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <Button size="lg" onClick={onRetry} className="flex-1">
          Another round
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
  );
}

const ArrangeResult = function ArrangeResult({
  result,
  onRetry,
  ref,
}: {
  result: OrderOfDrawResult;
  onRetry: () => void;
  ref: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={cx(
        "mt-6 rounded-[var(--radius-lg)] border-2 p-4 sm:p-5",
        result.perfect
          ? "border-success-border bg-success-soft"
          : "border-danger-border bg-danger-soft",
      )}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <h2
          className={cx(
            "font-display text-2xl",
            result.perfect ? "text-success" : "text-danger",
          )}
        >
          {result.perfect
            ? "Perfect sequence"
            : `${result.correctCount} of ${result.total} in place`}
        </h2>
        {result.perfect ? <Badge tone="success">No mistakes</Badge> : null}
      </div>

      {result.misplaced.length > 0 ? (
        <div className="mt-4">
          <h3 className="font-sans text-sm font-semibold text-ink">
            What was out of place
          </h3>
          <ul className="mt-2 space-y-2 text-sm text-ink">
            {result.misplaced.map((entry) => (
              <li
                key={entry.card.stepId}
                className="rounded-[var(--radius)] bg-surface px-3.5 py-2.5"
              >
                <span className="font-semibold">{entry.card.name}</span> — you
                put it at position {entry.placedAt}; it belongs at position{" "}
                {entry.card.position}.
                <span className="mt-1 block text-ink-muted">
                  {entry.card.rationale}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4">
        <h3 className="font-sans text-sm font-semibold text-ink">
          The correct sequence
        </h3>
        <ol className="mt-2 space-y-1.5 text-sm text-ink">
          {CLSI_ORDER_OF_DRAW.steps.map((step) => (
            <li key={step.position} className="flex gap-2.5">
              <span className="font-display font-semibold text-primary">
                {step.position}.
              </span>
              <span>{step.name}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <Button size="lg" onClick={onRetry} className="flex-1">
          Try again
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
  );
};

function formatDuration(ms: number): string {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}
