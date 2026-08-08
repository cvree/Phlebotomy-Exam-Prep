import type { Metadata } from "next";
import Link from "next/link";
import { NHA_CPT } from "@/data/certifications";
import { DOMAINS } from "@/data/certifications/domains";
import { QUESTIONS, countQuestionsByDomain } from "@/data/questions";
import { ButtonLink, Card, Notice } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "NHA CPT practice test — free, no sign-up",
  description:
    "A free NHA CPT practice test with explanations after every answer. " +
    "Start with ten questions, get a breakdown by area, and find out which " +
    "topic is actually letting you down. No account required.",
  alternates: { canonical: "/nha-cpt/practice-test" },
  openGraph: {
    url: "/nha-cpt/practice-test",
    title: "Free NHA CPT practice test",
    description:
      "Ten questions with explanations and a breakdown by area. No sign-up.",
  },
};

export default function PracticeTestPage() {
  const counts = countQuestionsByDomain(NHA_CPT.id);

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.09em] text-primary">
          Free practice test
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          NHA CPT practice test
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          {QUESTIONS.length} original, certification-style phlebotomy questions
          — free, with a full explanation after every answer and a breakdown of
          which areas cost you marks. No account, no email, no card.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href="/practice/session?mode=quick-10&count=10"
            size="lg"
            className="sm:min-w-56"
          >
            Start 10 questions
          </ButtonLink>
          <ButtonLink
            href="/practice/session?mode=all-domains&count=25"
            variant="secondary"
            size="lg"
          >
            Longer test (25)
          </ButtonLink>
        </div>
      </div>

      <div className="mt-9 max-w-3xl">
        <Notice tone="flag" title="These are practice questions, not exam questions">
          <p>
            Every question here was written for this platform. None of it is
            taken from, reconstructed from, or intended to resemble a real{" "}
            {NHA_CPT.organizationShort} exam, and we do not use or publish
            leaked exam content. We are not affiliated with, endorsed by, or
            sponsored by the {NHA_CPT.organization}.
          </p>
          <p className="mt-2">
            Scoring well here means you know the material. It does not predict
            an exam outcome, and we make no claim that it does.
          </p>
        </Notice>
      </div>

      <section className="mt-12" aria-labelledby="what-you-get">
        <h2 id="what-you-get" className="font-display text-3xl">
          What you get after you answer
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "The reasoning",
              body: "Not just the correct answer — why it is correct, in terms you can reuse on a different question.",
            },
            {
              title: "Why you were tempted",
              body: "Most questions explain why the specific wrong option you picked looked plausible.",
            },
            {
              title: "A memory tip",
              body: "A short takeaway or mnemonic where one genuinely helps, rather than on every question.",
            },
            {
              title: "Your weakest area",
              body: "A breakdown by area at the end, and a specific recommendation for what to do next.",
            },
          ].map((item) => (
            <li key={item.title}>
              <Card className="h-full p-4">
                <h3 className="font-sans text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="by-topic">
        <h2 id="by-topic" className="font-display text-3xl">
          Practice tests by topic
        </h2>
        <p className="mt-2 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
          If you already know which area you are weak in, start there.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <li key={domain.id}>
              <Card className="h-full">
                <Link
                  href={`/practice/session?mode=domain&domain=${domain.id}&count=10`}
                  className="block h-full p-4"
                >
                  <h3 className="font-sans text-base font-semibold text-primary">
                    {domain.name} →
                  </h3>
                  <p className="mt-1 text-xs text-ink-subtle">
                    {counts[domain.id] ?? 0} questions
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {domain.description}
                  </p>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="faq">
        <h2 id="faq" className="font-display text-3xl">
          Questions students ask
        </h2>

        <div className="prose-study mt-5">
          <h3>Is this practice test really free?</h3>
          <p>
            Yes, and there is no account to create. Progress is stored in your
            browser, so nothing is uploaded and nothing is tied to an identity.
            If a paid tier arrives later, the study guides and both drills stay
            free.
          </p>

          <h3>How many questions should I do before the exam?</h3>
          <p>
            Volume matters less than coverage. Answering 300 questions on the
            three areas you already enjoy is worth less than 100 spread across
            all nine. The{" "}
            <Link href="/progress">progress page</Link> tracks coverage
            explicitly for this reason.
          </p>

          <h3>How do I know which area to study?</h3>
          <p>
            Answer questions and the app works it out. Mastery is tracked
            separately for each of the nine areas, weighted toward recent
            answers, and the recommendation on your progress page names the
            weakest one with the numbers behind it.
          </p>

          <h3>Do I need to create an account to save progress?</h3>
          <p>
            No. Progress lives in this browser. That means it does not follow
            you to another device — you can export it as a JSON file from the
            progress page if you want a copy.
          </p>

          <h3>Are these the real NHA exam questions?</h3>
          <p>
            No, and you should be wary of any site that claims otherwise.
            Reproducing certification exam content is a violation of the
            certifying body&apos;s terms and can invalidate a candidate&apos;s
            result. Every question here is original.
          </p>
        </div>
      </section>

      <div className="mt-12 rounded-[var(--radius-lg)] bg-primary-soft px-5 py-8 text-center sm:px-8">
        <h2 className="font-display text-3xl">Ready?</h2>
        <p className="mx-auto mt-2 max-w-lg text-[1.0625rem] text-ink-muted">
          Ten questions, about five minutes, and you will know where you stand.
        </p>
        <ButtonLink
          href="/practice/session?mode=quick-10&count=10"
          size="lg"
          className="mt-5"
        >
          Start the practice test
        </ButtonLink>
      </div>
    </div>
  );
}
