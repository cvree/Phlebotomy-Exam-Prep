import type { Metadata } from "next";
import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import { DOMAINS } from "@/data/certifications/domains";
import { getTube } from "@/data/tubes/tubes";
import { NHA_CPT } from "@/data/certifications";
import { CLSI_ORDER_OF_DRAW } from "@/data/study/orderOfDraw";
import { TubeGlyph } from "@/components/shared/TubeGlyph";
import { ButtonLink, Card } from "@/components/shared/ui";
import { ReturningStudentPanel } from "@/components/home/ReturningStudentPanel";

export const metadata: Metadata = {
  title: "Phlebotomy Exam Prep — know what to study before your CPT exam",
  description:
    "Free phlebotomy certification study platform. Practice questions with " +
    "full explanations, an interactive order of draw drill, tube and " +
    "additive training, timed mock exams, and progress tracking that tells " +
    "you exactly what to study next. No sign-up.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Know what to study before your phlebotomy certification exam",
    description:
      "Practice questions with explanations, order of draw and tube drills, " +
      "mock exams, and weak-area detection. No sign-up needed.",
  },
};

const TOOLS = [
  {
    href: "/practice",
    name: "Practice questions",
    description:
      "Certification-style questions with an explanation after every answer, including why the wrong options were tempting.",
    meta: `${QUESTIONS.length} questions`,
  },
  {
    href: "/mock-exam",
    name: "Mock exam",
    description:
      "A full-length timed paper with no feedback until you submit. Autosaves, so a closed tab doesn't cost you the attempt.",
    meta: `${NHA_CPT.mockExamFormat.questionCount} questions · ${NHA_CPT.mockExamFormat.timeLimitMinutes} min`,
  },
  {
    href: "/drills/order-of-draw",
    name: "Order of Draw drill",
    description:
      "Arrange the six collection positions and find out exactly which tube you put in the wrong place, and why it belongs elsewhere.",
    meta: "Interactive",
  },
  {
    href: "/drills/tube-colors",
    name: "Tube colours & additives",
    description:
      "Rapid recall on what is in each tube and what the additive actually does — the mechanism behind the order of draw.",
    meta: "8-question rounds",
  },
  {
    href: "/progress",
    name: "Progress & readiness",
    description:
      "Mastery across nine areas, a transparent readiness score, and one specific recommendation for what to study next.",
    meta: "Stored on your device",
  },
];

