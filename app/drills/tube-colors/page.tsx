import type { Metadata } from "next";
import { TubeMasteryDrill } from "@/components/drills/TubeMasteryDrill";

export const metadata: Metadata = {
  title: "Tube colour & additive drill",
  description:
    "Rapid drill on blood collection tube additives, what they do, and which " +
    "specimen they produce. Learn the mechanism, not just the colour.",
  alternates: { canonical: "/drills/tube-colors" },
  openGraph: {
    title: "Tube colour & additive drill",
    description:
      "Match tubes to additives and additives to tubes, with the mechanism explained each time.",
    url: "/drills/tube-colors",
  },
};

export default function TubeColorsDrillPage() {
  return <TubeMasteryDrill />;
}
