import type { Metadata } from "next";
import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import { VOCAB_TERMS } from "@/data/vocab";
import { DOMAINS } from "@/data/certifications/domains";
import { getTube } from "@/data/tubes/tubes";
import { NHA_CPT } from "@/data/certifications";
import { CLSI_ORDER_OF_DRAW } from "@/data/study/orderOfDraw";
import { TubeGlyph } from "@/components/shared/TubeGlyph";
import { ButtonLink } from "@/components/shared/ui";
import { ReturningStudentPanel } from "@/components/home/ReturningStudentPanel";

export const metadata: Metadata = {
  title:
    "Phlebotomy Exam Prep — CPT exam & California CPT1/CPT2 study platform",
  description:
    "Free phlebotomy certification study platform built for California " +
    "candidates. Practice questions with full explanations, a dedicated " +
    "California CDPH CPT1/CPT2 licensing guide, interactive order of draw " +
    "and tube drills, vocabulary training, timed mock exams, and progress " +
    "tracking that tells you exactly what to study next. No sign-up.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Know what to study before your phlebotomy exam",
    description:
      "Practice with explanations, drill the weak spots, and see exactly " +
      "what to study next. Built for the NHA CPT and California licensing.",
  },
};

type Tool = {
  code: string;
  href: string;
  name: string;
  description: string;
  meta: string;
  action: string;
  featured?: boolean;
};

const WORKFLOW = [
  {
    number: "01",
    label: "Collect",
    title: "Start with evidence",
    body: "Ten questions is enough to expose a pattern. Every answer includes the reasoning, not just a verdict.",
    href: "/practice/session?mode=quick-10&count=10",
    action: "Run a Quick 10",
  },
  {
    number: "02",
    label: "Identify",
    title: "See the weak area",
    body: "Your recent answers become a mastery map across ten study areas, so the gap is named instead of guessed.",
    href: "/progress",
    action: "Open your progress",
  },
  {
    number: "03",
    label: "Correct",
    title: "Drill the mechanism",
    body: "Target a topic with focused questions, tube practice, order-of-draw work, or spaced vocabulary review.",
    href: "/drills",
    action: "Choose a drill",
  },
  {
    number: "04",
    label: "Verify",
    title: "Retest under pressure",
    body: "Use a timed mock with answers hidden until submission, then feed the result back into your next study decision.",
    href: "/mock-exam",
    action: "Take a mock exam",
  },
] as const;

const TOOLS: readonly Tool[] = [
  {
    code: "Q-BANK",
    href: "/practice",
    name: "Practice questions",
    description:
      "Certification-style questions with immediate explanation, distractor reasoning, and a memory cue where it helps.",
    meta: `${QUESTIONS.length} original questions`,
    action: "Build a session",
    featured: true,
  },
  {
    code: "VOCAB",
    href: "/vocabulary",
    name: "Vocabulary trainer",
    description:
      "Flashcards, adaptive learn, typed recall, matching, tests, and spaced review over the language of phlebotomy.",
    meta: `${VOCAB_TERMS.length} terms`,
    action: "Open vocabulary",
  },
  {
    code: "SIM-01",
    href: "/mock-exam",
    name: "Mock exam",
    description:
      "A full-length timed paper with no correctness feedback until you submit. Autosaves if your tab closes.",
    meta: `${NHA_CPT.mockExamFormat.questionCount} questions · ${NHA_CPT.mockExamFormat.timeLimitMinutes} min`,
    action: "Set up the exam",
  },
  {
    code: "DRILL-A",
    href: "/drills/order-of-draw",
    name: "Order of Draw",
    description:
      "Arrange the collection sequence, find the misplaced position, and learn why contamination order matters.",
    meta: "Hands-on sequence",
    action: "Run the drill",
  },
  {
    code: "DRILL-B",
    href: "/drills/tube-colors",
    name: "Tube mastery",
    description:
      "Rapid recall in both directions: tube to additive and additive to tube, with the mechanism after each answer.",
    meta: "8-question rounds",
    action: "Train tube recall",
  },
  {
    code: "CA-LFS",
    href: "/study/california-requirements",
    name: "California CPT1/CPT2",
    description:
      "Keep the state pathway separate from national certification: scope, supervision, training, application, and renewal.",
    meta: "California-specific",
    action: "Read the licensing guide",
  },
  {
    code: "STATUS",
    href: "/progress",
    name: "Readiness & next step",
    description:
      "A transparent readiness score, mastery by area, missed-question review, and one concrete recommendation for what to do next.",
    meta: "Stored on this device",
    action: "See your progress",
    featured: true,
  },
];

