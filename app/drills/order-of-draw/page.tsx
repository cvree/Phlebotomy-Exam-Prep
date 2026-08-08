import type { Metadata } from "next";
import { OrderOfDrawDrill } from "@/components/drills/OrderOfDrawDrill";

export const metadata: Metadata = {
  title: "Order of Draw drill — arrange the tubes",
  description:
    "Interactive order of draw practice. Arrange the six collection " +
    "positions in the correct CLSI sequence, get immediate feedback on what " +
    "was misplaced, and learn why each position sits where it does.",
  alternates: { canonical: "/drills/order-of-draw" },
  openGraph: {
    title: "Order of Draw drill",
    description:
      "Arrange the collection tubes in the correct order and find out exactly what you get wrong.",
    url: "/drills/order-of-draw",
  },
};

export default function OrderOfDrawDrillPage() {
  return <OrderOfDrawDrill />;
}
