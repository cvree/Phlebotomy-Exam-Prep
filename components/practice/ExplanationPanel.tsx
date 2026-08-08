import type { Question } from "@/types/content";
import { Badge, cx } from "@/components/shared/ui";
import { ReviewStatusNote } from "@/components/shared/ReviewStatusNote";

/**
 * Feedback after an answer.
 *
 * This is the part of the product that teaches, so it appears inline and
 * immediately — no modal, no extra click. The order is deliberate: verdict
 * first (the thing the student is anxious about), then the reasoning, then
 * why their specific wrong answer was tempting, then the takeaway.
 */
export function ExplanationPanel({
  question,
  selectedChoiceId,
  correct,
}: {
  question: Question;
  selectedChoiceId: string | null;
  correct: boolean;
}) {
  const correctChoice = question.choices.find(
    (choice) => choice.id === question.correctChoiceId,
  );
  const chosenExplanation =
    selectedChoiceId && !correct
      ? question.choiceExplanations?.[selectedChoiceId]
      : undefined;

  const otherExplanations = Object.entries(question.choiceExplanations ?? {})
    .filter(([id]) => id !== selectedChoiceId && id !== question.correctChoiceId)
    .map(([id, text]) => ({
      id,
      text,
      label: question.choices.find((choice) => choice.id === id)?.text ?? "",
    }));

  return (
    <div
      className={cx(
        "mt-5 rounded-[var(--radius-lg)] border-2 p-4 sm:p-5",
        correct
          ? "border-success-border bg-success-soft"
          : "border-danger-border bg-danger-soft",
      )}
    >
      <div
        role="status"
        className="flex items-center gap-2.5"
      >
        <span
          aria-hidden="true"
          className={cx(
            "flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white",
            correct ? "bg-success" : "bg-danger",
          )}
        >
          {correct ? "✓" : "✕"}
        </span>
        <p
          className={cx(
            "font-display text-xl",
            correct ? "text-success" : "text-danger",
          )}
        >
          {correct ? "Correct" : "Incorrect"}
        </p>
      </div>

      {!correct && correctChoice ? (
        <p className="mt-3 rounded-[var(--radius)] bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink">
          <span className="font-semibold">Correct answer: </span>
          {correctChoice.text}
        </p>
      ) : null}

      <div className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-ink">
        <p>{question.explanation}</p>

        {chosenExplanation ? (
          <p className="rounded-[var(--radius)] bg-surface/70 px-3.5 py-2.5">
            <span className="font-semibold">Why your answer was wrong: </span>
            {chosenExplanation}
          </p>
        ) : null}

        {otherExplanations.length > 0 ? (
          <details className="group rounded-[var(--radius)] bg-surface/70 px-3.5 py-2.5">
            <summary className="cursor-pointer list-none text-sm font-semibold text-ink marker:hidden">
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="transition-transform group-open:rotate-90"
                >
                  ›
                </span>
                Why the other options are wrong
              </span>
            </summary>
            <ul className="mt-2.5 space-y-2 text-sm text-ink-muted">
              {otherExplanations.map((entry) => (
                <li key={entry.id}>
                  <span className="font-medium text-ink">{entry.label}</span> —{" "}
                  {entry.text}
                </li>
              ))}
            </ul>
          </details>
        ) : null}
      </div>

      {question.memoryTip ? (
        <div className="mt-4 rounded-[var(--radius)] border border-line bg-surface px-3.5 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
            Remember
          </p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink">
            {question.memoryTip}
          </p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {question.tags.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <ReviewStatusNote
        status={question.reviewStatus}
        sources={question.sources}
        className="mt-4"
      />
    </div>
  );
}
