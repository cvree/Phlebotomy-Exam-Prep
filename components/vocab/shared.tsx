"use client";

import Link from "next/link";
import { useCallback, useMemo } from "react";
import type {
  VocabCardState,
  VocabGrade,
  VocabSessionSummary,
  VocabStudyMode,
  VocabTerm,
} from "@/types/vocab";
import { findVocabTerm } from "@/data/vocab";
import { vocabCategoryShortName } from "@/data/vocab/categories";
import { gradeCard, describeInterval } from "@/lib/vocab/scheduler";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { track } from "@/lib/analytics";
import { Badge, cx } from "@/components/shared/ui";

/**
 * Pieces every vocabulary mode needs.
 *
 * The grading hook lives here rather than in each mode so that a term graded
 * in Match is scheduled by exactly the same rules as one graded in Flashcards.
 * A student should never be able to tell which screen taught the scheduler
 * something.
 */

export function useVocabStudy(setId: string, mode: VocabStudyMode) {
  const { progress, ready, saveVocabReviews, saveVocabSession } =
    useStudyProgress();

  const cards = progress.vocab.cards;

  /**
   * Grades one term and persists it immediately.
   *
   * Immediate rather than batched at the end of a round: students close tabs
   * mid-session, and a review schedule that silently discards the last eight
   * answers is worse than no schedule at all.
   */
  const grade = useCallback(
    (termId: string, value: VocabGrade): VocabCardState => {
      const now = new Date();
      const next = gradeCard(cards[termId], termId, value, now);
      saveVocabReviews([next]);
      track("vocab_term_graded", { mode, grade: value, stage: next.stage });
      return next;
    },
    [cards, saveVocabReviews, mode],
  );

  const finish = useCallback(
    (summary: Omit<VocabSessionSummary, "id" | "setId" | "mode">) => {
      saveVocabSession({
        ...summary,
        id: `vocab-${Date.now()}`,
        setId,
        mode,
      });
      track("vocab_round_completed", {
        mode,
        set: setId,
        total: summary.total,
        correct: summary.correct,
      });
    },
    [saveVocabSession, setId, mode],
  );

  return { cards, ready, grade, finish };
}

/** A circular completion indicator. The number beside it is always the truth. */
export function ProgressRing({
  value,
  size = 44,
  label,
}: {
  value: number;
  size?: number;
  label?: string;
}) {
  const stroke = size / 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, value));

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      className="shrink-0"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--surface-sunken)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference * clamped} ${circumference}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

const STAGE_COPY: Record<string, { label: string; tone: "neutral" | "primary" | "success" | "flag" }> =
  {
    unseen: { label: "New", tone: "neutral" },
    learning: { label: "Learning", tone: "flag" },
    relearning: { label: "Relearning", tone: "flag" },
    review: { label: "Familiar", tone: "primary" },
    mastered: { label: "Mastered", tone: "success" },
  };

export function StageBadge({ card }: { card?: VocabCardState }) {
  const copy = STAGE_COPY[card?.stage ?? "unseen"] ?? STAGE_COPY.unseen;
  return <Badge tone={copy!.tone}>{copy!.label}</Badge>;
}

export function NextReview({ card }: { card?: VocabCardState }) {
  const now = useMemo(() => new Date(), []);
  if (!card) return null;
  return (
    <span className="text-xs text-ink-subtle">
      Next review {describeInterval(card, now)}
    </span>
  );
}

/**
 * The full study face of a term.
 *
 * Shared by the flashcard back, the answer reveal in every mode, and the
 * glossary, so a student sees the same information in the same order wherever
 * a term is explained.
 */
