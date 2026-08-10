"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { VocabCategoryId, VocabTerm } from "@/types/vocab";
import { VOCAB_CATEGORIES, vocabCategoryShortName } from "@/data/vocab/categories";
import { normalizeAnswer } from "@/lib/vocab/matching";
import { useStudyProgress } from "@/components/progress/StudyProgressProvider";
import { Badge, Card, EmptyState, cx } from "@/components/shared/ui";
import { NextReview, StageBadge, TermDetail, TermMeta } from "./shared";

/**
 * The glossary.
 *
 * A searchable list of every term, which is what a student reaches for when
 * they meet a word in a lecture rather than in a drill. Search covers the
 * term, its aliases, and its definition, so "purple tube" finds EDTA even
 * though neither word is in the term itself.
 *
 * Every entry is a `<details>`: it works before hydration, it is keyboard
 * navigable for free, and it lets a student open five terms at once to
 * compare them.
 */
export function TermBrowser({
  terms,
  showCategoryFilter = true,
  initialQuery = "",
}: {
  terms: VocabTerm[];
  showCategoryFilter?: boolean;
  initialQuery?: string;
}) {
  const { progress, ready } = useStudyProgress();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<VocabCategoryId | "all">("all");
  const [onlyTrouble, setOnlyTrouble] = useState(false);

  const deferredQuery = useDeferredValue(query);
  const cards = progress.vocab.cards;

  const categories = useMemo(
    () =>
      VOCAB_CATEGORIES.filter((entry) =>
        terms.some((term) => term.category === entry.id),
      ),
    [terms],
  );

  const filtered = useMemo(() => {
    const needle = normalizeAnswer(deferredQuery);

    return terms.filter((term) => {
      if (category !== "all" && term.category !== category) return false;

      if (onlyTrouble) {
        const card = cards[term.id];
        if (!card || card.reviews === 0) return false;
        if (card.correct === card.reviews && card.lapses === 0) return false;
      }

      if (needle.length === 0) return true;

      const haystack = normalizeAnswer(
        [
          term.term,
          ...(term.aliases ?? []),
          term.definition,
          term.partOf?.label ?? "",
          ...term.tags,
        ].join(" "),
      );

      return haystack.includes(needle);
    });
  }, [terms, deferredQuery, category, onlyTrouble, cards]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <label className="block">
          <span className="sr-only">Search terms</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search terms, additives, definitions…"
            className={cx(
              "w-full rounded-[var(--radius)] border-2 border-line bg-surface px-4 py-3",
              "text-[1.0625rem] text-ink outline-none transition-colors",
              "placeholder:text-ink-subtle focus:border-primary",
            )}
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {showCategoryFilter && categories.length > 1 ? (
            <>
              <FilterChip
                pressed={category === "all"}
                onClick={() => setCategory("all")}
              >
                All areas
              </FilterChip>
              {categories.map((entry) => (
                <FilterChip
                  key={entry.id}
                  pressed={category === entry.id}
                  onClick={() => setCategory(entry.id)}
                >
                  {entry.shortName}
                </FilterChip>
              ))}
            </>
          ) : null}

          {ready ? (
            <FilterChip
              pressed={onlyTrouble}
              onClick={() => setOnlyTrouble((value) => !value)}
              className="ml-auto"
            >
              Only ones I have missed
            </FilterChip>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-subtle" aria-live="polite">
        {filtered.length} term{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            headingLevel="h3"
            title="No terms match"
            description={
              onlyTrouble
                ? "Nothing you have missed matches this search. Clear the filter to see the rest."
                : "Try a shorter search, or a word from the definition rather than the term."
            }
          />
        </div>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {filtered.map((term) => (
            <li key={term.id} id={term.id} className="scroll-mt-24">
              <Card as="div" className="overflow-hidden">
                <details className="group">
                  <summary
                    className={cx(
                      "flex cursor-pointer list-none items-start justify-between gap-3",
                      "px-4 py-3.5 transition-colors hover:bg-surface-muted",
                      "[&::-webkit-details-marker]:hidden",
                    )}
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">{term.term}</p>
                      <p className="mt-0.5 line-clamp-2 text-sm text-ink-muted">
                        {term.definition}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      {ready ? <StageBadge card={cards[term.id]} /> : null}
                      <Badge>{vocabCategoryShortName(term.category)}</Badge>
                    </div>
                  </summary>

                  <div className="border-t border-line px-4 py-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <TermMeta term={term} />
                      {ready ? <NextReview card={cards[term.id]} /> : null}
                    </div>
                    <TermDetail term={term} />
                  </div>
                </details>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  pressed,
  onClick,
  children,
  className,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        "min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors",
        pressed
          ? "border-primary bg-primary-soft text-primary"
          : "border-line bg-surface text-ink-muted hover:border-line-strong",
        className,
      )}
    >
      {children}
    </button>
  );
}
