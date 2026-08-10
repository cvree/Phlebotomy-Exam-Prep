import type { Metadata } from "next";
import Link from "next/link";
import { CLSI_ORDER_OF_DRAW } from "@/data/study/orderOfDraw";
import { getOrderedTubes } from "@/data/tubes/tubes";
import { ORDER_OF_DRAW_MODES } from "@/lib/drills/orderOfDraw";
import { TUBE_DRILL_MODES } from "@/lib/drills/tubeMastery";
import { TubeGlyph } from "@/components/shared/TubeGlyph";
import { Badge, ButtonLink, Card } from "@/components/shared/ui";
import { DrillHistory } from "@/components/drills/DrillHistory";

export const metadata: Metadata = {
  title: "Phlebotomy drills",
  description:
    "Interactive phlebotomy drills: arrange the order of draw, and master " +
    "tube colors, additives, and what each one does.",
  alternates: { canonical: "/drills" },
  openGraph: {
    title: "Phlebotomy drills",
    description: "Order of draw and tube mastery drills with instant feedback.",
    url: "/drills",
  },
};

export default function DrillsPage() {
  const tubes = getOrderedTubes();

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
          Drills
        </p>
        <h1 className="mt-1.5 font-display text-3xl sm:text-4xl">
          Build the reflexes
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
          Some things need to be automatic rather than worked out. These two
          drills are short enough to do between other things and specific
          enough to show you exactly what has not stuck.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card className="flex flex-col overflow-hidden">
          <div className="flex flex-wrap items-end gap-1 bg-surface-muted px-5 pt-6">
            {tubes.map((tube) => (
              <TubeGlyph key={tube.id} tube={tube} size="md" />
            ))}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h2 className="font-display text-2xl">Order of Draw</h2>
            <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
              Arrange the {CLSI_ORDER_OF_DRAW.steps.length} collection
              positions in the correct sequence. Drag, tap to swap, or use the
              move buttons — then find out precisely which tube you put in the
              wrong place, and why it belongs where it does.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
              {ORDER_OF_DRAW_MODES.map((mode) => (
                <li key={mode.id} className="flex items-center gap-2">
                  <Badge tone={mode.available ? "success" : "neutral"}>
                    {mode.available ? "Live" : "Soon"}
                  </Badge>
                  <span>{mode.name}</span>
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/drills/order-of-draw"
              size="lg"
              className="mt-5 w-full"
            >
              Start Order of Draw drill
            </ButtonLink>
          </div>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          <div className="flex flex-wrap items-end gap-1 bg-surface-muted px-5 pt-6">
            {tubes.slice(0, 5).map((tube) => (
              <TubeGlyph key={tube.id} tube={tube} size="md" />
            ))}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h2 className="font-display text-2xl">Tube & additive mastery</h2>
            <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
              Eight fast questions on what each tube contains and what the
              additive actually does. Every answer explains the mechanism, so
              the order of draw stops being a list you memorise.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
              {TUBE_DRILL_MODES.map((mode) => (
                <li key={mode.id} className="flex items-center gap-2">
                  <Badge tone={mode.available ? "success" : "neutral"}>
                    {mode.available ? "Live" : "Soon"}
                  </Badge>
                  <span>{mode.name}</span>
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/drills/tube-colors"
              size="lg"
              className="mt-5 w-full"
            >
              Start Tube Mastery drill
            </ButtonLink>
          </div>
        </Card>
      </div>

      <DrillHistory />

      <Card className="mt-8 p-5">
        <h2 className="font-display text-xl">
          Struggling with the words rather than the sequence?
        </h2>
        <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
          The vocabulary trainer covers every additive, condition, and
          complication as a studiable term — with flashcards, typed recall, and
          a review schedule that brings each one back before you forget it.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/vocabulary/tube-additives"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Tubes, additives &amp; anticoagulants set →
          </Link>
          <Link
            href="/vocabulary"
            className="text-sm font-semibold text-primary hover:underline"
          >
            All vocabulary sets →
          </Link>
        </div>
      </Card>

      <Card className="mt-5 p-5">
        <h2 className="font-display text-xl">Prefer to read first?</h2>
        <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
          The study guides cover the same material in full, with the caveats
          that matter in a real lab.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/study/order-of-draw"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Order of draw guide →
          </Link>
          <Link
            href="/study/phlebotomy-tube-colors"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Tube colors & additives →
          </Link>
        </div>
      </Card>
    </div>
  );
}
