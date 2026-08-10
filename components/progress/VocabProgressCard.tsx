"use client";

import { useMemo } from "react";
import { vocabOverview } from "@/lib/vocab/progress";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { ButtonLink, Card, StatTile } from "@/components/shared/ui";
import { ProgressRing } from "@/components/vocab/shared";

/**
 * Vocabulary, on the progress dashboard.
 *
 * Deliberately small: the dashboard's job is to answer "what should I study
 * next?", and for vocabulary the answer is almost always "whatever is due".
 * So the card leads with that number and links straight to it.
 */
export function VocabProgressCard() {
  const { progress, ready } = useStudyProgress();
  const now = useMemo(() => new Date(), []);
  const overview = useMemo(
    () => vocabOverview(progress.vocab.cards, now),
    [progress.vocab.cards, now],
  );

  if (!ready) return null;

  return (
    <Card className="p-4">
      <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
        Vocabulary
      </h2>

      {overview.studied === 0 ? (
        <>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
            {overview.totalTerms} terms, from tube additives to polycythemia
            vera. Learning the words first makes the questions much easier to
            read.
          </p>
          <ButtonLink href="/vocabulary" className="mt-3.5 w-full">
            Start with the essentials
          </ButtonLink>
        </>
      ) : (
        <>
          <div className="mt-3 flex items-center gap-3">
            <ProgressRing value={overview.completion} size={44} />
            <div>
              <p className="font-display text-xl leading-none text-ink">
                {Math.round(overview.completion * 100)}%
              </p>
              <p className="text-xs text-ink-subtle">
                {overview.studied} of {overview.totalTerms} terms seen
              </p>
            </div>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-3">
            <StatTile label="Due now" value={String(overview.due)} />
            <StatTile label="Mastered" value={String(overview.mastered)} />
          </dl>

          <ButtonLink
            href={overview.due > 0 ? "/vocabulary/review" : "/vocabulary"}
            variant={overview.due > 0 ? "primary" : "secondary"}
            className="mt-3.5 w-full"
          >
            {overview.due > 0
              ? `Review ${overview.due} term${overview.due === 1 ? "" : "s"}`
              : "Open the trainer"}
          </ButtonLink>
        </>
      )}
    </Card>
  );
}
