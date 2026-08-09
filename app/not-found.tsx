import Link from "next/link";
import { ButtonLink } from "@/components/shared/ui";

const SUGGESTIONS = [
  { href: "/practice", label: "Practice questions" },
  { href: "/drills/order-of-draw", label: "Order of Draw drill" },
  { href: "/study/order-of-draw", label: "Order of draw guide" },
  { href: "/study/phlebotomy-tube-colors", label: "Tube colors & additives" },
  { href: "/mock-exam", label: "Mock exam" },
  { href: "/progress", label: "Your progress" },
];

export default function NotFound() {
  return (
    <div className="container-prose py-16 text-center sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.09em] text-primary">
        404
      </p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">
        That page isn&apos;t here
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[1.0625rem] text-ink-muted">
        The link may be out of date. Your study progress is unaffected — it is
        stored in this browser, not on the page.
      </p>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Back to the home page
        </ButtonLink>
        <ButtonLink
          href="/practice/session?mode=quick-10&count=10"
          variant="secondary"
          size="lg"
        >
          Start 10 questions
        </ButtonLink>
      </div>

      <ul className="mx-auto mt-10 flex max-w-lg flex-wrap justify-center gap-x-5 gap-y-2">
        {SUGGESTIONS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
