import type { VocabTerm } from "@/types/vocab";
import {
  SRC_CLSI_GP41,
  SRC_CLSI_GP42,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

/**
 * The procedure, and the equipment it is performed with.
 *
 * Definitions describe what a thing *is*. Where a step has a rule attached
 * (tourniquet time, fasting duration), the rule is stated in
 * `clinicalRelevance` and always deferred to facility policy — this set
 * teaches the vocabulary, not a protocol to follow at the chairside.
 */

const base = [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM];

export const PROCEDURE_TERMS: VocabTerm[] = [
  {
    id: "proc-phlebotomy",
    term: "Phlebotomy",
    pronunciation: "fleh-BOT-uh-mee",
    category: "procedure-equipment",
    definition: "The practice of drawing blood from a vein for testing or treatment.",
    partOf: {
      label: "Clinical laboratory practice (the pre-analytical phase)",
      detail:
        "Everything before the specimen reaches the analyzer — collection, " +
        "labeling, handling, transport — is pre-analytical, and it is where " +
        "most laboratory errors originate.",
    },
    wordParts: [
      { part: "phleb(o)-", meaning: "vein" },
      { part: "-tomy", meaning: "to cut / incise" },
    ],
    relatedTermIds: ["proc-venipuncture", "proc-therapeutic-phlebotomy", "wp-phleb"],
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-venipuncture",
    term: "Venipuncture",
    aliases: ["venepuncture"],
    pronunciation: "VEN-ih-punk-cher",
    category: "procedure-equipment",
    definition:
      "Puncturing a vein with a needle to collect a blood specimen.",
    partOf: {
      label: "Methods of blood collection",
      detail:
        "The other routine method is capillary (dermal) puncture; arterial " +
        "puncture is a separate, restricted procedure.",
    },
    confusableWithIds: ["proc-capillary-puncture", "proc-therapeutic-phlebotomy"],
    relatedTermIds: ["proc-evacuated-tube-system", "anat-median-cubital-vein"],
    domain: "venipuncture-technique",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-capillary-puncture",
    term: "Capillary puncture",
    aliases: ["dermal puncture", "skin puncture", "fingerstick", "heelstick"],
    category: "procedure-equipment",
    definition:
      "Collecting blood by piercing the skin with a lancet, producing a mixture " +
      "of capillary, arterial, and venous blood plus tissue fluid.",
    partOf: {
      label: "Methods of blood collection",
      detail:
        "The method of choice for infants, and for point-of-care tests needing " +
        "only a few drops.",
    },
    clinicalRelevance:
      "Because the sample is mixed and tissue fluid contaminates it, the first " +
      "drop is wiped away and the specimen is labeled as capillary. Heel " +
      "punctures stay on the medial or lateral plantar surface to avoid the " +
      "calcaneus.",
    confusableWithIds: ["proc-venipuncture"],
    relatedTermIds: ["proc-lancet", "proc-microcollection-container", "anat-capillary"],
    domain: "special-collections",
    difficulty: 1,
    tags: ["high-yield"],
    sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-therapeutic-phlebotomy",
    term: "Therapeutic phlebotomy",
    category: "procedure-equipment",
    definition:
      "Removing a substantial volume of blood as a treatment rather than for " +
      "testing.",
    partOf: {
      label: "Treatment procedures performed by trained phlebotomy staff",
      detail:
        "Ordered for polycythemia vera and hereditary hemochromatosis, where " +
        "the goal is to reduce red cell mass or iron stores.",
    },
    clinicalRelevance:
      "Volumes approach those of a blood donation, so the patient is monitored " +
      "for syncope throughout and afterward.",
    confusableWithIds: ["proc-venipuncture"],
    relatedTermIds: [
      "cond-polycythemia-vera",
      "cond-hemochromatosis",
      "comp-syncope",
    ],
    domain: "special-collections",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-evacuated-tube-system",
    term: "Evacuated tube system (ETS)",
    aliases: ["ets", "vacutainer system", "closed system"],
    category: "procedure-equipment",
    definition:
      "A closed collection system of a needle, a holder, and pre-vacuumed tubes " +
      "that fill themselves.",
    partOf: {
      label: "Venipuncture equipment",
      detail:
        "Three parts: the multi-sample needle, the tube holder/adapter, and " +
        "the evacuated tube. Blood never contacts open air.",
    },
    clinicalRelevance:
      "The preferred method because it is closed: fewer exposures, fewer " +
      "transfers, and each tube's vacuum draws exactly its intended volume.",
    relatedTermIds: ["proc-winged-infusion-set", "proc-transfer-device"],
    domain: "venipuncture-technique",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-winged-infusion-set",
    term: "Winged infusion set",
    aliases: ["butterfly", "butterfly needle", "winged collection set"],
    category: "procedure-equipment",
    definition:
      "A short needle with plastic wings and flexible tubing, used for small or " +
      "fragile veins.",
    partOf: {
      label: "Venipuncture equipment",
      detail:
        "Connects to either an evacuated tube holder or a syringe; the wings " +
        "allow a much shallower angle of insertion.",
    },
    clinicalRelevance:
      "The tubing holds air. When a light blue coagulation tube is the first " +
      "tube, a discard tube may be needed first so the citrate tube still fills " +
      "to its line — follow your facility's policy.",
    relatedTermIds: ["add-sodium-citrate", "proc-evacuated-tube-system"],
    domain: "venipuncture-technique",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-transfer-device",
    term: "Blood transfer device",
    category: "procedure-equipment",
    definition:
      "A safety adapter that lets a filled syringe fill tubes without removing " +
      "the tube stopper or holding a needle.",
    partOf: {
      label: "Syringe collection equipment",
      detail:
        "Replaces the unsafe practice of pushing blood through a needle into a " +
        "stoppered tube.",
    },
    clinicalRelevance:
      "Never transfer blood by piercing a stopper with the syringe needle: it " +
      "is a needlestick risk and it hemolyzes the specimen.",
    relatedTermIds: ["safety-engineering-controls", "hand-hemolysis"],
    domain: "safety-infection-control",
    difficulty: 2,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-lancet",
    term: "Lancet",
    category: "procedure-equipment",
    definition:
      "A sterile, single-use device with a controlled puncture depth, used for " +
      "capillary collection.",
    partOf: {
      label: "Capillary puncture equipment",
      detail:
        "Depth is chosen for the site — heel lancets are depth-limited to avoid " +
        "reaching bone.",
    },
    relatedTermIds: ["proc-capillary-puncture", "safety-sharps-container"],
    domain: "special-collections",
    difficulty: 1,
    tags: [],
    sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-microcollection-container",
    term: "Microcollection container",
    aliases: ["microtainer", "micro tube"],
    category: "procedure-equipment",
    definition:
      "A small plastic tube with a scoop or capillary opening that collects the " +
      "few hundred microliters a skin puncture yields.",
    partOf: {
      label: "Capillary puncture equipment",
      detail:
        "Color-coded like evacuated tubes, but the capillary order of draw is " +
        "different — EDTA is collected first.",
    },
    clinicalRelevance:
      "In capillary collection the lavender EDTA container goes first, to get " +
      "the hematology specimen before platelets start clumping at the site.",
    confusableWithIds: ["proc-order-of-draw"],
    relatedTermIds: ["proc-capillary-puncture", "proc-order-of-draw"],
    domain: "order-of-draw",
    difficulty: 2,
    tags: ["high-yield"],
    sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-tourniquet",
    term: "Tourniquet",
    pronunciation: "TOOR-nih-ket",
    category: "procedure-equipment",
    definition:
      "A band applied above the site that restricts venous return so veins fill " +
      "and become easier to find.",
    partOf: {
      label: "Venipuncture equipment",
      detail:
        "Applied 3–4 inches above the intended site, over a sleeve or gauze if " +
        "the skin is fragile.",
    },
    clinicalRelevance:
      "Standard practice is to keep it on no longer than one minute. Beyond " +
      "that, hemoconcentration changes results — potassium, calcium, protein, " +
      "and cell counts all read falsely high.",
    mnemonic: "One minute. Release it before the blood starts to change.",
    relatedTermIds: ["comp-hemoconcentration", "proc-palpation"],
    domain: "venipuncture-technique",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-gauge",
    term: "Gauge",
    category: "procedure-equipment",
    definition:
      "The measure of a needle's bore — the higher the gauge number, the " +
      "narrower the needle.",
    partOf: {
      label: "Needle specifications",
      detail:
        "21G is the routine venipuncture standard; 23G is typical for a winged " +
        "set on a small vein.",
    },
    clinicalRelevance:
      "A needle too narrow for the draw forces cells through a tight lumen and " +
      "hemolyzes the specimen.",
    mnemonic: "Bigger number, smaller hole. It runs backwards.",
    confusableWithIds: ["proc-bevel"],
    relatedTermIds: ["anat-lumen", "hand-hemolysis"],
    domain: "venipuncture-technique",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-bevel",
    term: "Bevel",
    category: "procedure-equipment",
    definition:
      "The slanted, sharpened opening at the needle's tip.",
    partOf: {
      label: "The needle",
      detail:
        "Inserted bevel up, at roughly a 15–30° angle to the skin over the vein.",
    },
    confusableWithIds: ["proc-gauge"],
    relatedTermIds: ["proc-venipuncture"],
    domain: "venipuncture-technique",
    difficulty: 1,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-palpation",
    term: "Palpation",
    pronunciation: "pal-PAY-shun",
    category: "procedure-equipment",
    definition:
      "Examining a vein by feel, using the index finger, to judge its depth, " +
      "direction, and size.",
    partOf: {
      label: "Site selection",
      detail:
        "Done with the fingertip, never the thumb, because the thumb has a " +
        "pulse of its own that can be mistaken for the patient's.",
    },
    clinicalRelevance:
      "A vein bounces and rebounds. A tendon is hard and immobile; an artery " +
      "pulses. Palpation, not sight, is what finds the vein.",
    relatedTermIds: ["anat-vein", "anat-valve", "proc-tourniquet"],
    domain: "venipuncture-technique",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-anchoring",
    term: "Anchoring",
    category: "procedure-equipment",
    definition:
      "Holding the skin taut below the site with the thumb so the vein cannot " +
      "roll away from the needle.",
    partOf: {
      label: "Venipuncture technique",
      detail:
        "The thumb pulls downward 1–2 inches below the site; the hand never " +
        "goes above or behind the needle path.",
    },
    clinicalRelevance:
      "Never anchor with a finger behind or beside the needle — that is how " +
      "phlebotomists stick themselves.",
    relatedTermIds: ["proc-venipuncture", "safety-needlestick"],
    domain: "venipuncture-technique",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-hemostasis",
    term: "Hemostasis",
    pronunciation: "hee-moh-STAY-sis",
    category: "procedure-equipment",
    definition: "The body's process of stopping bleeding.",
    partOf: {
      label: "Physiology of the puncture site",
      detail:
        "Three phases: the vessel constricts, platelets form a plug, and the " +
        "coagulation cascade lays down fibrin to stabilize it.",
    },
    wordParts: [
      { part: "hemo-", meaning: "blood" },
      { part: "-stasis", meaning: "stopping" },
    ],
    clinicalRelevance:
      "Apply direct pressure with the arm straight until bleeding stops — do " +
      "not have the patient bend the elbow, which encourages a hematoma.",
    confusableWithIds: ["comp-hemostasis-failure", "comp-hemoconcentration"],
    relatedTermIds: ["blood-thrombocyte", "blood-coagulation-cascade", "wp-stasis"],
    domain: "complications",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-order-of-draw",
    term: "Order of draw",
    category: "procedure-equipment",
    definition:
      "The standardized sequence for filling tubes so that additive carryover " +
      "cannot alter the next test.",
    partOf: {
      label: "CLSI venous collection standard (GP41)",
      detail:
        "Blood cultures, then coagulation, then serum, then heparin, then EDTA, " +
        "then glycolytic inhibitor tubes.",
    },
    clinicalRelevance:
      "The whole sequence follows from one idea: put each additive where it can " +
      "do the least damage to what comes after it.",
    relatedTermIds: ["add-carryover", "proc-microcollection-container"],
    domain: "order-of-draw",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-basal-state",
    term: "Basal state",
    category: "procedure-equipment",
    definition:
      "The body's resting condition after roughly 12 hours of fasting and no " +
      "strenuous activity, usually early morning.",
    partOf: {
      label: "Patient preparation",
      detail:
        "The reference intervals printed on lab reports are derived from " +
        "patients in this state, which is why timing matters.",
    },
    confusableWithIds: ["proc-fasting"],
    relatedTermIds: ["proc-fasting", "lab-glucose"],
    domain: "patient-preparation",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-fasting",
    term: "Fasting",
    aliases: ["npo"],
    category: "procedure-equipment",
    definition:
      "Abstaining from food and drink other than water for a defined period " +
      "before collection.",
    partOf: {
      label: "Patient preparation",
      detail:
        "Water is generally allowed and encouraged; coffee, gum, and smoking " +
        "are not. NPO — nil per os — means nothing by mouth at all.",
    },
    clinicalRelevance:
      "Always ask whether the patient actually fasted, and note it if they did " +
      "not. A lipemic specimen from a recent meal can make results unusable.",
    confusableWithIds: ["proc-basal-state"],
    relatedTermIds: ["hand-lipemic", "lab-glucose", "cond-diabetes-mellitus"],
    domain: "patient-preparation",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-two-identifiers",
    term: "Two patient identifiers",
    aliases: ["two identifiers", "patient identification"],
    category: "procedure-equipment",
    definition:
      "Confirming identity with two pieces of information that are independent " +
      "of the patient's location, such as full name and date of birth.",
    partOf: {
      label: "Patient identification protocol",
      detail:
        "Active identification means the patient states them; you then match " +
        "both against the requisition and, for an inpatient, the armband.",
    },
    clinicalRelevance:
      "Misidentification is the most serious error in phlebotomy. A room number " +
      "is not an identifier.",
    relatedTermIds: ["proc-requisition", "safety-hipaa"],
    domain: "patient-identification",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-requisition",
    term: "Requisition",
    category: "procedure-equipment",
    definition:
      "The provider's order for testing, listing the patient, the tests, and any " +
      "special collection conditions.",
    partOf: {
      label: "The test order lifecycle",
      detail:
        "Everything downstream — tube selection, timing, labeling — is driven " +
        "by what it says.",
    },
    relatedTermIds: ["proc-two-identifiers", "hand-labeling"],
    domain: "patient-identification",
    difficulty: 1,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-informed-consent",
    term: "Informed consent",
    category: "procedure-equipment",
    definition:
      "The patient's agreement to a procedure after being told what it involves.",
    partOf: {
      label: "Patient rights",
      detail:
        "Implied consent is a patient rolling up a sleeve and offering an arm. " +
        "Refusal must be respected and reported, never overridden.",
    },
    clinicalRelevance:
      "Drawing from a patient who has refused can constitute battery. Document " +
      "and notify the nurse or provider instead.",
    confusableWithIds: ["safety-hipaa"],
    relatedTermIds: ["safety-hipaa", "safety-scope-of-practice"],
    domain: "patient-identification",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-iv-line-precaution",
    term: "IV line precaution",
    aliases: ["drawing above an iv", "iv precaution"],
    category: "procedure-equipment",
    definition:
      "The rule that blood is never collected above an active infusion, because " +
      "the IV fluid dilutes and contaminates the specimen.",
    partOf: {
      label: "Site selection rules",
      detail:
        "Use the opposite arm when possible. If the same arm is unavoidable, " +
        "draw distal to the site and only per your facility's protocol.",
    },
    clinicalRelevance:
      "A specimen contaminated with dextrose infusion can return a glucose " +
      "result in the hundreds and trigger real, wrong treatment.",
    relatedTermIds: ["anat-proximal", "hand-specimen-rejection"],
    domain: "patient-preparation",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "proc-mastectomy-precaution",
    term: "Mastectomy precaution",
    category: "procedure-equipment",
    definition:
      "Avoiding the arm on the side of a mastectomy because lymph node removal " +
      "impairs drainage and raises infection and lymphedema risk.",
    partOf: {
      label: "Site selection rules",
      detail:
        "Applies to the affected side; a bilateral mastectomy requires the " +
        "provider's direction before drawing at all.",
    },
    clinicalRelevance:
      "Ask the patient. Many will tell you which arm to avoid before you do.",
    relatedTermIds: ["comp-edema", "proc-iv-line-precaution"],
    domain: "patient-preparation",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
];
