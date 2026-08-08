import { buildQuestions } from "./authoring";
import {
  SRC_CLSI_GP41,
  SRC_MANUFACTURER_IFU,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

export const ORDER_OF_DRAW_QUESTIONS = buildQuestions(
  {
    domain: "order-of-draw",
    certifications: ["nha-cpt"],
    sources: [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "ood-001",
      subdomain: "Sequence",
      difficulty: 1,
      stem: "Which tube is collected first in the CLSI order of draw?",
      choices: {
        a: "Light blue sodium citrate tube",
        b: "Blood culture tube or bottle",
        c: "Gold serum separator tube",
        d: "Lavender EDTA tube",
      },
      correct: "b",
      explanation:
        "Blood cultures are drawn first to protect sterility. Everything " +
        "after them has passed through a non-sterile tube holder, and a " +
        "contaminated culture leads to unnecessary antibiotics, extra days " +
        "in hospital, and repeat collections.",
      why: {
        a: "Citrate is second, immediately after cultures.",
        c: "Serum tubes are third.",
        d: "EDTA is fifth, near the end.",
      },
      tip: "Sterility first, then additive carryover. Those two ideas generate the whole sequence.",
      tags: ["sequence", "blood-culture"],
    },
    {
      id: "ood-002",
      subdomain: "Sequence",
      difficulty: 2,
      stem: "Which of these represents the correct CLSI order of draw?",
      choices: {
        a: "Light blue, blood culture, gold, green, lavender, grey",
        b: "Blood culture, light blue, gold, green, lavender, grey",
        c: "Blood culture, gold, light blue, lavender, green, grey",
        d: "Blood culture, light blue, green, gold, grey, lavender",
      },
      correct: "b",
      explanation:
        "Blood culture, then coagulation (light blue), then serum (red or " +
        "gold), then heparin (green), then EDTA (lavender), then glycolytic " +
        "inhibitor (grey). Each step protects the tubes that come before it " +
        "from additive carryover.",
      why: {
        a: "Blood cultures always come first.",
        c: "Serum tubes must come after citrate, or the clot activator would shorten clotting times in the coagulation tube.",
        d: "EDTA precedes grey, and heparin follows serum rather than preceding it.",
      },
      tip: "Culture, Light blue, Red/gold, Green, Lavender, Grey — and know why each step is where it is.",
      tags: ["sequence", "mnemonic"],
    },
    {
      id: "ood-003",
      subdomain: "Carryover",
      difficulty: 3,
      stem: "An EDTA tube is drawn before a green heparin tube. Which result is most likely to be affected?",
      choices: {
        a: "Falsely elevated potassium and falsely decreased calcium",
        b: "Falsely decreased potassium and falsely elevated calcium",
        c: "Falsely elevated glucose",
        d: "No effect, since both tubes are anticoagulated",
      },
      correct: "a",
      explanation:
        "EDTA is supplied as a potassium salt — K2 or K3 EDTA — so carryover " +
        "adds potassium directly to the next tube. It also chelates calcium " +
        "aggressively, so the calcium available for measurement drops. That " +
        "pairing, high potassium with low calcium, is the classic fingerprint " +
        "of EDTA contamination.",
      why: {
        b: "This reverses both effects.",
        c: "Glucose is affected by fluoride timing, not by EDTA carryover.",
        d: "The additives are chemically different and interfere with each other.",
      },
      tip: "EDTA carryover: potassium up, calcium down. If you see that pair, suspect the order of draw.",
      tags: ["carryover", "edta", "potassium"],
    },
    {
      id: "ood-004",
      subdomain: "Rationale",
      difficulty: 2,
      stem: "Why is the sodium citrate (light blue) tube drawn before the serum tubes?",
      choices: {
        a: "Citrate tubes fill more slowly than serum tubes",
        b: "Clot activator carried over from a serum tube would interfere with coagulation testing",
        c: "Serum tubes require a longer clotting time",
        d: "Citrate tubes must be centrifuged first",
      },
      correct: "b",
      explanation:
        "Serum tubes carry a silica clot activator whose whole job is to " +
        "start clotting. Even a trace of it in a coagulation tube shortens " +
        "the measured clotting time and produces a falsely reassuring PT or " +
        "aPTT — potentially on a patient whose anticoagulation is being " +
        "dosed from that number.",
      why: {
        a: "Fill rate has nothing to do with sequence.",
        c: "Clotting time is a processing consideration, not an ordering one.",
        d: "Centrifugation order is separate from collection order.",
      },
      tip: "Coagulation tubes are protected from everything. That is why they sit second, right behind cultures.",
      tags: ["citrate", "carryover", "coagulation"],
    },
    {
      id: "ood-005",
      subdomain: "Tube identity",
      difficulty: 2,
      stem: "A grey-topped tube is drawn at the end of the sequence. Which additive combination does it typically contain?",
      choices: {
        a: "Sodium heparin",
        b: "Sodium fluoride with potassium oxalate",
        c: "Sodium citrate",
        d: "Silica clot activator with gel",
      },
      correct: "b",
      explanation:
        "Sodium fluoride inhibits glycolysis, so glucose is not consumed by " +
        "cells sitting in the tube, and potassium oxalate provides the " +
        "anticoagulation. Fluoride and oxalate both interfere with enzyme " +
        "and electrolyte assays, which is why the tube is drawn last.",
      why: {
        a: "Heparin is the green tube.",
        c: "Citrate is the light blue tube.",
        d: "Clot activator with gel is the gold SST.",
      },
      tip: "Grey preserves glucose. Fluoride stops the cells from eating it.",
      tags: ["grey-tube", "fluoride", "glucose"],
      sources: [SRC_CLSI_GP41, SRC_MANUFACTURER_IFU, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "ood-006",
      subdomain: "Practical",
      difficulty: 3,
      stem: "Only a lavender EDTA tube and a gold SST are ordered. In what order are they drawn?",
      choices: {
        a: "Lavender first, then gold",
        b: "Gold first, then lavender",
        c: "Either order, since only two tubes are involved",
        d: "Gold first, with a discard tube between them",
      },
      correct: "b",
      explanation:
        "The sequence holds no matter how many tubes are ordered. The serum " +
        "tube occupies position three and EDTA position five, so gold is " +
        "drawn first. Skipping positions is fine; reordering the ones you " +
        "have is not.",
      why: {
        a: "This is the reverse of the sequence and risks EDTA carryover into the serum tube.",
        c: "Two tubes is precisely the situation where people improvise and get it wrong.",
        d: "A discard tube is not required between these two.",
      },
      tip: "You always skip positions. You never reorder them.",
      tags: ["sequence", "practical"],
    },
    {
      id: "ood-007",
      subdomain: "Tube identity",
      difficulty: 2,
      stem: "Which tube would be used for a complete blood count (CBC)?",
      choices: {
        a: "Light blue sodium citrate",
        b: "Lavender EDTA",
        c: "Gold serum separator",
        d: "Grey sodium fluoride",
      },
      correct: "b",
      explanation:
        "EDTA is the anticoagulant of choice for cell counting because it " +
        "preserves cell size and shape well enough for automated analysers " +
        "and for a peripheral smear. Serum tubes are useless here — the " +
        "cells are trapped in the clot.",
      why: {
        a: "Citrate dilutes the specimen by design and is reserved for coagulation studies.",
        c: "A serum tube has no cells left in the liquid portion.",
        d: "Oxalate distorts cell morphology.",
      },
      tip: "CBC needs whole blood with intact cells: lavender EDTA.",
      tags: ["cbc", "edta", "tube-selection"],
    },
    {
      id: "ood-008",
      subdomain: "Caveats",
      difficulty: 3,
      stem: "A phlebotomist notices that a royal blue tube is ordered. Where does it fall in the order of draw?",
      choices: {
        a: "Always first, before blood cultures",
        b: "Always last, after the grey tube",
        c: "Its position depends on which additive the tube contains",
        d: "It is drawn in a separate collection entirely",
      },
      correct: "c",
      explanation:
        "Royal blue tubes are manufactured to be low in trace metals, and " +
        "they come in several additive versions — no additive, EDTA, or " +
        "heparin. The additive determines the position, so you read the label " +
        "band rather than the cap. When in doubt, your facility's procedure " +
        "manual settles it.",
      why: {
        a: "Nothing precedes blood cultures.",
        b: "There is no fixed final position for this tube.",
        d: "It is collected in the same sequence, just at an additive-dependent position.",
      },
      tip: "Royal blue, tan, and ACD tubes have no single fixed slot. Read the additive, then place it.",
      tags: ["royal-blue", "trace-elements", "caveats"],
    },
    {
      id: "ood-009",
      subdomain: "Rationale",
      difficulty: 2,
      stem: "What is the underlying purpose of the order of draw?",
      choices: {
        a: "To reduce the total time the tourniquet is applied",
        b: "To prevent additive carryover between tubes and protect culture sterility",
        c: "To ensure tubes are centrifuged in the correct sequence",
        d: "To standardise labelling across facilities",
      },
      correct: "b",
      explanation:
        "Two purposes, in priority order: keep blood cultures sterile, and " +
        "stop each tube's additive from contaminating the tube drawn after " +
        "it. Once you hold those two ideas, the sequence is derivable rather " +
        "than memorised — which is why exam questions increasingly ask about " +
        "the reasoning instead of the list.",
      why: {
        a: "A worthwhile goal, but it is not what the sequence is designed for.",
        c: "Processing order is a separate concern.",
        d: "Labelling standards are unrelated.",
      },
      tip: "Sterility first, then carryover. Reason it out and you will not need the mnemonic.",
      tags: ["rationale", "carryover"],
    },
    {
      id: "ood-010",
      subdomain: "Tube identity",
      difficulty: 3,
      stem: "Which pair of tubes both contain EDTA?",
      choices: {
        a: "Light blue and grey",
        b: "Lavender and pink",
        c: "Green and light green",
        d: "Gold and red",
      },
      correct: "b",
      explanation:
        "Lavender and pink both contain EDTA. Pink is commonly designated " +
        "for blood bank work, where labelling requirements are stricter, but " +
        "the additive chemistry is the same. Pearl white is a third EDTA " +
        "tube, with gel added for molecular testing.",
      why: {
        a: "Light blue is citrate; grey is fluoride and oxalate.",
        c: "Both green tubes contain heparin, not EDTA.",
        d: "Both are serum tubes with clot activator.",
      },
      tip: "The EDTA family: lavender, pink, pearl white. Same additive, different jobs.",
      tags: ["edta", "tube-identity", "blood-bank"],
    },
    {
      id: "ood-011",
      subdomain: "Mixing",
      difficulty: 2,
      stem: "Immediately after an additive tube is filled and removed from the holder, what should be done?",
      choices: {
        a: "Set it upright in the rack until all tubes are collected",
        b: "Invert it gently the number of times specified by the manufacturer",
        c: "Shake it vigorously to distribute the additive",
        d: "Place it on ice",
      },
      correct: "b",
      explanation:
        "Additive tubes are inverted gently, straight away, the number of " +
        "times the manufacturer specifies — commonly 8 to 10 for EDTA and " +
        "heparin, 3 to 4 for citrate. Delay allows microclots to form, which " +
        "invalidate cell counts and coagulation results.",
      why: {
        a: "Waiting until the end of the draw is long enough for clotting to begin.",
        c: "Shaking hemolyses the specimen and can cause foaming.",
        d: "Only specific analytes require chilling, and it is not a mixing step.",
      },
      tip: "Invert as you go, gently, immediately. Shaking hemolyses; waiting clots.",
      tags: ["mixing", "inversions", "microclots"],
      sources: [SRC_CLSI_GP41, SRC_MANUFACTURER_IFU, SRC_TEXTBOOK_CURRICULUM],
    },
  ],
);
