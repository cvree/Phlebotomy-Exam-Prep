import type { Metadata } from "next";
import { VOCAB_TERMS } from "@/data/vocab";
import { VocabHub } from "@/components/vocab/VocabHub";

export const metadata: Metadata = {
  title: "Phlebotomy vocabulary & medical terminology",
  description:
    `Learn ${VOCAB_TERMS.length} phlebotomy and medical terminology terms — ` +
    "tube additives, blood disorders such as polycythemia vera, vein anatomy, " +
    "and specimen handling — with flashcards, adaptive rounds, typed recall, " +
    "a matching game, and spaced review.",
  alternates: { canonical: "/vocabulary" },
  keywords: [
    "phlebotomy vocabulary",
    "phlebotomy terminology",
    "medical terminology flashcards",
    "tube additives",
    "polycythemia vera",
    "phlebotomy word parts",
  ],
  openGraph: {
    title: "Phlebotomy vocabulary & medical terminology",
    description:
      "Flashcards, adaptive learning, typed recall, matching, and spaced " +
      "review over every term a phlebotomy student needs.",
    url: "/vocabulary",
  },
};

export default function VocabularyPage() {
  return <VocabHub />;
}
