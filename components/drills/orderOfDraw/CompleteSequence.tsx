"use client";

import { useCallback, useMemo, useState } from "react";
import {
  gradeCompleteSequence,
  type CompleteSequenceGrade,
  type CompleteSequenceItem,
  type DrillCard,
} from "@/lib/drills/orderOfDraw";
import { Button, Card, cx } from "@/components/shared/ui";
import { CARD_TONES, CardFace, CardNote, SlotNumber, type CardTone } from "./SequenceCard";

/**
 * "Complete the sequence."
 *
 * Half the sequence is given, which turns the question from "recite the list"
 * into "reason about what belongs between these two" — the carryover
 * argument, which is what the exam actually tests.
 *
 * Placement is tap-to-place rather than drag: the target is a specific slot
 * rather than an ordering, taps are unambiguous on a phone, and every step is
 * reachable from the keyboard without a drag model.
 */
export function CompleteSequence({
  item,
  onComplete,
  onRestart,
}: {
  item: CompleteSequenceItem;
  onComplete: (grade: CompleteSequenceGrade) => void;
  onRestart: () => void;
}) {
  const [filled, setFilled] = useState<(DrillCard | null)[]>(item.slots);
  const [armed, setArmed] = useState<number | null>(null);
  const [grade, setGrade] = useState<CompleteSequenceGrade | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const placedIds = useMemo(
    () => new Set(filled.filter(Boolean).map((card) => card?.stepId)),
    [filled],
  );
  const bank = item.bank.filter((card) => !placedIds.has(card.stepId));
  const complete = item.gaps.every((gap) => filled[gap]);

  const takeFromBank = useCallback(
    (card: DrillCard) => {
      if (grade) return;
      setArmed((current) => (current === card.stepId ? null : card.stepId));
      setAnnouncement(
        armed === card.stepId
          ? `${card.name} put back in the tray.`
          : `${card.name} selected. Choose an empty position for it.`,
      );
    },
    [armed, grade],
  );

  const placeInSlot = useCallback(
    (slot: number) => {
      if (grade) return;
      const existing = filled[slot];

      if (existing && !armed) {
        setFilled((current) =>
          current.map((card, index) => (index === slot ? null : card)),
        );
        setAnnouncement(`${existing.name} returned to the tray.`);
        return;
      }

      if (armed === null) {
        setAnnouncement("Choose a tube from the tray first.");
        return;
      }

      const card = item.bank.find((entry) => entry.stepId === armed);
      if (!card) return;

      setFilled((current) =>
        current.map((entry, index) => {
          if (index === slot) return card;
          // A tube can only be in one place, so lift it out of any slot it
          // was already sitting in.
          return entry?.stepId === card.stepId ? null : entry;
        }),
      );
      setArmed(null);
      setAnnouncement(`${card.name} placed at position ${slot + 1}.`);
    },
    [armed, filled, grade, item.bank],
  );

  const check = useCallback(() => {
    const result = gradeCompleteSequence(item, filled);
    setGrade(result);
    setArmed(null);
    onComplete(result);
  }, [filled, item, onComplete]);

  const retry = useCallback(() => {
    setFilled(item.slots);
    setArmed(null);
    setGrade(null);
    setAnnouncement("");
    onRestart();
  }, [item.slots, onRestart]);

  return (
    <Card className="p-4 sm:p-6">
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <h2 className="font-display text-xl leading-snug sm:text-2xl">
        Put the missing tubes back
      </h2>
      <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
        Choose a tube from the tray, then choose the position it belongs in.
        Tap a placed tube to take it back out.
      </p>

      <ol className="mt-5 space-y-2.5">
        {filled.map((card, slot) => {
          const isGap = item.gaps.includes(slot);
          const gapResult = grade?.results.find((entry) => entry.index === slot);

          let tone: CardTone = isGap ? "default" : "muted";
          if (gapResult?.correct) tone = "correct";
          else if (gapResult) tone = "wrong";
          else if (isGap && card) tone = "highlight";

          if (!isGap && card) {
            return (
              <li
                key={`fixed-${slot}`}
                className={cx(
                  "flex items-center gap-3 rounded-[var(--radius-lg)] border-2 px-3 py-3",
                  CARD_TONES.muted,
                )}
              >
                <SlotNumber value={slot + 1} tone="muted" />
                <CardFace card={card} />
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                  Given
                </span>
              </li>
            );
          }

          return (
            <li key={`gap-${slot}`}>
              <button
                type="button"
                onClick={() => placeInSlot(slot)}
                disabled={Boolean(grade)}
                aria-label={
                  card
                    ? `Position ${slot + 1}, holding ${card.name}. Activate to take it back out.`
                    : `Empty position ${slot + 1}. Activate to place the selected tube here.`
                }
                className={cx(
                  "flex w-full items-center gap-3 rounded-[var(--radius-lg)] px-3 py-3 text-left",
                  "transition-colors disabled:cursor-default",
                  card
                    ? cx("border-2", CARD_TONES[tone])
                    : cx(
                        "sequence-gap min-h-[4.5rem] rounded-[var(--radius-lg)]",
                        armed !== null && "is-armed",
                      ),
                )}
              >
                <SlotNumber value={slot + 1} tone={card ? tone : "default"} />
                {card ? (
                  <CardFace
                    card={card}
                    note={
                      gapResult && !gapResult.correct ? (
                        <CardNote tone="wrong">
                          Belongs at position {card.position}
                        </CardNote>
                      ) : gapResult?.correct ? (
                        <CardNote tone="correct">Correct position</CardNote>
                      ) : null
                    }
                  />
                ) : (
                  <span className="text-sm font-medium text-ink-muted">
                    {armed === null
                      ? "Empty — choose a tube from the tray"
                      : "Place the selected tube here"}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {!grade ? (
        <div className="mt-6">
          <h3 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
            Tray {bank.length > 0 ? `(${bank.length} left)` : "(empty)"}
          </h3>
          {bank.length === 0 ? (
            <p className="mt-2 text-sm text-ink-muted">
              Every tube is placed. Check your sequence when you are happy with
              it.
            </p>
          ) : (
            <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              {bank.map((card) => (
                <button
                  key={card.stepId}
                  type="button"
                  onClick={() => takeFromBank(card)}
                  aria-pressed={armed === card.stepId}
                  className={cx(
                    "flex flex-1 items-center gap-3 rounded-[var(--radius-lg)] border-2 px-3 py-3 text-left",
                    "transition-colors sm:min-w-[16rem]",
                    armed === card.stepId
                      ? CARD_TONES.picked
                      : "border-line bg-surface hover:border-primary",
                  )}
                >
                  <CardFace card={card} />
                </button>
              ))}
            </div>
          )}

          <Button
            size="lg"
            onClick={check}
            disabled={!complete}
            className="mt-5 w-full sm:w-auto"
          >
            Check the sequence
          </Button>
        </div>
      ) : (
        <div
          className={cx(
            "mt-6 rounded-[var(--radius-lg)] border-2 p-4",
            grade.perfect
              ? "border-success-border bg-success-soft"
              : "border-danger-border bg-danger-soft",
          )}
        >
          <h3
            className={cx(
              "font-display text-xl",
              grade.perfect ? "text-success" : "text-danger",
            )}
          >
            {grade.perfect
              ? "Every gap filled correctly"
              : `${grade.correct} of ${grade.total} gaps right`}
          </h3>
          {grade.results
            .filter((entry) => !entry.correct)
            .map((entry) => {
              const belongs = item.bank.find(
                (card) => card.position === entry.index + 1,
              );
              return (
                <div
                  key={entry.index}
                  className="mt-2 rounded-[var(--radius)] bg-surface px-3.5 py-2.5 text-sm text-ink"
                >
                  <p>
                    <span className="font-semibold">
                      Position {entry.index + 1}
                    </span>{" "}
                    should hold the {belongs?.name ?? "correct tube"}.
                  </p>
                  {belongs ? (
                    <p className="mt-1 text-ink-muted">{belongs.rationale}</p>
                  ) : null}
                </div>
              );
            })}
          <Button size="lg" onClick={retry} className="mt-4 w-full sm:w-auto">
            New gaps
          </Button>
        </div>
      )}
    </Card>
  );
}
