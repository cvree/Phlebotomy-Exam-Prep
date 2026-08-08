import type { DomainMastery, Readiness, Recommendation } from "@/types/study";
import type { StoredProgress } from "@/lib/storage/schema";
import { domainName } from "@/data/certifications/domains";
import { findUntouchedDomains, rankWeakest } from "./mastery";

/**
 * "What should I study next?"
 *
 * A fixed, ordered set of rules over stored data. No model, no API, no
 * randomness — every recommendation can be traced to a specific number the
 * student can see on the same page. The `reason` string is generated from
 * those numbers, so it cannot drift away from what actually drove the rule.
 */

const DAY_MS = 86_400_000;

export const RECOMMENDATION_RULES = {
  /** Missed questions worth a dedicated review session. */
  missedThreshold: 5,
  /** Days after which a drill result is treated as stale. */
  drillStaleDays: 7,
  /** Drill accuracy below which a refresher is recommended. */
  drillAccuracyFloor: 0.8,
  /** Readiness at which a full mock exam becomes the headline suggestion. */
  mockReadyScore: 55,
  /** Days after which a previous mock no longer counts as recent. */
  mockStaleDays: 14,
} as const;

type Context = {
  progress: StoredProgress;
  mastery: DomainMastery[];
  readiness: Readiness;
  now: Date;
};

function daysSince(iso: string | null | undefined, now: Date): number {
  if (!iso) return Number.POSITIVE_INFINITY;
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return Number.POSITIVE_INFINITY;
  return (now.getTime() - then) / DAY_MS;
}

