import type { Metadata } from "next";
import { SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";
import {
  CommonMistake,
  KeyPoint,
  StudyArticle,
  StudySection,
} from "@/components/study/StudyArticle";

export const metadata: Metadata = {
  title: "Specimen handling — labeling, transport, and rejection criteria",
  description:
    "What happens to a specimen after collection: required label elements, " +
    "mixing and clotting, chilled and light-protected specimens, transport " +
    "limits, chain of custody, and the reasons laboratories reject specimens.",
  alternates: { canonical: "/study/specimen-handling" },
  openGraph: {
    type: "article",
    url: "/study/specimen-handling",
    title: "Specimen handling for phlebotomy",
    description:
      "Labelling, temperature, transport, and the rejection criteria that send you back to the patient.",
  },
};

const SECTIONS = [
  { id: "labeling", title: "Labelling" },
  { id: "temperature", title: "Temperature and light" },
  { id: "processing", title: "Mixing, clotting, centrifuging" },
  { id: "transport", title: "Transport and stability" },
  { id: "custody", title: "Chain of custody" },
  { id: "rejection", title: "Why specimens get rejected" },
  { id: "faq", title: "Quick answers" },
];

export default function SpecimenHandlingStudyPage() {
  return (
    <StudyArticle
      eyebrow="Study guide"
      title="Specimen handling"
      standfirst="A perfect venipuncture can still produce a useless result. Most errors that reach the laboratory were made in the minutes after the needle came out — and almost all of them mean sticking the patient again."
      updated="August 2026"
      sections={SECTIONS}
      practiceCta={{
        href: "/practice/session?mode=domain&domain=specimen-handling&count=10",
        label: "Practice 10 specimen handling questions",
        blurb:
          "Certification-style questions on labeling, temperature requirements, transport limits, and rejection criteria — with explanations.",
      }}
      related={[
        {
          href: "/study/phlebotomy-tube-colors",
          label: "Tube colors & additives",
          description: "Which tube, which additive, and what it does.",
        },
        {
          href: "/study/order-of-draw",
          label: "Order of draw",
          description: "The sequence and the carryover it prevents.",
        },
        {
          href: "/study/venipuncture-complications",
          label: "Venipuncture complications",
          description: "Hematoma, syncope, nerve involvement, and hemolysis.",
        },
        {
          href: "/mock-exam",
          label: "Mock exam",
          description: "A full timed paper across every area.",
        },
      ]}
      reviewStatus="needs-review"
      sources={[SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM]}
    >
      <StudySection id="labeling" title="Labelling">
        <p>
          A label has one job: let anyone downstream establish whose specimen
          this is, when it was taken, and who took it. A specimen that cannot
          answer those three questions is not a specimen, it is waste.
        </p>

        <h3>Required elements</h3>
        <ul>
          <li>Patient&apos;s full name</li>
          <li>
            A second unique identifier — date of birth or medical record number,
            never a room or bed number
          </li>
          <li>Date and time of collection</li>
          <li>An identifier for the person who collected it</li>
        </ul>
        <p>
          Facilities add fields on top of this, and blood bank specimens
          typically require more. Check your local requirements.
        </p>

        <h3>When to label</h3>
        <p>
          At the bedside, immediately after the draw, before leaving the
          patient. Not before — a pre-labeled tube that gets filled from a
          different patient is one of the most dangerous errors in the
          discipline. Not after — every step away from the bedside is an
          opportunity for a mix-up you can no longer detect.
        </p>

        <CommonMistake title="Labelling from the requisition after leaving the room">
          The requisition proves what was ordered. It does not prove what is in
          the tube. Once you have left, you can no longer verify identity, and
          the correct action is to discard the specimen, re-verify the patient,
          and recollect.
        </CommonMistake>

        <KeyPoint>
          Blood bank specimens are never relabelled or corrected. Any doubt
          about identity means recollection, because the consequence of getting
          it wrong is an incompatible transfusion.
        </KeyPoint>
      </StudySection>

      <StudySection id="temperature" title="Temperature and light">
        <h3>Chilled specimens</h3>
        <p>
          Some analytes continue to change in the tube because cells keep
          metabolising. Chilling — typically an ice-water slurry rather than
          solid ice, which can freeze and hemolyse the sample — slows that
          down. Ammonia and lactate are the classic examples, along with blood
          gases.
        </p>

        <h3>Warmed specimens</h3>
        <p>
          A smaller group must be kept at body temperature until the serum is
          separated: cold agglutinins, cryoglobulins, and cryofibrinogen. If
          these cool first, the target substance precipitates onto the cells and
          is removed with them, so the measured level comes back falsely low.
        </p>

        <KeyPoint>
          The names are the trap. Anything called &ldquo;cold&rdquo; or
          &ldquo;cryo&rdquo; is kept <strong>warm</strong> — the name describes
          what the substance does when chilled, not how to transport it.
        </KeyPoint>

        <h3>Light-protected specimens</h3>
        <p>
          Bilirubin degrades on exposure to light, producing a falsely low
          result. This matters most in neonates, where treatment decisions turn
          on the number. Wrap the tube in foil or use an amber tube. Vitamin
          B12, folate, and carotene are also light-sensitive.
        </p>
      </StudySection>

      <StudySection id="processing" title="Mixing, clotting, centrifuging">
        <h3>Mixing</h3>
        <p>
          Invert additive tubes gently and immediately, the number of times the
          manufacturer specifies. Shaking hemolyses the specimen; delaying lets
          microclots form. Both invalidate the result, and neither is visible
          from the outside.
        </p>

        <h3>Clotting</h3>
        <p>
          Serum tubes need to clot completely before centrifugation —
          approximately 30 minutes for a tube with clot activator, longer for
          patients on anticoagulants. Spinning early leaves fibrin strands in
          the serum, which clog analyser probes and can produce erroneous
          results.
        </p>

        <h3>Centrifuging</h3>
        <p>
          Gel tubes are spun once. Re-centrifuging can move analytes across the
          barrier from the cells beneath — potassium in particular — so if more
          serum is needed, the specimen is recollected rather than re-spun.
        </p>
      </StudySection>

      <StudySection id="transport" title="Transport and stability">
        <p>
          Time limits vary by test, and your facility&apos;s manual is the
          authority. The principle is that a specimen starts changing the
          moment it leaves the patient, and different tests tolerate different
          amounts of change.
        </p>
        <ul>
          <li>
            <strong>Whole blood for a CBC</strong> stays liquid in EDTA for a
            long time, but cell morphology deteriorates over hours — which
            degrades the differential and distorts the indices. Many facilities
            require smears within a few hours when transport will be delayed.
          </li>
          <li>
            <strong>Serum and plasma</strong> for chemistry are usually
            separated from the cells as soon as possible, because potassium
            leaks out of cells over time.
          </li>
          <li>
            <strong>Glucose</strong> falls in an untreated tube as cells consume
            it. The grey tube&apos;s fluoride slows this but does not stop it.
          </li>
        </ul>

        <CommonMistake title="Treating transport as somebody else's problem">
          The collector&apos;s responsibility does not end at the label. If a
          specimen needs chilling, light protection, or fast transport, the time
          to arrange it is at the bedside — not when it arrives in the lab too
          late.
        </CommonMistake>
      </StudySection>

      <StudySection id="custody" title="Chain of custody">
        <p>
          Some specimens are collected for legal or employment purposes — drug
          screening, blood alcohol, forensic work. These carry a chain of
          custody document: an unbroken, signed record of everyone who handled
          the specimen and when, with tamper-evident seals.
        </p>
        <p>
          The purpose is not accuracy but defensibility. Any gap in the record
          makes the result challengeable, regardless of whether anything
          actually went wrong. For a blood alcohol collection, the site is
          cleaned with a non-alcohol antiseptic for exactly this reason — not
          because contamination is likely, but because it removes the argument.
        </p>
      </StudySection>

      <StudySection id="rejection" title="Why specimens get rejected">
        <p>
          Rejection means the patient gets stuck again. These are the reasons it
          happens, roughly in order of how avoidable they are.
        </p>
        <ul>
          <li>
            <strong>Unlabelled, mislabeled, or incompletely labeled.</strong>{" "}
            The only error nobody downstream can fix.
          </li>
          <li>
            <strong>Wrong tube for the test.</strong> A serum tube for a CBC, a
            gel tube for a drug level requiring gel-free.
          </li>
          <li>
            <strong>Short draw in a citrate tube.</strong> The 9:1 ratio is part
            of the method.
          </li>
          <li>
            <strong>Hemolysis.</strong> Visible pink or red serum. Falsely
            raises potassium, LDH, and AST.
          </li>
          <li>
            <strong>Clotted specimen in an anticoagulant tube.</strong> Usually
            from inadequate or delayed mixing.
          </li>
          <li>
            <strong>Exceeded stability time</strong> or wrong transport
            temperature.
          </li>
          <li>
            <strong>Contaminated with IV fluid.</strong> Look for implausible
            results — a very high glucose with a dextrose infusion running above
            the site.
          </li>
        </ul>
      </StudySection>

      <StudySection id="faq" title="Quick answers">
        <h3>When should tubes be labeled?</h3>
        <p>
          At the bedside, immediately after collection, before leaving the
          patient. Never before the draw.
        </p>

        <h3>Which specimens are transported on ice?</h3>
        <p>
          Ammonia, lactate, and blood gases are the common ones. Use an
          ice-water slurry rather than solid ice, which can freeze and hemolyse
          the sample.
        </p>

        <h3>Which specimens must be kept warm?</h3>
        <p>
          Cold agglutinins, cryoglobulins, and cryofibrinogen — kept at 37°C
          until the serum is separated.
        </p>

        <h3>What does hemolysis do to results?</h3>
        <p>
          It raises potassium, LDH, and AST, because those are concentrated
          inside red cells. Serum or plasma appears pink to red rather than
          straw-colored.
        </p>
      </StudySection>
    </StudyArticle>
  );
}
