import type { VocabTerm } from "@/types/vocab";
import { SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";

/**
 * Complications and adverse events.
 *
 * Each entry names the sign a student would actually notice first, because
 * recognizing the event is the tested skill. Responses are described in
 * general terms and always defer to facility protocol — this is study
 * material, not a standing order.
 */

const base = [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM];

export const COMPLICATION_TERMS: VocabTerm[] = [
  {
    id: "comp-hematoma",
    term: "Hematoma",
    pronunciation: "hee-muh-TOH-muh",
    category: "complications",
    definition:
      "A swelling of blood that has leaked out of the vessel into surrounding " +
      "tissue.",
    partOf: {
      label: "Local venipuncture complications",
      detail:
        "Caused by the needle going through the far wall, a partly-inserted " +
        "bevel, or too little pressure afterward.",
    },
    wordParts: [
      { part: "hemat-", meaning: "blood" },
      { part: "-oma", meaning: "mass / swelling" },
    ],
    clinicalRelevance:
      "If swelling appears during the draw, release the tourniquet, remove the " +
      "needle, and apply firm pressure. It is the most common complication you " +
      "will see.",
    confusableWithIds: ["comp-petechiae", "comp-edema"],
    relatedTermIds: ["proc-hemostasis", "wp-oma"],
    domain: "complications",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-syncope",
    term: "Syncope",
    aliases: ["fainting", "faint"],
    pronunciation: "SING-koh-pee",
    category: "complications",
    definition: "A temporary loss of consciousness from reduced blood flow to the brain.",
    partOf: {
      label: "Systemic venipuncture complications",
      detail:
        "Usually the end point of a vasovagal response; warning signs are " +
        "pallor, sweating, light-headedness, and nausea.",
    },
    clinicalRelevance:
      "Stop the draw, lower the patient's head, and stay with them. Never leave " +
      "a fainting patient alone, and never draw a standing patient.",
    mnemonic: "Say it 'SING-ko-pee', not 'sin-cope'. Examiners like this one.",
    confusableWithIds: ["comp-vasovagal", "comp-seizure"],
    relatedTermIds: ["comp-vasovagal", "proc-therapeutic-phlebotomy"],
    domain: "complications",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-vasovagal",
    term: "Vasovagal response",
    aliases: ["vasovagal reaction", "vasovagal syncope"],
    pronunciation: "vay-zoh-VAY-gul",
    category: "complications",
    definition:
      "A reflex slowing of the heart and widening of the vessels, triggered by " +
      "pain, fear, or the sight of blood, that drops blood pressure.",
    partOf: {
      label: "The mechanism behind most fainting during a draw",
      detail:
        "The response is the cause; syncope is the outcome if it goes far " +
        "enough.",
    },
    confusableWithIds: ["comp-syncope"],
    relatedTermIds: ["comp-syncope"],
    domain: "complications",
    difficulty: 2,
    tags: ["sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-petechiae",
    term: "Petechiae",
    pronunciation: "peh-TEE-kee-eye",
    category: "complications",
    definition:
      "Tiny flat red or purple spots caused by small amounts of blood leaking " +
      "from capillaries under the skin.",
    partOf: {
      label: "Signs seen after tourniquet application",
      detail:
        "Not a complication of your technique — a sign about the patient. They " +
        "suggest a platelet or capillary fragility problem.",
    },
    clinicalRelevance:
      "Petechiae appearing below the tourniquet warn that the site is likely to " +
      "bleed longer than usual. Plan to hold pressure and check twice.",
    confusableWithIds: ["comp-hematoma", "cond-thrombocytopenia"],
    relatedTermIds: ["cond-thrombocytopenia", "proc-tourniquet"],
    domain: "complications",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-nerve-injury",
    term: "Nerve injury",
    aliases: ["nerve damage"],
    category: "complications",
    definition:
      "Damage from a needle contacting a nerve, felt immediately as sharp, " +
      "shooting, burning, or electric pain, often with tingling.",
    partOf: {
      label: "Serious venipuncture complications",
      detail:
        "Most associated with the basilic vein, with deep probing, and with " +
        "excessive lateral needle redirection.",
    },
    clinicalRelevance:
      "Remove the needle immediately, do not try again on that arm, and report " +
      "it. Blind probing is what turns a miss into an injury.",
    confusableWithIds: ["comp-arterial-puncture"],
    relatedTermIds: ["anat-median-nerve", "anat-basilic-vein"],
    domain: "complications",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-arterial-puncture",
    term: "Arterial puncture (accidental)",
    category: "complications",
    definition:
      "Unintentionally entering an artery, recognized by bright red blood that " +
      "pulses or fills the tube unusually fast.",
    partOf: {
      label: "Serious venipuncture complications",
      detail:
        "Most likely when the basilic vein is used, because the brachial artery " +
        "runs beneath it.",
    },
    clinicalRelevance:
      "Withdraw the needle and hold firm pressure for at least five minutes, " +
      "then have the site checked. Note on the specimen that it is arterial — " +
      "some results differ.",
    confusableWithIds: ["comp-nerve-injury", "comp-hematoma"],
    relatedTermIds: ["anat-brachial-artery", "anat-basilic-vein", "anat-artery"],
    domain: "complications",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-hemoconcentration",
    term: "Hemoconcentration",
    category: "complications",
    definition:
      "A local increase in the proportion of cells and large molecules to plasma, " +
      "caused by fluid shifting out of the vein.",
    partOf: {
      label: "Pre-analytical errors of technique",
      detail:
        "Caused by a tourniquet left on too long, fist pumping, or a patient " +
        "with a long-standing tourniquet from a previous attempt.",
    },
    clinicalRelevance:
      "Falsely raises potassium, calcium, total protein, and cell counts. " +
      "Release the tourniquet within a minute.",
    mnemonic: "Squeeze too long and the results get concentrated.",
    confusableWithIds: ["hand-hemolysis", "cond-polycythemia-secondary"],
    relatedTermIds: ["proc-tourniquet", "blood-hematocrit"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield", "sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-edema",
    term: "Edema",
    aliases: ["oedema"],
    pronunciation: "eh-DEE-muh",
    category: "complications",
    definition:
      "Swelling caused by fluid accumulating in the tissues.",
    partOf: {
      label: "Site selection contraindications",
      detail:
        "An edematous arm is avoided: the tissue fluid dilutes the specimen and " +
        "veins are hard to locate.",
    },
    confusableWithIds: ["comp-hematoma"],
    relatedTermIds: ["proc-mastectomy-precaution", "hand-specimen-rejection"],
    domain: "patient-preparation",
    difficulty: 1,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-phlebitis",
    term: "Phlebitis",
    pronunciation: "fleh-BY-tis",
    category: "complications",
    definition: "Inflammation of a vein.",
    partOf: {
      label: "Vein conditions that rule out a site",
      detail:
        "Thrombophlebitis is inflammation together with a clot in the same vein.",
    },
    wordParts: [
      { part: "phleb-", meaning: "vein" },
      { part: "-itis", meaning: "inflammation" },
    ],
    confusableWithIds: ["comp-thrombosis"],
    relatedTermIds: ["wp-itis", "comp-thrombosis"],
    domain: "complications",
    difficulty: 1,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-thrombosis",
    term: "Thrombosis",
    pronunciation: "throm-BOH-sis",
    category: "complications",
    definition:
      "The formation of a clot inside a blood vessel, obstructing flow.",
    partOf: {
      label: "Vascular complications",
      detail:
        "A thrombus stays where it formed; an embolus is one that has broken " +
        "loose and traveled.",
    },
    clinicalRelevance:
      "A vein with a previous thrombosis feels hard and cord-like and should " +
      "not be used.",
    confusableWithIds: ["comp-phlebitis", "cond-dic"],
    relatedTermIds: ["wp-thrombo", "cond-polycythemia-vera"],
    domain: "complications",
    difficulty: 2,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-iatrogenic-anemia",
    term: "Iatrogenic anemia",
    aliases: ["nosocomial anemia", "phlebotomy-induced anemia"],
    pronunciation: "eye-at-roh-JEN-ik",
    category: "complications",
    definition:
      "Anemia caused by the volume of blood removed for testing.",
    partOf: {
      label: "Complications of repeated collection",
      detail:
        "'Iatrogenic' means caused by medical treatment itself. The risk is " +
        "highest in neonates and long-stay inpatients.",
    },
    clinicalRelevance:
      "The reason microcollection volumes exist and why unnecessary redraws " +
      "matter more than they seem to.",
    confusableWithIds: ["cond-anemia"],
    relatedTermIds: ["cond-anemia", "proc-microcollection-container"],
    domain: "complications",
    difficulty: 3,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-reflux",
    term: "Reflux",
    category: "complications",
    definition:
      "Backflow of tube additive into the patient's vein when the tube's " +
      "contents touch the needle during collection.",
    partOf: {
      label: "Rare venipuncture complications",
      detail:
        "Prevented by keeping the arm angled downward so the tube fills from " +
        "the bottom up, and by keeping tubes below the puncture site.",
    },
    confusableWithIds: ["add-carryover"],
    relatedTermIds: ["add-carryover", "proc-evacuated-tube-system"],
    domain: "complications",
    difficulty: 3,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-hemostasis-failure",
    term: "Prolonged bleeding",
    aliases: ["failure of hemostasis"],
    category: "complications",
    definition:
      "Bleeding at the site that continues beyond the few minutes normal " +
      "hemostasis takes.",
    partOf: {
      label: "Post-procedure complications",
      detail:
        "Expected in patients on anticoagulant therapy, and in those with " +
        "thrombocytopenia or a factor deficiency.",
    },
    clinicalRelevance:
      "Keep applying direct pressure with the arm elevated and straight, and " +
      "notify a nurse if it does not stop. Do not send the patient away with a " +
      "bandage over a bleeding site.",
    confusableWithIds: ["comp-hematoma", "proc-hemostasis"],
    relatedTermIds: ["cond-hemophilia", "cond-thrombocytopenia", "proc-hemostasis"],
    domain: "complications",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-collapsed-vein",
    term: "Collapsed vein",
    category: "complications",
    definition:
      "A vein that flattens under the vacuum of the tube, stopping blood flow " +
      "mid-draw.",
    partOf: {
      label: "Flow problems during collection",
      detail:
        "Common in small or fragile veins pulled on by a large evacuated tube.",
    },
    clinicalRelevance:
      "A smaller tube or a winged set with a syringe reduces the vacuum applied " +
      "to a delicate vein.",
    confusableWithIds: ["anat-valve"],
    relatedTermIds: ["proc-winged-infusion-set", "anat-vein"],
    domain: "venipuncture-technique",
    difficulty: 2,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "comp-seizure",
    term: "Seizure",
    category: "complications",
    definition:
      "A sudden burst of abnormal electrical activity in the brain, producing " +
      "uncontrolled movement or altered awareness.",
    partOf: {
      label: "Systemic emergencies during a draw",
      detail: "Rare, but part of every phlebotomy emergency-response curriculum.",
    },
    clinicalRelevance:
      "Remove the needle and tourniquet, protect the patient from injury " +
      "without restraining them, and call for help. Never put anything in the " +
      "mouth.",
    confusableWithIds: ["comp-syncope"],
    relatedTermIds: ["comp-syncope"],
    domain: "complications",
    difficulty: 2,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
];
