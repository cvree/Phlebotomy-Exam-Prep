import type { Metadata } from "next";
import { TUBES } from "@/data/tubes/tubes";
import {
  SRC_CLSI_GP41,
  SRC_MANUFACTURER_IFU,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";
import { TubeGlyph } from "@/components/shared/TubeGlyph";
import { Card } from "@/components/shared/ui";
import {
  CommonMistake,
  KeyPoint,
  StudyArticle,
  StudySection,
} from "@/components/study/StudyArticle";

export const metadata: Metadata = {
  title: "Phlebotomy tube colors and additives — full reference",
  description:
    "Every common blood collection tube: closure color, additive, what the " +
    "additive does, the specimen it produces, common tests, inversions, and " +
    "the handling details that get specimens rejected.",
  alternates: { canonical: "/study/phlebotomy-tube-colors" },
  openGraph: {
    type: "article",
    url: "/study/phlebotomy-tube-colors",
    title: "Phlebotomy tube colors and additives",
    description:
      "Closure color, additive, mechanism, specimen type, and common tests for every routine tube.",
  },
};

const SECTIONS = [
  { id: "reference", title: "Tube reference" },
  { id: "mechanisms", title: "The four mechanisms" },
  { id: "specimen-types", title: "Serum, plasma, whole blood" },
  { id: "mixing", title: "Mixing and fill volume" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "faq", title: "Quick answers" },
];

export default function TubeColorsStudyPage() {
  return (
    <StudyArticle
      eyebrow="Study guide"
      title="Tube colors & additives"
      standfirst="Closure color is a shorthand, not a specification. What actually matters is the additive, what it does to the blood, and therefore which tests the tube can serve — which is also what the harder questions are about."
      updated="August 2026"
      sections={SECTIONS}
      practiceCta={{
        href: "/drills/tube-colors",
        label: "Start the Tube Mastery drill",
        blurb:
          "Eight rapid questions matching tubes to additives and back again, with the mechanism explained after every answer.",
      }}
      related={[
        {
          href: "/study/order-of-draw",
          label: "Order of draw",
          description:
            "Why the tubes are collected in the sequence they are.",
        },
        {
          href: "/drills/order-of-draw",
          label: "Order of Draw drill",
          description: "Arrange the six positions and check yourself.",
        },
        {
          href: "/study/specimen-handling",
          label: "Specimen handling",
          description:
            "Labelling, transport, temperature, and rejection criteria.",
        },
        {
          href: "/practice/session?mode=domain&domain=order-of-draw&count=10",
          label: "Practice questions",
          description: "Certification-style questions on tubes and sequence.",
        },
      ]}
      reviewStatus="needs-review"
      sources={[SRC_CLSI_GP41, SRC_MANUFACTURER_IFU, SRC_TEXTBOOK_CURRICULUM]}
    >
      <StudySection id="reference" title="Tube reference">
        <p>
          Every tube below lists the additive first, because that is what
          determines everything else. Colors listed are the common convention
          — your facility may stock something different.
        </p>

        <div className="my-6 space-y-3 not-prose">
          {TUBES.map((tube) => (
            <Card key={tube.id} className="p-4">
              <div className="flex items-start gap-4">
                <TubeGlyph tube={tube} size="lg" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans text-lg font-semibold text-ink">
                    {tube.displayName}
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-subtle">
                    Closure: {tube.colorNames.join(" · ")}
                  </p>

                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="font-semibold text-ink">Additive</dt>
                      <dd className="text-ink-muted">{tube.additive}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">What it does</dt>
                      <dd className="text-ink-muted">{tube.additiveAction}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">Specimen</dt>
                      <dd className="text-ink-muted">{tube.specimenType}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">Common uses</dt>
                      <dd className="text-ink-muted">
                        {tube.commonUses.join(" · ")}
                      </dd>
                    </div>
                    {tube.inversions ? (
                      <div>
                        <dt className="font-semibold text-ink">Mixing</dt>
                        <dd className="text-ink-muted">{tube.inversions}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="font-semibold text-ink">Order of draw</dt>
                      <dd className="text-ink-muted">
                        {tube.orderOfDrawPosition
                          ? `Position ${tube.orderOfDrawPosition}`
                          : "Depends on which additive version is stocked"}
                      </dd>
                    </div>
                  </dl>

                  {tube.specialHandling && tube.specialHandling.length > 0 ? (
                    <div className="mt-3 rounded-[var(--radius)] bg-surface-muted px-3 py-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-ink-subtle">
                        Handling
                      </p>
                      <ul className="mt-1 space-y-1 text-sm text-ink-muted">
                        {tube.specialHandling.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {tube.caveats && tube.caveats.length > 0 ? (
                    <div className="mt-2 rounded-[var(--radius)] border border-flag-border bg-flag-soft px-3 py-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-flag">
                        Watch out
                      </p>
                      <ul className="mt-1 space-y-1 text-sm text-ink">
                        {tube.caveats.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </StudySection>

      <StudySection id="mechanisms" title="The four mechanisms">
        <p>
          There are only four things an additive can be doing. Sorting tubes by
          mechanism is far more useful than sorting them by color, because the
          mechanism explains which tests the tube can and cannot serve.
        </p>

        <h3>1. Bind calcium reversibly — citrate</h3>
        <p>
          Sodium citrate binds calcium in a way that can be undone in the
          laboratory, which is why coagulation testing uses it: the clotting
          factors are preserved and the cascade can be restarted under
          controlled conditions. The trade-off is that the tube contains a fixed
          volume of liquid citrate, so the fill volume is part of the method.
        </p>

        <h3>2. Bind calcium irreversibly — EDTA</h3>
        <p>
          EDTA chelates calcium far more aggressively and does not let go. That
          makes it useless for coagulation studies but excellent for cell
          counting, because it preserves cell size and shape. It is supplied as
          a potassium salt, which is why its carryover raises potassium.
        </p>

        <h3>3. Inhibit thrombin — heparin</h3>
        <p>
          Heparin activates antithrombin, which shuts down thrombin and factor
          Xa. No calcium is removed, so heparin plasma is closer to circulating
          blood than citrate plasma — useful for chemistry, and the reason
          heparin tubes are the fast route to a plasma result.
        </p>

        <h3>4. Let it clot — clot activator, or nothing</h3>
        <p>
          Serum tubes take the opposite approach: allow clotting to complete,
          then separate off the liquid. Serum has no fibrinogen because it was
          consumed making the clot. This is the single most-tested distinction
          between serum and plasma.
        </p>

        <KeyPoint>
          Grey tubes are the odd one out: sodium fluoride is not an
          anticoagulant at all, it is a metabolic inhibitor that stops cells
          consuming glucose. The anticoagulation comes from the potassium
          oxalate or EDTA alongside it.
        </KeyPoint>
      </StudySection>

      <StudySection id="specimen-types" title="Serum, plasma, whole blood">
        <div className="my-5 scroll-x not-prose">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <caption className="sr-only">
              Comparison of serum, plasma, and whole blood specimens
            </caption>
            <thead>
              <tr className="border-b-2 border-line-strong text-left">
                <th scope="col" className="py-2.5 pr-4 font-semibold text-ink">
                  Specimen
                </th>
                <th scope="col" className="py-2.5 pr-4 font-semibold text-ink">
                  How it is produced
                </th>
                <th scope="col" className="py-2.5 font-semibold text-ink">
                  Contains fibrinogen?
                </th>
              </tr>
            </thead>
            <tbody className="text-ink-muted">
              <tr className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                  Serum
                </th>
                <td className="py-3 pr-4">
                  Blood clots fully, then is centrifuged. Red, gold.
                </td>
                <td className="py-3">No — consumed by clotting</td>
              </tr>
              <tr className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                  Plasma
                </th>
                <td className="py-3 pr-4">
                  Anticoagulated, then centrifuged. Light blue, green, grey.
                </td>
                <td className="py-3">Yes</td>
              </tr>
              <tr className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                  Whole blood
                </th>
                <td className="py-3 pr-4">
                  Anticoagulated, not separated. Lavender, pink.
                </td>
                <td className="py-3">Yes, plus all the cells</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The practical consequence: a fibrinogen assay cannot run on a serum
          tube, and a CBC cannot run on one either — the cells are locked in the
          clot.
        </p>
      </StudySection>

      <StudySection id="mixing" title="Mixing and fill volume">
        <p>
          Two mechanical details cause a large share of rejected specimens, and
          both are entirely within the collector&apos;s control.
        </p>

        <h3>Invert immediately, gently, the right number of times</h3>
        <p>
          Additive tubes are inverted as soon as they come out of the holder.
          Common guidance is 8 to 10 inversions for EDTA and heparin, 3 to 4 for
          citrate, and 5 for serum tubes with clot activator — but the number on
          the manufacturer&apos;s instructions is the one that counts. One
          inversion means a full 180-degree turn and back, not a shake. Shaking
          hemolyses; waiting lets microclots form.
        </p>

        <h3>Fill to the line, especially for citrate</h3>
        <p>
          Citrate tubes are the strictest: the 9:1 blood-to-anticoagulant ratio
          is part of the test method, so a short draw leaves excess citrate,
          which binds more calcium and falsely prolongs PT and aPTT. Since those
          numbers are used to dose anticoagulants, an underfilled tube is
          rejected rather than reported.
        </p>

        <KeyPoint>
          An underfilled EDTA tube has the same problem in miniature: excess
          EDTA relative to blood draws water out of red cells and shrinks them,
          which distorts the hematocrit and the cell indices.
        </KeyPoint>
      </StudySection>

      <StudySection id="mistakes" title="Common mistakes">
        <CommonMistake title="Assuming color equals additive">
          Royal blue tubes come with no additive, with EDTA, and with heparin.
          Yellow means SPS for cultures in one context and ACD for HLA typing
          in another. Read the label band.
        </CommonMistake>

        <CommonMistake title="Using a lithium heparin tube for a lithium level">
          Or a sodium heparin tube for a sodium level. The additive contains the
          analyte being measured. The same logic applies to potassium and EDTA.
        </CommonMistake>

        <CommonMistake title="Sending a gel tube for a drug level">
          Separator gel can absorb certain drugs, lowering the measured
          concentration. Some assays specifically require a gel-free tube —
          check the requirement rather than defaulting to the SST.
        </CommonMistake>

        <CommonMistake title="Re-spinning a gel tube to get more serum">
          Re-centrifuging can drive analytes across the barrier from the cells
          below it — potassium especially. If more serum is needed, recollect.
        </CommonMistake>
      </StudySection>

      <StudySection id="faq" title="Quick answers">
        <h3>Which tube is used for a CBC?</h3>
        <p>
          Lavender EDTA. The test needs whole blood with intact cells, and EDTA
          preserves cell morphology well enough for automated counting and for a
          smear.
        </p>

        <h3>Which tube is used for a PT/INR?</h3>
        <p>
          Light blue sodium citrate, filled to the indicated line. Nothing else
          will do — the anticoagulant and the fill ratio are both part of the
          method.
        </p>

        <h3>What is the difference between a red top and a gold top?</h3>
        <p>
          Both produce serum. The gold SST adds a separator gel that forms a
          physical barrier between serum and cells during centrifugation. Plain
          red tubes are used where the gel would interfere — some drug levels
          and certain immunoassays.
        </p>

        <h3>Why is the grey tube used for glucose?</h3>
        <p>
          Sodium fluoride inhibits glycolysis, so the cells in the tube stop
          consuming glucose. Without it, a glucose result falls measurably
          during transport. It slows the process rather than stopping it
          instantly, so timely processing still matters.
        </p>
      </StudySection>
    </StudyArticle>
  );
}
