"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ActiveMockSession, MockResult } from "@/types/study";
import { resolveQuestions } from "@/data/questions";
import { NHA_CPT } from "@/data/certifications";
import { buildMockExam } from "@/lib/scoring/selection";
import { buildAttempts, scoreAnswers } from "@/lib/scoring/score";
import { track } from "@/lib/analytics";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { QuestionCard } from "@/components/practice/QuestionCard";
import { Button, ButtonLink, Card, cx } from "@/components/shared/ui";
import { MockTimer } from "./MockTimer";
import { MockNavigator } from "./MockNavigator";

/** How often in-flight exam state is written to storage. */
const AUTOSAVE_INTERVAL_MS = 5000;

type Phase = "loading" | "active" | "none";

export function MockRunner({ startNew }: { startNew: boolean }) {
  const router = useRouter();
  const { ready, repository, saveAttempts, saveMockResult } = useStudyProgress();

  const [session, setSession] = useState<ActiveMockSession | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [confirming, setConfirming] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const started = useRef(false);
  const lastSave = useRef(0);
  const submitting = useRef(false);
  const questionHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ready || started.current) return;
    started.current = true;

    const stored = repository.readMockSession();

    if (stored && !stored.submitted && !startNew) {
      // Reconcile the clock. The timer is stored as "seconds left at this
      // instant", so a closed tab, a sleeping phone, and a crash all resolve
      // the same way: subtract the wall-clock time that actually passed.
      const elapsed = Math.max(
        0,
        Math.floor((Date.now() - Date.parse(stored.lastTickAt)) / 1000),
      );
      const resumed: ActiveMockSession = {
        ...stored,
        secondsRemaining: Math.max(0, stored.secondsRemaining - elapsed),
        lastTickAt: new Date().toISOString(),
      };
      setSession(resumed);
      repository.writeMockSession(resumed);
      setPhase("active");
      track("mock_exam_resumed", {
        answered: Object.keys(resumed.answers).length,
        secondsRemaining: resumed.secondsRemaining,
      });
      return;
    }

    if (!startNew) {
      setPhase("none");
      return;
    }

    const questions = buildMockExam(
      NHA_CPT.id,
      NHA_CPT.mockExamFormat.questionCount,
      Date.now(),
    );
    const fresh: ActiveMockSession = {
      id: `mock-${Date.now()}`,
      certificationId: NHA_CPT.id,
      questionIds: questions.map((question) => question.id),
      index: 0,
      answers: {},
      flagged: [],
      startedAt: new Date().toISOString(),
      durationSeconds: NHA_CPT.mockExamFormat.timeLimitMinutes * 60,
      secondsRemaining: NHA_CPT.mockExamFormat.timeLimitMinutes * 60,
      lastTickAt: new Date().toISOString(),
      submitted: false,
    };
    setSession(fresh);
    repository.writeMockSession(fresh);
    setPhase("active");
    track("mock_exam_started", { questions: fresh.questionIds.length });
  }, [ready, repository, startNew]);

  const questions = useMemo(
    () => (session ? resolveQuestions(session.questionIds) : []),
    [session],
  );
  const current = session ? questions[session.index] : undefined;

  const update = useCallback(
    (patch: Partial<ActiveMockSession>, forceSave = false) => {
      setSession((currentSession) => {
        if (!currentSession) return currentSession;
        const next: ActiveMockSession = {
          ...currentSession,
          ...patch,
          lastTickAt: new Date().toISOString(),
        };
        const now = Date.now();
        if (forceSave || now - lastSave.current > AUTOSAVE_INTERVAL_MS) {
          lastSave.current = now;
          repository.writeMockSession(next);
        }
        return next;
      });
    },
    [repository],
  );

  const submit = useCallback(() => {
    if (!session || submitting.current) return;
    submitting.current = true;

    const breakdown = scoreAnswers(questions, session.answers);
    const completedAt = new Date().toISOString();

    const result: MockResult = {
      id: session.id,
      certificationId: session.certificationId,
      questionIds: session.questionIds,
      answers: session.answers,
      flagged: session.flagged,
      total: breakdown.total,
      correct: breakdown.correct,
      incorrect: breakdown.incorrect,
      unanswered: breakdown.unanswered,
      byDomain: breakdown.byDomain,
      startedAt: session.startedAt,
      completedAt,
      durationSeconds: session.durationSeconds,
      secondsUsed: session.durationSeconds - session.secondsRemaining,
    };

    saveAttempts(
      buildAttempts(questions, session.answers, {
        sessionId: session.id,
        sessionKind: "mock",
        at: completedAt,
      }),
    );
    saveMockResult(result);
    repository.clearMockSession();

    track("mock_exam_completed", {
      total: result.total,
      correct: result.correct,
      unanswered: result.unanswered,
    });

    router.push("/mock-exam/results");
  }, [session, questions, saveAttempts, saveMockResult, repository, router]);

  // The exam ends when the clock does, whether or not anyone is looking.
  useEffect(() => {
    if (phase !== "active" || !session || session.secondsRemaining > 0) return;
    submit();
  }, [phase, session, submit]);

  // Persist on the way out — closing the tab is the case this exists for.
  useEffect(() => {
    function flush() {
      setSession((currentSession) => {
        if (currentSession && !currentSession.submitted) {
          repository.writeMockSession({
            ...currentSession,
            lastTickAt: new Date().toISOString(),
          });
        }
        return currentSession;
      });
    }
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", flush);
      flush();
    };
  }, [repository]);

  const goTo = useCallback(
    (index: number) => {
      update({ index }, true);
      setNavOpen(false);
      questionHeading.current?.focus();
    },
    [update],
  );

  if (!ready || phase === "loading") {
    return (
      <div className="container-prose py-12">
        <Card className="p-6">
          <div className="h-4 w-32 animate-pulse rounded bg-surface-muted" />
          <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-surface-muted" />
        </Card>
      </div>
    );
  }

  if (phase === "none" || !session || !current) {
    return (
      <div className="container-prose py-12">
        <Card className="p-6 text-center">
          <h1 className="font-display text-2xl">No exam in progress</h1>
          <p className="mt-2 text-ink-muted">
            Start a mock exam from the setup page.
          </p>
          <ButtonLink href="/mock-exam" className="mt-5">
            Go to mock exam setup
          </ButtonLink>
        </Card>
      </div>
    );
  }

  const answeredCount = Object.keys(session.answers).length;
  const isFlagged = session.flagged.includes(current.id);
  const isLast = session.index === questions.length - 1;

  return (
    <div className="container-page py-4 sm:py-8">
      {/* Exam chrome. Sticky so the clock and the submit button never scroll
          out of reach on a phone. */}
      <div className="sticky top-16 z-30 -mx-4 mb-4 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MockTimer
              secondsRemaining={session.secondsRemaining}
              onTick={(seconds) => update({ secondsRemaining: seconds })}
            />
            <span className="text-sm font-medium text-ink-muted">
              {answeredCount}/{questions.length} answered
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setNavOpen((value) => !value)}
              aria-expanded={navOpen}
              aria-controls="mock-navigator"
            >
              {navOpen ? "Hide" : "Questions"}
            </Button>
            <Button size="sm" onClick={() => setConfirming(true)}>
              Submit exam
            </Button>
          </div>
        </div>

        {navOpen ? (
          <div id="mock-navigator" className="mt-3">
            <MockNavigator
              questions={questions}
              answers={session.answers}
              flagged={session.flagged}
              currentIndex={session.index}
              onSelect={goTo}
            />
          </div>
        ) : null}
      </div>

      <div className="mx-auto max-w-3xl">
        <Card className="p-4 sm:p-6">
          <h1 ref={questionHeading} tabIndex={-1} className="sr-only">
            Question {session.index + 1} of {questions.length}
          </h1>

          <QuestionCard
            question={current}
            selectedChoiceId={session.answers[current.id] ?? null}
            onSelect={(choiceId) =>
              update(
                { answers: { ...session.answers, [current.id]: choiceId } },
                true,
              )
            }
            /* Never revealed during the exam — no correctness, no explanation. */
            revealed={false}
            questionNumber={session.index + 1}
            totalQuestions={questions.length}
            showDomain={false}
          />

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() =>
                update(
                  {
                    flagged: isFlagged
                      ? session.flagged.filter((id) => id !== current.id)
                      : [...session.flagged, current.id],
                  },
                  true,
                )
              }
              aria-pressed={isFlagged}
              className={cx(
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)]",
                "border-2 px-4 text-sm font-semibold transition-colors",
                isFlagged
                  ? "border-flag bg-flag-soft text-flag"
                  : "border-line bg-surface text-ink-muted hover:border-line-strong",
              )}
            >
              <span aria-hidden="true">⚑</span>
              {isFlagged ? "Flagged for review" : "Flag for review"}
            </button>

            <div className="flex gap-2.5">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => goTo(session.index - 1)}
                disabled={session.index === 0}
                className="flex-1 sm:flex-none"
              >
                Previous
              </Button>
              {isLast ? (
                <Button
                  size="lg"
                  onClick={() => setConfirming(true)}
                  className="flex-1 sm:flex-none"
                >
                  Finish
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => goTo(session.index + 1)}
                  className="flex-1 sm:flex-none"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </Card>

        <p className="mt-4 text-center text-xs text-ink-subtle">
          Answers save automatically. If you close this by accident, you can
          resume where you left off — the clock keeps running.
        </p>
      </div>

      {confirming ? (
        <SubmitConfirmation
          total={questions.length}
          answered={answeredCount}
          flagged={session.flagged.length}
          onCancel={() => setConfirming(false)}
          onConfirm={submit}
          onReviewUnanswered={() => {
            const firstUnanswered = questions.findIndex(
              (question) => session.answers[question.id] === undefined,
            );
            setConfirming(false);
            if (firstUnanswered >= 0) {
              goTo(firstUnanswered);
            }
          }}
        />
      ) : null}
    </div>
  );
}