export default function HomePage() {
  return (
    <>
      <ReturningStudentPanel />

      <section className="workbench-hero border-b border-line" aria-labelledby="hero-title">
        <div className="container-page relative grid gap-10 py-10 sm:py-14 lg:min-h-[42rem] lg:grid-cols-[minmax(0,1.02fr)_minmax(28rem,0.98fr)] lg:items-center lg:gap-14 lg:py-16">
          <div className="min-w-0">
            <div className="specimen-label inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">
                Study protocol / NHA CPT + California
              </span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-subtle">
                No account · progress stays local
              </span>
            </div>

            <h1
              id="hero-title"
              className="mt-7 max-w-[12ch] font-display text-[clamp(3.1rem,8vw,6.65rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-ink"
            >
              Know the draw. Know the why.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
              Practice until the pattern is visible: what you know, what is
              weak, and exactly what to study next. Built for phlebotomy
              students who want explanations and a plan—not another score with
              nowhere to go.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/practice/session?mode=quick-10&count=10"
                size="lg"
                className="sm:min-w-56"
              >
                Start 10 questions
              </ButtonLink>
              <ButtonLink href="/progress" variant="secondary" size="lg">
                See how readiness works
              </ButtonLink>
            </div>

            <dl className="mt-9 grid max-w-2xl grid-cols-3 border-y border-line-strong">
              {[
                [String(QUESTIONS.length), "questions"],
                [String(VOCAB_TERMS.length), "terms"],
                [String(DOMAINS.length), "study areas"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={`py-4 ${index > 0 ? "border-l border-line-strong pl-4 sm:pl-6" : "pr-4 sm:pr-6"}`}
                >
                  <dt className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink-subtle">
                    {label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0 lg:justify-self-end">
            <div className="lab-sheet shadow-[var(--shadow-lift)]">
              <div className="flex items-start justify-between gap-4 border-b border-line-strong px-4 py-4 sm:px-5">
                <div>
                  <p className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.15em] text-primary">
                    Bench reference / 01
                  </p>
                  <h2 className="mt-1 font-sans text-xl font-bold tracking-tight text-ink">
                    Order of draw
                  </h2>
                </div>
                <span className="status-stamp -rotate-2">Core drill</span>
              </div>

              <ol className="divide-y divide-[var(--border)]">
                {CLSI_ORDER_OF_DRAW.steps.map((step) => {
                  const stepTubes = step.tubeIds.map(getTube);
                  return (
                    <li
                      key={step.position}
                      className="group grid grid-cols-[2.25rem_auto_minmax(0,1fr)] items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-muted/70 sm:grid-cols-[2.5rem_4.25rem_minmax(0,1fr)] sm:px-5"
                    >
                      <span className="font-mono text-xs font-bold tabular-nums text-ink-subtle">
                        {String(step.position).padStart(2, "0")}
                      </span>
                      <span className="flex shrink-0 -space-x-1.5">
                        {stepTubes.map((tube) => (
                          <TubeGlyph key={tube.id} tube={tube} size="sm" />
                        ))}
                      </span>
                      <span className="min-w-0 border-l border-line pl-3">
                        <span className="block text-sm font-bold leading-tight text-ink">
                          {stepTubes.map((tube) => tube.displayName).join(" / ")}
                        </span>
                        <span className="mt-1 block truncate font-mono text-[0.6875rem] text-ink-subtle">
                          {stepTubes[0]?.additive}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="grid gap-3 border-t border-line-strong bg-surface-muted/55 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-5">
                <p className="max-w-sm text-xs leading-relaxed text-ink-muted">
                  This reference and the interactive drill read from the same
                  source data, so the study view and the practice view stay in sync.
                </p>
                <Link
                  href="/drills/order-of-draw"
                  className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary hover:underline"
                >
                  Test the sequence →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20" aria-labelledby="protocol-heading">
        <div className="grid gap-7 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="section-code">Study protocol / repeatable</p>
            <h2 id="protocol-heading" className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
              One loop. Less guessing.
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-ink-muted">
              Every tool should move you to the next decision instead of
              becoming another place to browse.
            </p>
          </div>

          <ol className="process-rail border-t border-line-strong">
            {WORKFLOW.map((step) => (
              <li key={step.number} className="process-step group">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-xs font-bold text-primary">{step.number}</span>
                  <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink-subtle">
                    {step.label}
                  </span>
                </div>
                <h3 className="mt-8 font-sans text-xl font-bold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                <Link
                  href={step.href}
                  className="mt-6 inline-flex font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary group-hover:underline"
                >
                  {step.action} →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="workbench-dark border-y border-line-strong" aria-labelledby="tools-heading">
        <div className="container-page py-14 sm:py-20">
          <div className="grid gap-6 border-b border-white/15 pb-8 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-end">
            <div>
              <p className="section-code text-[var(--workbench-accent)]">Instrument tray / choose the job</p>
              <h2 id="tools-heading" className="mt-3 max-w-3xl font-display text-4xl tracking-tight text-[var(--workbench-ink)] sm:text-5xl">
                Study tools that hand off to each other.
              </h2>
            </div>
            <p className="max-w-xl leading-relaxed text-[var(--workbench-muted)] lg:justify-self-end">
              Read when you need context. Practice when you need retrieval.
              Drill when a mechanism is shaky. Test when you need exam pressure.
              Your progress view closes the loop.
            </p>
          </div>

          <ul className="tool-matrix mt-8">
            {TOOLS.map((tool) => (
              <li
                key={tool.href}
                className={tool.featured ? "tool-slot tool-slot-featured" : "tool-slot"}
              >
                <Link href={tool.href} className="group flex h-full flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.15em] text-[var(--workbench-accent)]">
                      {tool.code}
                    </span>
                    <span aria-hidden="true" className="text-lg text-white/35 transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>
                  <h3 className="mt-8 font-sans text-xl font-bold tracking-tight text-[var(--workbench-ink)] sm:text-2xl">
                    {tool.name}
                  </h3>
                  <p className="mt-2 max-w-xl flex-1 text-sm leading-relaxed text-[var(--workbench-muted)]">
                    {tool.description}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4">
                    <span className="font-mono text-[0.6875rem] text-white/55">{tool.meta}</span>
                    <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-[var(--workbench-ink)] group-hover:underline">
                      {tool.action}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20" aria-labelledby="coverage-heading">
        <div className="grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="section-code">Coverage map / 10 areas</p>
            <h2 id="coverage-heading" className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
              Find the exact gap.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              These are this platform&apos;s study groupings—not a claim about a
              certifying body&apos;s published blueprint. Each one can be practiced
              independently.
            </p>
            <ButtonLink href="/practice" variant="secondary" className="mt-6">
              Build a custom session
            </ButtonLink>
          </div>

          <ol className="border-t border-line-strong">
            {DOMAINS.map((domain, index) => (
              <li key={domain.id} className="domain-row group">
                <span className="font-mono text-xs font-bold tabular-nums text-ink-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-sans text-lg font-bold tracking-tight text-ink sm:text-xl">
                    {domain.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">
                    {domain.description}
                  </p>
                </div>
                <Link
                  href={`/practice/session?mode=domain&domain=${domain.id}&count=10`}
                  className="justify-self-start font-mono text-xs font-bold uppercase tracking-[0.07em] text-primary group-hover:underline sm:justify-self-end"
                >
                  Practice 10 →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line-strong bg-surface-muted/45">
        <div className="container-page py-14 sm:py-20">
          <div className="release-sheet grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:p-10">
            <div>
              <p className="section-code">Release check / first session</p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl tracking-tight sm:text-5xl">
                You do not need a perfect study plan. You need ten honest answers.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
                Give the app about five minutes. It will start building the map
                from your first response and keep the data in this browser.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/practice/session?mode=quick-10&count=10" size="lg">
                  Start Quick 10
                </ButtonLink>
                <ButtonLink href="/nha-cpt" variant="secondary" size="lg">
                  Explore the NHA CPT hub
                </ButtonLink>
              </div>
            </div>

            <div className="border-t border-line-strong pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink-subtle">
                Included from answer one
              </p>
              <ul className="mt-4 space-y-3 text-sm text-ink-muted">
                {[
                  "Immediate explanation",
                  "Weak-area tracking",
                  "Local autosave",
                  "No account or card",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
