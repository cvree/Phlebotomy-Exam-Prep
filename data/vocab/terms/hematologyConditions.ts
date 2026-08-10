import type { VocabTerm } from "@/types/vocab";
import { SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";

/**
 * Blood disorders and conditions.
 *
 * These are defined at the level a phlebotomist is expected to know them:
 * what the word means, and what it changes about the draw. Diagnosis,
 * staging, and treatment are out of scope and deliberately not stated —
 * anything approaching clinical guidance is left to the study guides'
 * standing caveat.
 */

const base = [SRC_TEXTBOOK_CURRICULUM];

export const HEMATOLOGY_CONDITION_TERMS: VocabTerm[] = [
  {
    id: "cond-polycythemia-vera",
    term: "Polycythemia vera",
    aliases: ["pv", "polycythaemia vera", "primary polycythemia"],
    pronunciation: "pol-ee-sy-THEE-mee-uh VAIR-uh",
    category: "hematology-conditions",
    definition:
      "A chronic bone marrow disorder in which the marrow itself overproduces " +
      "red cells, thickening the blood.",
    detail:
      "'Vera' means true — the overproduction is a primary marrow problem, not " +
      "a response to something else. White cells and platelets are often " +
      "raised alongside the red cells, and the raised hematocrit makes the " +
      "blood more viscous.",
    partOf: {
      label: "The myeloproliferative neoplasms",
      detail:
        "A group of disorders in which the bone marrow overproduces one or " +
        "more blood cell lines.",
    },
    wordParts: [
      { part: "poly-", meaning: "many" },
      { part: "cyt-", meaning: "cell" },
      { part: "-emia", meaning: "blood condition" },
      { part: "vera", meaning: "true / primary" },
    ],
    clinicalRelevance:
      "The classic reason a patient is scheduled for therapeutic phlebotomy: " +
      "removing a unit of blood lowers the red cell mass. Expect a high " +
      "hematocrit and thick, dark, slow-filling blood.",
    mnemonic:
      "Poly-cyt-emia = many cells in the blood. Vera = the real thing, coming " +
      "from the marrow itself.",
    confusableWithIds: ["cond-polycythemia-secondary", "cond-thrombocytosis"],
    relatedTermIds: [
      "proc-therapeutic-phlebotomy",
      "blood-hematocrit",
      "blood-erythrocyte",
      "wp-poly",
    ],
    domain: "special-collections",
    difficulty: 2,
    tags: ["high-yield", "condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-polycythemia-secondary",
    term: "Secondary polycythemia",
    aliases: ["secondary erythrocytosis"],
    category: "hematology-conditions",
    definition:
      "A raised red cell count caused by something outside the marrow, usually " +
      "chronic low oxygen.",
    detail:
      "Living at altitude, chronic lung disease, and heavy smoking all push " +
      "the body to make more red cells. Relative polycythemia is different " +
      "again: the red cell mass is normal and the plasma volume has simply " +
      "dropped, as in dehydration.",
    partOf: {
      label: "The polycythemias",
      detail:
        "Primary (polycythemia vera) starts in the marrow; secondary is a " +
        "response; relative is a plasma-volume effect.",
    },
    clinicalRelevance:
      "Explains why 'high hematocrit' alone never means polycythemia vera — " +
      "a dehydrated patient can produce the same number.",
    confusableWithIds: ["cond-polycythemia-vera", "comp-hemoconcentration"],
    relatedTermIds: ["blood-hematocrit", "comp-hemoconcentration"],
    difficulty: 3,
    tags: ["sound-alike", "condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-anemia",
    term: "Anemia",
    aliases: ["anaemia"],
    pronunciation: "uh-NEE-mee-uh",
    category: "hematology-conditions",
    definition:
      "A reduction in red cells or hemoglobin, lowering the blood's capacity " +
      "to carry oxygen.",
    partOf: {
      label: "Red cell disorders",
      detail:
        "The mirror image of polycythemia: too few functioning red cells " +
        "rather than too many.",
    },
    wordParts: [
      { part: "an-", meaning: "without" },
      { part: "-emia", meaning: "blood condition" },
    ],
    clinicalRelevance:
      "Anemic patients may already be having blood drawn frequently. Removing " +
      "excessive volume — iatrogenic anemia — is a real risk in inpatients " +
      "and neonates.",
    confusableWithIds: ["cond-polycythemia-vera", "comp-iatrogenic-anemia"],
    relatedTermIds: ["blood-hemoglobin", "comp-iatrogenic-anemia", "lab-cbc"],
    domain: "anatomy-physiology",
    difficulty: 1,
    tags: ["high-yield", "condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-sickle-cell",
    term: "Sickle cell anemia",
    aliases: ["sickle cell disease", "sickle cell"],
    category: "hematology-conditions",
    definition:
      "An inherited disorder in which abnormal hemoglobin makes red cells " +
      "stiffen into a crescent shape that blocks small vessels.",
    partOf: {
      label: "The hemoglobinopathies",
      detail:
        "Disorders caused by an abnormal hemoglobin molecule rather than by a " +
        "shortage of iron or cells.",
    },
    clinicalRelevance:
      "Screened for in newborns, and confirmed by hemoglobin electrophoresis. " +
      "Patients often have difficult venous access from repeated draws.",
    relatedTermIds: ["blood-hemoglobin", "cond-anemia", "lab-newborn-screening"],
    difficulty: 2,
    tags: ["condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-leukemia",
    term: "Leukemia",
    aliases: ["leukaemia"],
    pronunciation: "loo-KEE-mee-uh",
    category: "hematology-conditions",
    definition:
      "A malignant overproduction of abnormal white cells by the bone marrow.",
    partOf: {
      label: "White cell disorders",
      detail:
        "Distinct from leukocytosis, which is a raised white count from any " +
        "cause — most often ordinary infection.",
    },
    wordParts: [
      { part: "leuk-", meaning: "white" },
      { part: "-emia", meaning: "blood condition" },
    ],
    clinicalRelevance:
      "Patients are frequently immunocompromised and thrombocytopenic: strict " +
      "aseptic technique, and longer pressure after the draw.",
    confusableWithIds: ["cond-leukocytosis", "cond-leukopenia"],
    relatedTermIds: ["blood-leukocyte", "safety-immunocompromised"],
    difficulty: 2,
    tags: ["high-yield", "condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-leukocytosis",
    term: "Leukocytosis",
    pronunciation: "loo-koh-sy-TOH-sis",
    category: "hematology-conditions",
    definition: "An abnormally high white blood cell count.",
    partOf: {
      label: "CBC findings",
      detail:
        "A finding, not a diagnosis — most commonly a response to infection, " +
        "inflammation, or stress.",
    },
    wordParts: [
      { part: "leuk(o)-", meaning: "white" },
      { part: "-cytosis", meaning: "increase in cells" },
    ],
    confusableWithIds: ["cond-leukopenia", "cond-leukemia"],
    relatedTermIds: ["blood-leukocyte", "lab-cbc", "wp-cytosis"],
    difficulty: 2,
    tags: ["condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-leukopenia",
    term: "Leukopenia",
    aliases: ["leucopenia"],
    pronunciation: "loo-koh-PEE-nee-uh",
    category: "hematology-conditions",
    definition: "An abnormally low white blood cell count.",
    partOf: {
      label: "CBC findings",
      detail:
        "Often the reason a patient is on protective isolation — their " +
        "defenses against infection are reduced.",
    },
    wordParts: [
      { part: "leuk(o)-", meaning: "white" },
      { part: "-penia", meaning: "deficiency" },
    ],
    clinicalRelevance:
      "Signals a patient who must be protected from *you*: meticulous hand " +
      "hygiene and site antisepsis.",
    confusableWithIds: ["cond-leukocytosis", "cond-thrombocytopenia"],
    relatedTermIds: ["safety-immunocompromised", "wp-penia"],
    difficulty: 2,
    tags: ["condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-thrombocytopenia",
    term: "Thrombocytopenia",
    pronunciation: "throm-boh-sy-toh-PEE-nee-uh",
    category: "hematology-conditions",
    definition: "An abnormally low platelet count.",
    partOf: {
      label: "CBC findings",
      detail:
        "Platelets are the first line of hemostasis, so a low count shows up " +
        "as bruising, petechiae, and prolonged bleeding.",
    },
    wordParts: [
      { part: "thromb(o)-", meaning: "clot" },
      { part: "-cyt(o)-", meaning: "cell" },
      { part: "-penia", meaning: "deficiency" },
    ],
    clinicalRelevance:
      "Hold firm pressure and confirm bleeding has stopped before bandaging. " +
      "Petechiae appearing under the tourniquet is a warning sign.",
    confusableWithIds: ["cond-thrombocytosis", "cond-hemophilia"],
    relatedTermIds: ["blood-thrombocyte", "comp-petechiae", "proc-hemostasis"],
    domain: "complications",
    difficulty: 2,
    tags: ["high-yield", "condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-thrombocytosis",
    term: "Thrombocytosis",
    pronunciation: "throm-boh-sy-TOH-sis",
    category: "hematology-conditions",
    definition: "An abnormally high platelet count.",
    partOf: {
      label: "CBC findings",
      detail:
        "Can be reactive, or part of a myeloproliferative disorder such as " +
        "polycythemia vera.",
    },
    confusableWithIds: ["cond-thrombocytopenia", "cond-polycythemia-vera"],
    relatedTermIds: ["blood-thrombocyte", "wp-cytosis"],
    difficulty: 3,
    tags: ["sound-alike", "condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-hemophilia",
    term: "Hemophilia",
    aliases: ["haemophilia"],
    pronunciation: "hee-moh-FIL-ee-uh",
    category: "hematology-conditions",
    definition:
      "An inherited deficiency of a clotting factor, causing prolonged bleeding.",
    partOf: {
      label: "Coagulation factor disorders",
      detail:
        "Hemophilia A is a factor VIII deficiency; hemophilia B is a factor IX " +
        "deficiency. The platelet count is normal — the cascade is the problem.",
    },
    clinicalRelevance:
      "Apply pressure for considerably longer than usual and check the site " +
      "again before you leave the room.",
    confusableWithIds: ["cond-thrombocytopenia", "cond-dic"],
    relatedTermIds: ["blood-coagulation-cascade", "proc-hemostasis"],
    domain: "complications",
    difficulty: 2,
    tags: ["condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-dic",
    term: "Disseminated intravascular coagulation (DIC)",
    aliases: ["dic"],
    category: "hematology-conditions",
    definition:
      "Widespread clotting throughout small vessels that uses up platelets and " +
      "clotting factors, leaving the patient bleeding.",
    partOf: {
      label: "Coagulation emergencies",
      detail:
        "Clotting and bleeding at the same time, which is what makes it so " +
        "dangerous.",
    },
    clinicalRelevance:
      "Coagulation studies and D-dimer are drawn urgently and repeatedly; the " +
      "light blue tube's fill volume matters more than ever.",
    confusableWithIds: ["cond-hemophilia", "comp-thrombosis"],
    relatedTermIds: ["lab-d-dimer", "add-sodium-citrate"],
    difficulty: 3,
    tags: ["condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-hemochromatosis",
    term: "Hemochromatosis",
    pronunciation: "hee-moh-kroh-muh-TOH-sis",
    category: "hematology-conditions",
    definition:
      "An iron overload disorder in which the body absorbs and stores far too " +
      "much iron.",
    partOf: {
      label: "Indications for therapeutic phlebotomy",
      detail:
        "Alongside polycythemia vera, one of the two conditions a phlebotomy " +
        "student is expected to associate with removing blood as treatment.",
    },
    clinicalRelevance:
      "Removing a unit of blood removes the iron locked inside its hemoglobin.",
    confusableWithIds: ["cond-polycythemia-vera"],
    relatedTermIds: ["proc-therapeutic-phlebotomy"],
    domain: "special-collections",
    difficulty: 2,
    tags: ["high-yield", "condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-bacteremia",
    term: "Bacteremia",
    aliases: ["bacteraemia"],
    pronunciation: "bak-teh-REE-mee-uh",
    category: "hematology-conditions",
    definition: "The presence of bacteria in the bloodstream.",
    partOf: {
      label: "Bloodstream infection",
      detail:
        "Septicemia describes the systemic illness that can follow; sepsis is " +
        "the body's damaging response to it.",
    },
    clinicalRelevance:
      "The reason blood cultures exist, and the reason skin antisepsis must be " +
      "flawless — skin flora in the bottle produces a false positive that can " +
      "put a patient on antibiotics they never needed.",
    confusableWithIds: ["cond-septicemia"],
    relatedTermIds: ["lab-blood-culture", "safety-aseptic-technique"],
    domain: "special-collections",
    difficulty: 2,
    tags: ["condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-septicemia",
    term: "Septicemia",
    aliases: ["septicaemia", "blood poisoning"],
    pronunciation: "sep-tih-SEE-mee-uh",
    category: "hematology-conditions",
    definition:
      "A systemic illness caused by pathogens and their toxins multiplying in " +
      "the bloodstream.",
    partOf: {
      label: "Bloodstream infection",
      detail:
        "Bacteremia is the finding — organisms present. Septicemia is the " +
        "patient being made ill by them.",
    },
    confusableWithIds: ["cond-bacteremia"],
    relatedTermIds: ["lab-blood-culture"],
    difficulty: 2,
    tags: ["sound-alike", "condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-jaundice",
    term: "Jaundice",
    aliases: ["icterus (patient)"],
    pronunciation: "JAWN-dis",
    category: "hematology-conditions",
    definition:
      "Yellowing of the skin and eyes caused by a build-up of bilirubin.",
    partOf: {
      label: "Signs of liver or hemolytic disease",
      detail:
        "The patient-facing word. When the *specimen* is yellow from bilirubin " +
        "it is called icteric.",
    },
    clinicalRelevance:
      "Bilirubin is light-sensitive: neonatal bilirubin specimens are " +
      "protected from light and delivered quickly.",
    confusableWithIds: ["hand-icteric"],
    relatedTermIds: ["hand-icteric", "lab-bilirubin"],
    difficulty: 2,
    tags: ["sound-alike", "condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "cond-diabetes-mellitus",
    term: "Diabetes mellitus",
    aliases: ["diabetes", "dm"],
    category: "hematology-conditions",
    definition:
      "A disorder of glucose regulation in which blood glucose stays " +
      "abnormally high.",
    partOf: {
      label: "Endocrine and metabolic disorders",
      detail:
        "Monitored with fasting glucose, glucose tolerance testing, and " +
        "hemoglobin A1c.",
    },
    clinicalRelevance:
      "Drives most of the fasting and timed-collection rules a phlebotomist " +
      "follows, and makes correct gray-tube selection matter.",
    relatedTermIds: ["lab-glucose", "lab-gtt", "lab-hba1c", "proc-fasting"],
    domain: "patient-preparation",
    difficulty: 1,
    tags: ["condition"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
];