function SubmitConfirmation({
  total,
  answered,
  flagged,
  onCancel,
  onConfirm,
  onReviewUnanswered,
}: {
  total: number;
  answered: number;
  flagged: number;
  onCancel: () => void;
  onConfirm: () => void;
  onReviewUnanswered: () => void;
}) {
  const unanswered = total - answered;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-title"
        className="w-full max-w-md rounded-[var(--radius-lg)] border border-line bg-surface p-5 shadow-[var(--shadow-lift)]"
      >
        <h2 id="submit-title" className="font-display text-2xl">
          Submit your exam?
        </h2>
        <p className="mt-2 text-[0.9375rem] text-ink-muted">
          You answered {answered} of {total} questions.
          {flagged > 0 ? ` ${flagged} are flagged for review.` : ""}
        </p>

        {unanswered > 0 ? (
          <p className="mt-3 rounded-[var(--radius)] border border-flag-border bg-flag-soft px-3.5 py-2.5 text-sm text-ink">
            <strong className="font-semibold">
              {unanswered} question{unanswered === 1 ? " is" : "s are"}{" "}
              unanswered.
            </strong>{" "}
            Unanswered questions are marked incorrect.
          </p>
        ) : null}

        <div className="mt-5 flex flex-col gap-2.5">
          {unanswered > 0 ? (
            <Button variant="secondary" size="lg" onClick={onReviewUnanswered}>
              Go to the first unanswered question
            </Button>
          ) : null}
          <Button size="lg" onClick={onConfirm}>
            Submit and see results
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            Keep working
          </Button>
        </div>
      </div>
    </div>
  );
}
