import type { Readiness } from "@/types/study";
import { READINESS_LABELS } from "@/lib/progress/readiness";
import { Card, Meter, cx } from "@/components/shared/ui";

/**
 * Study readiness.
 *
 * Shows the score, the label, and — always expandable — the five components
 * that produced it. The breakdown is not an advanced feature: a number a
 * student cannot take apart is a number they cannot act on.
 */
export function ReadinessMeter({ readiness }: { readiness: Readiness }) {
  const tone =
    readiness.score >= 80
      ? "success"
      : readiness.score >= 35
        ? "primary"
        : "neutral";

  return (
    <Card className="p-5">
      <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-ink-subtle">
        Study readiness
      </h2>

      <p
        className={cx(
          "mt-2 font-display text-3xl",
          readiness.score >= 80 ? "text-success" : "text-ink",
        )}
      >
        {READINESS_LABELS[readiness.level]}
      </p>
      <p className="mt-0.5 text-sm text-ink-muted">
        {readiness.score} out of 100
      </p>

      <Meter className="mt-3" value={readiness.score} max={100} tone={tone} />

      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {readiness.limitingFactor}
      </p>

      {readiness.components.length > 0 ? (
        <details className="group mt-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-primary marker:hidden">
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="transition-transform group-open:rotate-90"
              >
                ›
              </span>
              See the breakdown
            </span>
          </summary>
          <ul className="mt-3 space-y-3">
            {readiness.components.map((component) => (
              <li key={component.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-ink">
                    {component.label}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-ink-muted">
                    {Math.round(component.points)}/{component.maxPoints}
                  </span>
                </div>
                <Meter
                  className="mt-1.5"
                  value={component.points}
                  max={component.maxPoints}
                />
                <p className="mt-1 text-xs text-ink-subtle">{component.detail}</p>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-ink-subtle">
        This measures how much of the material you have demonstrated recently.
        It is not a prediction of whether you will pass, and we make no claim
        that it is.
      </p>
    </Card>
  );
}
