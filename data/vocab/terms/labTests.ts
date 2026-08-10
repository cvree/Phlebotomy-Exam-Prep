import type { VocabTerm } from "@/types/vocab";
import { SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";

/**
 * Tests and departments.
 *
 * A phlebotomist is not expected to interpret results, so nothing here states
 * a reference range or what an abnormal value means. What each entry does
 * carry is the part that belongs to collection: which tube, and any handling
 * the test imposes.
 */

const base = [SRC_TEXTBOOK_CURRICULUM];
const collection = [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM];

export const LAB_TEST_TERMS: VocabTerm[] = [
  {
    id: "lab-cbc",
    term: "CBC (complete blood count)",
    aliases: ["cbc", "complete blood count"],
    category: "lab-tests",
    definition:
      "A count and description of the cells in blood — red cells, white cells, " +
      "platelets, hemoglobin, and hematocrit.",
    partOf: {
      label: "Hematology department — lavender EDTA tube",
      detail:
        "Run on whole blood, which is why the specimen is anticoagulated and " +
        "inverted rather than allowed to clot.",
    },
    clinicalRelevance:
      "The most frequently ordered test you will collect. A clotted lavender " +
      "tube is the most frequent reason one gets rejected.",
    relatedTermIds: ["add-edta", "blood-whole-blood", "lab-hematology-dept"],
    domain: "order-of-draw",
    difficulty: 1,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-pt-inr",
    term: "PT / INR (prothrombin time)",
    aliases: ["pt", "inr", "protime", "prothrombin time"],
    category: "lab-tests",
    definition:
      "A coagulation test of the clotting pathway, reported with a standardized " +
      "ratio used to monitor warfarin therapy.",
    partOf: {
      label: "Coagulation department — light blue citrate tube",
      detail:
        "Requires plasma with intact clotting factors and a correctly filled " +
        "9:1 blood-to-citrate ratio.",
    },
    confusableWithIds: ["lab-aptt", "lab-d-dimer"],
    relatedTermIds: ["add-sodium-citrate", "blood-plasma", "hand-qns"],
    domain: "order-of-draw",
    difficulty: 2,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-aptt",
    term: "aPTT (activated partial thromboplastin time)",
    aliases: ["aptt", "ptt", "partial thromboplastin time"],
    category: "lab-tests",
    definition:
      "A coagulation test used chiefly to monitor unfractionated heparin " +
      "therapy.",
    partOf: {
      label: "Coagulation department — light blue citrate tube",
      detail: "Same tube and the same fill requirement as the PT/INR.",
    },
    confusableWithIds: ["lab-pt-inr"],
    relatedTermIds: ["add-sodium-citrate", "blood-coagulation-cascade"],
    domain: "order-of-draw",
    difficulty: 2,
    tags: ["high-yield", "sound-alike"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-d-dimer",
    term: "D-dimer",
    aliases: ["d dimer", "ddimer"],
    category: "lab-tests",
    definition:
      "A test for fragments released when a clot breaks down, used to help rule " +
      "out abnormal clotting.",
    partOf: {
      label: "Coagulation department — light blue citrate tube",
      detail: "Ordered urgently when a clot or DIC is suspected.",
    },
    confusableWithIds: ["lab-pt-inr"],
    relatedTermIds: ["cond-dic", "comp-thrombosis"],
    difficulty: 3,
    tags: [],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-cmp",
    term: "CMP / BMP (metabolic panel)",
    aliases: ["cmp", "bmp", "metabolic panel", "chem panel"],
    category: "lab-tests",
    definition:
      "A group of chemistry tests covering electrolytes, kidney and liver " +
      "measures, and glucose.",
    partOf: {
      label: "Chemistry department — gold/SST or light green PST tube",
      detail:
        "The basic panel is the shorter version; the comprehensive panel adds " +
        "the liver measures and protein.",
    },
    relatedTermIds: ["add-thixotropic-gel", "blood-serum", "lab-electrolytes"],
    domain: "order-of-draw",
    difficulty: 1,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-electrolytes",
    term: "Electrolytes",
    aliases: ["lytes", "electrolyte panel"],
    category: "lab-tests",
    definition:
      "Charged minerals in blood — sodium, potassium, chloride, and bicarbonate.",
    partOf: {
      label: "Chemistry department",
      detail:
        "Measured on serum or heparinized plasma, depending on the facility's " +
        "analyzer.",
    },
    clinicalRelevance:
      "The panel most damaged by pre-analytical error: hemolysis and EDTA " +
      "carryover both raise potassium falsely, and a prolonged tourniquet does " +
      "the same.",
    relatedTermIds: ["hand-hemolysis", "add-carryover", "comp-hemoconcentration"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-glucose",
    term: "Glucose",
    aliases: ["blood sugar", "blood glucose"],
    category: "lab-tests",
    definition: "The concentration of sugar in the blood.",
    partOf: {
      label: "Chemistry department — gray tube when preservation is needed",
      detail:
        "A gel serum tube is acceptable when it will be separated promptly; a " +
        "gray sodium fluoride tube is used when it will not.",
    },
    clinicalRelevance:
      "Cells keep consuming glucose in the tube. Delay without an " +
      "antiglycolytic additive gives a falsely low result.",
    relatedTermIds: ["hand-glycolysis", "add-sodium-fluoride", "proc-fasting"],
    domain: "specimen-handling",
    difficulty: 1,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-gtt",
    term: "GTT (glucose tolerance test)",
    aliases: ["gtt", "ogtt", "glucose tolerance test"],
    category: "lab-tests",
    definition:
      "A timed series of glucose measurements taken after the patient drinks a " +
      "standard glucose load.",
    partOf: {
      label: "Timed collections",
      detail:
        "Timing starts from when the patient finishes the drink, and every " +
        "later specimen is drawn on that clock.",
    },
    clinicalRelevance:
      "The patient must stay in the facility, fasting, and must not smoke or " +
      "eat. Record the actual times, and report vomiting to the provider.",
    confusableWithIds: ["lab-hba1c", "lab-glucose"],
    relatedTermIds: ["hand-timed-collection", "cond-diabetes-mellitus"],
    domain: "special-collections",
    difficulty: 2,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-hba1c",
    term: "Hemoglobin A1c",
    aliases: ["hba1c", "a1c", "glycated hemoglobin"],
    category: "lab-tests",
    definition:
      "A measure of how much glucose has attached to hemoglobin, reflecting " +
      "average glucose over the previous two to three months.",
    partOf: {
      label: "Hematology or chemistry — lavender EDTA tube",
      detail:
        "Measured on whole blood, because the test looks at the hemoglobin " +
        "inside red cells.",
    },
    clinicalRelevance: "No fasting required, because it is not a snapshot.",
    confusableWithIds: ["lab-gtt", "lab-glucose"],
    relatedTermIds: ["add-edta", "cond-diabetes-mellitus"],
    difficulty: 2,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-lipid-panel",
    term: "Lipid panel",
    aliases: ["lipids", "cholesterol panel"],
    category: "lab-tests",
    definition:
      "Measurement of cholesterol and triglycerides in blood.",
    partOf: {
      label: "Chemistry department — gold/SST serum tube",
      detail:
        "Fasting requirements vary by provider and by which components are " +
        "ordered; confirm rather than assume.",
    },
    relatedTermIds: ["hand-lipemic", "proc-fasting"],
    difficulty: 1,
    tags: [],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-bilirubin",
    term: "Bilirubin",
    pronunciation: "bil-ih-ROO-bin",
    category: "lab-tests",
    definition:
      "A yellow pigment produced when red cells break down, processed by the " +
      "liver.",
    partOf: {
      label: "Chemistry department — light-protected specimen",
      detail:
        "Neonatal bilirubin is collected by heelstick into an amber " +
        "microcollection tube or wrapped in foil.",
    },
    clinicalRelevance:
      "Degrades on exposure to light and is falsely raised by hemolysis. Both " +
      "failure modes belong to the collector.",
    relatedTermIds: ["hand-photosensitive", "cond-jaundice", "hand-icteric"],
    domain: "special-collections",
    difficulty: 2,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-blood-culture",
    term: "Blood culture",
    category: "lab-tests",
    definition:
      "A test that incubates blood to see whether organisms grow from it.",
    partOf: {
      label: "Microbiology department — culture bottles / yellow SPS tube",
      detail:
        "Collected first in the order of draw, usually as an aerobic and " +
        "anaerobic pair, often from two separate sites.",
    },
    clinicalRelevance:
      "Skin antisepsis is the whole test. Contamination with skin flora " +
      "produces a false positive that can drive real antibiotic treatment.",
    relatedTermIds: ["add-sps", "safety-aseptic-technique", "cond-bacteremia"],
    domain: "special-collections",
    difficulty: 1,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-type-and-screen",
    term: "Type and screen",
    aliases: ["type and crossmatch", "t&s", "blood bank"],
    category: "lab-tests",
    definition:
      "Determining a patient's ABO group and Rh type and screening their plasma " +
      "for unexpected antibodies.",
    partOf: {
      label: "Blood bank / immunohematology — pink or lavender EDTA tube",
      detail:
        "Blood bank specimens carry additional identification requirements, " +
        "often a dedicated armband or a second identifier system.",
    },
    clinicalRelevance:
      "Identification errors here can end in a fatal transfusion reaction. " +
      "Blood bank labeling rules are stricter than anywhere else in the lab, " +
      "and they are not optional.",
    relatedTermIds: ["add-edta", "proc-two-identifiers", "hand-labeling"],
    domain: "patient-identification",
    difficulty: 2,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-esr",
    term: "ESR (erythrocyte sedimentation rate)",
    aliases: ["esr", "sed rate", "sedimentation rate"],
    category: "lab-tests",
    definition:
      "A measure of how quickly red cells settle in a column of blood, used as " +
      "a non-specific marker of inflammation.",
    partOf: {
      label: "Hematology department — lavender EDTA or black citrate tube",
      detail:
        "Time-sensitive: it must be set up within a few hours of collection.",
    },
    relatedTermIds: ["add-edta", "lab-hematology-dept"],
    difficulty: 2,
    tags: [],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-abg",
    term: "ABG (arterial blood gas)",
    aliases: ["abg", "blood gas", "arterial blood gas"],
    category: "lab-tests",
    definition:
      "Measurement of oxygen, carbon dioxide, and pH in arterial blood.",
    partOf: {
      label: "Arterial collection — heparinized syringe",
      detail:
        "Drawn from an artery, usually the radial, by staff specifically " +
        "trained and authorized for arterial puncture.",
    },
    clinicalRelevance:
      "Air bubbles must be expelled immediately — they change the gas values " +
      "before the sample reaches the analyzer.",
    relatedTermIds: ["anat-radial-artery", "add-heparin"],
    domain: "special-collections",
    difficulty: 3,
    tags: [],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-ammonia",
    term: "Ammonia",
    category: "lab-tests",
    definition:
      "A waste product of protein metabolism, measured when liver function is " +
      "in question.",
    partOf: {
      label: "Chemistry department — chilled specimen",
      detail:
        "Placed in an ice slurry immediately and delivered at once, because the " +
        "level rises in a tube left at room temperature.",
    },
    relatedTermIds: ["hand-chilled-specimen", "add-heparin"],
    difficulty: 3,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-therapeutic-drug-monitoring",
    term: "Therapeutic drug monitoring (TDM)",
    aliases: ["tdm", "drug level", "peak and trough"],
    category: "lab-tests",
    definition:
      "Measuring the concentration of a medication to keep it inside its " +
      "effective range.",
    partOf: {
      label: "Timed collections",
      detail:
        "A trough is drawn immediately before the next dose; a peak is drawn a " +
        "set interval after it, depending on the drug and route.",
    },
    clinicalRelevance:
      "Separator gel can absorb some drugs, so a plain red tube may be required. " +
      "Record the actual collection time and the dose time.",
    confusableWithIds: ["lab-toxicology"],
    relatedTermIds: ["hand-timed-collection", "add-thixotropic-gel"],
    domain: "special-collections",
    difficulty: 3,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-toxicology",
    term: "Toxicology",
    aliases: ["tox screen", "drug screen"],
    category: "lab-tests",
    definition:
      "Testing for drugs, alcohol, or poisons, often under legal documentation " +
      "requirements.",
    partOf: {
      label: "Chain-of-custody collections",
      detail:
        "Blood alcohol collection uses a non-alcohol antiseptic, because an " +
        "isopropyl swab can be argued to have contaminated the sample.",
    },
    confusableWithIds: ["lab-therapeutic-drug-monitoring"],
    relatedTermIds: ["hand-chain-of-custody", "add-trace-element-free"],
    domain: "special-collections",
    difficulty: 2,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-hla-typing",
    term: "HLA typing",
    aliases: ["hla", "tissue typing"],
    category: "lab-tests",
    definition:
      "Identifying the tissue antigens used to match donors and recipients for " +
      "transplantation.",
    partOf: {
      label: "Immunology — yellow ACD tube",
      detail:
        "Needs cells that are still viable, which is what the dextrose in ACD " +
        "provides.",
    },
    relatedTermIds: ["add-acd"],
    difficulty: 3,
    tags: [],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-newborn-screening",
    term: "Newborn screening",
    aliases: ["nbs", "pku test", "heel stick screening"],
    category: "lab-tests",
    definition:
      "A state-mandated panel of tests performed on blood spots collected from " +
      "a newborn's heel.",
    partOf: {
      label: "Capillary collection — filter paper collection card",
      detail:
        "Each printed circle is filled in one application from one free-flowing " +
        "drop, from one side of the paper only, then air-dried flat.",
    },
    clinicalRelevance:
      "Layering, touching the paper to the heel, or applying a second drop to " +
      "the same circle invalidates the card and the family has to come back.",
    relatedTermIds: ["proc-capillary-puncture", "cond-sickle-cell"],
    domain: "special-collections",
    difficulty: 2,
    tags: ["high-yield"],
    sources: collection,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-hematology-dept",
    term: "Hematology department",
    category: "lab-tests",
    definition:
      "The laboratory section that counts and examines blood cells.",
    partOf: {
      label: "The clinical laboratory",
      detail:
        "Alongside chemistry, coagulation, microbiology, immunology/serology, " +
        "blood bank, and urinalysis.",
    },
    wordParts: [
      { part: "hemat(o)-", meaning: "blood" },
      { part: "-ology", meaning: "study of" },
    ],
    clinicalRelevance:
      "Knowing which department a test belongs to tells you which tube it needs " +
      "before you look it up.",
    confusableWithIds: ["lab-microbiology"],
    relatedTermIds: ["lab-cbc", "add-edta", "wp-ology"],
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lab-microbiology",
    term: "Microbiology department",
    category: "lab-tests",
    definition:
      "The laboratory section that cultures and identifies organisms causing " +
      "infection.",
    partOf: {
      label: "The clinical laboratory",
      detail: "Where blood cultures are incubated and read.",
    },
    confusableWithIds: ["lab-hematology-dept"],
    relatedTermIds: ["lab-blood-culture", "cond-bacteremia"],
    difficulty: 1,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
];
