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
        d: "To standardize labeling across facilities",
      },
      correct: "b",
      explanation:
        "Two purposes, in priority order: keep blood cultures sterile, and " +
        "stop each tube's additive from contaminating the tube drawn after " +
        "it. Once you hold those two ideas, the sequence is derivable rather " +
        "than memorized — which is why exam questions increasingly ask about " +
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
  ],
);
