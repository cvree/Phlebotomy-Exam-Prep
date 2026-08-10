"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VocabTerm } from "@/types/vocab";
import { buildMatchBoard, type MatchTile } from "@/lib/vocab/session";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { track } from "@/lib/analytics";
import { Badge, Button, Card, Notice, cx } from "@/components/shared/ui";
import { useVocabStudy } from "./shared";

/**
 * Match.
 *
 * Twelve tiles, six pairs, one clock. It is the least academic mode here and
 * the one students come back to, which is reason enough for it to exist — but
 * it is also genuinely good practice for the recognition half of vocabulary.
 *
 * Grading is deliberately gentle: a pair found without a wrong attempt scores
 * "good", a pair found after fumbling scores "hard", and nothing here ever
 * scores "again". Matching against six visible options is much easier than
 * recall, so letting it *lower* a term's interval would corrupt the schedule
 * that Learn and Write build.
 */
const PAIR_COUNT = 6;

export function MatchMode({
  terms,
  setId,
}: {
  terms: VocabTerm[];
  setId: string;
}) {
  const { progress } = useStudyProgress();
  const { grade, finish } = useVocabStudy(setId, "match");

  const [seed, setSeed] = useState(() => Date.now());
  const [matched, setMatched] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string[]>([]);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [finishedMs, setFinishedMs] = useState<number | null>(null);
  const mistakes = useRef<Record<string, number>>({});
  const wrongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { tiles, pairs } = useMemo(
    () => buildMatchBoard(terms, seed, PAIR_COUNT),
    [terms, seed],
  );

  const best = progress.vocab.matchBests[setId];
  const complete = finishedMs !== null;

  useEffect(() => {
    if (startedAt === null || complete) return;
    const id = window.setInterval(() => {
      setElapsed(Date.now() - startedAt);
    }, 100);
    return () => window.clearInterval(id);
  }, [startedAt, complete]);

  useEffect(
    () => () => {
      if (wrongTimer.current) clearTimeout(wrongTimer.current);
    },
    [],
  );

  const reset = useCallback(() => {
    setSeed(Date.now());
    setMatched([]);
    setSelected(null);
    setWrong([]);
    setStartedAt(null);
    setElapsed(0);
    setFinishedMs(null);
    mistakes.current = {};
  }, []);

  const completeRound = useCallback(
    (durationMs: number, matchedTermIds: string[]) => {
      setFinishedMs(durationMs);

      for (const termId of matchedTermIds) {
        grade(termId, (mistakes.current[termId] ?? 0) > 0 ? "hard" : "good");
      }

      finish({
        total: matchedTermIds.length,
        correct: matchedTermIds.filter(
          (termId) => (mistakes.current[termId] ?? 0) === 0,
        ).length,
        newTerms: 0,
        startedAt: new Date(Date.now() - durationMs).toISOString(),
        completedAt: new Date().toISOString(),
        durationMs,
        matchMs: durationMs,
      });

      track("vocab_match_completed", {
        set: setId,
        ms: Math.round(durationMs),
        pairs: matchedTermIds.length,
      });
    },
    [grade, finish, setId],
  );

  const select = useCallback(
    (tile: MatchTile) => {
      if (complete || matched.includes(tile.termId)) return;

      const begunAt = startedAt ?? Date.now();
      if (startedAt === null) {
        setStartedAt(begunAt);
        track("vocab_mode_started", { mode: "match", set: setId });
      }

      if (selected === null) {
        setSelected(tile.id);
        return;
      }

      if (selected === tile.id) {
        setSelected(null);
        return;
      }

      const first = tiles.find((entry) => entry.id === selected);
      if (!first) {
        setSelected(tile.id);
        return;
      }

      if (first.termId === tile.termId && first.face !== tile.face) {
        const nextMatched = [...matched, tile.termId];
        setMatched(nextMatched);
        setSelected(null);

        if (nextMatched.length === pairs.length) {
          completeRound(Date.now() - begunAt, nextMatched);
        }
        return;
      }

      mistakes.current[first.termId] = (mistakes.current[first.termId] ?? 0) + 1;
      mistakes.current[tile.termId] = (mistakes.current[tile.termId] ?? 0) + 1;
      setWrong([first.id, tile.id]);
      setSelected(null);
      if (wrongTimer.current) clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrong([]), 450);
    },
    [complete, matched, selected, tiles, pairs.length, startedAt, setId, completeRound],
  );

  if (terms.length < PAIR_COUNT) {
    return (
      <Notice title="Not enough terms for a board">
        Match needs at least {PAIR_COUNT} terms. Pick a larger set.
      </Notice>
    );
  }

  const displayMs = complete ? (finishedMs ?? 0) : elapsed;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span
            className="font-mono text-3xl font-semibold tabular-nums text-ink"
            aria-live="off"
          >
            {formatSeconds(displayMs)}
          </span>
          <span className="text-sm text-ink-subtle">
            {matched.length} / {pairs.length} pairs
          </span>
        </div>
        {best !== undefined ? (
          <Badge tone="primary">Best {formatSeconds(best)}</Badge>
        ) : null}
      </div>

      {complete ? (
        <Card className="mb-5 border-2 border-success-border bg-success-soft p-5">
          <h3 className="font-display text-2xl">
            {formatSeconds(finishedMs ?? 0)}
          </h3>
          <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
            {best !== undefined && (finishedMs ?? 0) <= best
              ? "A new personal best for this set."
              : best !== undefined
                ? `Your best is ${formatSeconds(best)}.`
                : "That is your first time on this set — now you have something to beat."}
          </p>
          <Button size="lg" onClick={reset} className="mt-4 w-full sm:w-auto">
            Play again
          </Button>
        </Card>
      ) : null}

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {tiles.map((tile) => {
          const isMatched = matched.includes(tile.termId);
          const isSelected = selected === tile.id;
          const isWrong = wrong.includes(tile.id);

          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => select(tile)}
              disabled={isMatched || complete}
              aria-pressed={isSelected}
              className={cx(
                "flex min-h-28 items-center justify-center rounded-[var(--radius)]",
                "border-2 p-3 text-center text-sm leading-snug transition-all sm:min-h-32",
                isMatched &&
                  "pointer-events-none border-dashed border-line bg-surface-muted/40 opacity-0",
                !isMatched &&
                  isSelected &&
                  "border-primary bg-primary-soft text-primary",
                !isMatched &&
                  isWrong &&
                  "border-danger bg-danger-soft text-danger",
                !isMatched &&
                  !isSelected &&
                  !isWrong &&
                  "border-line bg-surface text-ink hover:border-line-strong",
                tile.face === "term" && "font-semibold",
              )}
            >
              <span className="line-clamp-5">{tile.text}</span>
            </button>
          );
        })}
      </div>

      {!complete ? (
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={reset}>
            New board
          </Button>
          <p className="self-center text-sm text-ink-subtle">
            Tap a term, then its definition.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function formatSeconds(ms: number): string {
  const seconds = ms / 1000;
  return seconds < 60
    ? `${seconds.toFixed(1)}s`
    : `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
}