export function TermDetail({
  term,
  compact = false,
}: {
  term: VocabTerm;
  compact?: boolean;
}) {
  const related = (term.relatedTermIds ?? [])
    .map(findVocabTerm)
    .filter((entry): entry is VocabTerm => entry !== undefined);

  return (
    <div className="space-y-4 text-left">
      <p className="text-[1.0625rem] leading-relaxed text-ink">
        {term.definition}
      </p>

      {!compact && term.detail ? (
        <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
          {term.detail}
        </p>
      ) : null}

      {term.partOf ? (
        <div className="rounded-[var(--radius)] border border-line bg-surface-muted px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
            Part of
          </p>
          <p className="mt-1 font-semibold text-ink">{term.partOf.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {term.partOf.detail}
          </p>
        </div>
      ) : null}

      {term.wordParts && term.wordParts.length > 0 ? (
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-subtle">
            Built from
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {term.wordParts.map((part) => (
              <li
                key={`${part.part}-${part.meaning}`}
                className="rounded-full border border-line bg-surface px-3 py-1 text-sm"
              >
                <span className="font-mono font-semibold text-primary">
                  {part.part}
                </span>
                <span className="text-ink-muted"> — {part.meaning}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!compact && term.clinicalRelevance ? (
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-subtle">
            Why it matters at the chairside
          </p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">
            {term.clinicalRelevance}
          </p>
        </div>
      ) : null}

      {term.mnemonic ? (
        <div className="rounded-[var(--radius)] border border-flag-border bg-flag-soft px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-flag">
            Remember
          </p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink">
            {term.mnemonic}
          </p>
        </div>
      ) : null}

      {!compact && related.length > 0 ? (
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-subtle">
            Related
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {related.map((entry) => entry.term).join(" · ")}
          </p>
        </div>
      ) : null}
    </div>
  );
}

/**
 * The chips above a term.
 *
 * `hidePronunciation` exists because the pronunciation *is* the answer when
 * the student is being asked to name a term from its definition — showing
 * "/EE-mee-uh/" above "Suffix meaning a condition of the blood" gives the
 * game away.
 */
export function TermMeta({
  term,
  hidePronunciation = false,
}: {
  term: VocabTerm;
  hidePronunciation?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-ink-subtle">
      <Badge>{vocabCategoryShortName(term.category)}</Badge>
      {term.pronunciation && !hidePronunciation ? (
        <span className="font-mono">/{term.pronunciation}/</span>
      ) : null}
    </div>
  );
}

/** The four grading buttons, shared by Flashcards and the review queue. */
export function GradeButtons({
  onGrade,
  disabled,
}: {
  onGrade: (grade: VocabGrade) => void;
  disabled?: boolean;
}) {
  const buttons: { grade: VocabGrade; label: string; hint: string; className: string }[] =
    [
      {
        grade: "again",
        label: "Again",
        hint: "1",
        className: "border-danger-border bg-danger-soft text-danger",
      },
      {
        grade: "hard",
        label: "Hard",
        hint: "2",
        className: "border-flag-border bg-flag-soft text-flag",
      },
      {
        grade: "good",
        label: "Good",
        hint: "3",
        className: "border-line-strong bg-surface text-ink",
      },
      {
        grade: "easy",
        label: "Easy",
        hint: "4",
        className: "border-success-border bg-success-soft text-success",
      },
    ];

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {buttons.map((button) => (
        <button
          key={button.grade}
          type="button"
          disabled={disabled}
          onClick={() => onGrade(button.grade)}
          className={cx(
            "flex min-h-13 flex-col items-center justify-center rounded-[var(--radius)]",
            "border-2 font-semibold transition-transform active:scale-[0.98]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            button.className,
          )}
        >
          <span>{button.label}</span>
          <span className="text-[0.6875rem] font-normal opacity-70">
            press {button.hint}
          </span>
        </button>
      ))}
    </div>
  );
}

export function TermLink({ term }: { term: VocabTerm }) {
  return (
    <Link
      href={`/vocabulary/${term.category}#${term.id}`}
      className="font-medium text-primary hover:underline"
    >
      {term.term}
    </Link>
  );
}
