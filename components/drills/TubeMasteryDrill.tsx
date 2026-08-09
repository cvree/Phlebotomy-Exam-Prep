"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TUBE_DRILL_MODES,
  buildTubeDrill,
  getTubeDrillMode,
  gradeTubeDrill,
  type TubeDrillMode,
} from "@/lib/drills/tubeMastery";
import { findTube } from "@/data/tubes/tubes";
import { track } from "@/lib/analytics";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { TubeGlyph } from "@/components/shared/TubeGlyph";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  Meter,
  Notice,
  StatTile,
  cx,
} from "@/components/shared/ui";

const ROUND_LENGTH = 8;

/**
 * Tube & additive drill.
 *
 * A round of multiple-choice items generated from the tube dataset. Feedback
 * is immediate and always includes the additive's *mechanism*, because "EDTA
 * chelates calcium" is what makes the order of draw derivable rather than
 * memorised.
 */
export function TubeMasteryDrill() {
  const { ready, progress, saveDrillAttempt } = useStudyProgress();

  const [modeId, setModeId] = useState<TubeDrillMode>("tube-to-additive");
  const [seed, setSeed] = useState(1);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const mode = useMemo(() => getTubeDrillMode(modeId), [modeId]);
  const questions = useMemo(
    () => buildTubeDrill(mode, ROUND_LENGTH, seed),
    [mode, seed],
  );
  const current = questions[index];

  const startRound = useCallback(
    (nextMode: TubeDrillMode = modeId) => {
      setModeId(nextMode);
      setSeed(Date.now());
      setIndex(0);
      setAnswers({});
      setRevealed(false);
      setFinished(false);
      setStartedAt(Date.now());
      track("tube_drill_started", { mode: nextMode, count: ROUND_LENGTH });
    },
    [modeId],
  );

  useEffect(() => {
    setStartedAt(Date.now());
    track("tube_drill_started", { mode: "tube-to-additive", count: ROUND_LENGTH });
  }, []);

  const grade = useMemo(
    () => gradeTubeDrill(questions, answers),
    [questions, answers],
  );

  const answer = useCallback(
    (optionId: string) => {
      if (!current || revealed) return;
      setAnswers((previous) => ({ ...previous, [current.tubeId]: optionId }));
      setRevealed(true);
    },
    [current, revealed],
  );

  const next = useCallback(() => {
    if (index + 1 >= questions.length) {
      const final = gradeTubeDrill(questions, answers);
      setFinished(true);
      saveDrillAttempt({
        id: `tube-${Date.now()}`,
        drill: "tube-colors",
        mode: modeId,
        accuracy: final.accuracy,
        total: final.total,
        correct: final.correct,
        perfect: final.perfect,
        durationMs: startedAt ? Date.now() - startedAt : undefined,
        at: new Date().toISOString(),
      });
      track("tube_drill_completed", {
        mode: modeId,
        correct: final.correct,
        total: final.total,
        perfect: final.perfect,
      });
      return;
    }
    setIndex((value) => value + 1);
    setRevealed(false);
    headingRef.current?.focus();
  }, [index, questions, answers, saveDrillAttempt, modeId, startedAt]);

  const history = ready
    ? progress.drills.filter((drill) => drill.drill === "tube-colors")
    : [];
  const recent = history.slice(-5);
  const recentAccuracy =
    recent.length === 0
      ? 0
      : recent.reduce((sum, drill) => sum + drill.accuracy, 0) / recent.length;

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
          Drill
        </p>
        <h1 className="mt-1.5 font-display text-3xl sm:text-4xl">
          Tube & additive mastery
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
          Eight rapid questions on what is inside each tube and what it does.
          Knowing the mechanism is what makes the order of draw make sense.
        </p>
      </div>

      {ready && history.length > 0 ? (
        <dl className="mt-6 grid grid-cols-3 gap-3">
          <StatTile label="Rounds" value={String(history.length)} />
          <StatTile
            label="Recent accuracy"
            value={`${Math.round(recentAccuracy * 100)}%`}
            detail={`last ${recent.length}`}
          />
          <StatTile
            label="Perfect rounds"
            value={String(history.filter((drill) => drill.perfect).length)}
          />
        </dl>
      ) : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <fieldset className="mb-5">
            <legend className="mb-2.5 text-sm font-semibold text-ink">
              Drill direction
            </legend>
            <div className="flex flex-wrap gap-2">
              {TUBE_DRILL_MODES.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  disabled={!entry.available}
                  onClick={() => startRound(entry.id)}
                  title={
                    entry.available ? entry.description : "Coming soon"
                  }
                  className={cx(
                    "min-h-11 rounded-[var(--radius)] border-2 px-3.5 text-sm font-semibold transition-colors",
                    modeId === entry.id
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-line bg-surface text-ink-muted hover:border-line-strong",
                    !entry.available && "cursor-not-allowed opacity-45",
                  )}
                >
                  {entry.name}
                  {!entry.available ? (
                    <span className="ml-1.5 text-xs font-normal">soon</span>
                  ) : null}
                </button>
              ))}
            </div>
          </fieldset>

          {finished ? (
            <RoundResult
              correct={grade.correct}
              total={grade.total}
              missedTubeIds={grade.missedTubeIds}
              onRetry={() => startRound()}
            />
          ) : current ? (
            <Card className="p-4 sm:p-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-ink-muted">
                  {index + 1}
                  <span className="text-ink-subtle"> of {questions.length}</span>
                </span>
                <span className="text-sm font-medium text-ink-muted">
                  {grade.correct} correct
                </span>
              </div>
              <Meter value={index} max={questions.length} />

              <h2
                ref={headingRef}
                tabIndex={-1}
                className="mt-5 font-display text-xl leading-snug sm:text-2xl"
              >
                {current.prompt}
              </h2>

              {current.promptTube ? (
                <div className="mt-4 flex items-center gap-4 rounded-[var(--radius)] bg-surface-muted px-4 py-3">
                  <TubeGlyph tube={current.promptTube} size="lg" />
                  <div>
                    <p className="font-semibold text-ink">
                      {current.promptTube.displayName}
                    </p>
                    <p className="text-sm text-ink-muted">
                      Closure color: {current.promptTube.colorNames.join(", ")}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-5 flex flex-col gap-2.5">
                {current.options.map((option) => {
                  const chosen = answers[current.tubeId] === option.id;
                  const isCorrect = option.id === current.correctOptionId;
                  const showCorrect = revealed && isCorrect;
                  const showWrong = revealed && chosen && !isCorrect;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => answer(option.id)}
                      disabled={revealed}
                      className={cx(
                        "flex min-h-14 items-center justify-between gap-3 rounded-[var(--radius)]",
                        "border-2 bg-surface px-3.5 py-3 text-left text-[0.9375rem] transition-colors",
                        !revealed && "border-line hover:border-primary",
                        showCorrect && "border-success bg-success-soft",
                        showWrong && "border-danger bg-danger-soft",
                        revealed && !showCorrect && !showWrong && "border-line opacity-60",
                      )}
                    >
                      <span className="min-w-0 flex-1 text-ink">{option.text}</span>
                      {showCorrect ? (
                        <span className="shrink-0 text-xs font-bold uppercase text-success">
                          Correct
                        </span>
                      ) : null}
                      {showWrong ? (
                        <span className="shrink-0 text-xs font-bold uppercase text-danger">
                          Your answer
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {revealed ? (
                <div className="mt-5 rounded-[var(--radius)] border border-line bg-surface-muted px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
                    Why
                  </p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink">
                    {current.teaching}
                  </p>
                </div>
              ) : null}

              {revealed ? (
                <Button size="lg" onClick={next} className="mt-5 w-full sm:w-auto">
                  {index + 1 >= questions.length ? "See results" : "Next"}
                </Button>
              ) : null}
            </Card>
          ) : null}
        </div>

        <aside className="space-y-5">
          <Notice title="Color is a convention">
            Additives and closure colors vary between manufacturers, and some
            tubes — royal blue, tan, ACD — come in more than one version. Read
            the label band, and follow your facility&apos;s procedure manual.
          </Notice>

          <Card className="p-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
              Go deeper
            </h2>
            <ul className="mt-2.5 space-y-2 text-sm">
              <li>
                <Link
                  href="/study/phlebotomy-tube-colors"
                  className="font-medium text-primary hover:underline"
                >
                  Tube color & additive guide →
                </Link>
              </li>
              <li>
                <Link
                  href="/drills/order-of-draw"
                  className="font-medium text-primary hover:underline"
                >
                  Order of Draw drill →
                </Link>
              </li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function RoundResult({
  correct,
  total,
  missedTubeIds,
  onRetry,
}: {
  correct: number;
  total: number;
  missedTubeIds: string[];
  onRetry: () => void;
}) {
  const perfect = correct === total;
  const missed = missedTubeIds
    .map(findTube)
    .filter((tube): tube is NonNullable<typeof tube> => tube !== undefined);

  return (
    <Card
      className={cx(
        "border-2 p-5",
        perfect ? "border-success-border bg-success-soft" : "border-line",
      )}
    >
      <h2 className="font-display text-2xl">
        {correct} of {total} correct
      </h2>
      {perfect ? (
        <Badge tone="success" className="mt-2">
          Perfect round
        </Badge>
      ) : null}

      {missed.length > 0 ? (
        <div className="mt-5">
          <h3 className="font-sans text-sm font-semibold text-ink">
            Worth another look
          </h3>
          <ul className="mt-2.5 space-y-2.5">
            {missed.map((tube) => (
              <li
                key={tube.id}
                className="flex gap-3 rounded-[var(--radius)] bg-surface px-3.5 py-3"
              >
                <TubeGlyph tube={tube} size="sm" />
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{tube.displayName}</p>
                  <p className="text-sm text-ink-muted">{tube.additive}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {tube.additiveAction}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <Button size="lg" onClick={onRetry} className="flex-1">
          Another round
        </Button>
        <ButtonLink
          href="/study/phlebotomy-tube-colors"
          variant="secondary"
          size="lg"
          className="flex-1"
        >
          Read the tube guide
        </ButtonLink>
      </div>
    </Card>
  );
}