export default function HomePage() {
  return (
    <>
      <ReturningStudentPanel />

      <section className="border-b border-line">
        {/* min-w-0 on both columns: the tube list below uses `truncate`, whose
            nowrap text would otherwise inflate the grid track's min-content
            size and push the whole hero wider than a phone screen. */}
        <div className="container-page grid grid-cols-1 gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.09em] text-primary">
              Built for the {NHA_CPT.shortName}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              Know what to study before your phlebotomy exam.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Most study sites tell you your score. This one tells you which
              area is letting you down, why you got a question wrong, and what
              to do about it next. Start now — no account, no card, nothing to
              set up.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/practice/session?mode=quick-10&count=10"
                size="lg"
                className="sm:min-w-56"
              >
                Start NHA CPT practice
              </ButtonLink>
              <ButtonLink
                href="/drills/order-of-draw"
                variant="secondary"
                size="lg"
              >
                Practise order of draw
              </ButtonLink>
            </div>

            <p className="mt-4 text-sm text-ink-subtle">
              {QUESTIONS.length} original practice questions · {DOMAINS.length}{" "}
              study areas · progress saved in your browser
            </p>
          </div>

          {/* Product-truthful hero art: the actual order of draw, drawn from
              the same data the drill uses. */}
          <div className="min-w-0 lg:justify-self-end">
            <Card className="overflow-hidden">
              <div className="border-b border-line bg-surface-muted px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-subtle">
                  The sequence, every time
                </p>
                <p className="mt-1 font-display text-xl">Order of draw</p>
              </div>
              {/* Rendered from the sequence steps, not the tube list — several
                  positions hold more than one tube, so numbering tubes would
                  put the wrong number against Gold, Green, and Light green. */}
              <ol className="divide-y divide-[var(--border)]">
                {CLSI_ORDER_OF_DRAW.steps.map((step) => {
                  const stepTubes = step.tubeIds.map(getTube);
                  return (
                    <li
                      key={step.position}
                      className="flex items-center gap-3 px-4 py-2.5"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft font-display text-sm font-semibold text-primary">
                        {step.position}
                      </span>
                      <span className="flex shrink-0 -space-x-1.5">
                        {stepTubes.map((tube) => (
                          <TubeGlyph key={tube.id} tube={tube} size="sm" />
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-ink">
                          {stepTubes.map((tube) => tube.displayName).join(" / ")}
                        </span>
                        <span className="block truncate text-xs text-ink-muted">
                          {stepTubes[0]?.additive}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>
              <div className="border-t border-line px-4 py-3">
                <Link
                  href="/study/order-of-draw"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Read the full guide →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16" aria-labelledby="how">
        <div className="max-w-2xl">
          <h2 id="how" className="font-display text-3xl sm:text-4xl">
            Learn, practise, find the gap, close it
          </h2>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
            Every session feeds the same loop. You answer questions, the app
            works out where you are weakest, and it sends you back to the right
            material — rather than leaving you to guess.
          </p>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "1",
              title: "Practise",
              body: "Ten questions is enough to start. Every answer comes with the reasoning.",
            },
            {
              step: "2",
              title: "See the gap",
              body: "Mastery is tracked across nine areas, weighted toward your recent answers.",
            },
            {
              step: "3",
              title: "Drill it",
              body: "Targeted sessions and interactive drills on exactly the area that is weak.",
            },
            {
              step: "4",
              title: "Test it",
              body: "A timed mock exam with no safety net, then a full breakdown of where the marks went.",
            },
          ].map((item) => (
            <li key={item.step}>
              <Card className="h-full p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-contrast">
                  {item.step}
                </span>
                <h3 className="mt-3 font-sans text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="border-y border-line bg-surface-muted/50"
        aria-labelledby="tools"
      >
        <div className="container-page py-12 sm:py-16">
          <h2 id="tools" className="font-display text-3xl sm:text-4xl">
            The tools
          </h2>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <li key={tool.href}>
                <Card className="h-full">
                  <Link href={tool.href} className="flex h-full flex-col p-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                      {tool.meta}
                    </span>
                    <h3 className="mt-2 font-display text-xl text-ink">
                      {tool.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                      {tool.description}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-primary">
                      Open →
                    </span>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16" aria-labelledby="areas">
        <div className="max-w-2xl">
          <h2 id="areas" className="font-display text-3xl sm:text-4xl">
            What you can practise
          </h2>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
            Nine study areas covering the material phlebotomy programmes teach.
            These are our own study groupings, not a certifying body&apos;s
            published exam blueprint.
          </p>
        </div>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <li key={domain.id}>
              <Card className="h-full p-4">
                <h3 className="font-sans text-base font-semibold text-ink">
                  {domain.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {domain.description}
                </p>
                <Link
                  href={`/practice/session?mode=domain&domain=${domain.id}&count=10`}
                  className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Practise 10 →
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-surface-muted/50">
        <div className="container-page py-12 text-center sm:py-16">
          <h2 className="font-display text-3xl sm:text-4xl">
            Start with ten questions
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[1.0625rem] text-ink-muted">
            About five minutes. Enough to see where you actually stand — and
            your progress is saved from the first answer.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href="/practice/session?mode=quick-10&count=10"
              size="lg"
              className="sm:min-w-56"
            >
              Start NHA CPT practice
            </ButtonLink>
            <ButtonLink href="/nha-cpt" variant="secondary" size="lg">
              About the NHA CPT
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
