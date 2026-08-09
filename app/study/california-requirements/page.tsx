import type { Metadata } from "next";
import { SRC_CA_BPC_1246, SRC_CDPH_LFS } from "@/data/sources";
import {
  CommonMistake,
  KeyPoint,
  StudyArticle,
  StudySection,
} from "@/components/study/StudyArticle";

export const metadata: Metadata = {
  title: "California phlebotomy requirements — CPT1, CPT2, and CDPH licensing",
  description:
    "What California adds on top of a national phlebotomy exam: the CDPH " +
    "Laboratory Field Services CPT1/CPT2 certificate, scope of practice, " +
    "training and supervised-procedure requirements, supervision rules, and " +
    "continuing education.",
  alternates: { canonical: "/study/california-requirements" },
  openGraph: {
    type: "article",
    url: "/study/california-requirements",
    title: "California phlebotomy requirements — CPT1, CPT2, and CDPH licensing",
    description:
      "The state certification layer California adds on top of a national phlebotomy exam.",
  },
};

const SECTIONS = [
  { id: "why", title: "Why California is different" },
  { id: "cpt1-cpt2", title: "CPT1 vs. CPT2" },
  { id: "pathway", title: "The pathway, step by step" },
  { id: "supervision", title: "Supervision and competency checks" },
  { id: "maintaining", title: "Keeping a certificate current" },
  { id: "faq", title: "Quick answers" },
];

