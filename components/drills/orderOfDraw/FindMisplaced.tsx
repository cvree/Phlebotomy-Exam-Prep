"use client";

import { useCallback, useRef, useState } from "react";
import type { MisplacedItem } from "@/lib/drills/orderOfDraw";
import { gradeChoiceRound, type ChoiceRoundGrade } from "@/lib/drills/orderOfDraw";
import { Button, Card, Meter, cx } from "@/components/shared/ui";
import { CARD_TONES, CardFace, CardNote, SlotNumber, type CardTone } from "./SequenceCard";

/**
 * "Find the misplaced tube."
 *
 * Checking a sequence someone else built is a different skill from building
 * one, and it is the one that catches errors in a real tray. Each puzzle has
 * exactly one card whose removal restores the order, so there is never a
 * second defensible answer.
 */
export function FindMisplaced({
  items,
  onComplete,
}: {
  items: MisplacedItem[];
  onComplete: (grade: ChoiceRoundGrade) => void;
}) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const item = items[index];
  const revealed = chosen !== null;
  const answeredRight = chosen === item?.misplacedIndex;

  const answer = useCallback(
    (slot: number) => {
      if (!item || chosen !== null) return;
      setChosen(slot);
      if (slot === item.misplacedIndex) {
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

  const culprit = item.arrangement[item.misplacedIndex];

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
        One tube is in the wrong place. Which one?
      </h2>

      <ol className="mt-4 space-y-2.5">
        {item.arrangement.map((card, slot) => {
          const isCulprit = slot === item.misplacedIndex;
          const isChosen = chosen === slot;

          let tone: CardTone = "default";
          if (revealed && isCulprit) tone = "wrong";
          else if (revealed && isChosen) tone = "highlight";
          else if (revealed) tone = "muted";

          return (
            <li key={card.stepId}>
              <button
                type="button"
                onClick={() => answer(slot)}
                disabled={revealed}
                className={cx(
                  "flex w-full items-center gap-3 rounded-[var(--radius-lg)] border-2 px-3 py-3 text-left",
                  "transition-colors disabled:cursor-default",
                  !revealed && "hover:border-primary",
                  CARD_TONES[tone],
                )}
              >
                <SlotNumber value={slot + 1} tone={tone} />
                <CardFace
                  card={card}
                  note={
                    revealed && isCulprit ? (
                      <CardNote tone="wrong">
                        Belongs at position {item.belongsAt}
                      </CardNote>
                    ) : revealed && isChosen ? (
                      <CardNote tone="neutral">Your answer — this one is fine here</CardNote>
                    ) : null
                  }
                />
              </button>
            </li>
          );
        })}
      </ol>

      {revealed && culprit ? (
        <div
          className={cx(
            "mt-5 rounded-[var(--radius)] border px-4 py-3",
            answeredRight
              ? "border-success-border bg-success-soft"
              : "border-line bg-surface-muted",
          )}
        >
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
            {answeredRight
              ? "Spotted it"
              : `It was the ${shortName(culprit.name)}, at position ${item.belongsAt}`}
          </p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink">
            {culprit.rationale}
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

/**
 * "Serum tube — with or without clot activator, with or without gel" is the
 * right label on a card and far too long inside a sentence.
 */
function shortName(name: string): string {
  const [head] = name.split(" — ");
  return (head ?? name).toLowerCase();
}
