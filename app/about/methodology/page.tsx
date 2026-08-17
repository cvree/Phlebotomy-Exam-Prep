import type { Metadata } from "next";
import Link from "next/link";
import { NHA_CPT } from "@/data/certifications";
import { QUESTIONS, getReviewStatusSummary } from "@/data/questions";
import { VOCAB_TERMS, getVocabReviewStatusSummary } from "@/data/vocab";
import { ALL_SOURCES } from "@/data/sources";
import { MASTERY_RULES } from "@/lib/progress/mastery";
import {
  READINESS_WEIGHTS,
  READINESS_THRESHOLDS,
  VOLUME_TARGET,
} from "@/lib/progress/readiness";
import { RECOMMENDATION_RULES } from "@/lib/progress/recommendations";
import { Card, Notice, StatTile } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Methodology — how our questions, content, and scoring work",
  description:
    "How Phlebotomy Exam Prep writes questions, what our review workflow " +
    "means, which clinical claims are verified, and exactly how mastery, " +
    "readiness, and recommendations are calculated.",
  alternates: { canonical: "/about/methodology" },
  openGraph: {
    url: "/about/methodology",
    title: "How this platform works",
    description:
      "Content review workflow, source policy, and the exact mastery and readiness formulas.",
  },
};

const REVIEW_STAGES = [
  {
    status: "Draft",
    meaning: "Written but not checked by anyone.",
    shown: "Labelled as draft wherever it appears.",
  },
  {
    status: "Needs review",
    meaning:
      "Complete and internally consistent, written from material taught consistently across mainstream phlebotomy curricula — but not yet checked by a qualified reviewer against the cited references.",
    shown: "Labelled as awaiting review on every question and study page.",
  },
  {
    status: "Reviewed",
    meaning:
      "A named reviewer with relevant qualifications has checked it against the cited references and recorded the date.",
    shown: "Shows the review date and precise citations.",
  },
  {
    status: "Published",
    meaning: "Reviewed and cleared for presentation without a caveat badge.",
    shown: "No caveat badge.",
  },
];

