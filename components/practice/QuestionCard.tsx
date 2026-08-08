"use client";

import type { Question } from "@/types/content";
import { domainName } from "@/data/certifications/domains";
import { Badge, cx } from "@/components/shared/ui";

const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Recall",
  2: "Application",
  3: "Analysis",
};

/**
 * The question itself.
 *
 * Uses real radio inputs rather than buttons with ARIA roles: arrow-key
 * navigation, grouping, and the "one of these" relationship all come for free
 * and behave correctly in every screen reader, which hand-rolled roles rarely
 * do.
 */
export function QuestionCard({
  question,
  selectedChoiceId,
  onSelect,
  revealed,
  questionNumber,
  totalQuestions,
  showDomain = true,
}: {
  question: Question;
  selectedChoiceId: string | null;
  onSelect: (choiceId: string) => void;
  revealed: boolean;
  questionNumber: number;
  totalQuestions: number;
  showDomain?: boolean;
}) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-ink-muted">
          Question {questionNumber}
          <span className="text-ink-subtle"> of {totalQuestions}</span>
        </span>
        {showDomain ? (
          <Badge tone="primary">{domainName(question.domain)}</Badge>
        ) : null}
        <Badge>{DIFFICULTY_LABELS[question.difficulty] ?? "Practice"}</Badge>
      </div>

      <fieldset disabled={revealed} className="min-w-0">
        <legend className="mb-4 font-display text-xl leading-snug text-ink sm:text-[1.4rem]">
          {question.stem}
        </legend>

        <div className="flex flex-col gap-2.5">
          {question.choices.map((choice, index) => {
            const isSelected = selectedChoiceId === choice.id;
            const isCorrect = choice.id === question.correctChoiceId;
            const showCorrect = revealed && isCorrect;
            const showWrong = revealed && isSelected && !isCorrect;

            return (
              <div key={choice.id} className="relative">
                <input
                  type="radio"
                  id={`${question.id}-${choice.id}`}
                  name={question.id}
                  value={choice.id}
                  checked={isSelected}
                  onChange={() => onSelect(choice.id)}
                  className="peer absolute h-px w-px opacity-0"
                />
                <label
                  htmlFor={`${question.id}-${choice.id}`}
                  className={cx(
                    "flex min-h-14 cursor-pointer items-start gap-3 rounded-[var(--radius)]",
                    "border-2 bg-surface px-3.5 py-3 transition-colors sm:px-4",
                    "peer-focus-visible:outline peer-focus-visible:outline-2",
                    "peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--focus)]",
                    !revealed && !isSelected && "border-line hover:border-line-strong",
                    !revealed && isSelected && "border-primary bg-primary-soft",
                    showCorrect && "border-success bg-success-soft",
                    showWrong && "border-danger bg-danger-soft",
                    revealed &&
                      !showCorrect &&
                      !showWrong &&
                      "border-line opacity-70",
                    revealed && "cursor-default",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                      "border-2 text-xs font-bold",
                      showCorrect && "border-success bg-success text-white",
                      showWrong && "border-danger bg-danger text-white",
                      !revealed && isSelected && "border-primary bg-primary text-primary-contrast",
                      !revealed && !isSelected && "border-line-strong text-ink-subtle",
                      revealed && !showCorrect && !showWrong && "border-line text-ink-subtle",
                    )}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="min-w-0 flex-1 text-[0.9375rem] leading-relaxed text-ink">
                    {choice.text}
                  </span>

                  {/* Correctness is never carried by colour alone. */}
                  {showCorrect ? (
                    <span className="mt-0.5 shrink-0 text-xs font-bold uppercase tracking-wide text-success">
                      Correct
                    </span>
                  ) : null}
                  {showWrong ? (
                    <span className="mt-0.5 shrink-0 text-xs font-bold uppercase tracking-wide text-danger">
                      Your answer
                    </span>
                  ) : null}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
