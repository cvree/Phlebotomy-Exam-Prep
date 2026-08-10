"use client";

import { useEffect, useMemo } from "react";
import { VOCAB_TERMS } from "@/data/vocab";
import { vocabOverview } from "@/lib/vocab/progress";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { track } from "@/lib/analytics";
import { ButtonLink, Card, EmptyState, StatTile } from "@/components/shared/ui";
import { LearnMode } from "./LearnMode";

/**
 * Daily review.
 *
 * Ignores set boundaries entirely and draws from the whole bank, because the
 * scheduler's judgement about what is nearly forgotten is better than a
 * student's judgement about which set to open. This is the screen the product
 * wants someone to visit for ten minutes a day.
 */
export function DueReview() {
  const { progress, ready } = useStudyProgress();
  const now = useMemo(() => new Date(), []);
  const overview = useMemo(
    () => vocabOverview(progress.vocab.cards, now),
    [progress.vocab.cards, now],
  );

  useEffect(() => {
    track("vocab_review_started", { due: overview.due });
    // Fired once per visit, with the count as it stood on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
          Daily review
        </p>
        <h1 className="mt-1.5 font-display text-3xl sm:text-4xl">
          Everything due, from every set
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
          Terms you are closest to forgetting come first, then anything overdue,
          then a few new ones. Answer honestly — the schedule is only as good as
          what you tell it.
        </p>
      </div>

      {ready ? (
        <dl className="mt-6 grid grid-cols-3 gap-3">
          <StatTile label="Due now" value={`${overview.due}`} />
          <StatTile label="Mastered" value={`${overview.mastered}`} />
          <StatTile
            label="Glossary"
            value={`${Math.round(overview.completion * 100)}%`}
            detail={`${overview.studied} of ${overview.totalTerms} seen`}
          />
        </dl>
      ) : null}

      <div className="mt-8">
        {!ready ? (
          <Card className="p-8 text-center text-ink-subtle">
            Loading your review queue…
          </Card>
        ) : overview.due === 0 && overview.untouched === 0 ? (
          <EmptyState
            title="Nothing due, nothing new"
            description="You have seen every term in the bank and none are due yet. Come back tomorrow, or run a test to check what has actually stuck."
            action={{ href: "/vocabulary/everything", label: "Test the glossary" }}
            secondaryAction={{ href: "/practice", label: "Practice questions" }}
          />
        ) : (
          <LearnMode
            terms={VOCAB_TERMS}
            pool={VOCAB_TERMS}
            setId="review"
            mode="learn"
            roundLength={20}
            emptyHint="Nothing is due right now. Everything you have studied is scheduled for later — that is the schedule working."
          />
        )}
      </div>

      <Card className="mt-10 p-5">
        <h2 className="font-display text-xl">Prefer to choose a set?</h2>
        <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
          Review mixes everything together. The set pages let you work through
          one area at a time, with flashcards, matching, and tests.
        </p>
        <div className="mt-4">
          <ButtonLink href="/vocabulary" variant="secondary">
            Back to all sets
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}
