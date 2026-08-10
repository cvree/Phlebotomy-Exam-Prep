import type { Metadata } from "next";
import { DueReview } from "@/components/vocab/DueReview";

export const metadata: Metadata = {
  title: "Daily vocabulary review",
  description:
    "Review the phlebotomy terms you are closest to forgetting, drawn from " +
    "every set and ordered by a spaced repetition schedule.",
  alternates: { canonical: "/vocabulary/review" },
  // Personal and stateful: there is nothing here for a search engine to index.
  robots: { index: false, follow: true },
};

export default function VocabularyReviewPage() {
  return <DueReview />;
}
