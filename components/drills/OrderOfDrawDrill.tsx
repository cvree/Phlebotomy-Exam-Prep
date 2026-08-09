"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CLSI_ORDER_OF_DRAW, ORDER_OF_DRAW_MNEMONIC } from "@/data/study/orderOfDraw";
import {
  buildDrillCards,
  gradeOrder,
  moveCard,
  shuffleCards,
  swapCards,
  type DrillCard,
  type OrderOfDrawResult,
} from "@/lib/drills/orderOfDraw";
import { track } from "@/lib/analytics";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { TubeGlyph } from "@/components/shared/TubeGlyph";
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

/**
 * Order of Draw drill.
 *
 * Three interchangeable ways to reorder, all driving the same state:
 *
 * 1. Drag and drop — pointer devices.
 * 2. Tap a card to pick it up, tap another to swap — touch, and the fallback
 *    for anyone who cannot drag.
 * 3. Move-up / move-down buttons on every row — keyboard, screen readers, and
 *    anyone who finds the other two fiddly.
 *
 * Nothing is reachable *only* by dragging, which is the point.
 */
export function OrderOfDrawDrill() {
  const { ready, progress, saveDrillAttempt } = useStudyProgress();
  const baseCards = useMemo(() => buildDrillCards(), []);

  const [cards, setCards] = useState<DrillCard[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<OrderOfDrawResult | null>(null);
  const [startedAt, setStartedAt] = useState<number>(0);
  const [announcement, setAnnouncement] = useState("");
  const dragIndex = useRef<number | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    setCards(shuffleCards(baseCards, Date.now()));
    setPicked(null);
    setResult(null);
    setStartedAt(Date.now());
    setAnnouncement("");
    track("order_draw_started", { mode: "arrange" });
  }, [baseCards]);

  useEffect(() => {
    reset();
  }, [reset]);

  const applyMove = useCallback(
    (from: number, to: number) => {
      setCards((current) => {
        const next = moveCard(current, from, to);
        const moved = current[from];
        if (moved) {
          setAnnouncement(`${moved.name} moved to position ${to + 1}.`);
        }
        return next;
      });
      setPicked(null);
    },
    [],
  );

  const handleCardTap = useCallback(
    (index: number) => {
      if (result) return;
      if (picked === null) {
        setPicked(index);
        const card = cards[index];
        setAnnouncement(
          card
            ? `${card.name} picked up from position ${index + 1}. Choose a position to swap with.`
            : "",
        );
        return;
      }
      if (picked === index) {
        setPicked(null);
        setAnnouncement("Put back down.");
        return;
      }
      setCards((current) => swapCards(current, picked, index));
      const a = cards[picked];
      const b = cards[index];
      if (a && b) {
        setAnnouncement(`Swapped ${a.name} and ${b.name}.`);
      }
      setPicked(null);
    },
    [picked, cards, result],
  );

  const submit = useCallback(() => {
    const graded = gradeOrder(cards);
    setResult(graded);
    setPicked(null);

    saveDrillAttempt({
      id: `ood-${Date.now()}`,
      drill: "order-of-draw",
      mode: "arrange",
      accuracy: graded.accuracy,
      total: graded.total,
      correct: graded.correctCount,
      perfect: graded.perfect,
      durationMs: startedAt ? Date.now() - startedAt : undefined,
      at: new Date().toISOString(),
    });

    track("order_draw_completed", {
      mode: "arrange",
      correct: graded.correctCount,
      total: graded.total,
      perfect: graded.perfect,
    });
  }, [cards, saveDrillAttempt, startedAt]);

  useEffect(() => {
    if (result) {
      resultRef.current?.focus();
    }
  }, [result]);

  const history = ready
    ? progress.drills.filter((drill) => drill.drill === "order-of-draw")
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
          Put the six collection positions in the order they are drawn. Drag
          them, tap two cards to swap, or use the move buttons — whichever is
          easier on the device you&apos;re holding.
        </p>
      </div>

      {ready && history.length > 0 ? (
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Attempts" value={String(history.length)} />
          <StatTile label="Perfect runs" value={String(perfectCount)} />
          <StatTile
            label="Recent accuracy"
            value={`${Math.round(recentAccuracy * 100)}%`}
            detail={`last ${recent.length}`}
          />
          <StatTile
            label="Best time"
            value={bestTime ? formatDuration(bestTime) : "—"}
            detail="perfect runs only"
          />
        </dl>
      ) : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p aria-live="polite" className="sr-only">
            {announcement}
          </p>

          {picked !== null ? (
            <p className="mb-3 rounded-[var(--radius)] bg-primary-soft px-3.5 py-2.5 text-sm font-medium text-primary">
              Card picked up. Tap another position to swap, or tap it again to
              put it back.
            </p>
          ) : null}

          <ol className="space-y-2.5">
            {cards.map((card, index) => {
              const cardResult = result?.results[index];
              const isPicked = picked === index;

              return (
                <li
                  key={card.stepId}
                  draggable={!result}
                  onDragStart={() => {
                    dragIndex.current = index;
                  }}
                  onDragOver={(event) => {
                    if (!result) event.preventDefault();
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (dragIndex.current === null || result) return;
                    applyMove(dragIndex.current, index);
                    dragIndex.current = null;
                  }}
                  onDragEnd={() => {
                    dragIndex.current = null;
                  }}
                  className={cx(
                    "flex items-stretch gap-2 rounded-[var(--radius-lg)] border-2 bg-surface",
                    "transition-colors",
                    !result && !isPicked && "border-line",
                    !result && isPicked && "border-primary bg-primary-soft",
                    cardResult?.correct && "border-success bg-success-soft",
                    cardResult && !cardResult.correct && "border-danger bg-danger-soft",
                  )}
                >
                  <div className="flex shrink-0 items-center justify-center pl-3">
                    <span
                      className={cx(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        "font-display text-base font-semibold",
                        cardResult?.correct
                          ? "bg-success text-white"
                          : cardResult
                            ? "bg-danger text-white"
                            : "bg-surface-muted text-ink-muted",
                      )}
                    >
                      {index + 1}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCardTap(index)}
                    disabled={Boolean(result)}
                    className="flex min-h-16 flex-1 items-center gap-3 px-2 py-3 text-left disabled:cursor-default"
                  >
                    <span className="flex shrink-0 -space-x-2">
                      {card.tubes.slice(0, 3).map((tube) => (
                        <TubeGlyph key={tube.id} tube={tube} size="sm" />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-semibold leading-snug text-ink">
                        {card.name}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                        {card.tubes.map((tube) => tube.displayName).join(" · ")}
                      </span>
                      {cardResult && !cardResult.correct ? (
                        <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-danger">
                          Should be position {card.position}
                        </span>
                      ) : null}
                      {cardResult?.correct ? (
                        <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-success">
                          Correct position
                        </span>
                      ) : null}
                    </span>
                  </button>

                  {!result ? (
                    <div className="flex shrink-0 flex-col justify-center gap-1 pr-2">
                      <button
                        type="button"
                        onClick={() => applyMove(index, index - 1)}
                        disabled={index === 0}
                        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-line text-ink-muted disabled:opacity-30"
                      >
                        <span className="sr-only">
                          Move {card.name} up to position {index}
                        </span>
                        <span aria-hidden="true">↑</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => applyMove(index, index + 1)}
                        disabled={index === cards.length - 1}
                        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-line text-ink-muted disabled:opacity-30"
                      >
                        <span className="sr-only">
                          Move {card.name} down to position {index + 2}
                        </span>
                        <span aria-hidden="true">↓</span>
                      </button>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>

          {!result ? (
            <Button size="lg" onClick={submit} className="mt-6 w-full sm:w-auto">
              Check my order
            </Button>
          ) : (
            <ResultPanel result={result} onRetry={reset} ref={resultRef} />
          )}
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

const ResultPanel = function ResultPanel({
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
