"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ActiveMockSession } from "@/types/study";
import { NHA_CPT } from "@/data/certifications";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import {
  Badge,
  ButtonLink,
  Card,
  Notice,
  StatTile,
} from "@/components/shared/ui";

export function MockSetup() {
  const { ready, repository, progress } = useStudyProgress();
  const [inProgress, setInProgress] = useState<ActiveMockSession | null>(null);

  useEffect(() => {
    if (!ready) return;
    const stored = repository.readMockSession();
    setInProgress(stored && !stored.submitted ? stored : null);
  }, [ready, repository]);

  const history = ready ? progress.mockResults.slice(-5).reverse() : [];
  const format = NHA_CPT.mockExamFormat;

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
          Mock exam
        </p>
        <h1 className="mt-1.5 font-display text-3xl sm:text-4xl">
          A full-length paper, under the clock
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
          No feedback until you submit. That is the point — a mock exam
          measures what you can do without a safety net, which is different
          from what you can do with explanations one tap away.
        </p>
      </div>

      {inProgress ? (
        <Card className="mt-8 border-2 border-primary p-5">
          <Badge tone="primary">In progress</Badge>
          <h2 className="mt-2.5 font-display text-2xl">
            You have an exam in progress
          </h2>
          <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
            {Object.keys(inProgress.answers).length} of{" "}
            {inProgress.questionIds.length} answered ·{" "}
            {Math.floor(inProgress.secondsRemaining / 60)} minutes left on the
            clock.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <ButtonLink href="/mock-exam/session" size="lg">
              Resume exam
            </ButtonLink>
            <ButtonLink
              href="/mock-exam/session?restart=1"
              variant="secondary"
              size="lg"
            >
              Start over instead
            </ButtonLink>
          </div>
        </Card>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <Card className="p-5 sm:p-6">
            <h2 className="font-display text-2xl">Our practice format</h2>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <StatTile
                label="Questions"
                value={String(format.questionCount)}
                detail="weighted across all ten areas"
              />
              <StatTile
                label="Time limit"
                value={`${format.timeLimitMinutes} min`}
                detail="auto-submits at zero"
              />
            </dl>

            <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink-muted">
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-primary">
                  •
                </span>
                No correctness, correct answers, or explanations until you submit
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-primary">
                  •
                </span>
                Flag anything you want to come back to, and jump between
                questions from the grid
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-primary">
                  •
                </span>
                Everything autosaves — close the tab by accident and you can
                resume, with the clock still running
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-primary">
                  •
                </span>
                Full domain breakdown and answer review afterwards
              </li>
            </ul>

            {!inProgress ? (
              <ButtonLink
                href="/mock-exam/session?start=1"
                size="lg"
                className="mt-6 w-full sm:w-auto"
              >
                Start mock exam
              </ButtonLink>
            ) : null}
          </Card>

          {history.length > 0 ? (
            <section className="mt-8" aria-labelledby="mock-history">
              <h2 id="mock-history" className="font-display text-2xl">
                Your mock exams
              </h2>
              <Card className="mt-4 overflow-hidden">
                <ul className="divide-y divide-[var(--border)]">
                  {history.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink">
                          {Math.round((entry.correct / entry.total) * 100)}% ·{" "}
                          {entry.correct}/{entry.total}
                        </p>
                        <p className="text-xs text-ink-subtle">
                          {new Date(entry.completedAt).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                      {entry.unanswered > 0 ? (
                        <Badge tone="flag">{entry.unanswered} blank</Badge>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Card>
              <Link
                href="/mock-exam/results"
                className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
              >
                Review your most recent exam →
              </Link>
            </section>
          ) : null}
        </div>

        <aside className="space-y-5">
          <Notice title="Not a replica of the real exam" tone="flag">
            <p>{format.note}</p>
            <p className="mt-2">
              We have not verified {NHA_CPT.organizationShort}&apos;s published
              question count, time limit, or passing standard, so we have not
              guessed at them.{" "}
              <Link href="/about/methodology">How we handle this</Link>
            </p>
          </Notice>

          <Card className="p-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
              Get the most from it
            </h2>
            <ul className="mt-2.5 space-y-2 text-sm text-ink-muted">
              <li>Sit it in one go, without notes.</li>
              <li>Flag rather than agonise — come back at the end.</li>
              <li>Read every explanation afterwards, including the ones you got right.</li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
