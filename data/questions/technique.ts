import { buildQuestions } from "./authoring";
import {
  SRC_CLSI_GP41,
  SRC_CLSI_GP42,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

export const TECHNIQUE_QUESTIONS = buildQuestions(
  {
    domain: "venipuncture-technique",
    certifications: ["nha-cpt"],
    sources: [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "tec-001",
      subdomain: "Tourniquet",
      difficulty: 2,
      stem: "What is the maximum recommended time a tourniquet should remain applied before the draw?",
      choices: {
        a: "About 30 seconds",
        b: "About 1 minute",
        c: "About 3 minutes",
        d: "About 5 minutes",
      },
      correct: "b",
      explanation:
        "One minute is the usual limit. Beyond that, hemoconcentration " +
        "begins to distort protein-bound analytes, potassium, lactate, and " +
        "cell counts. If you need longer to find a vein, release the " +
        "tourniquet, let the arm recover for a couple of minutes, then " +
        "reapply.",
      why: {
        a: "Thirty seconds is often enough in practice, but it is not the stated limit.",
        c: "Three minutes produces measurable hemoconcentration.",
        d: "Five minutes is well past the point of clinically significant distortion.",
      },
      tip: "One minute. If the search takes longer, release and reapply — do not keep hunting under pressure.",
      tags: ["tourniquet", "hemoconcentration"],
    },
    {
      id: "tec-002",
      subdomain: "Needle insertion",
      difficulty: 2,
      stem: "At approximately what angle should the needle enter the skin for a routine antecubital venipuncture?",
      choices: {
        a: "5 degrees or less",
        b: "15 to 30 degrees",
        c: "45 degrees",
        d: "90 degrees",
      },
      correct: "b",
      explanation:
        "A shallow angle of roughly 15 to 30 degrees follows the path of a " +
        "superficial vein. Too steep and the needle passes straight through " +
        "the far wall into deeper tissue; too shallow and it slides along " +
        "under the skin without entering the lumen. The bevel faces up.",
      why: {
        a: "Under about 15 degrees the needle tends to track along the skin rather than into the vein.",
        c: "Forty-five degrees is steep enough to risk going through the vein.",
        d: "Ninety degrees is a dermal puncture angle, not a venipuncture angle.",
      },
      tip: "15–30 degrees, bevel up, in the direction the vein runs.",
      tags: ["needle-angle", "insertion"],
    },
    {
      id: "tec-003",
      subdomain: "Equipment",
      difficulty: 2,
      stem: "Which needle gauge is most commonly used for routine adult venipuncture with an evacuated tube system?",
      choices: {
        a: "16 gauge",
        b: "21 to 22 gauge",
        c: "25 gauge",
        d: "27 gauge",
      },
      correct: "b",
      explanation:
        "Routine adult draws typically use 21 or 22 gauge. Remember that " +
        "gauge runs backwards: a larger number means a narrower needle. Too " +
        "narrow and red cells are damaged as they squeeze through, producing " +
        "hemolysis; too wide and the puncture is unnecessarily traumatic.",
      why: {
        a: "Sixteen gauge is a large-bore needle used for donation and infusion, not routine draws.",
        c: "Twenty-five gauge is generally too narrow and increases hemolysis risk.",
        d: "Twenty-seven gauge is an injection needle, not a blood collection needle.",
      },
      tip: "Bigger number, smaller bore. Too small a bore shears red cells and hemolyses the specimen.",
      tags: ["needle-gauge", "equipment", "hemolysis"],
    },
    {
      id: "tec-004",
      subdomain: "Site preparation",
      difficulty: 2,
      stem: "After cleaning the site with 70% isopropyl alcohol, what should the phlebotomist do next?",
      choices: {
        a: "Wipe the site dry with sterile gauze to save time",
        b: "Allow the alcohol to air dry completely",
        c: "Fan the site with the hand to speed drying",
        d: "Insert the needle immediately while the site is still wet",
      },
      correct: "b",
      explanation:
        "Alcohol needs to air dry to do its job — the antiseptic action " +
        "happens during evaporation. Drying also prevents two practical " +
        "problems: a stinging sensation for the patient as alcohol is carried " +
        "into the puncture, and hemolysis of the specimen from alcohol " +
        "contamination.",
      why: {
        a: "Wiping recontaminates the site and cuts the contact time short.",
        c: "Fanning with the hand blows skin flora back onto the prepared site.",
        d: "Wet alcohol stings and can hemolyse the sample.",
      },
      tip: "Let it dry. Wiping, fanning, and blowing all defeat the antisepsis.",
      tags: ["antisepsis", "alcohol", "hemolysis"],
    },
    {
      id: "tec-005",
      subdomain: "Equipment",
      difficulty: 3,
      stem: "A winged infusion (butterfly) set is being used, and the first tube to be filled is a light blue sodium citrate tube. What should be done first?",
      choices: {
        a: "Draw the citrate tube first; the tubing volume is negligible",
        b: "Draw a discard tube first to fill the tubing's dead space",
        c: "Draw an EDTA tube first, then the citrate tube",
        d: "Fill the citrate tube only halfway and note it on the label",
      },
      correct: "b",
      explanation:
        "The tubing of a winged set holds air. If the citrate tube is drawn " +
        "first, that air consumes part of the tube's vacuum and the tube " +
        "under-fills, breaking the 9:1 blood-to-citrate ratio the coagulation " +
        "test depends on. A discard tube — non-additive, or another citrate " +
        "tube per policy — is drawn first purely to clear the dead space, and " +
        "it is discarded.",
      why: {
        a: "The dead space is small in absolute terms but significant relative to a citrate tube's fill.",
        c: "Drawing EDTA before citrate introduces exactly the carryover the order of draw exists to prevent.",
        d: "A short-filled citrate tube is a rejection criterion, not something to annotate.",
      },
      tip: "Butterfly plus citrate first means a discard tube. The discard is thrown away — it exists only to fill the tubing.",
      tags: ["butterfly", "discard-tube", "citrate"],
    },
    {
      id: "tec-006",
      subdomain: "Dermal puncture",
      difficulty: 3,
      stem: "During a dermal puncture, what should be done with the first drop of blood?",
      choices: {
        a: "Collect it, since it is the freshest sample",
        b: "Wipe it away with clean gauze",
        c: "Use it for the glucose test only",
        d: "Return it to the site by releasing pressure",
      },
      correct: "b",
      explanation:
        "The first drop is contaminated with tissue fluid from the puncture " +
        "and with any residual alcohol, both of which distort results. Wipe " +
        "it away and collect from the drops that follow, allowing them to " +
        "form freely rather than milking the site.",
      why: {
        a: "Freshness is not the issue; tissue fluid and alcohol contamination are.",
        c: "Glucose is among the analytes most affected by tissue fluid dilution.",
        d: "This is not a possible action.",
      },
      tip: "Wipe the first drop. Then let drops form on their own — squeezing adds tissue fluid and hemolyses the sample.",
      tags: ["dermal-puncture", "capillary"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "tec-007",
      subdomain: "Dermal puncture",
      difficulty: 2,
      stem: "Which site is appropriate for a heel stick on an infant under one year old?",
      choices: {
        a: "The centre of the heel",
        b: "The medial or lateral plantar surface of the heel",
        c: "The posterior curvature of the heel",
        d: "The great toe",
      },
      correct: "b",
      explanation:
        "The medial and lateral plantar surfaces are used because the " +
        "calcaneus — the heel bone — sits shallowly beneath the central and " +
        "posterior heel. Puncturing over the bone risks osteochondritis and " +
        "osteomyelitis. Puncture depth is also limited for the same reason.",
      why: {
        a: "The centre of the heel sits directly over the calcaneus.",
        c: "The posterior curvature carries the highest risk of striking bone.",
        d: "Toes are not used for routine infant collection.",
      },
      tip: "Stay to the sides of the heel. The bone is closer to the surface than it looks.",
      tags: ["heel-stick", "paediatric", "dermal-puncture"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "tec-008",
      subdomain: "Failed draw",
      difficulty: 2,
      stem: "The tube begins filling and then stops while the needle is still in the arm. What is the most appropriate first adjustment?",
      choices: {
        a: "Withdraw the needle and try the other arm immediately",
        b: "Probe laterally with the needle until flow resumes",
        c: "Try a fresh tube, then make a slight adjustment to needle depth or angle",
        d: "Ask the patient to pump their fist vigorously",
      },
      correct: "c",
      explanation:
        "A tube that stops mid-fill usually means a failed vacuum, a vein " +
        "wall against the bevel, or a valve. Changing the tube tests the " +
        "cheapest hypothesis first. If that does not work, a slight, " +
        "controlled change of depth or angle may reseat the bevel. Two " +
        "attempts is the customary limit before handing off.",
      why: {
        a: "A second stick is warranted eventually, but not before the simple corrections have been tried.",
        b: "Lateral probing is painful and is a recognised mechanism of nerve injury.",
        d: "Vigorous fist pumping raises potassium and is not recommended.",
      },
      tip: "New tube, then small adjustment. Never probe sideways — that is how nerves get hit.",
      tags: ["failed-draw", "troubleshooting"],
    },
    {
      id: "tec-009",
      subdomain: "Tourniquet",
      difficulty: 2,
      stem: "How far above the intended puncture site should the tourniquet be applied?",
      choices: {
        a: "1 to 2 inches",
        b: "3 to 4 inches",
        c: "6 to 8 inches",
        d: "Directly over the site",
      },
      correct: "b",
      explanation:
        "Three to four inches — roughly a hand's width — above the site. " +
        "Closer than that and the tourniquet interferes with the draw and " +
        "with anchoring the vein; much further and the venous distension at " +
        "the site is inadequate.",
      why: {
        a: "Too close: it gets in the way and distorts the site.",
        c: "Too far: distension at the puncture site suffers.",
        d: "Never over the site.",
      },
      tip: "About a hand's width above the site.",
      tags: ["tourniquet", "technique"],
    },
    {
      id: "tec-010",
      subdomain: "Post-draw",
      difficulty: 2,
      stem: "After the needle is withdrawn, what is the correct way to achieve hemostasis?",
      choices: {
        a: "Have the patient bend the elbow tightly and hold it for a minute",
        b: "Apply direct pressure with gauze, keeping the arm straight or slightly elevated",
        c: "Apply a bandage immediately without pressure",
        d: "Have the patient massage the site to disperse the blood",
      },
      correct: "b",
      explanation:
        "Direct pressure over the site with the arm straight or slightly " +
        "elevated is what stops the bleeding. Bending the elbow is a " +
        "widespread habit that actually increases hematoma formation, because " +
        "it does not apply pressure directly over the puncture in the vein " +
        "wall — which sits deeper and slightly proximal to the skin entry.",
      why: {
        a: "Elbow flexion is associated with more hematomas, not fewer.",
        c: "A bandage without pressure does not stop bleeding from the vein.",
        d: "Massage disrupts the forming clot and causes bruising.",
      },
      tip: "Pressure, straight arm. The skin hole and the vein hole are not in the same place — pressure has to cover both.",
      tags: ["hemostasis", "hematoma", "post-draw"],
    },
    {
      id: "tec-011",
      subdomain: "Equipment",
      difficulty: 3,
      stem: "A syringe draw is performed and blood must be transferred into evacuated tubes. What is the correct method?",
      choices: {
        a: "Remove the tube stoppers and pour the blood in",
        b: "Push the plunger to force blood through the needle into each tube",
        c: "Use a syringe transfer device, letting each tube's vacuum draw the blood in",
        d: "Attach a new needle and puncture each stopper, holding the tube in the hand",
      },
      correct: "c",
      explanation:
        "A syringe transfer device holds the tube safely and lets its own " +
        "vacuum pull the correct volume. Every alternative involves either " +
        "an exposed needle held near the hand or manual force on the plunger, " +
        "and both are recognised causes of needlestick injury and hemolysis. " +
        "Order of draw still applies during the transfer.",
      why: {
        a: "Uncapping tubes aerosolises blood and destroys the vacuum that measures the fill volume.",
        b: "Forcing blood through a needle shears red cells and hemolyses the specimen.",
        d: "Holding a tube while puncturing its stopper by hand is one of the highest-risk manoeuvres in the lab.",
      },
      tip: "Transfer device, never hand-held. Let the vacuum do the work — pushing the plunger hemolyses.",
      tags: ["syringe", "transfer-device", "sharps"],
    },
  ],
);
