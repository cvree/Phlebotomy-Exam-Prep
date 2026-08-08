import type { Metadata } from "next";
import { Suspense } from "react";
import { PracticeSessionClient } from "@/components/practice/PracticeSessionClient";

export const metadata: Metadata = {
  title: "Practice session",
  description:
    "Answer certification-style phlebotomy practice questions with immediate explanations.",
  robots: { index: false, follow: true },
};

export default function PracticeSessionPage() {
  return (
    <Suspense fallback={null}>
      <PracticeSessionClient />
    </Suspense>
  );
}
