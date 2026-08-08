"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PracticeConfig } from "@/types/study";
import type { ActivePracticeSession } from "@/types/study";
import { resolveQuestions } from "@/data/questions";
import { selectQuestions } from "@/lib/scoring/selection";
import {
  buildSessionSummary,
  isCorrect,
  scoreAnswers,
} from "@/lib/scoring/score";
import { track } from "@/lib/analytics";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { Button, ButtonLink, Card, Meter } from "@/components/shared/ui";
import { QuestionCard } from "./QuestionCard";
import { ExplanationPanel } from "./ExplanationPanel";
import { SessionResults } from "./SessionResults";
import { describePracticeMode } from "./modes";

type Phase = "loading" | "active" | "results";

function sameConfig(a: PracticeConfig, b: PracticeConfig): boolean {
  return (
    a.mode === b.mode &&
    a.certificationId === b.certificationId &&
    a.domainId === b.domainId &&
    a.questionCount === b.questionCount
  );
}

export function PracticeRunner({ config }: { config: PracticeConfig }) {
  const {
    ready,
    progress,
    mastery,
    repository,
    saveAttempts,
    saveSession,
  } = useStudyProgress();

  const [session, setSession] = useState<ActivePracticeSession | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [pending, setPending] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Session creation must happen exactly once per mount. Selection reads
  // progress, and progress changes on every answer — rerunning this would
  // rebuild the paper mid-session.
  const started = useRef(false);

  useEffect(() => {
    if (!ready || started.current) return;
    started.current = true;

    const stored = repository.readPracticeSession();
    if (
      stored &&
      sameConfig(stored.config, config) &&
      stored.index < stored.questionIds.length &&
      resolveQuestions(stored.questionIds).length === stored.questionIds.length
    ) {
      setSession(stored);
      setPhase("active");
      return;
    }

    const questions = selectQuestions(config, {
      certificationId: config.certificationId,
      progress,
      mastery,
      seed: Date.now(),
    });

    if (questions.length === 0) {
      setPhase("results");
      return;
    }

    const fresh: ActivePracticeSession = {
      id: `practice-${Date.now()}`,
      config,
      questionIds: questions.map((question) => question.id),
      index: 0,
      answers: {},
      revealed: [],
      startedAt: new Date().toISOString(),
    };

    setSession(fresh);
    repository.writePracticeSession(fresh);
    setPhase("active");

    track("practice_started", {
      mode: config.mode,
      count: questions.length,
      domain: config.domainId ?? "mixed",
    });
    if (config.mode === "weak-areas") {
      track("weak_area_practice_started", { count: questions.length });
    }
  }, [ready, repository, config, progress, mastery]);

  const questions = useMemo(
    () => (session ? resolveQuestions(session.questionIds) : []),
    [session],
  );

  const current = session ? questions[session.index] : undefined;
  const revealed = Boolean(
    session && current && session.revealed.includes(current.id),
  );
  const selectedChoiceId = current
    ? (session?.answers[current.id] ?? pending)
    : null;

  const persist = useCallback(
    (next: ActivePracticeSession) => {
      setSession(next);
      repository.writePracticeSession(next);
    },
    [repository],
  );

  const handleSubmit = useCallback(() => {
    if (!session || !current || !pending) return;

    const correct = isCorrect(current, pending);
    const at = new Date().toISOString();

    persist({
      ...session,
      answers: { ...session.answers, [current.id]: pending },
      revealed: [...session.revealed, current.id],
    });

    saveAttempts([
      {
        questionId: current.id,
        domain: current.domain,
        choiceId: pending,
        correct,
        at,
        sessionId: session.id,
        sessionKind: "practice",
      },
    ]);

    track("question_answered", {
      questionId: current.id,
      domain: current.domain,
      correct,
      mode: session.config.mode,
    });
    track("explanation_viewed", { questionId: current.id });
  }, [session, current, pending, persist, saveAttempts]);

  const finish = useCallback(() => {
    if (!session) return;

    const breakdown = scoreAnswers(questions, session.answers);
    const completedAt = new Date().toISOString();

    saveSession(
      buildSessionSummary(breakdown, {
        id: session.id,
        kind: "practice",
        mode: session.config.mode,
        certificationId: session.config.certificationId,
        domainId: session.config.domainId,
        startedAt: session.startedAt,
        completedAt,
      }),
    );

    repository.clearPracticeSession();
    setPhase("results");

    track("practice_completed", {
      mode: session.config.mode,
      total: breakdown.total,
      correct: breakdown.correct,
    });
  }, [session, questions, saveSession, repository]);

  const handleNext = useCallback(() => {
    if (!session) return;
    if (session.index + 1 >= questions.length) {
      finish();
      return;
    }
    setPending(null);
    persist({ ...session, index: session.index + 1 });
  }, [session, questions.length, finish, persist]);

  // Move focus to the question heading on advance, so keyboard and screen
  // reader users land on the new question instead of staying on a button that
  // has just disappeared.
  useEffect(() => {
    if (phase === "active" && !revealed) {
      headingRef.current?.focus();
    }
  }, [phase, session?.index, revealed]);

  if (!ready || phase === "loading") {
    return <LoadingState />;
  }

  if (phase === "results" && session) {
    return (
      <SessionResults
        questions={questions}
        answers={session.answers}
        config={session.config}
      />
    );
  }

  if (phase === "results" || !session || !current) {
    return (
      <div className="container-prose py-12">
        <Card className="p-6 text-center">
          <h1 className="font-display text-2xl">No questions available</h1>
          <p className="mt-2 text-ink-muted">
            That combination didn&apos;t match any questions in the bank. Try a
            mixed session instead.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <ButtonLink href="/practice/session?mode=quick-10&count=10">
              Start Quick 10
            </ButtonLink>
            <ButtonLink href="/practice" variant="secondary">
              Back to setup
            </ButtonLink>
          </div>
        </Card>
      </div>
    );
  }

  const answeredCount = session.revealed.length;
  const correctSoFar = questions.filter(
    (question) =>
      session.revealed.includes(question.id) &&
      isCorrect(question, session.answers[question.id] ?? null),
  ).length;

  return (
    <div className="container-prose py-6 sm:py-10">
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <Link
            href="/practice"
            className="font-medium text-ink-muted hover:text-primary"
          >
            ← {describePracticeMode(session.config)}
          </Link>
          <span className="font-medium text-ink-muted">
            {correctSoFar}/{answeredCount || 0} correct
          </span>
        </div>
        <Meter value={session.index} max={questions.length} />
        <p className="sr-only" aria-live="polite">
          Question {session.index + 1} of {questions.length}
        </p>
      </div>

      <Card className="p-4 sm:p-6">
        <h1 ref={headingRef} tabIndex={-1} className="sr-only">
          Question {session.index + 1} of {questions.length}
        </h1>

        <QuestionCard
          question={current}
          selectedChoiceId={selectedChoiceId}
          onSelect={setPending}
          revealed={revealed}
          questionNumber={session.index + 1}
          totalQuestions={questions.length}
        />

        {revealed ? (
          <ExplanationPanel
            question={current}
            selectedChoiceId={session.answers[current.id] ?? null}
            correct={isCorrect(current, session.answers[current.id] ?? null)}
          />
        ) : null}

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
          {revealed ? (
            <Button size="lg" onClick={handleNext} className="w-full sm:w-auto">
              {session.index + 1 >= questions.length
                ? "See your results"
                : "Next question"}
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!pending}
              className="w-full sm:w-auto"
            >
              Submit answer
            </Button>
          )}
        </div>
      </Card>

      <p className="mt-4 text-center text-xs text-ink-subtle">
        Progress saves automatically. You can close this and pick it up later.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="container-prose py-12">
      <Card className="p-6">
        <div className="h-3 w-24 animate-pulse rounded bg-surface-muted" />
        <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-surface-muted" />
        <div className="mt-6 space-y-2.5">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="h-14 animate-pulse rounded-[var(--radius)] bg-surface-muted"
            />
          ))}
        </div>
        <p className="sr-only">Building your session…</p>
      </Card>
    </div>
  );
}
