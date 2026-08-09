import type { Metadata } from "next";
import Link from "next/link";
import { FEATURE_LABELS, PLANS, canAccess } from "@/lib/entitlements";
import { ButtonLink, Card, Notice } from "@/components/shared/ui";
import { PricingView } from "@/components/pricing/PricingView";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Phlebotomy Exam Prep is free while in preview. Study guides, both " +
    "drills, and practice questions will stay free. Here is what a paid tier " +
    "would cover, and what it would not.",
  alternates: { canonical: "/pricing" },
};

const FEATURE_ROWS = Object.keys(FEATURE_LABELS) as (keyof typeof FEATURE_LABELS)[];

export default function PricingPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <PricingView />

      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.09em] text-primary">
          Pricing
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Everything is free right now
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          The platform is in open preview. There is no payment, no card, and no
          account — every feature listed below is unlocked for everyone today.
        </p>
        <div className="mt-6">
          <ButtonLink href="/practice/session?mode=quick-10&count=10" size="lg">
            Start practicing
          </ButtonLink>
        </div>
      </div>

      <div className="mt-9 max-w-3xl">
        <Notice title="What we can honestly promise">
          Study guides, the Order of Draw drill, and the Tube Mastery drill will
          stay free permanently. If a paid tier arrives, it will cover the full
          question bank, mock exams, and the analytics — the things that cost
          real money to write, review, and keep accurate. We would rather say
          that plainly now than surprise you later.
        </Notice>
      </div>

      <section className="mt-12" aria-labelledby="plans">
        <h2 id="plans" className="font-display text-3xl">
          How it would be structured
        </h2>
        <p className="mt-2 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
          Nothing here is for sale. This is the shape a paid tier would take, so
          you can decide whether to invest your study time in a tool that might
          eventually charge.
        </p>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {([PLANS.free, PLANS.pro] as const).map((plan) => (
            <Card
              key={plan.id}
              className={
                plan.id === "pro" ? "border-2 border-primary p-5 sm:p-6" : "p-5 sm:p-6"
              }
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl">{plan.name}</h3>
                <span className="text-lg font-semibold text-ink">
                  {plan.priceLabel ?? "Not priced yet"}
                </span>
              </div>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                {plan.description}
              </p>

              <ul className="mt-5 space-y-2">
                {FEATURE_ROWS.map((feature) => {
                  const included = canAccess(feature, plan);
                  return (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <span
                        aria-hidden="true"
                        className={
                          included
                            ? "mt-0.5 font-bold text-success"
                            : "mt-0.5 font-bold text-ink-subtle"
                        }
                      >
                        {included ? "✓" : "—"}
                      </span>
                      <span
                        className={included ? "text-ink" : "text-ink-subtle"}
                      >
                        {FEATURE_LABELS[feature]}
                        <span className="sr-only">
                          {included ? " — included" : " — not included"}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="faq">
        <h2 id="faq" className="font-display text-3xl">
          Reasonable questions
        </h2>
        <div className="prose-study mt-5">
          <h3>Will my progress survive a change to paid?</h3>
          <p>
            Your progress is in your browser and belongs to you regardless. You
            can export it as JSON from the{" "}
            <Link href="/progress">progress page</Link> at any time.
          </p>

          <h3>Why no account?</h3>
          <p>
            Because you should be able to start studying in one tap. Requiring a
            sign-up before anyone has seen whether the tool is any good is a
            conversion tactic, not a product decision. An optional account for
            syncing across devices is the obvious future addition — optional
            being the operative word.
          </p>

          <h3>What would the money pay for?</h3>
          <p>
            Clinical review. The single biggest gap in this product today is
            that no qualified reviewer has checked the question bank — that
            work costs money, and it is what would turn a good study tool into
            a credible one.{" "}
            <Link href="/about/methodology">
              Our current content status is documented here
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
