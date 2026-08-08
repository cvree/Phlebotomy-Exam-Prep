import type { Metadata } from "next";
import { Suspense } from "react";
import { MockRunner } from "@/components/mock-exam/MockRunner";

export const metadata: Metadata = {
  title: "Mock exam in progress",
  robots: { index: false, follow: false },
};

export default async function MockSessionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <Suspense fallback={null}>
      <MockRunner start={params.start === "1"} restart={params.restart === "1"} />
    </Suspense>
  );
}
