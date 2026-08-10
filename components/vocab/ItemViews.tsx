"use client";

import type { FormEvent } from "react";
import type {
  VocabMultipleChoiceItem,
  VocabTrueFalseItem,
  VocabWrittenItem,
} from "@/lib/vocab/session";
import type { MatchVerdict } from "@/lib/vocab/matching";
import { Button, cx } from "@/components/shared/ui";

/**
 * Item renderers.
 *
 * Shared by Learn, Write, and Test so an item looks and behaves the same
 * wherever it appears. Each view is controlled and stateless: the mode owns
 * the answer, whether it has been revealed, and what happens next.
 */

export type Reveal = { correct: boolean; verdict?: MatchVerdict } | null;

export function PromptLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
      {children}
    </p>
  );
}

export function MultipleChoiceView({
  item,
  selectedId,
  reveal,
  onSelect,
}: {
  item: VocabMultipleChoiceItem;
  selectedId: string | null;
  reveal: Reveal;
  onSelect: (choiceId: string) => void;
}) {
  const isDefinitionPrompt = item.direction === "definition-to-term";

  return (
    <div>
      <PromptLabel>{item.promptLabel}</PromptLabel>
      <p
        className={cx(
          "mt-2 leading-snug text-ink",
          isDefinitionPrompt
            ? "text-lg sm:text-xl"
            : "font-display text-2xl sm:text-3xl",
        )}
      >
        {item.prompt}
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        {item.choices.map((choice, choiceIndex) => {
          const chosen = selectedId === choice.id;
          const isCorrect = choice.id === item.correctChoiceId;
          const showCorrect = reveal !== null && isCorrect;
          const showWrong = reveal !== null && chosen && !isCorrect;

          return (
            <button
              key={choice.id}
              type="button"
              disabled={reveal !== null}
              onClick={() => onSelect(choice.id)}
              className={cx(
                "flex min-h-14 items-start gap-3 rounded-[var(--radius)] border-2",
                "bg-surface px-3.5 py-3 text-left text-[0.9375rem] transition-colors",
                reveal === null && "border-line hover:border-primary",
                showCorrect && "border-success bg-success-soft",
                showWrong && "border-danger bg-danger-soft",
                reveal !== null &&
                  !showCorrect &&
                  !showWrong &&
                  "border-line opacity-60",
              )}
            >
              <span
                aria-hidden="true"
                className={cx(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  "border text-xs font-bold",
                  showCorrect
                    ? "border-success text-success"
                    : showWrong
                      ? "border-danger text-danger"
                      : "border-line-strong text-ink-subtle",
                )}
              >
                {choiceIndex + 1}
              </span>
              <span className="min-w-0 flex-1 text-ink">{choice.text}</span>
              {showCorrect ? (
                <span className="shrink-0 text-xs font-bold uppercase text-success">
                  Correct
                </span>
              ) : null}
              {showWrong ? (
                <span className="shrink-0 text-xs font-bold uppercase text-danger">
                  You
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function WrittenView({
  item,
  value,
  onChange,
  onSubmit,
  reveal,
  autoFocus = true,
}: {
  item: VocabWrittenItem;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  reveal: Reveal;
  autoFocus?: boolean;
}) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  const tone =
    reveal === null
      ? "border-line-strong focus:border-primary"
      : reveal.verdict === "close"
        ? "border-flag bg-flag-soft"
        : reveal.correct
          ? "border-success bg-success-soft"
          : "border-danger bg-danger-soft";

  return (
    <form onSubmit={handleSubmit}>
      <PromptLabel>{item.promptLabel}</PromptLabel>
      <p className="mt-2 text-lg leading-snug text-ink sm:text-xl">
        {item.prompt}
      </p>

      <label className="mt-5 block">
        <span className="sr-only">Your answer</span>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={reveal !== null}
          autoFocus={autoFocus}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Type the term…"
          className={cx(
            "w-full rounded-[var(--radius)] border-2 bg-surface px-4 py-3",
            "text-[1.0625rem] text-ink outline-none transition-colors",
            "placeholder:text-ink-subtle disabled:opacity-90",
            tone,
          )}
        />
      </label>

      {reveal === null ? (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg" disabled={value.trim().length === 0}>
            Check answer
          </Button>
          <button
            type="button"
            onClick={() => {
              onChange("");
              onSubmit();
            }}
            className="text-sm font-medium text-ink-muted underline hover:text-ink"
          >
            I don&apos;t know
          </button>
        </div>
      ) : null}
    </form>
  );
}

export function TrueFalseView({
  item,
  answer,
  reveal,
  onAnswer,
}: {
  item: VocabTrueFalseItem;
  answer: boolean | null;
  reveal: Reveal;
  onAnswer: (value: boolean) => void;
}) {
  return (
    <div>
      <PromptLabel>True or false?</PromptLabel>
      <p className="mt-2 font-display text-2xl leading-tight text-ink">
        {item.term}
      </p>
      <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-muted">
        {item.definition}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {[true, false].map((value) => {
          const chosen = answer === value;
          const isCorrect = value === item.correct;
          const showCorrect = reveal !== null && isCorrect;
          const showWrong = reveal !== null && chosen && !isCorrect;

          return (
            <button
              key={String(value)}
              type="button"
              disabled={reveal !== null}
              onClick={() => onAnswer(value)}
              className={cx(
                "min-h-14 rounded-[var(--radius)] border-2 bg-surface px-4 font-semibold",
                "transition-colors",
                reveal === null && "border-line hover:border-primary",
                showCorrect && "border-success bg-success-soft text-success",
                showWrong && "border-danger bg-danger-soft text-danger",
                reveal !== null &&
                  !showCorrect &&
                  !showWrong &&
                  "border-line opacity-60",
              )}
            >
              {value ? "True" : "False"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
