import type { OrderOfDrawSequence } from "@/types/content";
import {
  SRC_CLSI_GP41,
  SRC_MANUFACTURER_IFU,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

/**
 * The order of draw, as reviewed educational data.
 *
 * The drill, the study page, and the question explanations all read this one
 * object. No component hard-codes the sequence, so a correction here corrects
 * the whole product.
 */
export const CLSI_ORDER_OF_DRAW: OrderOfDrawSequence = {
  id: "clsi-gp41",
  name: "CLSI order of draw (venipuncture, evacuated tube system)",
  steps: [
    {
      position: 1,
      name: "Blood culture tube or bottle",
      tubeIds: ["blood-culture"],
      rationale:
        "Drawn first to protect sterility. Every later tube has been " +
        "touched by a non-sterile holder, and any contamination here " +
        "produces a false-positive culture that can lead to unnecessary " +
        "antibiotic treatment.",
    },
    {
      position: 2,
      name: "Coagulation tube (sodium citrate)",
      tubeIds: ["light-blue"],
      rationale:
        "Drawn early so no other additive can carry over into it. Even a " +
        "trace of heparin or EDTA distorts clotting times, and the tube's " +
        "9:1 blood-to-citrate ratio only holds when the tube is filled to " +
        "the line.",
    },
    {
      position: 3,
      name: "Serum tube — with or without clot activator, with or without gel",
      tubeIds: ["red-plain", "gold-sst"],
      rationale:
        "Placed after citrate because the clot activator these tubes carry " +
        "would shorten clotting times if it carried backwards into the " +
        "coagulation tube.",
    },
    {
      position: 4,
      name: "Heparin tube — with or without gel",
      tubeIds: ["green-heparin", "light-green-pst"],
      rationale:
        "Heparin comes before EDTA because EDTA carryover is the more " +
        "damaging of the two: it depresses calcium and elevates potassium " +
        "in the following tube.",
    },
    {
      position: 5,
      name: "EDTA tube — with or without gel separator",
      tubeIds: ["lavender-edta", "pink-edta", "pearl-white"],
      rationale:
        "Late in the sequence because EDTA binds calcium aggressively. " +
        "Carryover falsely lowers calcium, falsely raises potassium, and can " +
        "interfere with alkaline phosphatase and iron.",
    },
    {
      position: 6,
      name: "Glycolytic inhibitor tube (sodium fluoride / potassium oxalate)",
      tubeIds: ["gray-fluoride"],
      rationale:
        "Drawn last because fluoride and oxalate interfere with several " +
        "enzyme and electrolyte assays, and oxalate distorts cell " +
        "morphology on a smear.",
    },
  ],
  caveats: [
    "Tube closure color is a convention, not a rule. Additives and colors " +
      "vary by manufacturer, so read the label rather than trusting the cap.",
    "When a winged (butterfly) set is used and a coagulation tube is drawn " +
      "first, a discard tube may be needed to clear the air in the tubing so " +
      "the citrate tube fills to the line.",
    "Royal blue, tan, and ACD tubes do not sit at a single fixed position — " +
      "where they go depends on which additive they contain.",
    "Your facility's procedure manual is the authority. If it differs from " +
      "what you learned in class, follow the manual and ask why.",
  ],
  sources: [SRC_CLSI_GP41, SRC_MANUFACTURER_IFU, SRC_TEXTBOOK_CURRICULUM],
  reviewStatus: "needs-review",
  version: 1,
};

/**
 * A memory device for the sequence. Kept next to the data it describes so it
 * cannot drift out of sync with the steps above.
 */
export const ORDER_OF_DRAW_MNEMONIC = {
  phrase: "Culture, Light blue, Red, Green, Lavender, Grey",
  device: "Boys Love Ravishing Girls Like Gary",
  note:
    "Mnemonics are scaffolding. Once the sequence is automatic, work on the " +
    "reason behind it — exam questions are more often about carryover than " +
    "about reciting colors.",
};
