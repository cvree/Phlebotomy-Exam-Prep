"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DomainId } from "@/types/content";
import { DOMAINS } from "@/data/certifications/domains";
import { countQuestionsByDomain } from "@/data/questions";
import { DEFAULT_CERTIFICATION_ID } from "@/data/certifications";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { Badge, ButtonLink, Card, cx, Meter } from "@/components/shared/ui";
import { MASTERY_LABELS } from "@/lib/progress/mastery";
import { PRACTICE_MODES, practiceHref } from "./modes";

const COUNT_OPTIONS = [5, 10, 15, 25, 40];

/**
 * Practice configuration.
 *
 * Deliberately a single screen with everything visible. Students arrive here
 * wanting to start, not to configure — so Quick 10 is one tap and everything
 * else is one tap plus a choice.
 */
export function PracticeSetup() {
  const { ready, progress, mastery } = useStudyProgress();
  const [count, setCount] = useState(10);
  const [domainId, setDomainId] = useState<DomainId | null>(null);

  const counts = useMemo(
    () => countQuestionsByDomain(DEFAULT_CERTIFICATION_ID),
    [],
  );

  const missedCount = ready
    ? Object.values(progress.questionStats).filter((stat) => !stat.lastCorrect)
        .length
    : 0;
  const seenCount = ready ? Object.keys(progress.questionStats).length : 0;
  const totalQuestions = Object.values(counts).reduce(
    (sum, value) => sum + value,
    0,
  );
  const hasProgress = ready && progress.attempts.length > 0;

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
          NHA CPT practice
        </p>
        <h1 className="mt-1.5 font-display text-3xl sm:text-4xl">
          Set up a practice session
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
          Every answer comes with an explanation, and every session updates
          your mastery by area. No account needed — progress is stored on this
          device.
        </p>
      </div>

      {/* Quick start is separated out because it is what most people want. */}
      <Card className="mt-8 overflow-hidden">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-display text-2xl">Quick 10</h2>
            <p className="mt-1 text-[0.9375rem] text-ink-muted">
              Ten mixed questions. About five minutes.
            </p>
          </div>
          <ButtonLink
            href={practiceHref("quick-10", { count: 10 })}
            size="lg"
            className="w-full sm:w-auto"
          >
            Start Quick 10
          </ButtonLink>
        </div>
      </Card>

      <section className="mt-10" aria-labelledby="build-session">
        <h2 id="build-session" className="font-display text-2xl">
          Or build your own
        </h2>

        <div className="mt-5">
          <fieldset>
            <legend className="mb-2.5 text-sm font-semibold text-ink">
              How many questions?
            </legend>
            <div className="flex flex-wrap gap-2">
              {COUNT_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={cx(
                    "flex min-h-11 min-w-14 cursor-pointer items-center justify-center rounded-[var(--radius)]",
                    "border-2 px-4 text-[0.9375rem] font-semibold transition-colors",
                    "has-[:focus-visible]:outline has-[:focus-visible]:outline-2",
                    "has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)]",
                    count === option
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-line bg-surface text-ink-muted hover:border-line-strong",
                  )}
                >
                  <input
                    type="radio"
                    name="count"
                    value={option}
                    checked={count === option}
                    onChange={() => setCount(option)}
                    className="absolute h-px w-px opacity-0"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {PRACTICE_MODES.filter((mode) => mode.id !== "domain").map((mode) => {
            const locked = mode.requiresProgress && !hasProgress;
            const empty = mode.id === "missed" && ready && missedCount === 0 && hasProgress;
            const disabled = locked || empty;

            return (
              <Card
                key={mode.id}
                className={cx("flex flex-col p-4", disabled && "opacity-60")}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-sans text-base font-semibold text-ink">
                    {mode.name}
                  </h3>
                  {mode.id === "missed" && ready && hasProgress ? (
                    <Badge tone={missedCount > 0 ? "danger" : "success"}>
                      {missedCount} missed
                    </Badge>
                  ) : null}
                  {mode.id === "unseen" && ready ? (
                    <Badge>{Math.max(0, totalQuestions - seenCount)} new</Badge>
                  ) : null}
                </div>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">
                  {mode.description}
                </p>

                {disabled ? (
                  <p className="mt-3 text-xs font-medium text-ink-subtle">
                    {empty
                      ? "Nothing missed right now — good problem to have."
                      : "Answer a few questions first and this unlocks."}
                  </p>
                ) : (
                  <ButtonLink
                    href={practiceHref(mode.id, { count })}
                    variant="secondary"
                    className="mt-3.5 w-full"
                  >
                    Start {count} questions
                  </ButtonLink>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="by-area">
        <h2 id="by-area" className="font-display text-2xl">
          Practice one area
        </h2>
        <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
          {ready && hasProgress
            ? "Your current mastery is shown against each area."
            : "Pick whichever you have been studying."}
        </p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {DOMAINS.map((domain) => {
            const entry = mastery.find((item) => item.domain === domain.id);
            const available = counts[domain.id] ?? 0;
            const selected = domainId === domain.id;

            return (
              <li key={domain.id}>
                <Card className="h-full p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-sans text-base font-semibold text-ink">
                      {domain.name}
                    </h3>
                    {ready && entry ? (
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
                    ) : null}
                  </div>

                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {domain.description}
                  </p>

                  {ready && entry && entry.attempts > 0 ? (
                    <div className="mt-3">
                      <Meter
                        value={entry.accuracy}
                        tone={entry.accuracy >= 0.8 ? "success" : "primary"}
                      />
                      <p className="mt-1.5 text-xs text-ink-subtle">
                        {Math.round(entry.accuracy * 100)}% recent accuracy ·{" "}
                        {entry.seenQuestions}/{available} questions seen
                      </p>
                    </div>
                  ) : (
                    <p className="mt-3 text-xs text-ink-subtle">
                      {available} question{available === 1 ? "" : "s"} available
                    </p>
                  )}

                  <div className="mt-3.5 flex flex-wrap gap-2">
                    <ButtonLink
                      href={practiceHref("domain", {
                        count,
                        domainId: domain.id,
                      })}
                      variant={selected ? "primary" : "secondary"}
                      size="sm"
                    >
                      Practice {Math.min(count, available)}
                    </ButtonLink>
                    {domain.studyHref ? (
                      <Link
                        href={domain.studyHref}
                        className="inline-flex min-h-9 items-center px-2 text-sm font-semibold text-primary hover:underline"
                        onClick={() => setDomainId(domain.id)}
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
    </div>
  );
}
