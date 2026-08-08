import Link from "next/link";
import type { Recommendation } from "@/types/study";
import { cx } from "@/components/shared/ui";

/**
 * A single "do this next" card.
 *
 * The reason line is always shown. A recommendation a student cannot trace
 * back to their own data is indistinguishable from a nag, and they stop
 * reading it.
 */
export function RecommendationCard({
  recommendation,
  emphasis = "primary",
}: {
  recommendation: Recommendation;
  emphasis?: "primary" | "secondary";
}) {
  return (
    <div
      className={cx(
        "rounded-[var(--radius-lg)] border p-4 sm:p-5",
        emphasis === "primary"
          ? "border-transparent bg-primary-soft"
          : "border-line bg-surface",
      )}
    >
      <h3 className="font-display text-lg text-ink sm:text-xl">
        {recommendation.title}
      </h3>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">
        {recommendation.reason}
      </p>
      <Link
        href={recommendation.href}
        className={cx(
          "mt-4 inline-flex min-h-11 items-center justify-center rounded-[var(--radius)]",
          "px-4 text-[0.9375rem] font-semibold transition-colors",
          emphasis === "primary"
            ? "bg-primary text-primary-contrast hover:bg-primary-strong"
            : "border border-line-strong bg-surface text-ink hover:bg-surface-muted",
        )}
      >
        {recommendation.ctaLabel}
      </Link>
    </div>
  );
}
