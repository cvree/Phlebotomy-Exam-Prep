import type { Metadata } from "next";
import { CLSI_ORDER_OF_DRAW, ORDER_OF_DRAW_MNEMONIC } from "@/data/study/orderOfDraw";
import { getTube } from "@/data/tubes/tubes";
import { TubeGlyph } from "@/components/shared/TubeGlyph";
import { Card } from "@/components/shared/ui";
import {
  CommonMistake,
  KeyPoint,
  StudyArticle,
  StudySection,
} from "@/components/study/StudyArticle";

export const metadata: Metadata = {
  title: "Phlebotomy order of draw — the sequence and the reason behind it",
  description:
    "The CLSI order of draw explained: the six collection positions in " +
    "order, why each one sits where it does, what additive carryover " +
    "actually does to results, and the situations where the standard " +
    "sequence needs adjusting.",
  alternates: { canonical: "/study/order-of-draw" },
  openGraph: {
    type: "article",
    url: "/study/order-of-draw",
    title: "Phlebotomy order of draw — the sequence and the reason behind it",
    description:
      "The six collection positions, why each sits where it does, and what carryover does to results.",
  },
};

const SECTIONS = [
  { id: "sequence", title: "The order of draw, in order" },
  { id: "why", title: "Why the order exists" },
  { id: "carryover", title: "What carryover actually does" },
  { id: "mnemonic", title: "A memory device (and its limits)" },
  { id: "exceptions", title: "Where the standard sequence bends" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "faq", title: "Quick answers" },
];

