"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Analytics-only companion to the pricing page.
 *
 * Exists so the page itself can stay a server component — the only thing that
 * needs the client here is the view event.
 */
export function PricingView() {
  useEffect(() => {
    track("pricing_viewed");
  }, []);

  return null;
}
