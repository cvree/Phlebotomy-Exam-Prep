"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ActiveMockSession } from "@/types/study";
import { NHA_CPT, getMockExamForm } from "@/data/certifications";
import { getQuestionsForCertification } from "@/data/questions";
import { recentMockQuestionIds } from "@/lib/scoring/selection";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import {
  Badge,
  ButtonLink,
  Card,
  Meter,
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

  const forms = NHA_CPT.mockExam.forms;
  const history = ready ? progress.mockResults.slice(-5).reverse() : [];

  /**
   * Bank coverage.
   *
   * The number that matters to a student choosing a paper is not "how many
   * questions exist" but "how many are still new to me", so both are shown.
   */
  const coverage = useMemo(() => {
    const bank = getQuestionsForCertification(NHA_CPT.id);
    const seen = ready
      ? bank.filter((question) => progress.questionStats[question.id]).length
      : 0;
    const recent = ready ? new Set(recentMockQuestionIds(progress)).size : 0;
    return { total: bank.length, seen, unseen: bank.length - seen, recent };
  }, [ready, progress]);

  const inProgressForm = inProgress
    ? getMockExamForm(NHA_CPT, inProgress.formId)
    : null;

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
          Mock exam
        </p>
        <h1 className="mt-1.5 font-display text-3xl sm:text-4xl">
          Sit a paper under the clock
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
            {inProgressForm ? `${inProgressForm.name} · ` : null}
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
          <section aria-labelledby="mock-forms">
            <h2 id="mock-forms" className="font-display text-2xl">
              Choose a paper
            </h2>
            <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
              Every paper is weighted across all ten study areas, and each new
              one draws on questions you have not met on a recent exam.
            </p>

            <ul className="mt-4 space-y-3">
              {forms.map((form) => {
                const isDefault = form.id === NHA_CPT.mockExam.defaultFormId;
                return (
                  <Card
                    as="li"
                    key={form.id}
                    className="p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl">{form.name}</h3>
                      {isDefault ? (
                        <Badge tone="primary">Recommended</Badge>
                      ) : null}
                      <span className="text-sm font-medium tabular-nums text-ink-muted">
                        {form.questionCount} questions ·{" "}
                        {form.timeLimitMinutes} minutes
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
                      {form.description}
                    </p>
                    <ButtonLink
                      href={`/mock-exam/session?start=1&form=${form.id}`}
                      variant={isDefault ? "primary" : "secondary"}
                      size="lg"
                      className="mt-4 w-full sm:w-auto"
                    >
                      {inProgress ? `Replace with ${form.name.toLowerCase()}` : `Start ${form.name.toLowerCase()}`}
                    </ButtonLink>
                  </Card>
                );
              })}
            </ul>
          </section>

          <Card className="mt-6 p-5 sm:p-6">
            <h2 className="font-display text-2xl">How a paper works</h2>
            <ul className="mt-4 space-y-2 text-[0.9375rem] text-ink-muted">
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
                          {getMockExamForm(NHA_CPT, entry.formId).name} ·{" "}
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
          <Card className="p-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
              Question bank
            </h2>
            <dl className="mt-3 grid grid-cols-2 gap-3">
              <StatTile
                label="Questions"
                value={String(coverage.total)}
                detail="across ten areas"
              />
              <StatTile
                label="New to you"
                value={ready ? String(coverage.unseen) : "—"}
                detail="not yet answered"
              />
            </dl>
            <div className="mt-3">
              <Meter
                value={coverage.seen}
                max={coverage.total}
                tone="primary"
              />
              <p className="mt-1.5 text-xs text-ink-muted">
                {ready
                  ? `You have answered ${coverage.seen} of ${coverage.total} questions at least once.`
                  : "Loading your coverage…"}
              </p>
            </div>
          </Card>

          <Notice title="Not a replica of the real exam" tone="flag">
            <p>{NHA_CPT.mockExam.note}</p>
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
              <li>
                Sit the full-length paper at least once before exam day — two
                hours of concentration is its own skill.
              </li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
