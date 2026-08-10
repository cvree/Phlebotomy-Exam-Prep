import type { VocabTerm } from "@/types/vocab";
import {
  SRC_CLSI_GP41,
  SRC_MANUFACTURER_IFU,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

/**
 * Specimen handling and processing.
 *
 * The three interference terms — hemolyzed, lipemic, icteric — are the ones
 * students reliably mix up, so each is defined by the color it produces and
 * the cause behind it, and all three are marked confusable with one another.
 */

const base = [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM];

export const SPECIMEN_HANDLING_TERMS: VocabTerm[] = [
  {
    id: "hand-hemolysis",
    term: "Hemolysis",
    aliases: ["hemolyzed", "haemolysis"],
    pronunciation: "hee-MOL-ih-sis",
    category: "specimen-handling",
    definition:
      "The rupture of red cells, releasing hemoglobin and turning the serum or " +
      "plasma pink to red.",
    partOf: {
      label: "Specimen interferences",
      detail:
        "The most common preventable reason a specimen is rejected, and almost " +
        "always caused by collection technique.",
    },
    wordParts: [
      { part: "hemo-", meaning: "blood" },
      { part: "-lysis", meaning: "breakdown" },
    ],
    clinicalRelevance:
      "Falsely raises potassium, LDH, AST, and magnesium — the analytes " +
      "concentrated inside red cells. Causes include a needle too narrow, " +
      "vigorous shaking, drawing through a small-bore catheter, and alcohol " +
      "not allowed to dry.",
    mnemonic: "Pink plasma means potassium you cannot trust.",
    confusableWithIds: ["hand-lipemic", "hand-icteric", "comp-hemoconcentration"],
    relatedTermIds: ["blood-hemoglobin", "proc-gauge", "hand-specimen-rejection"],
    domain: "specimen-handling",
    difficulty: 1,
    tags: ["high-yield", "sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-lipemic",
    term: "Lipemic",
    aliases: ["lipemia", "lipaemic"],
    pronunciation: "ly-PEE-mik",
    category: "specimen-handling",
    definition:
      "A specimen that is milky or turbid because of a high concentration of " +
      "fats in the plasma.",
    partOf: {
      label: "Specimen interferences",
      detail:
        "Usually the result of a recent meal rather than anything you did — " +
        "which is why fasting status is worth confirming and recording.",
    },
    wordParts: [
      { part: "lip-", meaning: "fat" },
      { part: "-emia", meaning: "blood condition" },
    ],
    mnemonic: "Lipemic = Like milk.",
    confusableWithIds: ["hand-hemolysis", "hand-icteric"],
    relatedTermIds: ["proc-fasting", "lab-lipid-panel"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield", "sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-icteric",
    term: "Icteric",
    aliases: ["icterus"],
    pronunciation: "ik-TER-ik",
    category: "specimen-handling",
    definition:
      "A specimen that is dark yellow to brown because of an elevated bilirubin " +
      "level.",
    partOf: {
      label: "Specimen interferences",
      detail:
        "The specimen-side counterpart of jaundice, which is the word for the " +
        "patient looking yellow.",
    },
    mnemonic: "Icteric = yellow specimen; jaundice = yellow patient.",
    confusableWithIds: ["hand-hemolysis", "hand-lipemic", "cond-jaundice"],
    relatedTermIds: ["cond-jaundice", "lab-bilirubin"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield", "sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-centrifugation",
    term: "Centrifugation",
    category: "specimen-handling",
    definition:
      "Spinning a specimen at high speed so its components separate by density.",
    partOf: {
      label: "Specimen processing",
      detail:
        "Produces three visible layers in an anticoagulated tube: plasma, buffy " +
        "coat, packed cells.",
    },
    clinicalRelevance:
      "Serum tubes must clot fully first. Spinning early leaves fibrin strands; " +
      "re-spinning a gel tube after the barrier forms invalidates it. Always " +
      "balance the centrifuge.",
    relatedTermIds: ["blood-buffy-coat", "add-thixotropic-gel", "hand-aliquot"],
    domain: "specimen-handling",
    difficulty: 1,
    tags: ["high-yield"],
    sources: [SRC_CLSI_GP41, SRC_MANUFACTURER_IFU, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-aliquot",
    term: "Aliquot",
    pronunciation: "AL-ih-kwot",
    category: "specimen-handling",
    definition:
      "A measured portion of a specimen transferred into a separate labeled " +
      "tube.",
    partOf: {
      label: "Specimen processing",
      detail:
        "Made after centrifugation so several departments can test the same " +
        "collection without opening the primary tube repeatedly.",
    },
    clinicalRelevance:
      "Every aliquot carries the same patient identifiers as its parent tube. " +
      "An unlabeled aliquot is an unidentifiable specimen.",
    relatedTermIds: ["hand-centrifugation", "hand-labeling"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-glycolysis",
    term: "Glycolysis",
    pronunciation: "gly-KOL-ih-sis",
    category: "specimen-handling",
    definition:
      "The continued breakdown of glucose by blood cells after collection, " +
      "lowering the measured glucose over time.",
    partOf: {
      label: "In-tube changes after collection",
      detail:
        "Roughly 5–7% of the glucose per hour at room temperature, until an " +
        "antiglycolytic agent or separation stops it.",
    },
    wordParts: [
      { part: "glyc(o)-", meaning: "sugar" },
      { part: "-lysis", meaning: "breakdown" },
    ],
    confusableWithIds: ["hand-hemolysis"],
    relatedTermIds: ["add-sodium-fluoride", "lab-glucose", "wp-glyco"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield", "sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-qns",
    term: "QNS (quantity not sufficient)",
    aliases: ["qns", "quantity not sufficient", "short draw"],
    category: "specimen-handling",
    definition:
      "A specimen rejected because too little blood was collected to run the " +
      "test.",
    partOf: {
      label: "Specimen rejection reasons",
      detail:
        "For a light blue citrate tube, an underfilled tube is rejected even " +
        "when there is technically enough volume, because the ratio is wrong.",
    },
    confusableWithIds: ["hand-specimen-rejection"],
    relatedTermIds: ["add-sodium-citrate", "hand-specimen-rejection"],
    domain: "specimen-handling",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-specimen-rejection",
    term: "Specimen rejection",
    aliases: ["unacceptable specimen"],
    category: "specimen-handling",
    definition:
      "The laboratory's refusal to test a specimen whose integrity or identity " +
      "cannot be trusted.",
    partOf: {
      label: "Laboratory quality control",
      detail:
        "Common reasons: hemolysis, clots in an anticoagulated tube, wrong tube, " +
        "QNS, mislabeled or unlabeled, expired tube, exceeded transport time.",
    },
    clinicalRelevance:
      "A rejection means the patient is stuck again. It is the cost of every " +
      "pre-analytical shortcut.",
    confusableWithIds: ["hand-qns"],
    relatedTermIds: ["hand-hemolysis", "hand-labeling", "hand-qns"],
    domain: "specimen-handling",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-labeling",
    term: "Specimen labeling",
    aliases: ["labelling", "tube labeling"],
    category: "specimen-handling",
    definition:
      "Writing or applying patient identifiers, date, time, and collector " +
      "initials to a tube.",
    partOf: {
      label: "Patient identification protocol",
      detail:
        "Done at the bedside, in the patient's presence, immediately after " +
        "collection and before leaving the room.",
    },
    clinicalRelevance:
      "Labeling away from the bedside is how specimens get switched. An " +
      "unlabeled tube is never salvageable by memory.",
    relatedTermIds: ["proc-two-identifiers", "hand-specimen-rejection"],
    domain: "patient-identification",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-inversion",
    term: "Inversion",
    category: "specimen-handling",
    definition:
      "Gently turning a tube upside down and back to mix blood with its " +
      "additive.",
    partOf: {
      label: "Immediate post-collection handling",
      detail:
        "Counts differ by additive — commonly 8–10 for EDTA, 3–4 for citrate, " +
        "5 for a clot-activator tube. Follow the manufacturer's instructions.",
    },
    clinicalRelevance:
      "Shaking instead of inverting hemolyzes the specimen; not mixing at all " +
      "lets it clot. Both make the tube unusable.",
    relatedTermIds: ["add-edta", "hand-hemolysis"],
    domain: "specimen-handling",
    difficulty: 1,
    tags: ["high-yield"],
    sources: [SRC_MANUFACTURER_IFU, SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-stat",
    term: "STAT",
    aliases: ["statim"],
    category: "specimen-handling",
    definition:
      "A priority order meaning the collection and testing are needed " +
      "immediately.",
    partOf: {
      label: "Order priorities",
      detail:
        "From the Latin *statim*, at once. Distinct from a timed draw, which " +
        "must happen at a specific moment rather than as fast as possible.",
    },
    confusableWithIds: ["hand-timed-collection"],
    relatedTermIds: ["add-thrombin", "hand-timed-collection"],
    domain: "specimen-handling",
    difficulty: 1,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-timed-collection",
    term: "Timed collection",
    category: "specimen-handling",
    definition:
      "A draw that must occur at a specified time for the result to mean " +
      "anything.",
    partOf: {
      label: "Order priorities",
      detail:
        "Covers glucose tolerance intervals, therapeutic drug peaks and troughs, " +
        "and cortisol's morning and evening draws.",
    },
    clinicalRelevance:
      "Record the actual collection time, not the scheduled one. A trough drawn " +
      "late is a different test.",
    confusableWithIds: ["hand-stat"],
    relatedTermIds: ["lab-gtt", "lab-therapeutic-drug-monitoring"],
    domain: "special-collections",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-chain-of-custody",
    term: "Chain of custody",
    aliases: ["coc"],
    category: "specimen-handling",
    definition:
      "The documented, unbroken record of everyone who handled a specimen from " +
      "collection to result.",
    partOf: {
      label: "Forensic and legal specimen protocol",
      detail:
        "Required for workplace drug screens, blood alcohol, and any collection " +
        "that may be used as evidence.",
    },
    clinicalRelevance:
      "A single gap in the documentation makes the result inadmissible, however " +
      "accurate the testing was.",
    relatedTermIds: ["lab-toxicology", "safety-hipaa"],
    domain: "special-collections",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-photosensitive",
    term: "Light-sensitive specimen",
    aliases: ["photosensitive specimen", "light protected"],
    category: "specimen-handling",
    definition:
      "A specimen whose analyte degrades on exposure to light, so it is wrapped " +
      "in foil or collected in an amber tube.",
    partOf: {
      label: "Special handling requirements",
      detail:
        "Bilirubin is the classic example, and neonatal bilirubin is the one " +
        "most often asked about.",
    },
    confusableWithIds: ["hand-chilled-specimen", "hand-body-temperature-specimen"],
    relatedTermIds: ["lab-bilirubin", "cond-jaundice"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-chilled-specimen",
    term: "Chilled specimen",
    category: "specimen-handling",
    definition:
      "A specimen transported in an ice slurry to slow metabolic changes after " +
      "collection.",
    partOf: {
      label: "Special handling requirements",
      detail:
        "Ammonia and lactic acid are common examples. Use a water-and-ice " +
        "slurry, not solid ice, which freezes and hemolyzes the sample.",
    },
    confusableWithIds: ["hand-photosensitive", "hand-body-temperature-specimen"],
    relatedTermIds: ["lab-ammonia", "hand-hemolysis"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-body-temperature-specimen",
    term: "Body temperature specimen",
    aliases: ["37 degree specimen", "warmed specimen"],
    category: "specimen-handling",
    definition:
      "A specimen kept at about 37 °C from collection until testing, because " +
      "cooling changes the analyte.",
    partOf: {
      label: "Special handling requirements",
      detail:
        "Cold agglutinins and cryoglobulins are the standard examples — both " +
        "come out of solution as the sample cools.",
    },
    confusableWithIds: ["hand-chilled-specimen", "hand-photosensitive"],
    relatedTermIds: ["hand-chilled-specimen"],
    domain: "special-collections",
    difficulty: 3,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "hand-preanalytical-error",
    term: "Pre-analytical error",
    aliases: ["preanalytical error", "pre analytical"],
    category: "specimen-handling",
    definition:
      "A mistake made before testing begins — in ordering, collection, handling, " +
      "or transport.",
    partOf: {
      label: "The three phases of laboratory testing",
      detail:
        "Pre-analytical, analytical, post-analytical. The majority of laboratory " +
        "errors occur in the first phase, which is the phlebotomist's phase.",
    },
    clinicalRelevance:
      "It is the argument for every rule in this app: the analyzer cannot " +
      "correct what happened at the chairside.",
    relatedTermIds: ["hand-specimen-rejection", "proc-phlebotomy"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
];
