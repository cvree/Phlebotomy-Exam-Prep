"use client";

import Link from "next/link";
import { READINESS_LABELS } from "@/lib/progress/readiness";
import { MASTERY_LABELS, rankWeakest } from "@/lib/progress/mastery";
import { currentStreak } from "@/lib/progress/mutations";
import { domainName } from "@/data/certifications/domains";
import { practiceHref } from "@/components/practice/modes";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { Badge, ButtonLink, Card, Meter } from "@/components/shared/ui";

/**
 * The returning-student header.
 *
 * Renders nothing for a first-time visitor and nothing during hydration, so
 * the first paint is always the marketing hero and never a flash of someone
 * else's empty dashboard.
 */
export function ReturningStudentPanel() {
  const { ready, progress, mastery, readiness, recommendations } =
    useStudyProgress();

  if (!ready || progress.attempts.length === 0) {
    return null;
  }

  const weakest = rankWeakest(mastery)[0];
  const lastSession = progress.sessions.at(-1);
  const primary = recommendations[0];
  const streak = currentStreak(progress.streak, new Date().toISOString());

  return (
    <section
      aria-labelledby="welcome-back"
      className="border-b border-line bg-surface-muted/60"
    >
      <div className="container-page py-7 sm:py-9">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 id="welcome-back" className="font-display text-2xl sm:text-3xl">
            Welcome back
          </h2>
          {streak > 1 ? (
            <Badge tone="primary">{streak}-day study streak</Badge>
          ) : null}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
          <Card className="p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-subtle">
              Study readiness
            </p>
            <p className="mt-1 font-display text-2xl text-ink">
              {READINESS_LABELS[readiness.level]}
            </p>
            <Meter
              className="mt-2.5"
              value={readiness.score}
              max={100}
              tone={readiness.score >= 80 ? "success" : "primary"}
            />
            <p className="mt-2 text-xs text-ink-muted">
              {readiness.score}/100 · {progress.attempts.length} questions
              answered
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-subtle">
              Weakest area
            </p>
            {weakest ? (
              <>
                <p className="mt-1 font-display text-2xl leading-tight text-ink">
                  {domainName(weakest.domain)}
                </p>
                <p className="mt-1.5 text-sm text-ink-muted">
                  {MASTERY_LABELS[weakest.level]} ·{" "}
                  {Math.round(weakest.accuracy * 100)}% recent accuracy
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-ink-muted">
                Not enough data across areas yet.
              </p>
            )}
            {lastSession ? (
              <p className="mt-2.5 border-t border-line pt-2.5 text-xs text-ink-subtle">
                Last session: {lastSession.correct}/{lastSession.total} correct
              </p>
            ) : null}
          </Card>

          <Card className="flex flex-col justify-between bg-primary-soft p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                Recommended next
              </p>
              <p className="mt-1 font-display text-xl leading-snug text-ink">
                {primary?.title ?? "Keep practising"}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {primary?.reason ?? "Mixed practice keeps every area warm."}
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <ButtonLink
                href={primary?.href ?? practiceHref("all-domains", { count: 10 })}
                className="flex-1"
              >
                Continue studying
              </ButtonLink>
              <ButtonLink
                href={practiceHref("weak-areas", { count: 15 })}
                variant="secondary"
                className="flex-1"
              >
                Practise weak areas
              </ButtonLink>
            </div>
          </Card>
        </div>

        <Link
          href="/progress"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          See full progress →
        </Link>
      </div>
    </section>
  );
}
