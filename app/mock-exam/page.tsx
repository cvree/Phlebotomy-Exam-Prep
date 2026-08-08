import type { Metadata } from "next";
import { MockSetup } from "@/components/mock-exam/MockSetup";

export const metadata: Metadata = {
  title: "Phlebotomy mock exam",
  description:
    "Sit a full-length, timed phlebotomy practice exam with no feedback " +
    "until you submit. Autosaves, resumable, with a full domain breakdown " +
    "and answer review afterwards.",
  alternates: { canonical: "/mock-exam" },
  openGraph: {
    title: "Phlebotomy mock exam",
    description: "A timed, full-length practice paper with a domain breakdown afterwards.",
    url: "/mock-exam",
  },
};

export default function MockExamPage() {
  return <MockSetup />;
}
