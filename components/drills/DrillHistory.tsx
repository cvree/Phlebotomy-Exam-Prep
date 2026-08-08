"use client";

import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { Card, StatTile } from "@/components/shared/ui";

const DRILL_NAMES: Record<string, string> = {
  "order-of-draw": "Order of Draw",
  "tube-colors": "Tube Mastery",
};

/**
 * Drill performance so far.
 *
 * Renders nothing until there is something to say. An empty stats block full
 * of zeros is worse than no stats block.
 */
export function DrillHistory() {
  const { ready, progress } = useStudyProgress();

  if (!ready || progress.drills.length === 0) {
    return null;
  }

  const recent = progress.drills.slice(-6).reverse();

  const summaries = (["order-of-draw", "tube-colors"] as const).map((drill) => {
    const attempts = progress.drills.filter((entry) => entry.drill === drill);
    const window = attempts.slice(-5);
    return {
      drill,
      attempts: attempts.length,
      perfect: attempts.filter((entry) => entry.perfect).length,
      accuracy:
        window.length === 0
          ? 0
          : window.reduce((sum, entry) => sum + entry.accuracy, 0) / window.length,
    };
  });

  return (
    <section className="mt-10" aria-labelledby="drill-history">
      <h2 id="drill-history" className="font-display text-2xl">
        Your drill history
      </h2>

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summaries
          .filter((summary) => summary.attempts > 0)
          .map((summary) => (
            <StatTile
              key={summary.drill}
              label={DRILL_NAMES[summary.drill] ?? summary.drill}
              value={`${Math.round(summary.accuracy * 100)}%`}
              detail={`${summary.attempts} attempt${summary.attempts === 1 ? "" : "s"} · ${summary.perfect} perfect`}
            />
          ))}
      </dl>

      <Card className="mt-4 overflow-hidden">
        <ul className="divide-y divide-[var(--border)]">
          {recent.map((attempt) => (
            <li
              key={attempt.id}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">
                  {DRILL_NAMES[attempt.drill] ?? attempt.drill}
                </p>
                <p className="text-xs text-ink-subtle">
                  {new Date(attempt.at).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <p className="shrink-0 text-sm tabular-nums text-ink-muted">
                {attempt.correct}/{attempt.total}
                {attempt.perfect ? (
                  <span className="ml-2 font-semibold text-success">perfect</span>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
