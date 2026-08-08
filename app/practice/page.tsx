import type { Metadata } from "next";
import { PracticeSetup } from "@/components/practice/PracticeSetup";

export const metadata: Metadata = {
  title: "Phlebotomy practice questions",
  description:
    "Build a phlebotomy practice session: quick ten, a single area, your " +
    "weak areas, or the questions you missed. Every answer comes with an " +
    "explanation.",
  alternates: { canonical: "/practice" },
  openGraph: {
    title: "Phlebotomy practice questions",
    description:
      "Practice sessions with explanations, weak-area targeting, and progress tracking.",
    url: "/practice",
  },
};

export default function PracticePage() {
  return <PracticeSetup />;
}
