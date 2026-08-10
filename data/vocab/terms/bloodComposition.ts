import type { VocabTerm } from "@/types/vocab";
import { SRC_TEXTBOOK_CURRICULUM, SRC_CLSI_GP41 } from "@/data/sources";

/**
 * Blood and its components.
 *
 * The serum/plasma distinction is the single most-tested idea in this set,
 * so both terms define themselves *against* each other rather than in
 * isolation, and they are marked as confusable so the drill engine puts them
 * in front of each other on purpose.
 */

const base = [SRC_TEXTBOOK_CURRICULUM];

export const BLOOD_COMPOSITION_TERMS: VocabTerm[] = [
  {
    id: "blood-whole-blood",
    term: "Whole blood",
    category: "blood-composition",
    definition:
      "Blood that has not been separated — plasma and all the cells still together.",
    detail:
      "Requires an anticoagulant so the cells stay suspended rather than " +
      "trapping themselves in a clot.",
    partOf: {
      label: "Anticoagulated tubes (lavender, green, gray, blue)",
      detail:
        "Any tube containing an anticoagulant yields whole blood until it is " +
        "spun; only then does it become plasma over packed cells.",
    },
    clinicalRelevance:
      "A CBC is run on whole blood, which is why it goes in the lavender EDTA " +
      "tube and is mixed rather than allowed to clot.",
    confusableWithIds: ["blood-plasma", "blood-serum"],
    relatedTermIds: ["add-edta", "lab-cbc"],
    domain: "specimen-handling",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-plasma",
    term: "Plasma",
    pronunciation: "PLAZ-muh",
    category: "blood-composition",
    definition:
      "The liquid portion of anticoagulated blood — it still contains fibrinogen " +
      "and the other clotting factors.",
    partOf: {
      label: "Anticoagulated tubes, after centrifugation",
      detail:
        "Sits above the packed cells in a lavender, green, gray, or light " +
        "blue tube once it has been spun.",
    },
    clinicalRelevance:
      "Coagulation testing needs plasma precisely because the clotting factors " +
      "are still in it — that is what the test measures.",
    mnemonic:
      "Plasma has the Preventer (anticoagulant), so the clotting factors are Preserved.",
    confusableWithIds: ["blood-serum", "blood-whole-blood"],
    relatedTermIds: ["blood-fibrinogen", "add-sodium-citrate", "lab-pt-inr"],
    domain: "specimen-handling",
    difficulty: 1,
    tags: ["high-yield", "sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-serum",
    term: "Serum",
    pronunciation: "SEER-um",
    category: "blood-composition",
    definition:
      "The liquid left after blood has clotted — plasma minus fibrinogen and " +
      "the consumed clotting factors.",
    partOf: {
      label: "Clot-activator tubes (red, gold/SST), after clotting and spinning",
      detail:
        "Produced only when blood is allowed to clot fully first, typically " +
        "about 30 minutes, before centrifugation.",
    },
    clinicalRelevance:
      "Most chemistry and serology tests run on serum. Spinning a red tube " +
      "before it has finished clotting gives fibrin strands that clog analyzers.",
    mnemonic: "Serum = plasma that has Spent its clotting factors.",
    confusableWithIds: ["blood-plasma", "blood-whole-blood"],
    relatedTermIds: ["add-clot-activator", "add-thixotropic-gel", "lab-cmp"],
    domain: "specimen-handling",
    difficulty: 1,
    tags: ["high-yield", "sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-formed-elements",
    term: "Formed elements",
    category: "blood-composition",
    definition:
      "The cellular part of blood: red cells, white cells, and platelets.",
    partOf: {
      label: "Whole blood",
      detail:
        "Roughly 45% of whole blood by volume; the remaining ~55% is plasma.",
    },
    relatedTermIds: [
      "blood-erythrocyte",
      "blood-leukocyte",
      "blood-thrombocyte",
      "blood-hematocrit",
    ],
    difficulty: 2,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-erythrocyte",
    term: "Erythrocyte",
    aliases: ["red blood cell", "rbc", "red cell"],
    pronunciation: "eh-RITH-roh-site",
    category: "blood-composition",
    definition:
      "A red blood cell — the cell that carries oxygen using hemoglobin.",
    partOf: {
      label: "Formed elements of whole blood",
      detail:
        "By far the most numerous cell in blood, and the one whose volume " +
        "the hematocrit measures.",
    },
    wordParts: [
      { part: "erythr(o)-", meaning: "red" },
      { part: "-cyte", meaning: "cell" },
    ],
    confusableWithIds: ["blood-leukocyte", "blood-thrombocyte"],
    relatedTermIds: ["blood-hemoglobin", "cond-polycythemia-vera", "cond-anemia"],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-leukocyte",
    term: "Leukocyte",
    aliases: ["white blood cell", "wbc", "white cell"],
    pronunciation: "LOO-koh-site",
    category: "blood-composition",
    definition: "A white blood cell — part of the body's immune defense.",
    partOf: {
      label: "Formed elements of whole blood",
      detail:
        "Concentrates in the thin grey 'buffy coat' layer between plasma and " +
        "red cells after centrifugation.",
    },
    wordParts: [
      { part: "leuk(o)-", meaning: "white" },
      { part: "-cyte", meaning: "cell" },
    ],
    confusableWithIds: ["blood-erythrocyte", "blood-thrombocyte"],
    relatedTermIds: ["blood-buffy-coat", "cond-leukemia", "cond-leukocytosis"],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-thrombocyte",
    term: "Thrombocyte",
    aliases: ["platelet", "plt"],
    pronunciation: "THROM-boh-site",
    category: "blood-composition",
    definition:
      "A platelet — the cell fragment that plugs an injured vessel and starts " +
      "clot formation.",
    partOf: {
      label: "Formed elements of whole blood",
      detail:
        "First responder in hemostasis: platelets aggregate at the puncture " +
        "site before fibrin arrives to stabilize the plug.",
    },
    wordParts: [
      { part: "thromb(o)-", meaning: "clot" },
      { part: "-cyte", meaning: "cell" },
    ],
    clinicalRelevance:
      "A patient with a low platelet count bleeds longer at the site, so you " +
      "hold pressure until bleeding truly stops before bandaging.",
    confusableWithIds: ["blood-erythrocyte", "blood-leukocyte"],
    relatedTermIds: ["cond-thrombocytopenia", "proc-hemostasis"],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-hemoglobin",
    term: "Hemoglobin",
    aliases: ["hgb", "hb"],
    pronunciation: "HEE-moh-gloh-bin",
    category: "blood-composition",
    definition:
      "The iron-containing protein inside red cells that binds and carries oxygen.",
    partOf: {
      label: "The erythrocyte",
      detail:
        "Packed inside each red cell; when red cells rupture it spills into " +
        "the plasma and turns the specimen pink or red.",
    },
    wordParts: [
      { part: "hemo-", meaning: "blood" },
      { part: "-globin", meaning: "protein" },
    ],
    clinicalRelevance:
      "Free hemoglobin in the plasma is the visible sign of hemolysis, and " +
      "the reason a hemolyzed specimen gets rejected.",
    relatedTermIds: ["hand-hemolysis", "blood-hematocrit", "cond-anemia"],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-hematocrit",
    term: "Hematocrit",
    aliases: ["hct", "packed cell volume", "pcv"],
    pronunciation: "hee-MAT-oh-krit",
    category: "blood-composition",
    definition:
      "The percentage of whole blood volume made up of red cells.",
    partOf: {
      label: "The complete blood count (CBC)",
      detail:
        "Reported alongside hemoglobin and red cell count; also measurable " +
        "directly by spinning a microhematocrit capillary tube.",
    },
    clinicalRelevance:
      "Raised in polycythemia and in dehydration; lowered in anemia. " +
      "Prolonged tourniquet time falsely raises it through hemoconcentration.",
    confusableWithIds: ["blood-hemoglobin"],
    relatedTermIds: [
      "cond-polycythemia-vera",
      "comp-hemoconcentration",
      "lab-cbc",
    ],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-buffy-coat",
    term: "Buffy coat",
    category: "blood-composition",
    definition:
      "The thin greyish-white layer of white cells and platelets that sits " +
      "between the plasma and the red cells in a spun tube.",
    partOf: {
      label: "A centrifuged tube of anticoagulated blood",
      detail:
        "Three layers form top to bottom: plasma, buffy coat, packed red cells.",
    },
    relatedTermIds: ["blood-leukocyte", "hand-centrifugation"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-fibrinogen",
    term: "Fibrinogen",
    pronunciation: "fy-BRIN-oh-jen",
    category: "blood-composition",
    definition:
      "The soluble plasma protein that is converted into fibrin to form a clot.",
    partOf: {
      label: "The coagulation cascade (factor I)",
      detail:
        "Present in plasma, absent from serum — it has been used up making " +
        "the clot by the time serum exists.",
    },
    confusableWithIds: ["blood-fibrin"],
    relatedTermIds: ["blood-plasma", "blood-coagulation-cascade", "lab-pt-inr"],
    difficulty: 2,
    tags: ["sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-fibrin",
    term: "Fibrin",
    pronunciation: "FY-brin",
    category: "blood-composition",
    definition:
      "The insoluble protein threads that mesh together to form the actual clot.",
    partOf: {
      label: "The clot itself",
      detail:
        "Thrombin converts fibrinogen into fibrin; the strands trap cells and " +
        "the mass retracts, leaving serum above it.",
    },
    clinicalRelevance:
      "Fibrin strands in a specimen spun too early clog analyzer probes — the " +
      "reason serum tubes must clot completely first.",
    confusableWithIds: ["blood-fibrinogen"],
    relatedTermIds: ["blood-serum", "hand-centrifugation"],
    difficulty: 2,
    tags: ["sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "blood-coagulation-cascade",
    term: "Coagulation cascade",
    aliases: ["clotting cascade", "coagulation"],
    category: "blood-composition",
    definition:
      "The chain of clotting factor reactions that ends in a stable fibrin clot.",
    partOf: {
      label: "Hemostasis",
      detail:
        "The second phase: platelets plug first, then the cascade lays down " +
        "fibrin to reinforce the plug.",
    },
    clinicalRelevance:
      "Citrate stops the cascade reversibly by binding calcium, which is the " +
      "only reason a light blue tube can be used to measure it.",
    relatedTermIds: ["add-sodium-citrate", "proc-hemostasis", "lab-aptt"],
    domain: "anatomy-physiology",
    difficulty: 3,
    tags: ["high-yield"],
    sources: [SRC_TEXTBOOK_CURRICULUM, SRC_CLSI_GP41],
    reviewStatus: "needs-review",
    version: 1,
  },
];
