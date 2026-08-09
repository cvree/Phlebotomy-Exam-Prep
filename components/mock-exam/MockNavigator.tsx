"use client";

import type { Question } from "@/types/content";
import { cx } from "@/components/shared/ui";

/**
 * Question grid.
 *
 * State is carried by shape and text as well as color: answered cells are
 * filled and announced as "answered", flagged cells carry a visible ⚑, and
 * every cell's accessible name states its status.
 */
export function MockNavigator({
  questions,
  answers,
  flagged,
  currentIndex,
  onSelect,
}: {
  questions: Question[];
  answers: Record<string, string>;
  flagged: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div>
      <div className="mb-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-muted">
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-3 rounded-sm bg-primary"
          />
          Answered
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-3 rounded-sm border border-line-strong bg-surface"
          />
          Not answered
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="text-flag">
            ⚑
          </span>
          Flagged
        </span>
      </div>

      <div className="scroll-x max-h-48 overflow-y-auto rounded-[var(--radius)] border border-line bg-surface p-2">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(2.5rem,1fr))] gap-1.5">
          {questions.map((question, index) => {
            const answered = answers[question.id] !== undefined;
            const isFlagged = flagged.includes(question.id);
            const isCurrent = index === currentIndex;

            return (
              <li key={question.id}>
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  aria-current={isCurrent ? "true" : undefined}
                  className={cx(
                    "relative flex h-10 w-full items-center justify-center rounded-[var(--radius-sm)]",
                    "border-2 text-sm font-semibold tabular-nums transition-colors",
                    answered
                      ? "border-primary bg-primary text-primary-contrast"
                      : "border-line-strong bg-surface text-ink-muted",
                    isCurrent && "outline outline-2 outline-offset-2 outline-[var(--focus)]",
                  )}
                >
                  {index + 1}
                  {isFlagged ? (
                    <span
                      aria-hidden="true"
                      className="absolute -right-0.5 -top-1 text-xs text-flag"
                    >
                      ⚑
                    </span>
                  ) : null}
                  <span className="sr-only">
                    {`Question ${index + 1}, ${answered ? "answered" : "not answered"}${isFlagged ? ", flagged for review" : ""}`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