export default function OrderOfDrawStudyPage() {
  return (
    <StudyArticle
      eyebrow="Study guide"
      title="Phlebotomy order of draw"
      standfirst="Six positions, one reason each. Learn why the sequence is what it is and you will not need to recite it — you will be able to derive it, which is what the harder exam questions actually test."
      updated="August 2026"
      sections={SECTIONS}
      practiceCta={{
        href: "/drills/order-of-draw",
        label: "Practice Order of Draw",
        blurb:
          "Arrange the six positions from memory and find out precisely which tube you put in the wrong place — and why it belongs somewhere else.",
      }}
      related={[
        {
          href: "/study/phlebotomy-tube-colors",
          label: "Tube colors & additives",
          description:
            "What is inside each tube, what the additive does, and which specimen it produces.",
        },
        {
          href: "/practice/session?mode=domain&domain=order-of-draw&count=10",
          label: "10 order of draw questions",
          description:
            "Certification-style questions with explanations, focused on this area.",
        },
        {
          href: "/study/specimen-handling",
          label: "Specimen handling",
          description:
            "What happens to the tube after it leaves the patient's arm.",
        },
        {
          href: "/drills/tube-colors",
          label: "Tube Mastery drill",
          description: "Rapid recall on additives and their mechanisms.",
        },
      ]}
      reviewStatus={CLSI_ORDER_OF_DRAW.reviewStatus}
      sources={CLSI_ORDER_OF_DRAW.sources}
    >
      <StudySection id="sequence" title="The order of draw, in order">
        <p>
          The order of draw is the sequence in which blood collection tubes are
          filled during a single venipuncture. It exists to stop two things:
          contamination of blood cultures, and the additive in one tube being
          carried into the next on the needle.
        </p>

        <div className="my-6 space-y-2.5 not-prose">
          {CLSI_ORDER_OF_DRAW.steps.map((step) => (
            <Card key={step.position} className="p-4">
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-base font-semibold text-primary-contrast">
                  {step.position}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans text-base font-semibold text-ink">
                    {step.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {step.tubeIds.map((tubeId) => {
                      const tube = getTube(tubeId);
                      return (
                        <span
                          key={tube.id}
                          className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-line bg-surface px-2 py-1"
                        >
                          <TubeGlyph tube={tube} size="sm" />
                          <span className="text-xs">
                            <span className="block font-semibold text-ink">
                              {tube.displayName}
                            </span>
                            <span className="block text-ink-muted">
                              {tube.additive}
                            </span>
                          </span>
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {step.rationale}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <KeyPoint>
          <strong>You always skip positions; you never reorder them.</strong> If
          only a gold SST and a lavender EDTA are ordered, you draw gold first
          — because serum sits at position 3 and EDTA at position 5. Having
          only two tubes does not make the order optional.
        </KeyPoint>
      </StudySection>

      <StudySection id="why" title="Why the order exists">
        <p>
          There are only two ideas behind the whole sequence, and everything
          else follows from them.
        </p>

        <h3>1. Sterility comes first</h3>
        <p>
          Blood cultures are drawn before anything else. The tube holder is not
          sterile, and once it has been used, organisms from the holder and
          from the skin can reach later tubes. A contaminated culture is not a
          harmless error: it leads to unnecessary antibiotics, extended stays,
          and repeat collections on a patient who did not need any of it.
        </p>

        <h3>2. Additives contaminate the next tube</h3>
        <p>
          A small amount of blood — and therefore additive — remains at the tip
          of the needle between tubes. The sequence orders tubes so that if
          carryover does occur, it does the least damage. Tubes whose additives
          cause the most interference are drawn last, and the tube most
          vulnerable to contamination — the citrate coagulation tube — is
          drawn as early as possible.
        </p>

        <KeyPoint>
          Sterility, then carryover. If you can reconstruct which additive would
          ruin which test, you can reconstruct the sequence without the
          mnemonic.
        </KeyPoint>
      </StudySection>

      <StudySection id="carryover" title="What carryover actually does">
        <p>
          Exam questions are increasingly about consequences rather than the
          list. These are the interferences worth knowing by heart.
        </p>

        <div className="my-5 scroll-x not-prose">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <caption className="sr-only">
              Additive carryover and its effect on results
            </caption>
            <thead>
              <tr className="border-b-2 border-line-strong text-left">
                <th scope="col" className="py-2.5 pr-4 font-semibold text-ink">
                  Additive
                </th>
                <th scope="col" className="py-2.5 pr-4 font-semibold text-ink">
                  If it carries over
                </th>
                <th scope="col" className="py-2.5 font-semibold text-ink">
                  Why it matters
                </th>
              </tr>
            </thead>
            <tbody className="text-ink-muted">
              <tr className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                  EDTA (lavender, pink, pearl)
                </th>
                <td className="py-3 pr-4">
                  Potassium falsely raised, calcium falsely lowered
                </td>
                <td className="py-3">
                  EDTA is supplied as a potassium salt and chelates calcium
                  aggressively. This pairing is the fingerprint of a
                  wrong-order draw.
                </td>
              </tr>
              <tr className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                  Heparin (green)
                </th>
                <td className="py-3 pr-4">Coagulation times distorted</td>
                <td className="py-3">
                  Heparin is an anticoagulant in its own right; traces of it
                  invalidate a PT or aPTT.
                </td>
              </tr>
              <tr className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                  Clot activator (red, gold)
                </th>
                <td className="py-3 pr-4">Coagulation times falsely shortened</td>
                <td className="py-3">
                  Its entire purpose is to start clotting. In a citrate tube
                  that produces a falsely reassuring result.
                </td>
              </tr>
              <tr className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                  Fluoride / oxalate (grey)
                </th>
                <td className="py-3 pr-4">
                  Enzyme and electrolyte assays affected; cell morphology
                  distorted
                </td>
                <td className="py-3">
                  This is why grey is last. Nothing after it needs protecting.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CommonMistake title="The classic exam scenario">
          A potassium comes back high and a calcium comes back low on the same
          patient, with no clinical explanation. Before anything else, ask
          whether an EDTA tube was drawn before the chemistry tube. Recollect
          in the correct order rather than reporting the result.
        </CommonMistake>
      </StudySection>

      <StudySection id="mnemonic" title="A memory device (and its limits)">
        <p>
          Mnemonics get you through the first week. The one most commonly
          taught for this sequence is:
        </p>
        <p className="not-prose my-4 rounded-[var(--radius)] border border-line bg-surface-muted px-4 py-3">
          <span className="block font-display text-xl text-ink">
            {ORDER_OF_DRAW_MNEMONIC.device}
          </span>
          <span className="mt-1 block text-sm text-ink-muted">
            {ORDER_OF_DRAW_MNEMONIC.phrase}
          </span>
        </p>
        <p>{ORDER_OF_DRAW_MNEMONIC.note}</p>
      </StudySection>

      <StudySection id="exceptions" title="Where the standard sequence bends">
        <h3>Winged (butterfly) sets and the discard tube</h3>
        <p>
          The tubing of a winged set holds air. If the first tube filled is a
          citrate tube, that air consumes part of the tube&apos;s vacuum and the
          tube under-fills — which breaks the 9:1 blood-to-citrate ratio the
          coagulation test depends on. A discard tube is drawn first purely to
          clear the dead space, and it is thrown away. Follow your
          facility&apos;s policy on which tube type to use as the discard.
        </p>

        <h3>Tubes with no fixed position</h3>
        <p>
          Royal blue, tan, and ACD tubes come in multiple additive versions, so
          they do not have one permanent slot in the sequence. Read the
          label band — not the cap color — to find out what is in the tube,
          then place it according to that additive.
        </p>

        <h3>Syringe transfers</h3>
        <p>
          When blood is collected into a syringe and transferred, the order of
          draw still applies to the transfer. Use a syringe transfer device and
          let each tube&apos;s vacuum pull the blood in — pushing the plunger
          shears red cells and hemolyses the specimen.
        </p>

        <ul>
          {CLSI_ORDER_OF_DRAW.caveats.map((caveat) => (
            <li key={caveat}>{caveat}</li>
          ))}
        </ul>
      </StudySection>

      <StudySection id="mistakes" title="Common mistakes">
        <CommonMistake title="Trusting the cap instead of the label">
          Closure colors are a manufacturer convention, not a standard. Two
          facilities can stock differently-colored tubes for the same test.
          Read the label.
        </CommonMistake>

        <CommonMistake title="Treating a two-tube draw as unordered">
          Most order-of-draw errors happen on short draws, where people stop
          thinking about sequence because there is barely a sequence to think
          about. Position numbers still apply.
        </CommonMistake>

        <CommonMistake title="Mixing at the end instead of as you go">
          Additive tubes are inverted gently and immediately, the number of
          times the manufacturer specifies. Waiting until every tube is drawn
          gives microclots time to form, which invalidates cell counts and
          coagulation results.
        </CommonMistake>

        <CommonMistake title="Forgetting the discard tube with a butterfly">
          A short-filled citrate tube is rejected. Recollecting means sticking
          the patient again for an entirely avoidable reason.
        </CommonMistake>
      </StudySection>

      <StudySection id="faq" title="Quick answers">
        <h3>Which tube is drawn first?</h3>
        <p>
          Blood culture tubes or bottles, to protect sterility. If no cultures
          are ordered, the light blue sodium citrate tube goes first.
        </p>

        <h3>Which tube is drawn last?</h3>
        <p>
          The grey glycolytic inhibitor tube — sodium fluoride with potassium
          oxalate — because its additives interfere with several assays and
          nothing after it needs protecting.
        </p>

        <h3>Does the order of draw apply to capillary collection?</h3>
        <p>
          Dermal puncture has its own sequence, and it is different: EDTA
          specimens are collected first there, because platelet clumping starts
          quickly at a capillary puncture site and would ruin a cell count. Do
          not carry the venipuncture order across to a heel stick or finger
          stick.
        </p>

        <h3>What happens if I draw them in the wrong order?</h3>
        <p>
          It depends what was contaminated. EDTA into a chemistry tube produces
          a high potassium and a low calcium. Clot activator into a citrate
          tube shortens coagulation times. Either way, the specimen is
          recollected — the result is not corrected or explained away.
        </p>
      </StudySection>
    </StudyArticle>
  );
}
