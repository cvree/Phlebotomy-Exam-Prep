import type { Metadata } from "next";
import { Suspense } from "react";
import { MockSessionClient } from "@/components/mock-exam/MockSessionClient";

export const metadata: Metadata = {
  title: "Mock exam in progress",
  robots: { index: false, follow: false },
};

export default function MockSessionPage() {
  return (
    <Suspense fallback={null}>
      <MockSessionClient />
    </Suspense>
  );
}
