import type { Metadata } from "next";
import { Suspense } from "react";
import { PracticeRunner } from "@/components/practice/PracticeRunner";
import { parsePracticeConfig } from "@/components/practice/modes";

export const metadata: Metadata = {
  title: "Practice session",
  description:
    "Answer certification-style phlebotomy practice questions with immediate explanations.",
  robots: { index: false, follow: true },
};

export default async function PracticeSessionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const config = parsePracticeConfig(params);

  return (
    <Suspense fallback={null}>
      <PracticeRunner config={config} />
    </Suspense>
  );
}
