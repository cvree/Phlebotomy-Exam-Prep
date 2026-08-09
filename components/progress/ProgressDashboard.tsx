"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DOMAINS } from "@/data/certifications/domains";
import { MASTERY_LABELS } from "@/lib/progress/mastery";
import { READINESS_BLURBS, READINESS_LABELS } from "@/lib/progress/readiness";
import { currentStreak } from "@/lib/progress/mutations";
import { practiceHref } from "@/components/practice/modes";
import { track } from "@/lib/analytics";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  EmptyState,
  Meter,
  StatTile,
  cx,
} from "@/components/shared/ui";
import { RecommendationCard } from "./RecommendationCard";
import { ReadinessMeter } from "./ReadinessMeter";

export function ProgressDashboard() {
  const {
    ready,
    progress,
    mastery,
    readiness,
    recommendations,
    resetProgress,
    exportProgress,
  } = useStudyProgress();
  const [confirmingReset, setConfirmingReset] = useState(false);

  useEffect(() => {
    if (ready) track("progress_viewed", { attempts: progress.attempts.length });
  }, [ready, progress.attempts.length]);

  if (!ready) {
    return (
      <div className="container-page py-12">
        <div className="h-9 w-56 animate-pulse rounded bg-surface-muted" />
        <div className="mt-6 h-40 animate-pulse rounded-[var(--radius-lg)] bg-surface-muted" />
      </div>
    );
  }

  const hasData = progress.attempts.length > 0;

  if (!hasData) {
    return (
      <div className="container-page py-8 sm:py-12">
        <h1 className="font-display text-3xl sm:text-4xl">Your progress</h1>
        <p className="mt-3 max-w-2xl text-[1.0625rem] text-ink-muted">
          This page answers one question: what should you study next? It needs
          a little data first.
        </p>
        <div className="mt-8">
          <EmptyState
            title="No study data yet"
            description="Complete your first practice session and we'll start showing your strongest and weakest areas, your mastery by topic, and a specific recommendation for what to do next."
            action={{ href: practiceHref("quick-10", { count: 10 }), label: "Start 10 questions" }}
            secondaryAction={{ href: "/drills/order-of-draw", label: "Try the Order of Draw drill" }}
          />
        </div>

        <section className="mt-10" aria-labelledby="what-appears">
          <h2 id="what-appears" className="font-display text-2xl">
            What will appear here
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Study readiness",
                body: "A transparent score across coverage, accuracy, volume, retention, and mock performance.",
              },
              {
                title: "Mastery by area",
                body: "Ten areas, each rated from Not started to Strong — with the reasoning shown.",
              },
              {
                title: "What to do next",
                body: "A specific, explainable recommendation based on what your answers actually showed.",
              },
            ].map((item) => (
              <li key={item.title}>
                <Card className="h-full p-4">
                  <h3 className="font-sans text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  const streak = currentStreak(progress.streak, new Date().toISOString());
  const totalCorrect = progress.attempts.filter((attempt) => attempt.correct).length;
  const seenCount = Object.keys(progress.questionStats).length;
  const missedCount = Object.values(progress.questionStats).filter(
    (stat) => !stat.lastCorrect,
  ).length;

  return (
    <div className="container-page py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl">Your progress</h1>
      <p className="mt-2 text-ink-muted">
        {progress.attempts.length} questions answered across{" "}
        {progress.sessions.length} session
        {progress.sessions.length === 1 ? "" : "s"}.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          {recommendations.length > 0 ? (
            <section aria-labelledby="next-up">
              <h2
                id="next-up"
                className="mb-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle"
              >
                What to study next
              </h2>
              <div className="space-y-3">
                {recommendations[0] ? (
                  <RecommendationCard recommendation={recommendations[0]} />
                ) : null}
                {recommendations.slice(1, 4).map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    emphasis="secondary"
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-10" aria-labelledby="mastery">
            <h2 id="mastery" className="font-display text-2xl">
              Mastery by area
            </h2>
            <p className="mt-1.5 text-sm text-ink-muted">
              Recent answers count for more than old ones, and a high rating
              needs repeated success across several questions — not one lucky
              run.
            </p>

            <ul className="mt-5 space-y-3">
              {mastery.map((entry) => {
                const domain = DOMAINS.find((item) => item.id === entry.domain);
                return (
                  <li key={entry.domain}>
                    <Card className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-sans text-base font-semibold text-ink">
                            {domain?.name ?? entry.domain}
                          </h3>
                          <p className="mt-0.5 text-xs text-ink-subtle">
                            {entry.seenQuestions}/{entry.totalQuestions} questions
                            seen · {entry.attempts} attempt
                            {entry.attempts === 1 ? "" : "s"}
                          </p>
                        </div>
                        <Badge
                          tone={
                            entry.level === "strong" || entry.level === "proficient"
                              ? "success"
                              : entry.level === "not-started"
                                ? "neutral"
                                : "flag"
                          }
                        >
                          {MASTERY_LABELS[entry.level]}
                        </Badge>
                      </div>

                      <Meter
                        className="mt-3"
                        value={entry.accuracy}
                        tone={
                          entry.attempts === 0
                            ? "neutral"
                            : entry.accuracy >= 0.8
                              ? "success"
                              : "primary"
                        }
                      />
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {entry.rationale}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-3">
                        <Link
                          href={practiceHref("domain", {
                            count: 10,
                            domainId: entry.domain,
                          })}
                          className="text-sm font-semibold text-primary hover:underline"
                        >
                          Practice 10 →
                        </Link>
                        {domain?.studyHref ? (
                          <Link
                            href={domain.studyHref}
                            className="text-sm font-semibold text-ink-muted hover:text-primary hover:underline"
                          >
                            Study guide →
                          </Link>
                        ) : null}
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </section>

          {progress.sessions.length > 0 ? (
            <section className="mt-10" aria-labelledby="recent-sessions">
              <h2 id="recent-sessions" className="font-display text-2xl">
                Recent sessions
              </h2>
              <Card className="mt-4 overflow-hidden">
                <ul className="divide-y divide-[var(--border)]">
                  {progress.sessions
                    .slice(-8)
                    .reverse()
                    .map((session) => (
                      <li
                        key={session.id}
                        className="flex items-center justify-between gap-3 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">
                            {session.kind === "mock"
                              ? "Mock exam"
                              : sessionLabel(session.mode)}
                          </p>
                          <p className="text-xs text-ink-subtle">
                            {new Date(session.completedAt).toLocaleString(
                              undefined,
                              { dateStyle: "medium", timeStyle: "short" },
                            )}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm tabular-nums text-ink-muted">
                          {session.correct}/{session.total}
                        </p>
                      </li>
                    ))}
                </ul>
              </Card>
            </section>
          ) : null}
        </div>

        <aside className="space-y-5">
          <ReadinessMeter readiness={readiness} />

          <Card className="p-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
              At a glance
            </h2>
            <dl className="mt-3 grid grid-cols-2 gap-3">
              <StatTile
                label="Accuracy"
                value={`${Math.round((totalCorrect / progress.attempts.length) * 100)}%`}
                detail="lifetime"
              />
              <StatTile
                label="Study streak"
                value={`${streak}d`}
                detail={`best ${progress.streak.longest}d`}
              />
              <StatTile label="Questions seen" value={String(seenCount)} />
              <StatTile label="Still missed" value={String(missedCount)} />
            </dl>
            {missedCount > 0 ? (
              <ButtonLink
                href={practiceHref("missed", { count: Math.min(missedCount, 15) })}
                variant="secondary"
                className="mt-3.5 w-full"
              >
                Review missed questions
              </ButtonLink>
            ) : null}
          </Card>

          <Card className="p-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
              Your data
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Everything on this page is stored in this browser only. Nothing is
              uploaded, and there is no account attached to it.
            </p>
            <div className="mt-3.5 flex flex-col gap-2">
              <Button variant="secondary" onClick={exportProgress}>
                Export progress (JSON)
              </Button>
              {confirmingReset ? (
                <div className="rounded-[var(--radius)] border border-danger-border bg-danger-soft p-3">
                  <p className="text-sm font-medium text-ink">
                    Delete all progress? This cannot be undone.
                  </p>
                  <div className="mt-2.5 flex gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        resetProgress();
                        setConfirmingReset(false);
                      }}
                    >
                      Yes, delete it
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConfirmingReset(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="danger" onClick={() => setConfirmingReset(true)}>
                  Reset progress
                </Button>
              )}
            </div>
          </Card>

          <Card className={cx("p-4")}>
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
              How this is calculated
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {READINESS_BLURBS[readiness.level]}
            </p>
            <Link
              href="/about/methodology"
              className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Read the methodology →
            </Link>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function sessionLabel(mode: string): string {
  const labels: Record<string, string> = {
    "quick-10": "Quick 10",
    "all-domains": "All areas",
    domain: "Single area",
    "weak-areas": "Weak areas",
    missed: "Missed questions",
    unseen: "New questions",
    mock: "Mock exam",
  };
  return labels[mode] ?? "Practice";
}

export { READINESS_LABELS };
