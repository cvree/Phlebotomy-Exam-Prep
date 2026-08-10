"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { VOCAB_TERMS } from "@/data/vocab";
import { VOCAB_SETS, setTerms } from "@/data/vocab/sets";
import { setProgress, troubleTerms, vocabOverview } from "@/lib/vocab/progress";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { track } from "@/lib/analytics";
import {
  Badge,
  ButtonLink,
  Card,
  SectionHeading,
  StatTile,
  cx,
} from "@/components/shared/ui";
import { ProgressRing } from "./shared";
import { TermBrowser } from "./TermBrowser";

/**
 * The vocabulary hub.
 *
 * Ordered by what a returning student needs first: what is due, then where to
 * pick up, then everything else. A student with no history sees the same page
 * without the review panel, so the first thing they meet is a set to start,
 * not an empty dashboard.
 */
export function VocabHub() {
  const { progress, ready } = useStudyProgress();
  const cards = progress.vocab.cards;

  const now = useMemo(() => new Date(), []);
  const overview = useMemo(() => vocabOverview(cards, now), [cards, now]);
  const trouble = useMemo(() => troubleTerms(cards, 6), [cards]);

  const sets = useMemo(
    () =>
      VOCAB_SETS.map((set) => {
        const terms = setTerms(set);
        return { set, terms, stats: setProgress(set, terms, cards, now) };
      }),
    [cards, now],
  );

  useEffect(() => {
    track("vocab_hub_viewed", { terms: VOCAB_TERMS.length });
  }, []);

  const started = ready && overview.studied > 0;

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
          Vocabulary
        </p>
        <h1 className="mt-1.5 font-display text-3xl sm:text-4xl">
          Learn the language before the exam does
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
          {VOCAB_TERMS.length} terms — from polycythemia vera to what is
          actually inside a gray tube — with flashcards, adaptive rounds, typed
          recall, a matching game, and a review schedule that brings a term back
          just before you would have forgotten it.
        </p>
      </div>

      {started ? (
        <div className="mt-8">
          <Card
            className={cx(
              "flex flex-wrap items-center justify-between gap-5 p-5",
              overview.due > 0 ? "border-2 border-primary" : "",
            )}
          >
            <div className="flex items-center gap-4">
              <ProgressRing
                value={overview.completion}
                size={56}
                label={`${Math.round(overview.completion * 100)} percent of the glossary learned`}
              />
              <div>
                <p className="font-display text-2xl leading-tight">
                  {overview.due > 0
                    ? `${overview.due} term${overview.due === 1 ? "" : "s"} due for review`
                    : "Nothing due right now"}
                </p>
                <p className="text-sm text-ink-muted">
                  {overview.due > 0
                    ? "Ten minutes now is worth an hour of re-reading later."
                    : `${overview.mastered} mastered, ${overview.untouched} still untouched.`}
                </p>
              </div>
            </div>
            <ButtonLink
              href={overview.due > 0 ? "/vocabulary/review" : "/vocabulary/essentials"}
              size="lg"
            >
              {overview.due > 0 ? "Start review" : "Keep learning"}
            </ButtonLink>
          </Card>

          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile
              label="Terms studied"
              value={`${overview.studied}`}
              detail={`of ${overview.totalTerms}`}
            />
            <StatTile label="Mastered" value={`${overview.mastered}`} />
            <StatTile label="Due now" value={`${overview.due}`} />
            <StatTile label="Not yet seen" value={`${overview.untouched}`} />
          </dl>
        </div>
      ) : null}

      <section className="mt-12" aria-labelledby="sets">
        <SectionHeading
          id="sets"
          eyebrow="Sets"
          title="Pick a set"
          description="Curated sets first, then one for each area of the exam. Progress is tracked per term, so a term studied here counts everywhere it appears."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sets.map(({ set, stats }) => (
            <li key={set.id}>
              <Link
                href={`/vocabulary/${set.id}`}
                className={cx(
                  "flex h-full flex-col rounded-[var(--radius-lg)] border bg-surface p-5",
                  "shadow-[var(--shadow-card)] transition-colors hover:border-primary",
                  set.kind === "curated" ? "border-line-strong" : "border-line",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl leading-tight text-ink">
                      {set.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-muted">{set.tagline}</p>
                  </div>
                  {ready && stats.seen > 0 ? (
                    <ProgressRing value={stats.completion} size={38} />
                  ) : null}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                  <Badge>{stats.total} terms</Badge>
                  {ready && stats.due > 0 ? (
                    <Badge tone="primary">{stats.due} due</Badge>
                  ) : null}
                  {ready && stats.mastered > 0 ? (
                    <Badge tone="success">{stats.mastered} mastered</Badge>
                  ) : null}
                  {ready && stats.seen === 0 ? <Badge>Not started</Badge> : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {trouble.length > 0 ? (
        <section className="mt-12" aria-labelledby="trouble">
          <SectionHeading
            id="trouble"
            eyebrow="Your data"
            title="Terms that keep slipping"
            description="Ranked by how often you have forgotten them after learning them, then by accuracy."
          />
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {trouble.map(({ term, card, accuracy }) => (
              <li key={term.id}>
                <Card className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{term.term}</p>
                    <p className="mt-0.5 line-clamp-2 text-sm text-ink-muted">
                      {term.definition}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-lg text-ink">
                      {Math.round(accuracy * 100)}%
                    </p>
                    <p className="text-xs text-ink-subtle">
                      {card.lapses} lapse{card.lapses === 1 ? "" : "s"}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12" aria-labelledby="glossary">
        <SectionHeading
          id="glossary"
          eyebrow="Glossary"
          title="Look up any term"
          description="Search covers the term, its abbreviations, and its definition — so 'purple tube' finds EDTA."
        />
        <TermBrowser terms={VOCAB_TERMS} />
      </section>
    </div>
  );
}
