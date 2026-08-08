"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Question } from "@/types/content";
import type { PracticeConfig } from "@/types/study";
import { domainName } from "@/data/certifications/domains";
import { isCorrect, longestCorrectRun, scoreAnswers } from "@/lib/scoring/score";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { Badge, ButtonLink, Card, Meter, StatTile } from "@/components/shared/ui";
import { RecommendationCard } from "@/components/progress/RecommendationCard";
import { ExplanationPanel } from "./ExplanationPanel";
import { practiceHref } from "./modes";

/**
 * End of a practice session.
 *
 * The ordering is the product thesis in miniature: the score is small and near
 * the top, the *insight* about which area is weakest gets the most space, and
 * the single recommended next action sits above the fold on a phone.
 */
export function SessionResults({
  questions,
  answers,
  config,
}: {
  questions: Question[];
  answers: Record<string, string>;
  config: PracticeConfig;
}) {
  const { recommendations, mastery } = useStudyProgress();

  const breakdown = useMemo(
    () => scoreAnswers(questions, answers),
    [questions, answers],
  );

  const scored = useMemo(
    () =>
      questions.map((question) => ({
        question,
        choiceId: answers[question.id] ?? null,
        correct: isCorrect(question, answers[question.id] ?? null),
      })),
    [questions, answers],
  );

  const missed = scored.filter((entry) => !entry.correct);
  const bestRun = longestCorrectRun(scored);

  const domainRows = Object.entries(breakdown.byDomain)
    .map(([domain, stats]) => ({
      domain,
      ...stats,
      accuracy: stats.total === 0 ? 0 : stats.correct / stats.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const weakestInSession = domainRows.find((row) => row.accuracy < 1);
  const primary = recommendations[0];

  return (
    <div className="container-prose py-8 sm:py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
        Session complete
      </p>
      <h1 className="mt-1.5 font-display text-3xl sm:text-4xl">
        {breakdown.correct} out of {breakdown.total} correct
      </h1>
      <p className="mt-2 text-ink-muted">
        {encouragement(breakdown.percent, breakdown.total)}
      </p>

      <div className="mt-5">
        <Meter
          value={breakdown.correct}
          max={breakdown.total}
          tone={breakdown.percent >= 0.7 ? "success" : "primary"}
        />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          label="Score"
          value={`${Math.round(breakdown.percent * 100)}%`}
        />
        <StatTile label="Correct" value={String(breakdown.correct)} />
        <StatTile label="Missed" value={String(missed.length)} />
        <StatTile
          label="Best run"
          value={String(bestRun)}
          detail="in a row"
        />
      </dl>

      {/* The insight, not the score, is the point of this screen. */}
      {weakestInSession ? (
        <Card className="mt-6 border-l-4 border-l-primary p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
            What this session showed
          </p>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">
            Your weakest area here was{" "}
            <strong>{domainName(weakestInSession.domain)}</strong> at{" "}
            {weakestInSession.correct}/{weakestInSession.total}.{" "}
            {overallContext(weakestInSession.domain, mastery)}
          </p>
        </Card>
      ) : null}

      {primary ? (
        <div className="mt-6">
          <h2 className="mb-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
            Recommended next
          </h2>
          <RecommendationCard recommendation={primary} />
        </div>
      ) : null}

      {domainRows.length > 1 ? (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">By area</h2>
          <ul className="space-y-2.5">
            {domainRows.map((row) => (
              <li
                key={row.domain}
                className="rounded-[var(--radius)] border border-line bg-surface p-3.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-ink">
                    {domainName(row.domain)}
                  </span>
                  <span className="shrink-0 text-sm tabular-nums text-ink-muted">
                    {row.correct}/{row.total}
                  </span>
                </div>
                <Meter
                  className="mt-2"
                  value={row.correct}
                  max={row.total}
                  tone={row.accuracy >= 0.7 ? "success" : "danger"}
                />
                <Link
                  href={practiceHref("domain", {
                    count: 10,
                    domainId: row.domain as never,
                  })}
                  className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
                >
                  Practise 10 more →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {missed.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-1 font-display text-xl">Review what you missed</h2>
          <p className="mb-4 text-sm text-ink-muted">
            {missed.length} question{missed.length === 1 ? "" : "s"} to look at
            again.
          </p>
          <div className="space-y-4">
            {missed.map((entry) => (
              <Card key={entry.question.id} className="p-4 sm:p-5">
                <Badge tone="primary">{domainName(entry.question.domain)}</Badge>
                <p className="mt-2.5 font-display text-lg leading-snug">
                  {entry.question.stem}
                </p>
                <ExplanationPanel
                  question={entry.question}
                  selectedChoiceId={entry.choiceId}
                  correct={false}
                />
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-10 flex flex-col gap-2.5 sm:flex-row">
        <ButtonLink
          href={practiceHref(config.mode, {
            count: config.questionCount,
            domainId: config.domainId,
          })}
          size="lg"
          className="flex-1"
        >
          Practise another {config.questionCount}
        </ButtonLink>
        <ButtonLink href="/progress" variant="secondary" size="lg" className="flex-1">
          See your progress
        </ButtonLink>
      </div>
    </div>
  );
}

function encouragement(percent: number, total: number): string {
  if (total === 0) return "No questions were answered.";
  if (percent === 1) {
    return "A clean sweep. Try a longer session or a weaker area to keep it useful.";
  }
  if (percent >= 0.8) {
    return "Strong session. The explanations below are where the remaining marks are.";
  }
  if (percent >= 0.5) {
    return "A normal score at this stage. What matters is which ones you missed, not how many.";
  }
  return "Plenty to work with. Read the explanations properly — that is where the gain is.";
}

function overallContext(
  domain: string,
  mastery: { domain: string; attempts: number; accuracy: number; level: string }[],
): string {
  const entry = mastery.find((item) => item.domain === domain);
  if (!entry || entry.attempts < 5) {
    return "Not enough history yet to say whether that is a pattern or a one-off.";
  }
  return `Across all your practice, that area sits at ${Math.round(entry.accuracy * 100)}%.`;
}
