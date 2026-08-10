import type { VocabSet, VocabTerm } from "@/types/vocab";
import { VOCAB_CATEGORIES } from "./categories";
import { VOCAB_TERMS, getTermsByCategory, getTermsByTag } from "./index";

/**
 * Studiable sets.
 *
 * Category sets are generated so a new term joins its set automatically.
 * Curated sets are declared by *tag*, for the same reason — the membership
 * rule lives on the term, not in a hand-maintained list that drifts.
 */

const CATEGORY_TAGLINES: Record<string, string> = {
  "word-parts": "Decode any term you have not met yet",
  "blood-composition": "Serum, plasma, and everything suspended in them",
  "tube-additives": "What is in the tube, and what it does",
  "hematology-conditions": "The conditions that change how you draw",
  "vascular-anatomy": "Where the veins are, and what is next to them",
  "procedure-equipment": "The tray, the technique, and the rules",
  complications: "Recognize it the moment it starts",
  "specimen-handling": "Everything that happens after the needle comes out",
  "lab-tests": "The abbreviations on every requisition",
  "safety-compliance": "OSHA, HIPAA, CLIA, and the standards behind them",
};

function categorySets(): VocabSet[] {
  return VOCAB_CATEGORIES.map((category) => ({
    id: category.id,
    name: category.name,
    tagline: CATEGORY_TAGLINES[category.id] ?? category.shortName,
    description: category.description,
    kind: "category" as const,
    termIds: getTermsByCategory(category.id).map((term) => term.id),
    categoryId: category.id,
    studyHref: category.studyHref,
  }));
}

/**
 * The starter deck, declared by hand.
 *
 * Unlike every other set, membership here is an editorial judgement about what
 * to learn *first*, so it cannot be derived from a tag. Ordered roughly the
 * way it should be taught: word parts, then substance, then the tube, then
 * what goes wrong. Unknown ids are dropped by `setTerms`, and the bank test
 * asserts that none of them are unknown.
 */
const ESSENTIAL_TERM_IDS = [
  // Decode anything.
  "wp-emia",
  "wp-penia",
  "wp-cytosis",
  "wp-hem",
  "wp-lysis",
  "wp-stasis",
  "wp-oma",
  "wp-hyper",
  "wp-hypo",
  // What is in the tube.
  "blood-whole-blood",
  "blood-plasma",
  "blood-serum",
  "blood-hemoglobin",
  "blood-hematocrit",
  "blood-thrombocyte",
  // What you add to it.
  "add-anticoagulant",
  "add-edta",
  "add-sodium-citrate",
  "add-heparin",
  "add-sodium-fluoride",
  "add-sps",
  "add-clot-activator",
  "add-thixotropic-gel",
  "add-carryover",
  // Who you are drawing from.
  "cond-polycythemia-vera",
  "cond-anemia",
  "cond-thrombocytopenia",
  "cond-hemochromatosis",
  // Where you put the needle.
  "anat-antecubital-fossa",
  "anat-median-cubital-vein",
  "anat-cephalic-vein",
  "anat-basilic-vein",
  "anat-median-nerve",
  // How you do it.
  "proc-venipuncture",
  "proc-tourniquet",
  "proc-order-of-draw",
  "proc-two-identifiers",
  "proc-therapeutic-phlebotomy",
  // What goes wrong.
  "comp-hematoma",
  "comp-syncope",
  "comp-hemoconcentration",
  // What happens next.
  "hand-hemolysis",
  "hand-icteric",
  "hand-lipemic",
  "hand-labeling",
  "lab-cbc",
  "lab-pt-inr",
  "lab-blood-culture",
  // What keeps everyone safe.
  "safety-standard-precautions",
  "safety-sharps-container",
  "safety-hipaa",
];

function curatedSets(): VocabSet[] {
  const soundAlike = getTermsByTag("sound-alike");

  return [
    {
      id: "essentials",
      name: "Start here: the essentials",
      tagline: "If you only study one set, study this one",
      description:
        `The ${ESSENTIAL_TERM_IDS.length} terms that unlock the rest. They run ` +
        "from the word parts that let you decode a term you have never seen, " +
        "through the additives and the veins, to the handling errors that get " +
        "a specimen rejected.",
      kind: "curated",
      termIds: ESSENTIAL_TERM_IDS,
    },
    {
      id: "sound-alikes",
      name: "Sound-alikes & easy mix-ups",
      tagline: "Serum or plasma. Icteric or lipemic. Hyper or hypo.",
      description:
        "Terms that are only ever missed because they resemble another term. " +
        "Studying them together is the fastest way to stop confusing them, " +
        "because the drill deliberately offers the twin as a wrong answer.",
      kind: "curated",
      termIds: soundAlike.map((term) => term.id),
    },
    {
      id: "everything",
      name: "The full glossary",
      tagline: `All ${VOCAB_TERMS.length} terms, in one deck`,
      description:
        "Every term in the bank. Best used through spaced review rather than " +
        "in one sitting — the scheduler will keep bringing back the ones you " +
        "keep missing.",
      kind: "curated",
      termIds: VOCAB_TERMS.map((term) => term.id),
    },
  ];
}

export const VOCAB_SETS: VocabSet[] = [...curatedSets(), ...categorySets()];

const SET_MAP = new Map(VOCAB_SETS.map((set) => [set.id, set]));

export function findVocabSet(id: string): VocabSet | undefined {
  return SET_MAP.get(id);
}

export function setTerms(set: VocabSet): VocabTerm[] {
  const byId = new Map(VOCAB_TERMS.map((term) => [term.id, term]));
  return set.termIds
    .map((id) => byId.get(id))
    .filter((term): term is VocabTerm => term !== undefined);
}

/** Sets a given term belongs to, for the "also in" links on a term page. */
export function setsContaining(termId: string): VocabSet[] {
  return VOCAB_SETS.filter(
    (set) => set.id !== "everything" && set.termIds.includes(termId),
  );
}