export default function MethodologyPage() {
  const summary = getReviewStatusSummary();
  const vocabSummary = getVocabReviewStatusSummary();

  return (
    <div className="container-prose py-10 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.09em] text-primary">
        About
      </p>
      <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
        Methodology
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-muted">
        This is healthcare education, so it matters that you can tell the
        difference between something we have verified and something we have
        not. This page explains where every claim on the site comes from, and
        shows the exact arithmetic behind your progress numbers.
      </p>

      <div className="prose-study mt-10">
        <h2 id="questions">Where the questions come from</h2>
        <p>
          Every question on this site was <strong>written for this
          platform</strong>. None of it is taken from, reconstructed from, or
          intended to resemble a real certification exam. We do not use brain
          dumps, we do not publish recalled exam content, and we are not
          affiliated with, endorsed by, or sponsored by the{" "}
          {NHA_CPT.organization}, ASCP, or NCCT.
        </p>
        <p>
          That is partly an ethical position and partly a practical one:
          reproducing exam content violates certifying bodies&apos; terms and
          can invalidate a candidate&apos;s result. It also makes for worse
          study material, because memorising specific items does not transfer
          to a different form of the exam.
        </p>

        <h2 id="review">The review workflow</h2>
        <p>
          Every question, tube record, and study guide carries a review status
          that is rendered wherever the content appears. Nothing is presented as
          checked when it has not been.
        </p>
      </div>

      <div className="my-6 space-y-3 not-prose">
        {REVIEW_STAGES.map((stage) => (
          <Card key={stage.status} className="p-4">
            <h3 className="font-sans text-base font-semibold text-ink">
              {stage.status}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              {stage.meaning}
            </p>
            <p className="mt-1.5 text-xs text-ink-subtle">{stage.shown}</p>
          </Card>
        ))}
      </div>

      <div className="not-prose">
        <Notice tone="flag" title="Current status of this question bank">
          <p>
            All {QUESTIONS.length} questions currently sit at{" "}
            <strong>needs review</strong>
            {Object.entries(summary)
              .filter(([status]) => status !== "needs-review")
              .map(([status, count]) => `, with ${count} at ${status}`)
              .join("")}
            . They were written from material that mainstream phlebotomy
            programs teach consistently, but no qualified reviewer has yet
            checked them against the cited references. Treat this content as a
            study aid alongside your program, not as a replacement for it or
            for your facility&apos;s procedure manual.
          </p>
          <p className="mt-2.5">
            The same applies to the {VOCAB_TERMS.length} vocabulary terms:{" "}
            {Object.entries(vocabSummary)
              .map(([status, count]) => `${count} at ${status}`)
              .join(", ")}
            . Definitions are written in our own words at the level a
            phlebotomy student needs them, and none is copied from a textbook,
            a glossary, or a commercial study set.
          </p>
        </Notice>
      </div>

      <div className="prose-study mt-10">
        <h2 id="sources">How we cite</h2>
        <p>
          We store the title and publisher of real, citable documents. We
          deliberately do <strong>not</strong> store clause numbers, page
          numbers, or quotations, because nobody has opened these documents as
          part of authoring this content — inventing a precise citation would
          be worse than admitting we do not have one. Each reference records
          exactly how much verification has happened.
        </p>
        <p>Reference documents used across the site:</p>
        <ul>
          {ALL_SOURCES.map((source) => (
            <li key={source.label}>
              {source.url ? (
                <a
                  href={source.url}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  {source.label}
                </a>
              ) : (
                source.label
              )}
              {source.publisher ? ` — ${source.publisher}` : ""}
            </li>
          ))}
        </ul>

        <h2 id="exam-facts">Exam facts we have not verified</h2>
        <p>
          We do not publish {NHA_CPT.organizationShort}&apos;s question count,
          time limit, passing score, or official domain weightings anywhere on
          this site, because nobody has verified them against current published
          material. Guessing would make everything else here less trustworthy.
        </p>
        <p>These are the items a reviewer needs to confirm:</p>
        <ul>
          {NHA_CPT.official.verificationChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          Our mock exam comes in three lengths —{" "}
          {NHA_CPT.mockExam.forms
            .map(
              (form) =>
                `${form.questionCount} questions in ${form.timeLimitMinutes} minutes`,
            )
            .join(", ")}
          . Those are <strong>our</strong> practice formats, chosen to be useful
          lengths for study, and they are labeled as such everywhere they
          appear. For anything official, go to the {NHA_CPT.organization}{" "}
          directly.
        </p>

        <h2 id="domains">Where the ten study areas come from</h2>
        <p>
          The ten areas are our own study taxonomy, built from material that
          phlebotomy programs teach consistently. They are not copied from any
          certifying body&apos;s published test plan, and the practice weighting
          we use to build mock exams is our editorial judgement rather than a
          published blueprint. Both facts are recorded in the data itself —{" "}
          <code>domainWeightsVerified</code> is <code>false</code>.
        </p>
        <p>
          One area, <strong>California Requirements</strong>, is different in
          kind from the other nine: it covers state licensing law (the CDPH
          CPT1/CPT2 pathway) rather than clinical technique. Hour counts,
          procedure counts, fees, and forms are set by CDPH and can change.
          This content is not legal advice — confirm current requirements
          directly with CDPH Laboratory Field Services before relying on a
          specific number from this site for an actual application.
        </p>

        <h2 id="mastery">How mastery is calculated</h2>
        <p>
          Each of the ten areas gets a mastery level from Not started to
          Strong. Two design decisions drive the whole thing.
        </p>
        <p>
          <strong>Recent answers count for more.</strong> We look at your last{" "}
          {MASTERY_RULES.recentWindow} attempts in an area and weight them by
          recency, multiplying by {MASTERY_RULES.decay} for each step back in
          time. A bad week three months ago stops dragging the number down; a
          bad week now shows up immediately.
        </p>
        <p>
          <strong>Exposure gates the level.</strong> Nobody reaches a high
          rating from a handful of lucky answers.
        </p>
      </div>

      <div className="my-6 scroll-x not-prose">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          <caption className="sr-only">Mastery level requirements</caption>
          <thead>
            <tr className="border-b-2 border-line-strong text-left">
              <th scope="col" className="py-2.5 pr-4 font-semibold text-ink">
                Level
              </th>
              <th scope="col" className="py-2.5 font-semibold text-ink">
                Requires
              </th>
            </tr>
          </thead>
          <tbody className="text-ink-muted">
            <tr className="border-b border-line align-top">
              <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                Not started
              </th>
              <td className="py-3">No attempts.</td>
            </tr>
            <tr className="border-b border-line align-top">
              <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                Learning
              </th>
              <td className="py-3">
                Fewer than {MASTERY_RULES.minAttemptsForDeveloping} attempts, or
                weighted accuracy below{" "}
                {Math.round(MASTERY_RULES.developingAccuracy * 100)}%.
              </td>
            </tr>
            <tr className="border-b border-line align-top">
              <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                Developing
              </th>
              <td className="py-3">
                At least {MASTERY_RULES.minAttemptsForDeveloping} attempts and
                weighted accuracy of{" "}
                {Math.round(MASTERY_RULES.developingAccuracy * 100)}% or better.
              </td>
            </tr>
            <tr className="border-b border-line align-top">
              <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                Proficient
              </th>
              <td className="py-3">
                {MASTERY_RULES.proficient.attempts}+ attempts across{" "}
                {MASTERY_RULES.proficient.distinctQuestions}+ distinct
                questions, at {Math.round(MASTERY_RULES.proficient.accuracy * 100)}
                % weighted accuracy or better.
              </td>
            </tr>
            <tr className="border-b border-line align-top">
              <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                Strong
              </th>
              <td className="py-3">
                {MASTERY_RULES.strong.attempts}+ attempts across{" "}
                {MASTERY_RULES.strong.distinctQuestions}+ distinct questions, at{" "}
                {Math.round(MASTERY_RULES.strong.accuracy * 100)}% weighted
                accuracy, with at least{" "}
                {Math.round(MASTERY_RULES.strong.repeatMasteryRatio * 100)}% of
                those questions answered correctly twice in a row.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose-study">
        <h2 id="readiness">How study readiness is calculated</h2>
        <p>
          <strong>Study readiness is not a prediction.</strong> It does not
          estimate your chance of passing, and we will not publish a number that
          claims to. Nothing on this site has been validated against real exam
          outcomes, and presenting a percentage as if it had would be
          straightforwardly dishonest.
        </p>
        <p>
          What it does measure is how much of the material you have
          demonstrated, recently, across the whole syllabus. It is five
          components with fixed weights, summing to 100:
        </p>
      </div>

      <dl className="my-6 grid grid-cols-2 gap-3 not-prose sm:grid-cols-5">
        <StatTile
          label="Coverage"
          value={String(READINESS_WEIGHTS.coverage)}
          detail="areas at Developing+"
        />
        <StatTile
          label="Mastery depth"
          value={String(READINESS_WEIGHTS.accuracy)}
          detail="average across all areas"
        />
        <StatTile
          label="Volume"
          value={String(READINESS_WEIGHTS.volume)}
          detail={`saturates at ${VOLUME_TARGET} questions`}
        />
        <StatTile
          label="Retention"
          value={String(READINESS_WEIGHTS.retention)}
          detail="correct twice running"
        />
        <StatTile
          label="Mock exam"
          value={String(READINESS_WEIGHTS.mock)}
          detail="best of last 3"
        />
      </dl>

      <div className="prose-study">
        <p>The resulting score maps to a label:</p>
        <ul>
          {READINESS_THRESHOLDS.slice()
            .reverse()
            .map((threshold) => (
              <li key={threshold.level}>
                <strong>{threshold.level.replace("-", " ")}</strong> — {threshold.min}{" "}
                and above
              </li>
            ))}
        </ul>
        <p>
          Untouched areas count as zero in the mastery-depth component. That is
          deliberate: it means a student who is excellent at three areas and has
          never opened the other six will not see a high readiness score, which
          is exactly the situation where a high score would be misleading.
        </p>

        <h2 id="recommendations">How recommendations are generated</h2>
        <p>
          Recommendations come from a fixed, ordered set of rules over your
          stored data. There is no model, no external API, and no randomness —
          which means every suggestion can be traced back to a specific number
          you can also see on the page. The rules, in priority order:
        </p>
        <ol>
          <li>No practice data yet → start with ten questions.</li>
          <li>
            Your weakest area with real evidence behind it → practice it.
          </li>
          <li>
            {RECOMMENDATION_RULES.missedThreshold} or more questions still
            sitting on a wrong answer → review them.
          </li>
          <li>
            Order of Draw drill never attempted, below{" "}
            {Math.round(RECOMMENDATION_RULES.drillAccuracyFloor * 100)}%
            accuracy, or unused for {RECOMMENDATION_RULES.drillStaleDays} days →
            drill it.
          </li>
          <li>Same rules for the tube drill.</li>
          <li>An area you have never touched → start it.</li>
          <li>
            Readiness of {RECOMMENDATION_RULES.mockReadyScore}+ and no mock in{" "}
            {RECOMMENDATION_RULES.mockStaleDays} days → take a mock exam.
          </li>
          <li>Otherwise → mixed practice to keep every area warm.</li>
        </ol>

        <h2 id="privacy">Your data</h2>
        <p>
          There is no account and no sign-up. Everything — answers, mastery,
          drill history, mock results — is stored in your browser&apos;s local
          storage on the device you are using. Nothing is uploaded to us, and
          there is no identity attached to it.
        </p>
        <p>
          The consequence is that progress does not follow you to another
          device, and clearing your browser data clears it. You can export a
          JSON copy from the{" "}
          <Link href="/progress">progress page</Link>, and delete everything
          from the same place.
        </p>
        <p>
          Product analytics are defined in code but no provider is connected, so
          no events leave your browser today. When one is connected it will
          record which features are used and how often — never your answers,
          your results, or anything about you.
        </p>

        <h2 id="corrections">Corrections</h2>
        <p>
          If you find something wrong — a factual error, a badly-worded
          question, a distractor that is arguably also correct — that is worth
          reporting. Clinical content is versioned in the repository, so a
          correction fixes the question, the study guides that reference it, and
          the drills, all at once.
        </p>
      </div>
    </div>
  );
}
