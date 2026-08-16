import type { ReactNode } from "react";
import type { DrillCard } from "@/lib/drills/orderOfDraw";
import { TubeGlyph } from "@/components/shared/TubeGlyph";
import { cx } from "@/components/shared/ui";

/**
 * The visual vocabulary shared by every Order of Draw mode.
 *
 * A card looks the same whether it is being dragged into a slot, offered as an
 * answer, or shown in a results list, so a student who has learned to read one
 * mode can read all four.
 */

export type CardTone =
  | "default"
  | "picked"
  | "correct"
  | "wrong"
  | "muted"
  | "highlight";

export const CARD_TONES: Record<CardTone, string> = {
  default: "border-line bg-surface",
  picked: "border-primary bg-primary-soft",
  correct: "border-success bg-success-soft",
  wrong: "border-danger bg-danger-soft",
  muted: "border-line bg-surface opacity-60",
  highlight: "border-primary bg-surface",
};

const SLOT_TONES: Record<CardTone, string> = {
  default: "bg-surface-muted text-ink-muted",
  picked: "bg-primary text-primary-contrast",
  correct: "bg-success text-white",
  wrong: "bg-danger text-white",
  muted: "bg-surface-muted text-ink-subtle",
  highlight: "bg-primary text-primary-contrast",
};

/** The stationary position number a card is sitting in. */
export function SlotNumber({
  value,
  tone = "default",
}: {
  value: ReactNode;
  tone?: CardTone;
}) {
  return (
    <span
      className={cx(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
        "font-display text-base font-semibold tabular-nums transition-colors",
        SLOT_TONES[tone],
      )}
    >
      {value}
    </span>
  );
}

/** Tube illustrations plus the position's name and its tube list. */
export function CardFace({
  card,
  note,
  maxTubes = 3,
}: {
  card: DrillCard;
  note?: ReactNode;
  maxTubes?: number;
}) {
  return (
    <>
      <span className="flex shrink-0 -space-x-2">
        {card.tubes.slice(0, maxTubes).map((tube) => (
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
        {note}
      </span>
    </>
  );
}

export function CardNote({
  tone,
  children,
}: {
  tone: "correct" | "wrong" | "neutral";
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        "mt-1 block text-xs font-bold uppercase tracking-wide",
        tone === "correct" && "text-success",
        tone === "wrong" && "text-danger",
        tone === "neutral" && "text-ink-subtle",
      )}
    >
      {children}
    </span>
  );
}
