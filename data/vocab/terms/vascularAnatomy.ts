import type { VocabTerm } from "@/types/vocab";
import { SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";

/**
 * Vessels, landmarks, and the structures near them.
 *
 * Vein selection is taught as an order of preference, and the reason for that
 * order is anatomical — what else is sitting next to the vein. Each vein entry
 * therefore names its neighbors, because that is the actual exam question.
 */

const base = [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM];

export const VASCULAR_ANATOMY_TERMS: VocabTerm[] = [
  {
    id: "anat-antecubital-fossa",
    term: "Antecubital fossa",
    aliases: ["ac", "antecubital area", "antecubital"],
    pronunciation: "an-tee-KYOO-bih-tul FOSS-uh",
    category: "vascular-anatomy",
    definition:
      "The shallow triangular depression on the anterior surface of the arm, " +
      "in front of the elbow.",
    partOf: {
      label: "The arm, anterior to the elbow joint",
      detail:
        "Holds the three veins used for routine venipuncture, and also the " +
        "brachial artery and median nerve.",
    },
    wordParts: [
      { part: "ante-", meaning: "before / in front of" },
      { part: "cubit-", meaning: "elbow" },
      { part: "fossa", meaning: "shallow depression" },
    ],
    clinicalRelevance: "The first place you look, on both arms, before anywhere else.",
    relatedTermIds: [
      "anat-median-cubital-vein",
      "anat-cephalic-vein",
      "anat-basilic-vein",
    ],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-median-cubital-vein",
    term: "Median cubital vein",
    aliases: ["median vein", "median cubital"],
    category: "vascular-anatomy",
    definition:
      "The vein of first choice for venipuncture — central in the antecubital " +
      "fossa, large, well anchored, and typically the least painful.",
    partOf: {
      label: "The antecubital veins",
      detail:
        "Sits between the cephalic vein laterally and the basilic vein " +
        "medially, often connecting the two.",
    },
    clinicalRelevance:
      "Preferred because it moves least under the needle and sits furthest " +
      "from the brachial artery and median nerve.",
    mnemonic: "Median = middle = first choice.",
    confusableWithIds: ["anat-cephalic-vein", "anat-basilic-vein"],
    relatedTermIds: ["anat-antecubital-fossa", "proc-venipuncture"],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-cephalic-vein",
    term: "Cephalic vein",
    pronunciation: "seh-FAL-ik",
    category: "vascular-anatomy",
    definition:
      "The vein on the lateral (thumb) side of the arm — the usual second " +
      "choice for venipuncture.",
    partOf: {
      label: "The antecubital veins",
      detail:
        "Runs up the outer edge of the arm. Often the only palpable vein in " +
        "an obese patient, though it tends to roll.",
    },
    mnemonic:
      "Cephalic is on the side you'd hold a Cell phone with — the thumb side.",
    confusableWithIds: ["anat-median-cubital-vein", "anat-basilic-vein"],
    relatedTermIds: ["anat-antecubital-fossa", "anat-medial"],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-basilic-vein",
    term: "Basilic vein",
    pronunciation: "buh-SIL-ik",
    category: "vascular-anatomy",
    definition:
      "The vein on the medial (little-finger) side of the antecubital fossa — " +
      "the last choice, because of what lies beneath it.",
    partOf: {
      label: "The antecubital veins",
      detail:
        "Runs close to the brachial artery and the median nerve, and is not " +
        "well anchored, so it rolls.",
    },
    clinicalRelevance:
      "Chosen only when the median cubital and cephalic veins are unavailable, " +
      "and then with extra care — this is where accidental arterial punctures " +
      "and nerve injuries happen.",
    mnemonic: "Basilic is Bad-last: nerve and artery are its neighbors.",
    confusableWithIds: ["anat-cephalic-vein", "anat-median-cubital-vein"],
    relatedTermIds: [
      "anat-median-nerve",
      "anat-brachial-artery",
      "comp-nerve-injury",
      "comp-arterial-puncture",
    ],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-median-nerve",
    term: "Median nerve",
    category: "vascular-anatomy",
    definition:
      "A major nerve of the arm that runs close to the basilic vein in the " +
      "antecubital fossa.",
    partOf: {
      label: "Structures deep to the antecubital veins",
      detail:
        "Its proximity is the main reason the basilic vein is the last choice.",
    },
    clinicalRelevance:
      "Shooting, electric, or radiating pain during a draw means stop and " +
      "remove the needle immediately — that is nerve contact, not a rough stick.",
    relatedTermIds: ["comp-nerve-injury", "anat-basilic-vein"],
    domain: "complications",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-brachial-artery",
    term: "Brachial artery",
    pronunciation: "BRAY-kee-ul",
    category: "vascular-anatomy",
    definition:
      "The main artery of the upper arm, running deep and medial in the " +
      "antecubital fossa.",
    partOf: {
      label: "Structures deep to the antecubital veins",
      detail:
        "Lies beneath and medial to the basilic vein, which is exactly why " +
        "that vein is approached last.",
    },
    clinicalRelevance:
      "Bright red blood that pulses into the tube or fills it unusually fast " +
      "signals an arterial puncture: withdraw and hold firm pressure for at " +
      "least five minutes.",
    confusableWithIds: ["anat-radial-artery"],
    relatedTermIds: ["comp-arterial-puncture", "anat-artery"],
    domain: "complications",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-radial-artery",
    term: "Radial artery",
    category: "vascular-anatomy",
    definition:
      "The artery at the thumb side of the wrist — the usual site for arterial " +
      "blood gas collection.",
    partOf: {
      label: "Arteries of the forearm",
      detail:
        "Chosen for ABGs because it is superficial and has collateral " +
        "circulation from the ulnar artery.",
    },
    clinicalRelevance:
      "Arterial punctures are performed only by staff trained and authorized " +
      "for them; a modified Allen test checks collateral flow beforehand.",
    confusableWithIds: ["anat-brachial-artery"],
    relatedTermIds: ["lab-abg", "anat-artery"],
    domain: "special-collections",
    difficulty: 3,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-vein",
    term: "Vein",
    category: "vascular-anatomy",
    definition:
      "A vessel that carries blood toward the heart, under low pressure, with " +
      "valves to stop backflow.",
    partOf: {
      label: "The circulatory system",
      detail:
        "Thinner-walled and less elastic than an artery, and it does not pulse.",
    },
    clinicalRelevance:
      "A vein feels soft, spongy, and bounces back when palpated. A tendon is " +
      "hard and does not give; an artery pulses.",
    confusableWithIds: ["anat-artery", "anat-capillary"],
    relatedTermIds: ["anat-valve", "proc-palpation"],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-artery",
    term: "Artery",
    category: "vascular-anatomy",
    definition:
      "A thick-walled, elastic vessel that carries blood away from the heart " +
      "under high pressure.",
    partOf: {
      label: "The circulatory system",
      detail:
        "Its thick tunica media is what makes it pulse and what makes it bleed " +
        "hard when punctured.",
    },
    confusableWithIds: ["anat-vein", "anat-capillary"],
    relatedTermIds: ["anat-tunica-media", "comp-arterial-puncture"],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-capillary",
    term: "Capillary",
    category: "vascular-anatomy",
    definition:
      "The smallest vessel, one cell thick, where exchange between blood and " +
      "tissue happens.",
    partOf: {
      label: "The circulatory system",
      detail:
        "Connects arterioles to venules. Capillary puncture collects a mixture " +
        "of arterial, venous, and capillary blood plus tissue fluid.",
    },
    clinicalRelevance:
      "Because capillary blood is a mixture, some results differ from venous " +
      "values and the specimen must be labeled as capillary.",
    confusableWithIds: ["anat-vein", "anat-artery"],
    relatedTermIds: ["proc-capillary-puncture", "proc-microcollection-container"],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-tunica-intima",
    term: "Tunica intima",
    pronunciation: "TOO-nih-kuh IN-tih-muh",
    category: "vascular-anatomy",
    definition:
      "The innermost layer of a blood vessel, a smooth endothelial lining in " +
      "direct contact with the blood.",
    partOf: {
      label: "The three-layered vessel wall",
      detail: "Intima (inner), media (middle), adventitia (outer).",
    },
    clinicalRelevance:
      "Damage to this smooth lining is what triggers platelet adhesion and " +
      "starts a clot.",
    confusableWithIds: ["anat-tunica-media", "anat-tunica-adventitia"],
    relatedTermIds: ["anat-lumen", "blood-thrombocyte"],
    domain: "anatomy-physiology",
    difficulty: 2,
    tags: ["sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-tunica-media",
    term: "Tunica media",
    category: "vascular-anatomy",
    definition:
      "The middle layer of a vessel wall, made of smooth muscle and elastic " +
      "tissue.",
    partOf: {
      label: "The three-layered vessel wall",
      detail:
        "Much thicker in arteries than in veins — the reason arteries pulse " +
        "and hold their shape.",
    },
    confusableWithIds: ["anat-tunica-intima", "anat-tunica-adventitia"],
    relatedTermIds: ["anat-artery"],
    domain: "anatomy-physiology",
    difficulty: 2,
    tags: ["sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-tunica-adventitia",
    term: "Tunica adventitia",
    aliases: ["tunica externa", "adventitia"],
    category: "vascular-anatomy",
    definition:
      "The outer connective tissue layer of a vessel wall that anchors it to " +
      "surrounding tissue.",
    partOf: {
      label: "The three-layered vessel wall",
      detail: "Also called the tunica externa.",
    },
    confusableWithIds: ["anat-tunica-intima", "anat-tunica-media"],
    difficulty: 2,
    tags: ["sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-lumen",
    term: "Lumen",
    pronunciation: "LOO-men",
    category: "vascular-anatomy",
    definition:
      "The hollow interior of a tube — a vessel, a needle, or a catheter.",
    partOf: {
      label: "Any hollow structure",
      detail:
        "A needle's gauge describes the width of its lumen: the higher the " +
        "gauge number, the narrower the lumen.",
    },
    clinicalRelevance:
      "A lumen too narrow for the draw shears red cells against the needle " +
      "wall and hemolyzes the specimen.",
    relatedTermIds: ["proc-gauge", "hand-hemolysis"],
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-valve",
    term: "Venous valve",
    category: "vascular-anatomy",
    definition:
      "A one-way flap inside a vein that keeps blood moving toward the heart.",
    partOf: {
      label: "The interior of a vein",
      detail:
        "Felt as a small firm bump during palpation; blood flow stops when a " +
        "needle tip rests against one.",
    },
    clinicalRelevance:
      "Puncturing into a valve is painful and gives a poor or stopped flow. " +
      "Palpate the vein's length and avoid the bumps.",
    relatedTermIds: ["anat-vein", "proc-palpation"],
    domain: "venipuncture-technique",
    difficulty: 2,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-medial",
    term: "Medial (versus lateral)",
    aliases: ["medial", "lateral"],
    category: "vascular-anatomy",
    definition:
      "Medial means toward the midline of the body; lateral means away from it.",
    partOf: {
      label: "Directional terms of anatomical position",
      detail:
        "With the arm supinated, the basilic vein is medial and the cephalic " +
        "vein is lateral.",
    },
    mnemonic: "Medial = middle. Both start with M.",
    confusableWithIds: ["anat-proximal"],
    relatedTermIds: ["anat-basilic-vein", "anat-cephalic-vein"],
    domain: "anatomy-physiology",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "anat-proximal",
    term: "Proximal (versus distal)",
    aliases: ["proximal", "distal"],
    category: "vascular-anatomy",
    definition:
      "Proximal means nearer to the point of attachment or trunk; distal means " +
      "further from it.",
    partOf: {
      label: "Directional terms of anatomical position",
      detail:
        "The antecubital fossa is proximal to the wrist; the fingers are " +
        "distal to the elbow.",
    },
    clinicalRelevance:
      "Applies to IV lines too: draw distal to an infusion site, never above it.",
    mnemonic: "Proximal = in proximity to the body's center.",
    confusableWithIds: ["anat-medial"],
    relatedTermIds: ["proc-iv-line-precaution"],
    domain: "anatomy-physiology",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
];
