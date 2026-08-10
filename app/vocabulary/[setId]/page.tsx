import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VOCAB_SETS, findVocabSet, setTerms } from "@/data/vocab/sets";
import { SetStudio } from "@/components/vocab/SetStudio";
import { ReviewStatusNote } from "@/components/shared/ReviewStatusNote";

/**
 * One page per set, generated at build time.
 *
 * The app is a static export, so every set id has to be known here — a set
 * added to `VOCAB_SETS` gets its page automatically.
 */
export function generateStaticParams() {
  return VOCAB_SETS.map((set) => ({ setId: set.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ setId: string }>;
}): Promise<Metadata> {
  const { setId } = await params;
  const set = findVocabSet(setId);

  if (!set) {
    return { title: "Vocabulary set not found" };
  }

  const title = `${set.name} — phlebotomy vocabulary`;

  return {
    title,
    description: `${set.description} ${set.termIds.length} terms with flashcards, adaptive rounds, typed recall, matching, and tests.`,
    alternates: { canonical: `/vocabulary/${set.id}` },
    openGraph: {
      title,
      description: set.tagline,
      url: `/vocabulary/${set.id}`,
    },
  };
}

export default async function VocabularySetPage({
  params,
}: {
  params: Promise<{ setId: string }>;
}) {
  const { setId } = await params;
  const set = findVocabSet(setId);

  if (!set) {
    notFound();
  }

  const terms = setTerms(set);

  // The set is only as verified as its least-verified term, and its references
  // are the union of theirs, de-duplicated by label.
  const status = terms.some(
    (term) => term.reviewStatus === "draft" || term.reviewStatus === "needs-review",
  )
    ? "needs-review"
    : "reviewed";

  const sources = [
    ...new Map(
      terms.flatMap((term) => term.sources).map((source) => [source.label, source]),
    ).values(),
  ];

  return (
    <div className="container-page py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm">
        <Link href="/vocabulary" className="text-primary hover:underline">
          Vocabulary
        </Link>
        <span className="mx-2 text-ink-subtle">/</span>
        <span className="text-ink-muted">{set.name}</span>
      </nav>

      <SetStudio set={set} terms={terms} />

      <div className="mt-10">
        <ReviewStatusNote status={status} sources={sources} />
      </div>
    </div>
  );
}
