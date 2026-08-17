"use client";

import { useEffect, useMemo, useState } from "react";
import type { MockResult } from "@/types/study";
import { resolveQuestions } from "@/data/questions";
import { domainName } from "@/data/certifications/domains";
import { NHA_CPT, getMockExamForm } from "@/data/certifications";
import { isCorrect } from "@/lib/scoring/score";
import { track } from "@/lib/analytics";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { ExplanationPanel } from "@/components/practice/ExplanationPanel";
import { RecommendationCard } from "@/components/progress/RecommendationCard";
import {
  Badge,
  ButtonLink,
  Card,
  EmptyState,
  Meter,
  Notice,
  StatTile,
  cx,
} from "@/components/shared/ui";

type Filter = "missed" | "flagged" | "all";

export function MockResults() {
  const { ready, repository, recommendations } = useStudyProgress();
  const [result, setResult] = useState<MockResult | null>(null);
  const [filter, setFilter] = useState<Filter>("missed");

  useEffect(() => {
    if (!ready) return;
    setResult(repository.readLastMockResult());
    track("mock_exam_reviewed");
  }, [ready, repository]);

  const questions = useMemo(
    () => (result ? resolveQuestions(result.questionIds) : []),
    [result],
  );

  if (!ready) {
    return (
      <div className="container-prose py-12">
        <div className="h-8 w-48 animate-pulse rounded bg-surface-muted" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container-prose py-12">
        <EmptyState
          title="No mock exam results yet"
          description="Once you complete a mock exam, your score, domain breakdown, and full answer review will appear here."
          action={{ href: "/mock-exam", label: "Set up a mock exam" }}
          secondaryAction={{ href: "/practice", label: "Practice first" }}
        />
      </div>
    );
  }

  const percent = result.total === 0 ? 0 : result.correct / result.total;

  const domainRows = Object.entries(result.byDomain)
    .map(([domain, stats]) => ({
      domain,
      ...stats,
      accuracy: stats.total === 0 ? 0 : stats.correct / stats.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const strongest = domainRows.slice().reverse().slice(0, 2);
  const weakest = domainRows.slice(0, 2);

  const reviewable = questions.filter((question) => {
    const answer = result.answers[question.id] ?? null;
    if (filter === "all") return true;
    if (filter === "flagged") return result.flagged.includes(question.id);
    return !isCorrect(question, answer);
  });

  const primary = recommendations[0];

  return (
    <div className="container-prose py-8 sm:py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
        Mock exam complete
      </p>
      <h1 className="mt-1.5 font-display text-3xl sm:text-4xl">
        {result.correct} out of {result.total}
      </h1>
      <p className="mt-2 text-ink-muted">
        {getMockExamForm(NHA_CPT, result.formId).name} ·{" "}
        {Math.round(percent * 100)}% · finished in{" "}
        {formatDuration(result.secondsUsed)} of{" "}
        {formatDuration(result.durationSeconds)}
      </p>

      <div className="mt-4">
        <Meter value={percent} tone={percent >= 0.7 ? "success" : "primary"} />
      </div>

      <Notice tone="neutral" title="What this score is and isn't" >
        This is our practice format, not the real exam. We have not verified{" "}
        {NHA_CPT.organizationShort}&apos;s current question count, time limit,
        or passing standard, so this percentage cannot be compared to a real
        passing score. Use it to find weak areas, not to predict an outcome.
      </Notice>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Correct" value={String(result.correct)} />
        <StatTile label="Incorrect" value={String(result.incorrect)} />
        <StatTile label="Unanswered" value={String(result.unanswered)} />
        <StatTile label="Flagged" value={String(result.flagged.length)} />
      </dl>

      <section className="mt-9" aria-labelledby="mock-domains">
        <h2 id="mock-domains" className="font-display text-2xl">
          Where the marks went
        </h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-success">
              Strongest
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-ink">
              {strongest.map((row) => (
                <li key={row.domain}>
                  {domainName(row.domain)} — {row.correct}/{row.total}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-4">
            <h3 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-danger">
              Weakest
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-ink">
              {weakest.map((row) => (
                <li key={row.domain}>
                  {domainName(row.domain)} — {row.correct}/{row.total}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <ul className="mt-4 space-y-2.5">
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
            </li>
          ))}
        </ul>
      </section>

      {primary ? (
        <section className="mt-9">
          <h2 className="mb-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
            Recommended next
          </h2>
          <RecommendationCard recommendation={primary} />
        </section>
      ) : null}

      <section className="mt-10" aria-labelledby="mock-review">
        <h2 id="mock-review" className="font-display text-2xl">
          Review your answers
        </h2>
        <p className="mt-1.5 text-sm text-ink-muted">
          Explanations were hidden during the exam. Here they all are.
        </p>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter reviewed questions">
          {(
            [
              { id: "missed" as const, label: `Missed (${result.incorrect + result.unanswered})` },
              { id: "flagged" as const, label: `Flagged (${result.flagged.length})` },
              { id: "all" as const, label: `All (${result.total})` },
            ]
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilter(option.id)}
              aria-pressed={filter === option.id}
              className={cx(
                "min-h-11 rounded-[var(--radius)] border-2 px-3.5 text-sm font-semibold transition-colors",
                filter === option.id
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-line bg-surface text-ink-muted hover:border-line-strong",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {reviewable.length === 0 ? (
          <div className="mt-5">
            <EmptyState
              title={
                filter === "flagged"
                  ? "Nothing flagged"
                  : "Nothing missed on this paper"
              }
              description={
                filter === "flagged"
                  ? "You didn't flag any questions during this exam. Flagging is useful when you want to come back to something before submitting."
                  : "A clean sheet. Switch to All to reread any question."
              }
              headingLevel="h3"
            />
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {reviewable.map((question) => {
              const answer = result.answers[question.id] ?? null;
              const correct = isCorrect(question, answer);
              return (
                <Card key={question.id} className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="primary">{domainName(question.domain)}</Badge>
                    {result.flagged.includes(question.id) ? (
                      <Badge tone="flag">Flagged</Badge>
                    ) : null}
                    {answer === null ? <Badge tone="danger">Unanswered</Badge> : null}
                  </div>
                  <p className="mt-2.5 font-display text-lg leading-snug">
                    {question.stem}
                  </p>
                  <ExplanationPanel
                    question={question}
                    selectedChoiceId={answer}
                    correct={correct}
                  />
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <div className="mt-10 flex flex-col gap-2.5 sm:flex-row">
        <ButtonLink href="/progress" size="lg" className="flex-1">
          See your progress
        </ButtonLink>
        <ButtonLink
          href="/mock-exam"
          variant="secondary"
          size="lg"
          className="flex-1"
        >
          Take another mock exam
        </ButtonLink>
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  if (minutes === 0) return `${rest}s`;
  return `${minutes}m ${String(rest).padStart(2, "0")}s`;
}
