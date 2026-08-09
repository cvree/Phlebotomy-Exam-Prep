import type { Metadata } from "next";
import { SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";
import {
  CommonMistake,
  KeyPoint,
  StudyArticle,
  StudySection,
} from "@/components/study/StudyArticle";

export const metadata: Metadata = {
  title: "Venipuncture complications — recognize, respond, prevent",
  description:
    "Hematoma, syncope, nerve involvement, arterial puncture, petechiae, " +
    "hemolysis, and failed draws: what each looks like, what to do the " +
    "moment it happens, and how to avoid it next time.",
  alternates: { canonical: "/study/venipuncture-complications" },
  openGraph: {
    type: "article",
    url: "/study/venipuncture-complications",
    title: "Venipuncture complications",
    description:
      "What each complication looks like, what to do immediately, and how to prevent it.",
  },
};

const SECTIONS = [
  { id: "principle", title: "The one rule that covers most of them" },
  { id: "syncope", title: "Syncope" },
  { id: "hematoma", title: "Hematoma" },
  { id: "nerve", title: "Nerve involvement" },
  { id: "arterial", title: "Arterial puncture" },
  { id: "hemolysis", title: "Hemolysis" },
  { id: "failed", title: "Failed draws" },
  { id: "assessment", title: "Findings that change your approach" },
  { id: "faq", title: "Quick answers" },
];

export default function ComplicationsStudyPage() {
  return (
    <StudyArticle
      eyebrow="Study guide"
      title="Venipuncture complications"
      standfirst="Complications are mostly about what you do in the first three seconds. Almost every correct answer in this area is a variant of the same instruction: stop, remove the needle, protect the patient, then escalate."
      updated="August 2026"
      sections={SECTIONS}
      practiceCta={{
        href: "/practice/session?mode=domain&domain=complications&count=10",
        label: "Practice 10 complications questions",
        blurb:
          "Scenario questions on syncope, hematoma, nerve involvement, and hemolysis — with the reasoning behind each correct response.",
      }}
      related={[
        {
          href: "/study/specimen-handling",
          label: "Specimen handling",
          description: "What happens after the needle comes out.",
        },
        {
          href: "/study/order-of-draw",
          label: "Order of draw",
          description: "The sequence and the carryover it prevents.",
        },
        {
          href: "/practice/session?mode=domain&domain=venipuncture-technique&count=10",
          label: "Technique questions",
          description: "Equipment, angles, tourniquet use, and dermal puncture.",
        },
        {
          href: "/progress",
          label: "Your progress",
          description: "See which areas are actually letting you down.",
        },
      ]}
      reviewStatus="needs-review"
      sources={[SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM]}
    >
      <StudySection id="principle" title="The one rule that covers most of them">
        <KeyPoint>
          When something goes wrong: <strong>release the tourniquet, withdraw
          the needle, activate the safety device, protect the patient, then get
          help.</strong> Completing the draw is never the priority. A specimen
          can be recollected; a fall, a nerve injury, or an arterial bleed
          cannot be undone.
        </KeyPoint>
        <p>
          Almost every complication question is testing whether you will
          prioritize the specimen over the patient. The answer is always no.
        </p>
      </StudySection>

      <StudySection id="syncope" title="Syncope">
        <h3>What you will see</h3>
        <p>
          Pallor, sweating, a change in breathing, a report of feeling
          lightheaded or nauseated, or a patient who goes quiet. Syncope is a
          vasovagal response, not blood loss — it can happen before the needle
          goes in.
        </p>

        <h3>What to do</h3>
        <ul>
          <li>Stop. Remove the tourniquet and the needle.</li>
          <li>
            Lower the patient&apos;s head between their knees, or recline them.
            Loosen anything tight at the neck.
          </li>
          <li>
            A cold compress on the back of the neck helps. Stay with the
            patient — call for help without leaving.
          </li>
          <li>Do not give anything by mouth to someone who may lose consciousness.</li>
          <li>Document the episode per facility policy.</li>
        </ul>

        <h3>Prevention</h3>
        <p>
          Ask every patient whether they have reacted badly to a draw before.
          It takes five seconds, and a previous faint is the single best
          predictor of the next one. Draw those patients lying down.
        </p>

        <CommonMistake title="Leaving the room to get help">
          A patient who loses consciousness unattended can strike their head. If
          you need help, call for it from where you are.
        </CommonMistake>
      </StudySection>

      <StudySection id="hematoma" title="Hematoma">
        <h3>What you will see</h3>
        <p>
          Rapid swelling at the site during the draw, or bruising afterwards.
          It means blood is leaking out of the vessel into the surrounding
          tissue.
        </p>

        <h3>What to do</h3>
        <p>
          Release the tourniquet, withdraw the needle, and apply firm direct
          pressure for several minutes. A large hematoma can compress nearby
          structures, so this is not merely cosmetic.
        </p>

        <h3>Prevention</h3>
        <ul>
          <li>
            Do not go through the far wall of the vein — a shallow 15 to 30
            degree angle helps.
          </li>
          <li>Make sure the bevel is fully inside the lumen before drawing.</li>
          <li>
            Apply firm pressure with the arm straight or slightly elevated
            afterwards.
          </li>
          <li>
            Hold pressure longer for patients on anticoagulants or with a low
            platelet count.
          </li>
        </ul>

        <CommonMistake title="Telling the patient to bend their elbow">
          It is the most common post-draw instruction given, and it increases
          hematoma formation. The puncture in the vein wall sits deeper and
          slightly proximal to the skin entry; elbow flexion does not apply
          pressure over it. Direct pressure with a straight arm does.
        </CommonMistake>
      </StudySection>

      <StudySection id="nerve" title="Nerve involvement">
        <h3>What you will see</h3>
        <p>
          A sharp, shooting, electric, or radiating sensation — typically down
          the forearm into the hand. This is qualitatively different from
          ordinary needle pain, which is dull and stays where the needle is.
        </p>

        <h3>What to do</h3>
        <p>
          Withdraw the needle immediately. Do not redirect, do not continue, and
          do not re-attempt that site. Use the other arm if a specimen is still
          required, and report the event per facility policy — nerve injuries
          can produce lasting pain syndromes, and documentation matters.
        </p>

        <h3>Prevention</h3>
        <ul>
          <li>
            Choose the median cubital vein first. The basilic vein, on the
            medial side, runs close to the median nerve and the brachial artery
            — which is why it is the last choice, however prominent it looks.
          </li>
          <li>
            Never probe laterally with the needle. Blind sideways movement is a
            recognized mechanism of nerve injury.
          </li>
          <li>Limit yourself to two attempts before handing off.</li>
        </ul>
      </StudySection>

      <StudySection id="arterial" title="Arterial puncture">
        <h3>What you will see</h3>
        <p>
          Bright red blood that pulses into the tube and fills it unusually
          fast. Arterial blood is oxygenated and under systemic pressure.
        </p>

        <h3>What to do</h3>
        <p>
          Withdraw immediately and apply firm direct pressure for at least five
          minutes — longer than a venous site, and longer still for
          anticoagulated patients. Notify the patient&apos;s nurse and your
          supervisor, and make sure the site is monitored for hematoma. If the
          specimen is used, it must be labeled as arterial, because reference
          ranges differ for several analytes.
        </p>
      </StudySection>

      <StudySection id="hemolysis" title="Hemolysis">
        <p>
          Hemolysis is red cell rupture. It is usually invisible at the bedside
          and discovered in the laboratory as pink or red serum. It falsely
          raises potassium, LDH, and AST, because those are concentrated inside
          red cells — and a falsely high potassium can trigger an unnecessary
          clinical response.
        </p>

        <h3>Causes, all preventable</h3>
        <ul>
          <li>Shaking tubes instead of inverting them</li>
          <li>A needle that is too narrow for the draw</li>
          <li>Drawing through a small-bore catheter</li>
          <li>Forcing blood from a syringe through a needle into a tube</li>
          <li>Puncturing before the alcohol has dried</li>
          <li>A prolonged tourniquet with vigorous fist pumping</li>
          <li>Underfilled tubes, leaving excess additive relative to blood</li>
        </ul>
      </StudySection>

      <StudySection id="failed" title="Failed draws">
        <p>
          A tube that starts filling and then stops usually means a failed
          vacuum, the vein wall against the bevel, or a valve. Work through the
          cheap hypotheses first.
        </p>
        <ol>
          <li>Try a fresh tube — vacuum failure is common and costs nothing to test.</li>
          <li>
            Make a slight, controlled adjustment to depth or angle. Slight
            means slight.
          </li>
          <li>
            If that does not work, stop. Two attempts is the customary limit
            before handing off to a colleague.
          </li>
        </ol>

        <CommonMistake title="Probing sideways to find the vein">
          Lateral probing is painful, causes hematomas, and is one of the main
          ways nerves get struck. If the needle is not in the vein, it comes
          out.
        </CommonMistake>
      </StudySection>

      <StudySection id="assessment" title="Findings that change your approach">
        <ul>
          <li>
            <strong>Petechiae</strong> — pinpoint red spots below the tourniquet.
            Not caused by you and not dangerous in themselves, but they suggest
            a platelet or capillary abnormality, so expect prolonged bleeding
            and hold pressure longer.
          </li>
          <li>
            <strong>Edema</strong> — tissue fluid contaminates and dilutes the
            specimen, and the tissue heals poorly. Use another limb.
          </li>
          <li>
            <strong>Existing hematoma</strong> — draw below it, or use the other
            arm. Drawing through one gives a contaminated specimen and makes the
            hematoma worse.
          </li>
          <li>
            <strong>Scarred or burned tissue</strong> — veins are difficult to
            palpate and often sclerosed, the tissue is fragile and more prone to
            infection, and altered sensation means the patient may not reliably
            report nerve pain.
          </li>
          <li>
            <strong>Same side as a mastectomy with lymph node dissection</strong>{" "}
            — generally avoided because impaired lymphatic drainage raises
            infection and lymphedema risk. When both arms are restricted,
            involve the nurse and follow facility policy rather than improvising.
          </li>
          <li>
            <strong>An IV above the intended site</strong> — never draw above a
            running infusion. Draw below it after the infusion has been stopped
            for the period your policy specifies, or use the other arm, and
            document the site.
          </li>
        </ul>
      </StudySection>

      <StudySection id="faq" title="Quick answers">
        <h3>What is the first thing to do if a patient faints?</h3>
        <p>
          Stop the draw and remove the needle and tourniquet, then protect the
          patient from falling. Stay with them and call for help without
          leaving.
        </p>

        <h3>How many attempts should one phlebotomist make?</h3>
        <p>
          Two, then hand off to a colleague. Facility policy is the authority
          and some are stricter.
        </p>

        <h3>What does shooting pain down the arm mean?</h3>
        <p>
          Possible nerve contact. Withdraw the needle immediately, do not
          re-attempt that site, and report it.
        </p>

        <h3>How do I tell an arterial puncture from a venous one?</h3>
        <p>
          Bright red blood that pulses and fills the tube rapidly. Hold firm
          pressure for at least five minutes and escalate.
        </p>
      </StudySection>
    </StudyArticle>
  );
}
