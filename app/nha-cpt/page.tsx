import type { Metadata } from "next";
import Link from "next/link";
import { NHA_CPT } from "@/data/certifications";
import { DOMAINS } from "@/data/certifications/domains";
import { countQuestionsByDomain, QUESTIONS } from "@/data/questions";
import { ButtonLink, Card, Notice } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "NHA CPT study hub — what to study and where to start",
  description:
    "A study hub for the NHA Certified Phlebotomy Technician exam: nine " +
    "study areas with practice questions and explanations, interactive " +
    "drills, a timed mock exam, and progress tracking that identifies your " +
    "weakest area.",
  alternates: { canonical: "/nha-cpt" },
  openGraph: {
    url: "/nha-cpt",
    title: "NHA CPT study hub",
    description:
      "Nine study areas, practice questions with explanations, drills, and a mock exam.",
  },
};

export default function NhaCptPage() {
  const counts = countQuestionsByDomain(NHA_CPT.id);

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.09em] text-primary">
          {NHA_CPT.organization}
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          {NHA_CPT.shortName} study hub
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          {NHA_CPT.summary} This is where to start if you are preparing for the{" "}
          {NHA_CPT.name} and want a plan rather than a pile of flashcards.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/practice/session?mode=quick-10&count=10" size="lg">
            Start NHA CPT practice
          </ButtonLink>
          <ButtonLink href="/mock-exam" variant="secondary" size="lg">
            Take a mock exam
          </ButtonLink>
        </div>
      </div>

      {/* The honest-uncertainty block. Placed high rather than buried, because
          a student searching for "how many questions" needs to know we do not
          have a verified answer before they read anything else. */}
      <div className="mt-10 max-w-3xl">
        <Notice tone="flag" title="What we don't claim to know">
          <p>
            We have <strong>not</strong> verified {NHA_CPT.organizationShort}
            &apos;s current published exam structure, so we do not state a
            question count, a time limit, a passing score, or official domain
            weightings anywhere on this site. Guessing at those numbers would
            make the rest of the site less trustworthy, not more useful.
          </p>
          <p className="mt-2">
            For anything official — eligibility, exam format, scoring, fees,
            scheduling, and recertification — go directly to the{" "}
            {NHA_CPT.organization}. Everything here is study material, not exam
            administration.
          </p>
          <p className="mt-2">
            <Link href="/about/methodology">
              How we decide what to state as fact
            </Link>
          </p>
        </Notice>
      </div>

      <section className="mt-12" aria-labelledby="plan">
        <h2 id="plan" className="font-display text-3xl">
          A study plan that adapts
        </h2>
        <p className="mt-2 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
          You do not need to decide what to study. Answer questions, and the
          app works out where you are weakest and sends you there.
        </p>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Week one — find the gaps",
              body: "Quick 10 sessions across mixed areas until every one of the nine has some data behind it.",
              href: "/practice/session?mode=quick-10&count=10",
              cta: "Start Quick 10",
            },
            {
              title: "Week two — automate the basics",
              body: "Order of draw and tube additives until both are reflexive rather than worked out.",
              href: "/drills",
              cta: "Open the drills",
            },
            {
              title: "Week three — attack the weak areas",
              body: "Weak-area sessions and missed-question review, guided by your own mastery ratings.",
              href: "/practice/session?mode=weak-areas&count=15",
              cta: "Practise weak areas",
            },
            {
              title: "Week four — test under pressure",
              body: "Full-length timed mock exams, then read every explanation — including the ones you got right.",
              href: "/mock-exam",
              cta: "Set up a mock exam",
            },
          ].map((step, index) => (
            <li key={step.title}>
              <Card className="flex h-full flex-col p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-contrast">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-sans text-base font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">
                  {step.body}
                </p>
                <Link
                  href={step.href}
                  className="mt-3 text-sm font-semibold text-primary hover:underline"
                >
                  {step.cta} →
                </Link>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12" aria-labelledby="areas">
        <h2 id="areas" className="font-display text-3xl">
          The nine study areas
        </h2>
        <p className="mt-2 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
          These are our study groupings, built from material phlebotomy
          programmes teach consistently. They are{" "}
          <strong>not</strong> {NHA_CPT.organizationShort}&apos;s published test
          plan, and we do not present them as such.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {DOMAINS.map((domain) => (
            <li key={domain.id}>
              <Card className="flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl text-ink">
                    {domain.name}
                  </h3>
                  <span className="shrink-0 text-xs font-semibold text-ink-subtle">
                    {counts[domain.id] ?? 0} questions
                  </span>
                </div>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {domain.description}
                </p>

                <ul className="mt-3 flex-1 space-y-1 text-sm text-ink-muted">
                  {domain.covers.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-primary">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/practice/session?mode=domain&domain=${domain.id}&count=10`}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Practise 10 →
                  </Link>
                  {domain.studyHref ? (
                    <Link
                      href={domain.studyHref}
                      className="text-sm font-semibold text-ink-muted hover:text-primary hover:underline"
                    >
                      Study guide →
                    </Link>
                  ) : null}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="tools">
        <h2 id="tools" className="font-display text-3xl">
          Everything on this site
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/practice",
              title: "Practice questions",
              body: `${QUESTIONS.length} original questions with explanations, distractor analysis, and memory tips.`,
            },
            {
              href: "/nha-cpt/practice-test",
              title: "Practice test",
              body: "A quick, no-setup practice test if you would rather just start answering.",
            },
            {
              href: "/mock-exam",
              title: "Mock exam",
              body: "Timed, full-length, no feedback until you submit. Resumable if you get interrupted.",
            },
            {
              href: "/drills/order-of-draw",
              title: "Order of Draw drill",
              body: "Arrange the six positions and see exactly what you misplaced.",
            },
            {
              href: "/drills/tube-colors",
              title: "Tube Mastery drill",
              body: "Additives, mechanisms, and specimen types in eight-question rounds.",
            },
            {
              href: "/progress",
              title: "Progress & readiness",
              body: "Mastery by area, a transparent readiness score, and what to do next.",
            },
          ].map((item) => (
            <li key={item.href}>
              <Card className="h-full">
                <Link href={item.href} className="block h-full p-4">
                  <h3 className="font-sans text-base font-semibold text-primary">
                    {item.title} →
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="other-certs">
        <h2 id="other-certs" className="font-display text-3xl">
          Other certifications
        </h2>
        <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-muted">
          The platform is built so that additional certifications can be added
          without restructuring anything: certification configuration is data,
          and every question is tagged with the certifications it applies to.
          ASCP PBT and NCCT are planned. Much of the underlying material —
          order of draw, tube additives, specimen handling, complications —
          is common across all of them, so practising here is not wasted
          whichever route you take.
        </p>
      </section>
    </div>
  );
}
