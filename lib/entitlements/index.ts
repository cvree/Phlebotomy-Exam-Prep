/**
 * Entitlements.
 *
 * No payments are implemented and none are planned for this MVP. What exists
 * here is the seam: every gated capability is named once, plans are data, and
 * components ask `canAccess(feature)` instead of embedding a plan check.
 *
 * Today every feature is open. When a paid tier ships, the change is to
 * `PLANS` and to whatever resolves the current plan — not to the components.
 */

export type Feature =
  | "study-guides"
  | "order-of-draw-drill"
  | "tube-drill"
  | "practice-questions-limited"
  | "full-question-bank"
  | "mock-exams"
  | "weak-area-sessions"
  | "missed-question-review"
  | "detailed-analytics"
  | "progress-export";

export type PlanId = "free" | "pro" | "preview";

export type Plan = {
  id: PlanId;
  name: string;
  /** Shown on the pricing page. `null` means "not decided yet". */
  priceLabel: string | null;
  description: string;
  features: Feature[];
};

export const FEATURE_LABELS: Record<Feature, string> = {
  "study-guides": "Study guides",
  "order-of-draw-drill": "Order of Draw drill",
  "tube-drill": "Tube & additive drill",
  "practice-questions-limited": "Practice questions (sample bank)",
  "full-question-bank": "Full question bank",
  "mock-exams": "Full-length mock exams",
  "weak-area-sessions": "Weak-area practice sessions",
  "missed-question-review": "Missed-question review",
  "detailed-analytics": "Detailed progress analytics",
  "progress-export": "Progress export",
};

const FREE_FEATURES: Feature[] = [
  "study-guides",
  "order-of-draw-drill",
  "tube-drill",
  "practice-questions-limited",
  "progress-export",
];

const PRO_FEATURES: Feature[] = [
  ...FREE_FEATURES,
  "full-question-bank",
  "mock-exams",
  "weak-area-sessions",
  "missed-question-review",
  "detailed-analytics",
];

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Free",
    priceLabel: "£0",
    description:
      "Study guides, both drills, and a sample of the question bank. No " +
      "account, no card, no time limit.",
    features: FREE_FEATURES,
  },
  pro: {
    id: "pro",
    name: "Pro",
    priceLabel: null,
    description:
      "The full question bank, timed mock exams, weak-area sessions, and " +
      "detailed analytics.",
    features: PRO_FEATURES,
  },
  preview: {
    id: "preview",
    name: "Open preview",
    priceLabel: "£0",
    description:
      "Everything is currently unlocked while the platform is in preview.",
    features: PRO_FEATURES,
  },
};

/**
 * The plan in effect.
 *
 * During the preview this is a constant. It is a function so that swapping in
 * a real subscription lookup does not change any call site.
 */
export function getCurrentPlan(): Plan {
  return PLANS.preview;
}

export function canAccess(feature: Feature, plan: Plan = getCurrentPlan()): boolean {
  return plan.features.includes(feature);
}
