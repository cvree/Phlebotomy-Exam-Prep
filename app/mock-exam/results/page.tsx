import type { Metadata } from "next";
import { MockResults } from "@/components/mock-exam/MockResults";

export const metadata: Metadata = {
  title: "Mock exam results",
  robots: { index: false, follow: true },
};

export default function MockResultsPage() {
  return <MockResults />;
}
