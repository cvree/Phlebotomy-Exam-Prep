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
        d: "To standardise labeling across facilities",
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
        "for blood bank work, where labeling requirements are stricter, but " +
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
    {
      id: "ood-012",
      subdomain: "Sequence",
      difficulty: 2,
      stem: "A phlebotomist has orders for six different tube types: blood culture, coagulation studies, a basic metabolic panel, a therapeutic drug level requiring heparin, a CBC, and a glucose level. In what order should the tubes be filled?",
      choices: {
        a: "Blood culture, coagulation (citrate), metabolic panel (serum), heparin, CBC (EDTA), glucose (fluoride)",
        b: "Coagulation (citrate), blood culture, metabolic panel (serum), CBC (EDTA), heparin, glucose (fluoride)",
        c: "Blood culture, metabolic panel (serum), coagulation (citrate), CBC (EDTA), heparin, glucose (fluoride)",
        d: "Blood culture, coagulation (citrate), CBC (EDTA), metabolic panel (serum), heparin, glucose (fluoride)",
      },
      correct: "a",
      explanation:
        "This lineup mirrors the six CLSI positions in order: sterile " +
        "culture first, citrate second so no additive reaches it, serum " +
        "third, heparin fourth, EDTA fifth, and fluoride/oxalate last. " +
        "Working from the test orders back to tube type, then placing each " +
        "type in its fixed slot, is a reliable way to sequence a real " +
        "requisition.",
      why: {
        b: "Citrate can never be drawn ahead of the sterile culture.",
        c: "Serum's clot activator must not be drawn before citrate, since carryover would shorten the coagulation result.",
        d: "EDTA belongs in position five, after serum and heparin, not immediately after citrate.",
      },
      tip: "Culture, Citrate, Serum, Heparin, EDTA, Fluoride — map each order to its tube, then sort.",
      tags: ["sequence", "full-sequence", "application"],
    },
    {
      id: "ood-013",
      subdomain: "Rationale",
      difficulty: 1,
      stem: "Why must blood culture bottles always be collected before any other tube, even a citrate tube that is otherwise drawn early in the sequence?",
      choices: {
        a: "Blood cultures require the largest blood volume, so they need a fresh needle",
        b: "Drawing any other tube first risks introducing contaminants or additive residue that could compromise the sterility of the culture",
        c: "Culture bottles must be warmed before use, which takes longer than filling additive tubes",
        d: "Culture bottles have no additive, so they can be drawn at any point without consequence",
      },
      correct: "b",
      explanation:
        "The whole point of the blood culture draw is a sterile sample. " +
        "Once the needle or holder has touched a non-sterile tube stopper, " +
        "any skin flora, environmental organism, or additive residue picked " +
        "up along the way can end up in the bottle, producing a " +
        "false-positive culture that leads to unnecessary antibiotics and a " +
        "repeat draw.",
      why: {
        a: "Volume does not determine order; sterility protection does.",
        c: "Culture bottles are used at room temperature, and warming is not a factor in sequencing.",
        d: "No additive does not mean no risk. Sterility, not additive carryover, is why cultures go first.",
      },
      tip: "Cultures go first to stay sterile, not because of volume or additive.",
      tags: ["blood-culture", "sterility", "rationale"],
    },
    {
      id: "ood-014",
      subdomain: "Evacuated tube system",
      difficulty: 3,
      stem: "Using a straight needle and evacuated tube holder, why is the sodium citrate (light blue) tube filled before serum and other additive tubes, given that no discard tube is needed in this scenario?",
      choices: {
        a: "Because citrate tubes must be filled while the vacuum is strongest, which only happens on the first draw",
        b: "Because coagulation testing is the least clinically important, so it can be finished quickly",
        c: "Because any clot activator or other additive residue transferred from an earlier tube would alter the citrate tube's clotting result, and a straight needle has no air-filled tubing to purge first",
        d: "Because citrate tubes are the smallest volume and should be filled first to save time",
      },
      correct: "c",
      explanation:
        "With a straight needle, the needle itself holds essentially no " +
        "air, so the first tube fills correctly without needing a discard. " +
        "The reason citrate still goes early is unrelated to air: it is " +
        "about protecting the coagulation result from any additive that a " +
        "prior tube might leave behind on the needle or in the holder.",
      why: {
        a: "Vacuum strength does not meaningfully differ between the first and later tubes in a normal draw.",
        b: "Coagulation results are highly clinically significant, particularly for patients on anticoagulants.",
        d: "Tube volume does not determine collection order.",
      },
      tip: "With a straight needle, skip the discard — but the additive-carryover reason for going early never goes away.",
      tags: ["citrate", "evacuated-tube-system", "carryover"],
    },
    {
      id: "ood-015",
      subdomain: "Winged blood collection set",
      difficulty: 2,
      stem: "A coagulation tube is the first specimen ordered and a winged (butterfly) collection set is used. Why is a discard tube collected before the citrate tube in this situation?",
      choices: {
        a: "To warm the tubing so the blood does not clot prematurely",
        b: "To remove the air trapped in the winged set's tubing so the citrate tube still fills to its correct additive-to-blood ratio",
        c: "To confirm that the needle has entered the vein before the real specimen is collected",
        d: "To rinse out any preservative used to sterilize the tubing before the draw",
      },
      correct: "b",
      explanation:
        "The tubing of a winged set holds a small amount of air instead of " +
        "blood. If the citrate tube were filled directly, that air would " +
        "take up part of the vacuum draw, and the tube would stop short of " +
        "its fill line — under-filling the 9:1 blood-to-citrate ratio the " +
        "assay depends on. A discard tube, which does not need to be full, " +
        "absorbs that air first so the citrate tube behind it draws to " +
        "volume.",
      why: {
        a: "Tubing temperature is not a concern in venipuncture.",
        c: "Vein entry is confirmed by flash in the tubing, not by a discard tube.",
        d: "Winged sets are sterile as packaged; no preservative rinse is needed.",
      },
      tip: "Butterfly tubing holds air, not blood. The discard tube soaks up that air so citrate still fills to the line.",
      tags: ["discard-tube", "winged-set", "citrate"],
    },
    {
      id: "ood-016",
      subdomain: "Specimen rejection",
      difficulty: 3,
      stem: "A citrate tube collected with a winged set, without a preceding discard tube, fills to only about 70% of its draw volume. What is the most likely consequence for the coagulation results?",
      choices: {
        a: "None, since citrate tubes can be filled to any volume without affecting the additive ratio",
        b: "The relative excess of citrate to plasma will prolong PT and PTT results, and the laboratory should reject the specimen rather than report a misleading value",
        c: "The result will be falsely shortened, since less blood means faster clotting once activator is added",
        d: "The tube should be diluted with saline in the laboratory to restore the correct ratio before testing",
      },
      correct: "b",
      explanation:
        "Citrate tubes are formulated for a 9:1 ratio of blood to " +
        "anticoagulant. When the tube is short-filled, that ratio shifts " +
        "toward relatively more citrate, which binds more of the calcium " +
        "needed for clotting and artificially prolongs PT and aPTT. Most " +
        "laboratories will not process visibly under-filled citrate tubes " +
        "for coagulation testing and will require a redraw instead.",
      why: {
        a: "Volume is exactly what the ratio depends on; under-filling breaks it.",
        c: "Excess citrate slows clotting once the assay adds calcium back; it does not speed it up.",
        d: "Diluting after the fact does not restore the manufacturer's fixed additive ratio and is not an accepted laboratory correction.",
      },
      tip: "Short-filled citrate tubes are rejected, not adjusted. The ratio has to be right at the draw, not fixed afterward.",
      tags: ["citrate", "specimen-rejection", "short-draw", "coagulation"],
    },
    {
      id: "ood-017",
      subdomain: "EDTA",
      difficulty: 2,
      stem: "Why does EDTA (lavender) come after the serum and heparin tubes in the order of draw, but still ahead of the gray fluoride tube?",
      choices: {
        a: "EDTA chelates calcium so aggressively that carryover into a later tube could falsely affect calcium-dependent chemistry results and coagulation studies, but it does not interfere with the glycolytic inhibitor in the gray tube the way it would with earlier tubes",
        b: "EDTA has no interaction with any other additive, so its position is arbitrary",
        c: "EDTA tubes take longer to process, so laboratory workflow, not chemistry, determines their placement",
        d: "EDTA must follow heparin because both are drawn using the same needle gauge",
      },
      correct: "a",
      explanation:
        "EDTA binds calcium so tightly that even a small carryover into a " +
        "subsequent tube can drop measured calcium and disrupt " +
        "calcium-dependent coagulation factors. Placing it after serum and " +
        "heparin protects those results, and placing it before the gray " +
        "tube reflects that fluoride/oxalate chemistry is not compromised " +
        "by trace EDTA the way calcium and coagulation testing would be.",
      why: {
        b: "EDTA carryover measurably affects calcium and potassium results in later tubes; its position is deliberate.",
        c: "Processing time in the laboratory does not determine collection order.",
        d: "Needle gauge is unrelated to additive sequencing.",
      },
      tip: "EDTA's calcium-chelating carryover is why it sits late — but not last.",
      tags: ["edta", "calcium", "sequence-rationale"],
    },
    {
      id: "ood-018",
      subdomain: "Carryover",
      difficulty: 2,
      stem: "What would most likely happen to a coagulation (light blue citrate) result if the serum separator tube were, incorrectly, drawn immediately before it?",
      choices: {
        a: "The PT and aPTT would be falsely shortened, because trace silica clot activator carried into the citrate tube would begin activating the clotting cascade prematurely",
        b: "The PT and aPTT would be unaffected, since both tubes are eventually centrifuged",
        c: "The glucose result from the citrate tube would be falsely elevated",
        d: "The citrate tube would fail to fill because the vacuum would already be exhausted",
      },
      correct: "a",
      explanation:
        "The clot activator in a serum tube, usually a silica-based " +
        "particulate, is designed to trigger clotting quickly. If even a " +
        "residue of it transfers into the citrate tube, it begins " +
        "activating factors before the assay does, which shortens the " +
        "measured PT and aPTT and can mask an actual coagulation " +
        "abnormality. This is the specific mechanism behind the general " +
        "rule that citrate is drawn before, never after, serum tubes.",
      why: {
        b: "Centrifugation does not undo chemical activation that has already begun in the tube.",
        c: "Glucose is not measured from a citrate tube and is unrelated to clot activator carryover.",
        d: "Vacuum draw is tube-specific; drawing a serum tube first does not exhaust a citrate tube's vacuum.",
      },
      tip: "Clot activator is designed to start clotting fast — the last thing a coagulation tube needs.",
      tags: ["carryover", "citrate", "clot-activator", "coagulation"],
    },
    {
      id: "ood-019",
      subdomain: "Carryover",
      difficulty: 3,
      stem: "During a multi-tube draw, a technician fills the green heparin tube first and the light blue citrate tube second. Which result is most likely to be compromised, and why?",
      choices: {
        a: "The coagulation result, because heparin carried into the citrate tube would inhibit thrombin generation and artificially prolong the PT and aPTT",
        b: "The CBC, because heparin distorts white blood cell morphology on a smear",
        c: "The basic metabolic panel, because heparin elevates sodium",
        d: "The glucose result, because heparin accelerates glycolysis in the tube",
      },
      correct: "a",
      explanation:
        "Heparin works by potentiating antithrombin, which shuts down the " +
        "clotting cascade. Even a small amount carried into a citrate tube " +
        "adds unintended anticoagulant activity on top of the citrate, " +
        "which prolongs PT and aPTT and can mimic a bleeding disorder that " +
        "is not actually present. This is exactly why heparin tubes are " +
        "sequenced after, never before, the coagulation tube.",
      why: {
        b: "CBCs are drawn in EDTA tubes; heparin carryover into an EDTA tube is a different scenario than the one described here.",
        c: "Heparin does not elevate sodium, and the metabolic panel tube was not the one drawn out of order.",
        d: "Heparin has no effect on glycolysis; that is the role of sodium fluoride.",
      },
      tip: "Anticoagulant carried into a coagulation tube always points toward a falsely prolonged clotting result.",
      tags: ["carryover", "heparin", "citrate", "coagulation"],
    },
    {
      id: "ood-020",
      subdomain: "Practical",
      difficulty: 2,
      stem: "A provider collects a coagulation tube and a serum tube using a syringe and transfers the blood into tubes afterward, rather than drawing directly with an evacuated tube holder. Does the order of draw still apply?",
      choices: {
        a: "Yes, the citrate tube should still be filled before the serum tube, because additive carryover between tubes does not depend on which device delivered the blood",
        b: "No, order of draw rules apply only to direct evacuated tube system draws",
        c: "No, because a syringe transfer mixes all the blood together before it reaches any tube",
        d: "Yes, but the sequence should be reversed for syringe draws to compensate for clotting that begins in the syringe",
      },
      correct: "a",
      explanation:
        "The order of draw exists to prevent one tube's additive from " +
        "contaminating the next tube and to protect sterile cultures — " +
        "concerns rooted in what touches a needle, transfer device, or tube " +
        "stopper, not in whether an evacuated tube holder or a syringe " +
        "delivered the blood. When transferring from a syringe, the same " +
        "sequence is followed, tube by tube, as blood is dispensed.",
      why: {
        b: "The underlying carryover mechanism is identical regardless of the collection device.",
        c: "Blood in a syringe is not pre-mixed with any tube's additive; the additive is only introduced once blood enters a specific tube.",
        d: "There is no reason to reverse the sequence, and doing so would reintroduce the very carryover problems the standard order prevents.",
      },
      tip: "The device changes, the physics of carryover does not. Same sequence either way.",
      tags: ["syringe", "evacuated-tube-system", "sequence"],
    },
    {
      id: "ood-021",
      subdomain: "Practical",
      difficulty: 3,
      stem: "A single lavender EDTA tube is ordered for a CBC. Under which circumstance is a discard tube appropriate before collecting it?",
      choices: {
        a: "When a winged (butterfly) collection set is used, some facilities discard a small amount first as a precaution to ensure an accurate fill; with a straight needle and only one non-coagulation tube ordered, no discard tube is generally needed",
        b: "A discard tube is always required before any lavender tube, regardless of the collection device",
        c: "A discard tube is never appropriate unless a coagulation tube is also being drawn",
        d: "A discard tube is required only when the patient has difficult veins",
      },
      correct: "a",
      explanation:
        "Discard tubes exist mainly to clear air from winged-set tubing " +
        "before a tube whose additive ratio is sensitive to under-filling " +
        "— most critically citrate. An EDTA CBC tolerates a partial " +
        "under-fill far better than a coagulation tube does, so with a " +
        "straight needle a discard is not routinely needed, though some " +
        "facilities still choose to discard a small amount when using a " +
        "butterfly set out of caution.",
      why: {
        b: "A blanket rule for every lavender tube ignores that a straight needle has no air-filled tubing to clear.",
        c: "Facilities may still choose a discard with winged sets even without a coagulation tube present, so 'never' is too absolute.",
        d: "Vein difficulty affects technique, not whether an air-filled winged set needs its line cleared.",
      },
      tip: "Discard tubes are about tubing air and ratio sensitivity, not about the tube color by itself.",
      tags: ["discard-tube", "edta", "winged-set", "practical"],
    },
    {
      id: "ood-022",
      subdomain: "Caveats",
      difficulty: 1,
      stem: "Some tube types, such as royal blue trace-element tubes, do not have one universally fixed position in the order of draw. What should a phlebotomy student do about this?",
      choices: {
        a: "Ignore the canonical CLSI sequence entirely, since facility variation makes it unreliable",
        b: "Learn the canonical CLSI sequence as the default, and follow the specific facility's procedure manual when it differs for a flexible-position tube",
        c: "Assume every facility uses an identical order and refuse to follow a differing procedure manual",
        d: "Draw flexible-position tubes first, before blood cultures, to avoid the issue altogether",
      },
      correct: "b",
      explanation:
        "The canonical CLSI sequence is the default students are tested on " +
        "and the baseline every facility starts from, even where local " +
        "procedure carves out an exception for a specific additive or " +
        "specialty tube. The professional approach is to know that " +
        "baseline cold, then defer to the written procedure manual at a " +
        "given site for the tubes it explicitly varies.",
      why: {
        a: "The canonical sequence remains the reliable default for the great majority of tubes and is exactly what certification exams test.",
        c: "A facility's procedure manual is the acknowledged local authority and should be followed, not refused.",
        d: "Nothing is ever drawn before blood cultures, regardless of how flexible its position is otherwise.",
      },
      tip: "Learn the default sequence cold, then let the local manual override it only where it says to.",
      tags: ["caveats", "facility-variation", "canonical-sequence"],
    },
    {
      id: "ood-023",
      subdomain: "Mixing",
      difficulty: 2,
      stem: "A batch of tubes sits unmixed for several minutes after collection before anyone inverts them. What is the most likely consequence, comparing an EDTA tube to a plain serum tube in the same batch?",
      choices: {
        a: "The EDTA tube risks microclot formation that can clog automated analyzers and skew cell counts, while the serum tube risks clotting unevenly or incompletely without the clot activator distributed through the sample",
        b: "Neither tube is affected, since additive tubes only need to be inverted immediately before testing, not after collection",
        c: "Only the serum tube is affected, since EDTA tubes never require mixing",
        d: "Only the EDTA tube is affected, since serum tubes have no additive that needs distribution",
      },
      correct: "a",
      explanation:
        "EDTA needs to contact the blood promptly to prevent platelet " +
        "clumping and small clot formation, which can obstruct hematology " +
        "analyzer probes and produce inaccurate counts. A serum tube's " +
        "clot activator likewise needs to be distributed through the " +
        "sample quickly and evenly so the whole specimen clots at a " +
        "similar rate, rather than clotting unevenly and trapping serum in " +
        "the process.",
      why: {
        b: "Mixing timing at collection matters; waiting until just before testing is too late to prevent problems that occur during transport and storage.",
        c: "EDTA tubes absolutely require prompt mixing to prevent microclots.",
        d: "Serum tubes with clot activator still need the activator distributed for even, complete clotting.",
      },
      tip: "Delay hurts both tube families, just in different ways: microclots in additive tubes, uneven clotting in serum tubes.",
      tags: ["mixing", "inversions", "microclots", "serum"],
    },
    {
      id: "ood-024",
      subdomain: "Rationale",
      difficulty: 2,
      stem: "Sodium fluoride tubes (gray) are drawn last among the routine tubes in the CLSI sequence. What is the primary reason for placing them at the very end rather than earlier?",
      choices: {
        a: "Sodium fluoride is both an anticoagulant and a glycolysis inhibitor, and it can interfere with the enzymes and reagents used in several other chemistry and hematology assays if it carries over into an earlier-drawn tube",
        b: "Sodium fluoride tubes must be centrifuged before any other tube, so drawing them last saves processing time",
        c: "Sodium fluoride tubes require the smallest blood volume of any tube type, so they are collected last to use up remaining vacuum",
        d: "Sodium fluoride has no additive properties that could affect other specimens, so its position is arbitrary",
      },
      correct: "a",
      explanation:
        "Fluoride's job is to stop glycolysis so glucose does not fall in " +
        "the tube before testing, and oxalate provides anticoagulation, " +
        "but both compounds are broadly disruptive to enzyme-based assays " +
        "used elsewhere in chemistry and to cell morphology in hematology. " +
        "Placing the tube last ensures that if any carryover occurs, it " +
        "only affects a tube drawn after it — and there is nothing left in " +
        "the routine sequence to contaminate.",
      why: {
        b: "Centrifugation order is a laboratory processing step, unrelated to collection sequence.",
        c: "Volume does not determine placement in the order of draw.",
        d: "Fluoride and oxalate both actively interfere with other chemistries, which is precisely why the tube is placed last.",
      },
      tip: "Gray goes last so there is nothing left downstream for its fluoride and oxalate to disrupt.",
      tags: ["gray-tube", "fluoride", "rationale", "carryover"],
    },
    {
      id: "ood-025",
      subdomain: "Tube identity",
      difficulty: 2,
      stem: "A tube contains an anticoagulant that binds calcium by chelation, preserves cell morphology well enough for a peripheral smear, and is typically capped in a shade between blue and violet. Where does this tube fall in the CLSI order of draw?",
      choices: {
        a: "First, immediately after any blood culture is collected",
        b: "Third, right after the serum tubes",
        c: "Fifth, after the serum and heparin tubes but before the fluoride/oxalate tube",
        d: "Last, after every other tube type",
      },
      correct: "c",
      explanation:
        "The description points to EDTA: a calcium-chelating anticoagulant " +
        "that preserves cell shape well enough for hematology work, " +
        "supplied in a lavender cap. EDTA occupies position five in the " +
        "sequence — after serum and heparin, whose additives it must not " +
        "disturb, but before the fluoride/oxalate tube.",
      why: {
        a: "Position one is reserved for the sterile blood culture, not for any additive tube.",
        b: "Position three belongs to the serum tubes themselves, which contain a clot activator rather than a calcium-chelating anticoagulant.",
        d: "The final position holds the fluoride/oxalate tube, whose additive combination is different from the one described.",
      },
      tip: "Calcium-chelating anticoagulant, good cell morphology, cap between blue and violet: that is EDTA, and EDTA sits at position five.",
      tags: ["edta", "tube-identity", "application"],
    },
    {
      id: "ood-026",
      subdomain: "Carryover",
      difficulty: 3,
      stem: "A lavender EDTA tube is drawn before a green heparin tube. Which result is most likely to be falsely affected?",
      choices: {
        a: "Sodium, falsely decreased",
        b: "Potassium, falsely increased, and calcium, falsely decreased",
        c: "Glucose, falsely increased",
        d: "Albumin, falsely increased",
      },
      correct: "b",
      explanation:
        "EDTA is usually supplied as a potassium salt that chelates calcium, so " +
        "carryover adds potassium to the next tube and strips calcium from it. " +
        "Both errors point the wrong way clinically — a falsely high potassium " +
        "can trigger an urgent workup on a patient whose potassium is normal.",
      why: {
        a: "EDTA carryover does not lower sodium; the classic pattern is high potassium with low calcium.",
        c: "Glucose is affected by delayed separation and by fluoride tubes, not by EDTA carryover.",
        d: "Albumin is not meaningfully affected by EDTA carryover.",
      },
      tip: "EDTA carryover = potassium up, calcium down. That pair is the signature of an out-of-order draw.",
      tags: ["carryover", "edta", "potassium"],
    },
    {
      id: "ood-027",
      subdomain: "Carryover",
      difficulty: 3,
      stem: "Why is the coagulation tube drawn before serum tubes containing a clot activator?",
      choices: {
        a: "Coagulation tests are usually ordered as urgent",
        b: "Clot activator carried into the citrate tube would accelerate clotting and distort coagulation results",
        c: "Serum tubes hold more volume and would empty the vein",
        d: "The citrate tube has a stronger vacuum",
      },
      correct: "b",
      explanation:
        "Serum tubes contain silica or another clot activator, and even a trace " +
        "carried into a citrate tube starts clotting the very specimen whose " +
        "clotting time is being measured. Drawing coagulation before any " +
        "activator-containing tube removes that possibility.",
      why: {
        a: "Clinical urgency does not set the sequence; additive interference does.",
        c: "The order is about additive contamination, not about how much blood a tube holds.",
        d: "Vacuum strength varies by fill volume and plays no part in the sequence.",
      },
      tip: "Anything that helps blood clot must never reach the tube that measures how long clotting takes.",
      tags: ["carryover", "clot-activator", "coagulation"],
    },
    {
      id: "ood-028",
      subdomain: "Tube identity",
      difficulty: 2,
      stem: "Which tube is used for a complete blood count (CBC)?",
      choices: {
        a: "Light blue sodium citrate",
        b: "Lavender EDTA",
        c: "Gray sodium fluoride/potassium oxalate",
        d: "Gold serum separator",
      },
      correct: "b",
      explanation:
        "EDTA preserves cell shape and size well enough for accurate counting " +
        "and for a readable blood film, which is why the lavender tube is the " +
        "hematology tube. A CBC, a differential, and a hemoglobin A1c all come " +
        "from it.",
      why: {
        a: "Light blue citrate is the coagulation tube — PT, INR, and aPTT.",
        c: "Gray tops preserve glucose; their additives are unsuitable for cell counts.",
        d: "A serum separator produces serum, which by definition has no cells left in it.",
      },
      tip: "Lavender = hematology. CBC, differential, A1c, sedimentation rate in some systems.",
      tags: ["edta", "cbc", "tube-identity"],
    },
    {
      id: "ood-029",
      subdomain: "Tube identity",
      difficulty: 2,
      stem: "Which tube is required for a PT/INR?",
      choices: {
        a: "Lavender EDTA",
        b: "Light blue sodium citrate, filled to the line",
        c: "Green heparin",
        d: "Red no-additive",
      },
      correct: "b",
      explanation:
        "Coagulation testing uses sodium citrate, whose calcium binding is " +
        "reversible — the laboratory adds calcium back to start the reaction it " +
        "times. That only works if the 9:1 blood-to-citrate ratio is correct, " +
        "which is why the tube must be filled to the line.",
      why: {
        a: "EDTA binds calcium irreversibly and cannot be used for clot-based assays.",
        c: "Heparin inhibits thrombin and would invalidate a clotting time.",
        d: "A tube with no anticoagulant produces a clotted specimen, not plasma for coagulation testing.",
      },
      tip: "Blue top, full to the line. Citrate's calcium binding is reversible — that's why coagulation uses it.",
      tags: ["sodium-citrate", "pt-inr", "tube-identity"],
    },
    {
      id: "ood-030",
      subdomain: "Tube identity",
      difficulty: 2,
      stem: "Which tube preserves glucose by inhibiting glycolysis?",
      choices: {
        a: "Gray sodium fluoride with potassium oxalate",
        b: "Lavender EDTA",
        c: "Gold serum separator",
        d: "Light blue sodium citrate",
      },
      correct: "a",
      explanation:
        "Sodium fluoride blocks the glycolytic pathway, so red cells stop " +
        "consuming glucose in the tube, and potassium oxalate anticoagulates. " +
        "That combination is why the gray top is used for glucose tolerance " +
        "testing and lactate, and why it sits last in the sequence.",
      why: {
        b: "EDTA prevents clotting but does not stop cells metabolizing glucose.",
        c: "Serum glucose falls if the specimen is not separated promptly, which is the problem a gray tube solves.",
        d: "Citrate is a coagulation anticoagulant with no antiglycolytic action.",
      },
      tip: "Gray = glucose guardian. Fluoride stops glycolysis; oxalate stops clotting.",
      tags: ["gray-tube", "glucose", "glycolysis"],
    },
    {
      id: "ood-031",
      subdomain: "Sequence",
      difficulty: 2,
      stem: "Which sequence correctly orders these four tubes?",
      choices: {
        a: "Lavender EDTA, light blue citrate, gold serum separator, green heparin",
        b: "Light blue citrate, gold serum separator, green heparin, lavender EDTA",
        c: "Gold serum separator, light blue citrate, lavender EDTA, green heparin",
        d: "Green heparin, lavender EDTA, light blue citrate, gold serum separator",
      },
      correct: "b",
      explanation:
        "After the sterile blood culture the sequence runs citrate, then serum " +
        "tubes, then heparin, then EDTA, then the glycolytic inhibitor tube. " +
        "Each additive is placed so that carryover into the tubes that follow " +
        "does the least harm.",
      why: {
        a: "EDTA is near the end of the sequence, not the beginning.",
        c: "Serum tubes follow the citrate tube, not the other way round.",
        d: "This reverses the sequence almost completely.",
      },
      tip: "Cultures, blue, red/gold, green, lavender, gray. Learn it as a list and the individual questions answer themselves.",
      tags: ["sequence", "order-of-draw", "clsi"],
    },
    {
      id: "ood-032",
      subdomain: "Blood cultures",
      difficulty: 2,
      stem: "Why do blood culture bottles come first in the order of draw?",
      choices: {
        a: "They require the largest volume of blood",
        b: "They must remain sterile, and drawing them first minimizes the chance of contamination",
        c: "Their additive would interfere with every subsequent tube",
        d: "They must be incubated within one minute of collection",
      },
      correct: "b",
      explanation:
        "A blood culture answers whether there are organisms in the patient's " +
        "bloodstream, so a contaminating skin organism can send a patient down " +
        "an unnecessary antibiotic course. Collecting first, straight after a " +
        "rigorous skin prep, keeps the specimen as clean as possible.",
      why: {
        a: "Volume matters for culture sensitivity but is not why they lead the sequence.",
        c: "SPS carryover is a consideration, but sterility is the reason cultures are first.",
        d: "Transport times are measured in hours, not a minute.",
      },
      tip: "Sterility first. A contaminated culture is worse than no culture — it triggers treatment the patient does not need.",
      tags: ["blood-cultures", "sterility", "sequence"],
    },
    {
      id: "ood-033",
      subdomain: "Capillary order",
      difficulty: 3,
      stem: "How does the order of collection for capillary (dermal) specimens differ from venipuncture?",
      choices: {
        a: "It is identical to the venipuncture order",
        b: "EDTA is collected first, then other additive tubes, then serum",
        c: "Serum is collected first, then EDTA",
        d: "There is no defined order for capillary collection",
      },
      correct: "b",
      explanation:
        "Capillary blood begins clotting at the puncture immediately, so the " +
        "EDTA specimen — the one most sensitive to clots and platelet clumping — " +
        "is filled first. Other additive containers follow, and serum " +
        "containers come last because a clotted specimen is what they need " +
        "anyway.",
      why: {
        a: "The two orders differ, and applying the venipuncture sequence to a heel stick produces clotted hematology specimens.",
        c: "Collecting serum first is the venipuncture logic applied where it does not fit.",
        d: "There is a defined capillary order, and it exists precisely because of rapid clotting at the site.",
      },
      tip: "Capillary flips it: EDTA first, serum last. Venipuncture is the opposite.",
      tags: ["capillary-collection", "microcollection", "order"],
    },
    {
      id: "ood-034",
      subdomain: "Tube identity",
      difficulty: 3,
      stem: "A pink-topped tube is most commonly used for which purpose?",
      choices: {
        a: "Trace element analysis",
        b: "Blood bank testing such as type and screen",
        c: "Coagulation studies",
        d: "Glucose tolerance testing",
      },
      correct: "b",
      explanation:
        "Pink tubes contain EDTA like lavender tubes but carry labeling designed " +
        "for transfusion service requirements, so they are commonly designated " +
        "for type and screen and crossmatch work. Because the additive is EDTA, " +
        "they occupy the same position in the sequence as the lavender tube.",
      why: {
        a: "Trace element work uses a royal blue tube manufactured to be free of contaminating metals.",
        c: "Coagulation studies require sodium citrate in a light blue tube.",
        d: "Glucose tolerance testing uses gray tubes with an antiglycolytic additive.",
      },
      tip: "Pink is EDTA wearing a blood bank label — same additive, same position in the order.",
      tags: ["pink-tube", "blood-bank", "edta"],
    },
    {
      id: "ood-035",
      subdomain: "Tube identity",
      difficulty: 3,
      stem: "Which tube is specified for trace element or heavy metal testing?",
      choices: {
        a: "Royal blue, manufactured to be free of contaminating trace metals",
        b: "Light blue sodium citrate",
        c: "Green sodium heparin",
        d: "Red no-additive glass",
      },
      correct: "a",
      explanation:
        "Royal blue tubes are made from materials certified low in trace metals, " +
        "because the quantities being measured are small enough that metal " +
        "leaching from an ordinary stopper or tube wall would swamp the result. " +
        "They come in several additive versions, so the required one is checked " +
        "against the test.",
      why: {
        b: "A light blue citrate tube is for coagulation and is not metal-free certified.",
        c: "An ordinary green tube offers no assurance about trace metal contamination.",
        d: "A standard red tube is not manufactured to trace-metal specifications.",
      },
      tip: "Royal blue for trace metals — the tube itself has to be clean, not just the specimen.",
      tags: ["royal-blue", "trace-elements", "tube-identity"],
    },
    {
      id: "ood-036",
      subdomain: "Discard tubes",
      difficulty: 3,
      stem: "In which situation is a discard tube required?",
      choices: {
        a: "Before every venipuncture, as a routine first step",
        b: "When a winged set is used and the first tube drawn is a coagulation tube",
        c: "Whenever more than three tubes are collected",
        d: "When a patient has fragile veins",
      },
      correct: "b",
      explanation:
        "The discard tube exists to fill the air-filled dead space in a winged " +
        "set's tubing. Without it, that air consumes part of the citrate tube's " +
        "measured vacuum and the tube ends up underfilled with the wrong " +
        "blood-to-additive ratio.",
      why: {
        a: "A discard tube is not part of every draw; it is used for a specific reason.",
        c: "Tube count has no bearing on whether a discard tube is needed.",
        d: "Vein fragility affects needle and technique choice, not the dead-space problem.",
      },
      tip: "Discard tube = filling the tubing's dead space, and only when a coagulation tube would otherwise be first.",
      tags: ["discard-tube", "winged-set", "dead-space"],
    },
    {
      id: "ood-037",
      subdomain: "Carryover",
      difficulty: 3,
      stem: "What is additive carryover?",
      choices: {
        a: "Additive left in the vein after the draw",
        b: "Transfer of additive from one tube into the next through the needle",
        c: "Additive that settles at the bottom of a tube",
        d: "Additive degrading over the tube's shelf life",
      },
      correct: "b",
      explanation:
        "Blood and additive can travel back along the needle when a tube is " +
        "removed and reach the next tube attached to it. Tiny quantities are " +
        "enough to alter a result, which is the entire reason the order of draw " +
        "exists.",
      why: {
        a: "Additive does not remain in the patient's vein; the transfer happens inside the collection device.",
        c: "Settling within a tube is addressed by mixing and is a different issue.",
        d: "Expiry affects additive performance but is not carryover.",
      },
      tip: "Carryover happens inside the needle, between tubes. Sequence is the only control for it.",
      tags: ["carryover", "contamination", "order-of-draw"],
    },
    {
      id: "ood-038",
      subdomain: "Tube identity",
      difficulty: 2,
      stem: "A green-topped tube contains which anticoagulant?",
      choices: {
        a: "Sodium citrate",
        b: "Heparin, as lithium, sodium, or ammonium salt",
        c: "EDTA",
        d: "Sodium fluoride",
      },
      correct: "b",
      explanation:
        "Green tubes contain heparin, which enhances antithrombin and so blocks " +
        "thrombin and factor Xa. Plasma is available quickly because no clotting " +
        "time is needed, which makes heparin tubes common for chemistry and " +
        "STAT electrolytes.",
      why: {
        a: "Sodium citrate is in the light blue coagulation tube.",
        c: "EDTA is in the lavender and pink tubes.",
        d: "Sodium fluoride is in the gray tube.",
      },
      tip: "Green = heparin = fast plasma chemistry. The salt matters: lithium heparin is not used for a lithium level.",
      tags: ["heparin", "green-tube", "tube-identity"],
    },
    {
      id: "ood-039",
      subdomain: "Sequence",
      difficulty: 3,
      stem: "A draw is ordered for a CBC, a PT/INR, and a basic metabolic panel on a serum separator. What is the correct fill order?",
      choices: {
        a: "CBC, PT/INR, metabolic panel",
        b: "PT/INR (light blue), metabolic panel (gold), CBC (lavender)",
        c: "Metabolic panel, CBC, PT/INR",
        d: "PT/INR, CBC, metabolic panel",
      },
      correct: "b",
      explanation:
        "Translate each test to its tube and apply the sequence: light blue " +
        "citrate for the PT/INR, then the gold serum separator for the metabolic " +
        "panel, then lavender EDTA for the CBC. Reversing the last two risks " +
        "EDTA carryover into the chemistry tube and a falsely raised potassium.",
      why: {
        a: "Starting with the EDTA tube puts the most damaging carryover at the front of the sequence.",
        c: "Serum tubes come after the coagulation tube, not before.",
        d: "The EDTA tube must follow the serum tube, not precede it.",
      },
      tip: "Convert tests to tube colors first, then order the colors. That two-step habit answers most of these.",
      tags: ["sequence", "application", "tube-selection"],
    },
    {
      id: "ood-040",
      subdomain: "Mixing",
      difficulty: 2,
      stem: "Approximately how many inversions do sodium citrate tubes typically require?",
      choices: {
        a: "None — citrate mixes on its own",
        b: "About 3 to 4 gentle inversions",
        c: "About 20 vigorous shakes",
        d: "Exactly 10 inversions, the same as every additive tube",
      },
      correct: "b",
      explanation:
        "Citrate tubes are usually inverted a small number of times — commonly " +
        "three or four — immediately after filling. Inversion counts vary by " +
        "tube type and manufacturer, so the instructions supplied with the tubes " +
        "in use are the authority.",
      why: {
        a: "An unmixed citrate tube can clot, which invalidates coagulation testing.",
        c: "Shaking hemolyzes the specimen and activates platelets.",
        d: "Counts differ by tube type; EDTA and heparin tubes generally need more inversions than citrate.",
      },
      tip: "Different tubes, different inversion counts. Check the manufacturer's instructions rather than guessing.",
      tags: ["mixing", "inversions", "sodium-citrate"],
      sources: [SRC_MANUFACTURER_IFU, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "ood-041",
      subdomain: "Tube identity",
      difficulty: 3,
      stem: "What does the gel in a serum separator tube do?",
      choices: {
        a: "It prevents the blood from clotting",
        b: "It forms a barrier between serum and cells during centrifugation",
        c: "It preserves glucose",
        d: "It sterilizes the specimen",
      },
      correct: "b",
      explanation:
        "The gel has a density between that of the cells and the serum, so " +
        "centrifugation drives it into the middle where it sets as a physical " +
        "barrier. That stops cellular constituents continuing to leak into the " +
        "serum during transport and storage.",
      why: {
        a: "Serum separator tubes contain a clot activator; they are designed for the blood to clot.",
        c: "Glucose preservation is the gray tube's job, using sodium fluoride.",
        d: "The gel has no antimicrobial function.",
      },
      tip: "Gel is a density barrier, not an additive. It separates after spinning, and never before.",
      tags: ["serum-separator", "gel", "centrifugation"],
    },
    {
      id: "ood-042",
      subdomain: "Sequence",
      difficulty: 3,
      stem: "A phlebotomist realizes mid-draw that they filled the lavender tube before the gold serum tube. What should they do?",
      choices: {
        a: "Continue and say nothing, since the blood is from the same patient",
        b: "Recollect the affected tube, and report the sequence error per facility policy",
        c: "Relabel the tubes to appear in the correct order",
        d: "Discard both tubes and cancel the tests",
      },
      correct: "b",
      explanation:
        "The specimen at risk is the one drawn after the EDTA tube, so it is " +
        "recollected in the correct sequence and the error is reported so the " +
        "laboratory can interpret anything already in progress. Sequence errors " +
        "are one of the more common preanalytical problems, and they are " +
        "correctable when they are declared.",
      why: {
        a: "Silence leaves a potentially contaminated specimen to be reported as valid.",
        c: "Relabeling to disguise the sequence is falsification and does nothing about the contamination.",
        d: "Discarding everything and cancelling is disproportionate — the affected tube is recollected.",
      },
      tip: "Own the sequence error and recollect the affected tube. It is far cheaper than a falsely high potassium.",
      tags: ["error-handling", "sequence", "recollection"],
    },
    {
      id: "ood-043",
      subdomain: "Tube identity",
      difficulty: 2,
      stem: "Which additive is in a light blue tube?",
      choices: {
        a: "3.2% sodium citrate",
        b: "Potassium EDTA",
        c: "Lithium heparin",
        d: "Silica clot activator",
      },
      correct: "a",
      explanation:
        "Light blue tubes contain buffered sodium citrate, most commonly at " +
        "3.2%, at a fixed ratio of nine parts blood to one part anticoagulant. " +
        "The concentration and the ratio are both part of what makes the " +
        "coagulation result interpretable.",
      why: {
        b: "Potassium EDTA is the lavender tube's additive.",
        c: "Lithium heparin belongs to the green tube.",
        d: "A silica clot activator is found in serum tubes, not in citrate tubes.",
      },
      tip: "Light blue = 3.2% sodium citrate at 9:1. The ratio is why the fill line is non-negotiable.",
      tags: ["sodium-citrate", "light-blue", "tube-identity"],
    },
    {
      id: "ood-044",
      subdomain: "Sequence",
      difficulty: 3,
      stem: "Why does the glycolytic inhibitor (gray) tube come last?",
      choices: {
        a: "Its additives would interfere with several tests if carried into earlier tubes",
        b: "It takes the longest to fill",
        c: "Glucose is the least urgent test",
        d: "It is the only tube that must be chilled",
      },
      correct: "a",
      explanation:
        "Sodium fluoride and potassium oxalate are potent interferents: " +
        "fluoride inhibits enzymes used in other assays and oxalate can distort " +
        "cell morphology and add potassium. Putting the tube last means nothing " +
        "follows it for the additive to contaminate.",
      why: {
        b: "Fill time has no bearing on sequence.",
        c: "Clinical urgency does not determine collection order.",
        d: "Some glucose and lactate specimens are chilled, but that is a handling requirement, not the reason for the position.",
      },
      tip: "The most damaging additives go last, where nothing follows them.",
      tags: ["gray-tube", "sequence", "carryover"],
    },
    {
      id: "ood-045",
      subdomain: "Tube identity",
      difficulty: 3,
      stem: "Which tube type contains sodium polyanethol sulfonate (SPS)?",
      choices: {
        a: "The gray glucose tube",
        b: "The blood culture bottle or yellow SPS tube",
        c: "The gold serum separator",
        d: "The lavender EDTA tube",
      },
      correct: "b",
      explanation:
        "SPS anticoagulates and, importantly for culture, reduces the activity " +
        "of complement, phagocytes, and some antibiotics so organisms can " +
        "survive to grow. That is why it is the additive in blood culture " +
        "collection, which comes first in the sequence.",
      why: {
        a: "Gray tubes contain sodium fluoride with an oxalate anticoagulant.",
        c: "Serum separators contain a clot activator and gel.",
        d: "Lavender tubes contain EDTA.",
      },
      tip: "SPS protects organisms so they can grow. That is a culture additive, and cultures go first.",
      tags: ["sps", "blood-cultures", "tube-identity"],
    },
    {
      id: "ood-046",
      subdomain: "Application",
      difficulty: 3,
      stem: "A phlebotomist has only one tube's worth of blood and orders for both a CBC and a potassium level. What is the correct action?",
      choices: {
        a: "Fill the lavender tube and let the laboratory run both from it",
        b: "Collect the correct tube for each test, recollecting if necessary, because EDTA invalidates a potassium result",
        c: "Fill a gold tube and run the CBC from the serum",
        d: "Split the specimen between two tubes after collection",
      },
      correct: "b",
      explanation:
        "Each test needs its own specimen type. EDTA is a potassium salt, so a " +
        "potassium measured from a lavender tube reads dramatically high, and a " +
        "CBC cannot be performed on serum because the cells are gone. There is " +
        "no way around collecting both tubes.",
      why: {
        a: "Potassium from an EDTA tube is uninterpretable, not merely approximate.",
        c: "Serum contains no cells to count, so a CBC is impossible from it.",
        d: "Pouring blood between tubes gives the wrong additive ratio and an unknown specimen history.",
      },
      tip: "Never run a potassium off an EDTA tube. The additive is a potassium salt.",
      tags: ["edta", "potassium", "tube-selection"],
    },
    {
      id: "ood-047",
      subdomain: "Sequence",
      difficulty: 2,
      stem: "Which tube immediately follows the serum tubes in the order of draw?",
      choices: {
        a: "Lavender EDTA",
        b: "Green heparin",
        c: "Gray sodium fluoride",
        d: "Light blue sodium citrate",
      },
      correct: "b",
      explanation:
        "Heparin tubes come fourth, after the serum tubes and before the EDTA " +
        "tube. The overall run is cultures, citrate, serum, heparin, EDTA, then " +
        "the glycolytic inhibitor tube.",
      why: {
        a: "EDTA comes after heparin, at position five.",
        c: "The gray tube is last.",
        d: "Citrate precedes the serum tubes rather than following them.",
      },
      tip: "Serum then heparin then EDTA. Heparin sits between the two, which is the step people skip.",
      tags: ["sequence", "heparin", "order-of-draw"],
    },
    {
      id: "ood-048",
      subdomain: "Tube identity",
      difficulty: 3,
      stem: "Why is a lithium heparin tube unsuitable for a lithium level?",
      choices: {
        a: "Heparin destroys lithium in the specimen",
        b: "The additive itself contains lithium, which falsely raises the result",
        c: "Lithium levels require serum, and heparin tubes cannot produce serum",
        d: "Lithium binds to the tube's gel barrier",
      },
      correct: "b",
      explanation:
        "The anticoagulant is a lithium salt, so measuring lithium from that " +
        "tube measures the additive as well as the patient. The same logic " +
        "applies to sodium heparin and sodium levels, and to potassium EDTA and " +
        "potassium levels.",
      why: {
        a: "The additive adds lithium rather than destroying it.",
        c: "The specimen type is not the primary objection; the additive's own lithium content is.",
        d: "Gel does not selectively bind lithium.",
      },
      tip: "Read the salt, not just the color. Lithium heparin, sodium heparin, and potassium EDTA each rule out their own analyte.",
      tags: ["lithium", "heparin", "additive-interference"],
    },
    {
      id: "ood-049",
      subdomain: "Sequence",
      difficulty: 3,
      stem: "A patient needs blood cultures from two sites plus a CBC and a chemistry panel. Which describes the correct approach?",
      choices: {
        a: "Draw the CBC first while the vein is fresh, then the cultures",
        b: "Draw the culture set from each prepared site first, then the remaining tubes in order of draw",
        c: "Draw all routine tubes first and the cultures last to save antiseptic",
        d: "Draw the chemistry panel between the two culture sets",
      },
      correct: "b",
      explanation:
        "Cultures lead at each site, immediately after that site's antiseptic " +
        "preparation, and the routine tubes follow in the normal sequence. " +
        "Interleaving routine tubes between culture collections adds " +
        "opportunities to contaminate a specimen whose whole value depends on " +
        "sterility.",
      why: {
        a: "Drawing routine tubes first defeats the sterile preparation performed for the culture.",
        c: "Antiseptic supplies are not a consideration that outweighs culture contamination.",
        d: "Breaking up the culture collection introduces contamination risk between sets.",
      },
      tip: "Cultures first at every site, then everything else in order. Never interleave.",
      tags: ["blood-cultures", "sequence", "application"],
    },
    {
      id: "ood-050",
      subdomain: "Tube identity",
      difficulty: 2,
      stem: "A red-topped tube with no additive produces which specimen type?",
      choices: {
        a: "Plasma",
        b: "Serum",
        c: "Whole blood",
        d: "Buffy coat",
      },
      correct: "b",
      explanation:
        "With no anticoagulant the specimen clots, and centrifugation leaves " +
        "serum above the clot. Serum lacks fibrinogen and the other factors " +
        "consumed in clotting, which is precisely why it suits many chemistry " +
        "and serology assays.",
      why: {
        a: "Plasma requires an anticoagulant to prevent clotting.",
        c: "Whole blood requires an anticoagulant to remain unclotted and mixed.",
        d: "The buffy coat is the white cell and platelet layer in a spun anticoagulated specimen.",
      },
      tip: "No additive → it clots → you get serum. Anticoagulant → no clot → you get plasma.",
      tags: ["red-tube", "serum", "tube-identity"],
    },
    {
      id: "ood-051",
      subdomain: "Application",
      difficulty: 3,
      stem: "Why must a serum tube be allowed to clot fully before centrifugation?",
      choices: {
        a: "Clotting improves the gel barrier's color",
        b: "Spinning an incompletely clotted specimen produces fibrin strands that interfere with testing and can clog analyzers",
        c: "Early centrifugation destroys the additive",
        d: "The clot must be weighed before separation",
      },
      correct: "b",
      explanation:
        "Serum tubes need a full clotting time — commonly around 30 minutes at " +
        "room temperature, longer for anticoagulated patients — before spinning. " +
        "Spinning early leaves fibrin forming in the separated serum, which " +
        "produces erroneous results and blocks instrument probes.",
      why: {
        a: "The gel's appearance is irrelevant to the requirement.",
        c: "Centrifugation does not destroy a clot activator.",
        d: "Nothing about the process involves weighing the clot.",
      },
      tip: "Let serum tubes clot fully before you spin. Latent fibrin is the price of rushing it.",
      tags: ["serum", "clotting-time", "centrifugation"],
    },
    {
      id: "ood-052",
      subdomain: "Sequence",
      difficulty: 2,
      stem: "Where does a sodium citrate tube used for an erythrocyte sedimentation rate sit in the order of draw?",
      choices: {
        a: "First, before blood cultures",
        b: "With the other citrate tubes, in the coagulation position",
        c: "Last, after the gray tube",
        d: "It has no position and may be drawn at any point",
      },
      correct: "b",
      explanation:
        "Position in the sequence follows the additive, not the test. A " +
        "sedimentation rate tube containing sodium citrate takes the citrate " +
        "position, just as a pink EDTA blood bank tube takes the EDTA position.",
      why: {
        a: "Nothing precedes the sterile blood culture collection.",
        c: "The last position belongs to the glycolytic inhibitor tube.",
        d: "Every additive tube has a position determined by what it contains.",
      },
      tip: "The additive sets the position, not the test name. Match the chemistry and the sequence follows.",
      tags: ["esr", "sodium-citrate", "sequence"],
    },
    {
      id: "ood-053",
      subdomain: "Carryover",
      difficulty: 3,
      stem: "Which pairing correctly identifies an additive and the analyte its carryover most distorts?",
      choices: {
        a: "Sodium fluoride carryover falsely raises calcium",
        b: "Potassium EDTA carryover falsely raises potassium",
        c: "Silica clot activator carryover falsely lowers glucose",
        d: "Sodium citrate carryover falsely raises hemoglobin",
      },
      correct: "b",
      explanation:
        "EDTA is supplied as a potassium salt, so any carried into the next tube " +
        "adds measurable potassium while chelating the calcium already there. " +
        "This is the single most cited consequence of a sequence error.",
      why: {
        a: "Fluoride carryover interferes with enzyme assays; it does not raise calcium.",
        c: "Clot activator carryover affects coagulation testing rather than glucose.",
        d: "Citrate carryover dilutes and interferes with coagulation results rather than raising hemoglobin.",
      },
      tip: "If you remember one carryover pairing, make it EDTA and potassium.",
      tags: ["carryover", "edta", "potassium"],
    },
    {
      id: "ood-054",
      subdomain: "Application",
      difficulty: 3,
      stem: "A requisition asks for a lactic acid level. Which tube and handling requirement usually applies?",
      choices: {
        a: "A lavender EDTA tube at room temperature",
        b: "A gray sodium fluoride tube, often with prompt transport and specific handling",
        c: "A gold serum separator held at room temperature for an hour",
        d: "A light blue citrate tube protected from light",
      },
      correct: "b",
      explanation:
        "Lactate rises in the tube as cells keep metabolizing, so a glycolytic " +
        "inhibitor is used and the specimen is moved promptly under the " +
        "handling the laboratory specifies. Tourniquet time and fist clenching " +
        "also raise lactate, so collection technique matters as much as the tube.",
      why: {
        a: "EDTA does not stop glycolysis, so lactate would continue to climb.",
        c: "Serum standing at room temperature is exactly the condition that falsifies a lactate.",
        d: "Light protection addresses bilirubin, not lactate.",
      },
      tip: "Lactate: gray tube, minimal tourniquet time, no fist pumping, move it fast.",
      tags: ["lactic-acid", "gray-tube", "handling"],
    },
    {
      id: "ood-055",
      subdomain: "Sequence",
      difficulty: 2,
      stem: "What is the underlying principle behind the entire order of draw?",
      choices: {
        a: "Filling the largest tubes while the vein flow is strongest",
        b: "Arranging tubes so that additive carried between them does the least damage to results",
        c: "Placing the most urgent tests first",
        d: "Grouping tubes by cap color for easier handling",
      },
      correct: "b",
      explanation:
        "Every position in the sequence is a decision about which contamination " +
        "matters most: sterile specimens first, then the tube whose test is most " +
        "sensitive to added clot activator, and the most interfering additives " +
        "at the end where nothing follows them.",
      why: {
        a: "Tube volume plays no part in the sequence.",
        c: "Urgency is handled by how the specimen is transported and prioritized, not by fill order.",
        d: "Color is a label for the additive; the additive is what actually drives the order.",
      },
      tip: "Ask \"what would this additive do to the next tube?\" and the whole sequence becomes derivable.",
      tags: ["order-of-draw", "principles", "carryover"],
    },
  ],
);
