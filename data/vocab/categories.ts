import type { VocabCategory, VocabCategoryId } from "@/types/vocab";

/**
 * Vocabulary categories.
 *
 * Ordered the way we would teach them: word parts first, because they make
 * every later category cheaper to learn, then the substance, then what is
 * done to it, then what goes wrong.
 */
export const VOCAB_CATEGORIES: VocabCategory[] = [
  {
    id: "word-parts",
    name: "Word parts & roots",
    shortName: "Word parts",
    description:
      "Prefixes, roots, and suffixes. Learn these twenty and you can decode " +
      "terms you have never seen before.",
  },
  {
    id: "blood-composition",
    name: "Blood & its components",
    shortName: "Blood",
    description:
      "What blood is made of, and the difference between serum, plasma, and " +
      "whole blood.",
  },
  {
    id: "tube-additives",
    name: "Tubes, additives & anticoagulants",
    shortName: "Additives",
    description:
      "Every additive, what it does chemically, and which tube it belongs to.",
    studyHref: "/study/phlebotomy-tube-colors",
  },
  {
    id: "hematology-conditions",
    name: "Blood disorders & conditions",
    shortName: "Conditions",
    description:
      "Polycythemia vera, the anemias, the -penias, and the coagulation " +
      "disorders that change how you draw.",
  },
  {
    id: "vascular-anatomy",
    name: "Veins, arteries & anatomy",
    shortName: "Anatomy",
    description:
      "The antecubital veins, vessel wall layers, and the structures you are " +
      "trying not to hit.",
    studyHref: "/study/order-of-draw",
  },
  {
    id: "procedure-equipment",
    name: "Procedure & equipment",
    shortName: "Procedure",
    description:
      "The names of the things in your tray and the steps of the draw itself.",
  },
  {
    id: "complications",
    name: "Complications & adverse events",
    shortName: "Complications",
    description:
      "What can go wrong during and after a draw, and the word for each of it.",
    studyHref: "/study/venipuncture-complications",
  },
  {
    id: "specimen-handling",
    name: "Specimen handling & processing",
    shortName: "Handling",
    description:
      "Centrifugation, aliquoting, interferences, and the vocabulary of " +
      "specimen rejection.",
    studyHref: "/study/specimen-handling",
  },
  {
    id: "lab-tests",
    name: "Lab tests & departments",
    shortName: "Tests",
    description:
      "The abbreviations on requisitions — CBC, PT/INR, CMP — and which " +
      "department runs them.",
  },
  {
    id: "safety-compliance",
    name: "Safety, law & compliance",
    shortName: "Safety",
    description:
      "OSHA, HIPAA, CLIA, standard precautions, and the legal terms that " +
      "appear on every exam.",
  },
];

const BY_ID = new Map(VOCAB_CATEGORIES.map((category) => [category.id, category]));

export function findVocabCategory(id: VocabCategoryId): VocabCategory | undefined {
  return BY_ID.get(id);
}

export function vocabCategoryName(id: VocabCategoryId): string {
  return BY_ID.get(id)?.name ?? id;
}

export function vocabCategoryShortName(id: VocabCategoryId): string {
  return BY_ID.get(id)?.shortName ?? id;
}
