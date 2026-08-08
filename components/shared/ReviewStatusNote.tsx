import Link from "next/link";
import type { ReviewStatus, SourceReference } from "@/types/content";
import { cx } from "./ui";

const STATUS_TEXT: Record<ReviewStatus, string> = {
  draft: "Draft — written but not checked. Verify before relying on it.",
  "needs-review":
    "Awaiting clinical review. Written from standard curriculum material and not yet checked by a qualified reviewer.",
  reviewed: "Reviewed against the cited references.",
  published: "Reviewed and published.",
};

/**
 * The honesty label.
 *
 * Every question, tube record, and sequence carries a review status, and this
 * renders it wherever that content is shown. It exists so a student is never
 * left to assume that something has been checked when it has not.
 */
export function ReviewStatusNote({
  status,
  sources,
  lastReviewedAt,
  className,
}: {
  status: ReviewStatus;
  sources?: SourceReference[];
  lastReviewedAt?: string;
  className?: string;
}) {
  const needsCaveat = status === "draft" || status === "needs-review";

  return (
    <details
      className={cx(
        "rounded-[var(--radius)] border border-line bg-surface/70 px-3.5 py-2.5",
        className,
      )}
    >
      <summary className="cursor-pointer list-none text-xs font-semibold text-ink-muted marker:hidden">
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={cx(
              "inline-block h-2 w-2 rounded-full",
              needsCaveat ? "bg-flag" : "bg-success",
            )}
          />
          {needsCaveat ? "Content status: awaiting review" : "Content status: reviewed"}
          <span className="font-normal text-ink-subtle">— sources & caveats</span>
        </span>
      </summary>

      <div className="mt-2.5 space-y-2 text-xs leading-relaxed text-ink-muted">
        <p>{STATUS_TEXT[status]}</p>
        {lastReviewedAt ? <p>Last reviewed: {lastReviewedAt}</p> : null}

        {sources && sources.length > 0 ? (
          <div>
            <p className="font-semibold text-ink-muted">References</p>
            <ul className="mt-1 space-y-1">
              {sources.map((source) => (
                <li key={source.label}>
                  {source.url ? (
                    <a
                      href={source.url}
                      rel="noopener noreferrer nofollow"
                      target="_blank"
                      className="text-primary underline"
                    >
                      {source.label}
                    </a>
                  ) : (
                    <span>{source.label}</span>
                  )}
                  {source.publisher ? (
                    <span className="text-ink-subtle"> — {source.publisher}</span>
                  ) : null}
                  {source.note ? (
                    <span className="block text-ink-subtle">{source.note}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p>
          <Link href="/about/methodology" className="text-primary underline">
            How we write and review content
          </Link>
        </p>
      </div>
    </details>
  );
}