export default function CaliforniaRequirementsStudyPage() {
  return (
    <StudyArticle
      eyebrow="Study guide"
      title="California phlebotomy requirements"
      standfirst="Passing a national exam like the NHA CPT is real progress — but in California it is one step in a longer pathway, not the finish line. Here is what the state adds, and why."
      updated="August 2026"
      sections={SECTIONS}
      practiceCta={{
        href: "/practice/session?mode=domain&domain=california-requirements&count=10",
        label: "Practice 10 California requirements questions",
        blurb:
          "Scenario questions on CPT1/CPT2 scope, the CDPH application, supervision, and renewal — with the reasoning behind each answer.",
      }}
      related={[
        {
          href: "/practice/session?mode=domain&domain=safety-infection-control&count=10",
          label: "Safety & infection control questions",
          description: "Federal OSHA and standard precautions, tested separately from state licensing.",
        },
        {
          href: "/study/order-of-draw",
          label: "Order of draw",
          description: "The CLSI collection sequence, wherever you are certified.",
        },
        {
          href: "/nha-cpt",
          label: "NHA CPT hub",
          description: "The national exam this state pathway builds on.",
        },
        {
          href: "/progress",
          label: "Your progress",
          description: "See which areas are actually letting you down.",
        },
      ]}
      reviewStatus="needs-review"
      sources={[SRC_CDPH_LFS, SRC_CA_BPC_1246]}
    >
      <StudySection id="why" title="Why California is different">
        <p>
          Most states let a national certification — like the NHA CPT — stand
          on its own. California does not. Under Business and Professions Code
          §1246, any unlicensed person performing phlebotomy in a clinical
          laboratory must also hold a valid, current{" "}
          <strong>Certified Phlebotomy Technician</strong> certificate, issued
          by the California Department of Public Health (CDPH) through its
          Laboratory Field Services (LFS) program.
        </p>
        <KeyPoint>
          A national exam is typically part of the evidence CDPH looks for —
          it is not a substitute for the state certificate. Passing the NHA
          CPT gets you closer to working in California; it does not, by
          itself, authorize you to draw blood here.
        </KeyPoint>
        <p>
          Licensed clinicians — physicians and registered nurses, for example
          — draw blood under their own license and are not the target of this
          requirement. It exists specifically for otherwise-unlicensed
          personnel: the certified phlebotomy technician role.
        </p>
      </StudySection>

      <StudySection id="cpt1-cpt2" title="CPT1 vs. CPT2">
        <h3>CPT1 — skin puncture and venipuncture</h3>
        <p>
          The base California certificate. It authorizes skin (capillary)
          puncture and venipuncture. It does not cover arterial puncture.
        </p>

        <h3>CPT2 — adds arterial puncture</h3>
        <p>
          CPT2 is built on top of CPT1, not a separate starting point. A
          candidate holds CPT1, then completes the additional
          arterial-puncture training and supervised procedures CDPH requires
          to add CPT2 to their certificate. CPT2 is generally the certificate
          required for roles that draw arterial blood gases — ICU,
          emergency, and respiratory care settings, for example.
        </p>

        <CommonMistake title="Treating CPT2 as 'the advanced version you can start with'">
          You cannot apply for CPT2 without already holding CPT1. Plan your
          training sequence accordingly if arterial puncture is part of the
          job you want.
        </CommonMistake>
      </StudySection>

      <StudySection id="pathway" title="The pathway, step by step">
        <ol>
          <li>
            Complete training through a <strong>Laboratory Field
            Services–approved</strong> program — didactic coursework plus
            supervised clinical practice, with documented successful
            procedures.
          </li>
          <li>
            Pass a <strong>CDPH-approved national certification exam</strong>{" "}
            (the NHA CPT is one such exam).
          </li>
          <li>
            Submit a <strong>CPT1 application to CDPH LFS</strong>: training
            and procedure documentation, the exam result, fingerprints for a
            background check, and the application fee.
          </li>
          <li>
            Once certified, work under required supervision and add CPT2
            later if arterial puncture becomes part of the role.
          </li>
        </ol>
        <p>
          Specific hour counts, procedure counts, and fees are set by CDPH and
          can change — this guide describes the shape of the pathway, not a
          substitute for the current CDPH LFS publication. Confirm exact
          numbers directly with CDPH before submitting an application.
        </p>
      </StudySection>

      <StudySection id="supervision" title="Supervision and competency checks">
        <p>
          A certificate establishes eligibility. It does not remove ongoing
          supervision. Certified phlebotomy technicians work under a licensed
          physician and surgeon, or another person licensed to supervise
          phlebotomy under the same chapter of law — commonly a licensed
          nurse in the collection setting.
        </p>
        <p>
          Facilities are expected to have that supervisor confirm a
          technician&apos;s competency <strong>before their first
          blood withdrawal</strong> at that site, and to re-check it on an
          ongoing basis. Certification from CDPH and competency verification
          at a specific facility are two different, both-required things.
        </p>
      </StudySection>

      <StudySection id="maintaining" title="Keeping a certificate current">
        <p>
          California CPT certification is maintained, not permanent from the
          date of issue. The general expectation is ongoing continuing
          education — commonly described as at least three hours per year, or
          six hours across a two-year cycle — to keep a certificate current.
        </p>
        <p>
          A California CPT certificate travels with the person, not the
          employer. Changing jobs within California does not require a new
          CDPH application, but starting work at a new facility still means
          that facility&apos;s own competency check before an unsupervised
          first draw there.
        </p>
      </StudySection>

      <StudySection id="faq" title="Quick answers">
        <h3>I already passed the NHA CPT out of state. Am I set to work in California?</h3>
        <p>
          No. You still need to submit an application to CDPH Laboratory
          Field Services and receive a California CPT1 (or CPT2) certificate
          before drawing blood unsupervised in a California clinical
          laboratory.
        </p>

        <h3>Does CPT1 cover arterial blood gas draws?</h3>
        <p>
          No. CPT1 covers skin puncture and venipuncture only. Arterial
          puncture requires CPT2, which is added on top of an existing CPT1
          certificate.
        </p>

        <h3>Who regulates this?</h3>
        <p>
          The California Department of Public Health, through its Laboratory
          Field Services program — the same office that licenses clinical
          laboratories.
        </p>

        <h3>Is this legal advice?</h3>
        <p>
          No. This guide summarizes the shape of the pathway for study
          purposes. Confirm current requirements, forms, and fees directly
          with CDPH Laboratory Field Services before relying on anything here
          for an actual application.
        </p>
      </StudySection>
    </StudyArticle>
  );
}