export function buildRecommendations(context: Context): Recommendation[] {
  const { progress, mastery, readiness, now } = context;
  const recommendations: Recommendation[] = [];

  // 1. Nothing yet. One suggestion, no menu.
  if (progress.attempts.length === 0) {
    return [
      {
        id: "first-session",
        title: "Start with ten questions",
        reason:
          "Nothing to analyse yet. Ten mixed questions is enough for the " +
          "first read on your strongest and weakest areas.",
        ctaLabel: "Start Quick 10",
        href: "/practice/session?mode=quick-10&count=10",
        priority: 0,
      },
    ];
  }

  const weakest = rankWeakest(mastery);
  const weakestDomain = weakest[0];

  // 2. A weak area with real evidence behind it is the highest-value target.
  if (weakestDomain && weakestDomain.level !== "strong") {
    recommendations.push({
      id: `weak-${weakestDomain.domain}`,
      title: `Practise ${domainName(weakestDomain.domain)}`,
      reason:
        `Your weakest area: ${Math.round(weakestDomain.accuracy * 100)}% on ` +
        `recent questions across ${weakestDomain.attempts} attempts.`,
      ctaLabel: `Practise 10 ${domainName(weakestDomain.domain)} questions`,
      href: `/practice/session?mode=domain&domain=${weakestDomain.domain}&count=10`,
      priority: 1,
    });
  }

  // 3. Missed questions, once there are enough to make a session worthwhile.
  const missed = Object.values(progress.questionStats).filter(
    (stat) => !stat.lastCorrect,
  );
  if (missed.length >= RECOMMENDATION_RULES.missedThreshold) {
    recommendations.push({
      id: "missed-review",
      title: "Review the ones you missed",
      reason:
        `${missed.length} questions are still sitting on a wrong answer. ` +
        "They leave this list as soon as you get them right.",
      ctaLabel: `Review ${Math.min(missed.length, 15)} missed questions`,
      href: `/practice/session?mode=missed&count=${Math.min(missed.length, 15)}`,
      priority: 2,
    });
  }

  // 4. Drills: stale or below the accuracy floor.
  const orderDrills = progress.drills.filter(
    (drill) => drill.drill === "order-of-draw",
  );
  const lastOrderDrill = orderDrills.at(-1);
  const recentOrderAccuracy = averageAccuracy(orderDrills.slice(-3));

  if (!lastOrderDrill) {
    recommendations.push({
      id: "drill-order-first",
      title: "Try the Order of Draw drill",
      reason:
        "You haven't tried it yet. It's the fastest way to find out whether " +
        "the sequence is actually automatic.",
      ctaLabel: "Start Order of Draw drill",
      href: "/drills/order-of-draw",
      priority: 3,
    });
  } else if (recentOrderAccuracy < RECOMMENDATION_RULES.drillAccuracyFloor) {
    recommendations.push({
      id: "drill-order-accuracy",
      title: "Rebuild your Order of Draw",
      reason:
        `Your last ${Math.min(orderDrills.length, 3)} attempts averaged ` +
        `${Math.round(recentOrderAccuracy * 100)}% tube placement.`,
      ctaLabel: "Start Order of Draw drill",
      href: "/drills/order-of-draw",
      priority: 3,
    });
  } else if (
    daysSince(lastOrderDrill.at, now) > RECOMMENDATION_RULES.drillStaleDays
  ) {
    recommendations.push({
      id: "drill-order-stale",
      title: "Refresh your Order of Draw",
      reason: `It's been ${Math.floor(daysSince(lastOrderDrill.at, now))} days since your last attempt.`,
      ctaLabel: "Start Order of Draw drill",
      href: "/drills/order-of-draw",
      priority: 4,
    });
  }

  const tubeDrills = progress.drills.filter(
    (drill) => drill.drill === "tube-colors",
  );
  if (tubeDrills.length === 0) {
    recommendations.push({
      id: "drill-tubes-first",
      title: "Try the Tube Mastery drill",
      reason:
        "Tube and additive recall underpins order of draw, specimen " +
        "handling, and a good share of the question bank.",
      ctaLabel: "Start Tube Mastery drill",
      href: "/drills/tube-colors",
      priority: 5,
    });
  } else if (
    averageAccuracy(tubeDrills.slice(-3)) < RECOMMENDATION_RULES.drillAccuracyFloor
  ) {
    recommendations.push({
      id: "drill-tubes-accuracy",
      title: "Sharpen tube and additive recall",
      reason: `Recent tube drill accuracy: ${Math.round(averageAccuracy(tubeDrills.slice(-3)) * 100)}%.`,
      ctaLabel: "Start Tube Mastery drill",
      href: "/drills/tube-colors",
      priority: 5,
    });
  }

  // 5. Coverage gaps. Untouched areas are a different problem from weak ones.
  const untouched = findUntouchedDomains(mastery);
  const firstUntouched = untouched[0];
  if (firstUntouched) {
    recommendations.push({
      id: `coverage-${firstUntouched.domain}`,
      title: `You haven't touched ${domainName(firstUntouched.domain)}`,
      reason:
        `${untouched.length} of ${mastery.length} areas have no questions ` +
        "behind them. Coverage is the largest single input to readiness.",
      ctaLabel: `Start ${domainName(firstUntouched.domain)}`,
      href: `/practice/session?mode=domain&domain=${firstUntouched.domain}&count=10`,
      priority: 6,
    });
  }

  // 6. Mock exam, once the fundamentals justify spending an hour on one.
  const lastMock = progress.mockResults.at(-1);
  if (
    readiness.score >= RECOMMENDATION_RULES.mockReadyScore &&
    daysSince(lastMock?.completedAt, now) > RECOMMENDATION_RULES.mockStaleDays
  ) {
    recommendations.push({
      id: "mock-exam",
      title: lastMock ? "Time for another mock exam" : "Take your first mock exam",
      reason: lastMock
        ? `Your last mock was ${Math.floor(daysSince(lastMock.completedAt, now))} days ago. A fresh one will show whether recent practice has stuck.`
        : "Your readiness is high enough that a full-length timed paper will tell you something new.",
      ctaLabel: "Set up a mock exam",
      href: "/mock-exam",
      priority: 7,
    });
  }

  // 7. Never leave a student with nothing to do.
  if (recommendations.length === 0) {
    recommendations.push({
      id: "keep-going",
      title: "Keep your streak going",
      reason:
        "Everything is in reasonable shape. Mixed practice keeps all areas " +
        "warm rather than letting one drift.",
      ctaLabel: "Practise 10 mixed questions",
      href: "/practice/session?mode=all-domains&count=10",
      priority: 8,
    });
  }

  return recommendations.sort((a, b) => a.priority - b.priority);
}

export function primaryRecommendation(
  context: Context,
): Recommendation | undefined {
  return buildRecommendations(context)[0];
}

function averageAccuracy(drills: { accuracy: number }[]): number {
  if (drills.length === 0) return 0;
  return drills.reduce((sum, drill) => sum + drill.accuracy, 0) / drills.length;
}
