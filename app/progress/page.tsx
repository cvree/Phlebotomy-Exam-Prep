import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/progress/ProgressDashboard";

export const metadata: Metadata = {
  title: "Your study progress",
  description:
    "Mastery by area, study readiness, and a specific recommendation for " +
    "what to study next — calculated from your own practice, stored on your " +
    "device.",
  alternates: { canonical: "/progress" },
  robots: { index: true, follow: true },
};

export default function ProgressPage() {
  return <ProgressDashboard />;
}
