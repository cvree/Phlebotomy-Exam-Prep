import type { VocabTerm } from "@/types/vocab";
import {
  SRC_CDC_HAND_HYGIENE,
  SRC_CDC_STANDARD_PRECAUTIONS,
  SRC_OSHA_BBP,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

/**
 * Safety, law, and compliance.
 *
 * Regulations are named and described in general terms only. Nothing here
 * quotes statutory text or supplies a compliance interpretation — the source
 * notes in `data/sources.ts` say exactly how far the verification goes.
 */

const base = [SRC_TEXTBOOK_CURRICULUM];
const osha = [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM];

export const SAFETY_TERMS: VocabTerm[] = [
  {
    id: "safety-standard-precautions",
    term: "Standard precautions",
    category: "safety-compliance",
    definition:
      "Treating every patient's blood and body fluids as though they are " +
      "infectious, regardless of diagnosis.",
    partOf: {
      label: "CDC infection control practice",
      detail:
        "The baseline applied to every patient, every time. " +
        "Transmission-based precautions are added on top when a specific " +
        "organism is known or suspected.",
    },
    clinicalRelevance:
      "You will rarely know a patient's status. The precautions are designed " +
      "so that you do not need to.",
    confusableWithIds: ["safety-transmission-based"],
    relatedTermIds: ["safety-ppe", "safety-bbp", "safety-hand-hygiene"],
    domain: "safety-infection-control",
    difficulty: 1,
    tags: ["high-yield"],
    sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-transmission-based",
    term: "Transmission-based precautions",
    category: "safety-compliance",
    definition:
      "Extra precautions used for patients known or suspected to be infected " +
      "with a specific organism.",
    partOf: {
      label: "CDC infection control practice",
      detail:
        "Three categories: contact, droplet, and airborne. Each adds specific " +
        "PPE and room requirements on top of standard precautions.",
    },
    confusableWithIds: ["safety-standard-precautions", "safety-immunocompromised"],
    relatedTermIds: ["safety-ppe", "safety-standard-precautions"],
    domain: "safety-infection-control",
    difficulty: 2,
    tags: ["high-yield"],
    sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-immunocompromised",
    term: "Protective isolation",
    aliases: ["reverse isolation", "neutropenic precautions"],
    category: "safety-compliance",
    definition:
      "Precautions that protect a vulnerable patient from the people and " +
      "environment around them, rather than the reverse.",
    partOf: {
      label: "Isolation practice",
      detail:
        "Used for patients whose defenses are down — after transplant, during " +
        "chemotherapy, or with severe leukopenia.",
    },
    clinicalRelevance:
      "Here the direction of the barrier flips: you gown and mask so that you " +
      "do not bring anything to the patient.",
    confusableWithIds: ["safety-transmission-based"],
    relatedTermIds: ["cond-leukopenia", "safety-ppe"],
    domain: "safety-infection-control",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-bbp",
    term: "Bloodborne Pathogens Standard",
    aliases: ["bbp", "osha bloodborne pathogens standard", "29 cfr 1910.1030"],
    category: "safety-compliance",
    definition:
      "The OSHA regulation governing occupational exposure to blood and other " +
      "potentially infectious materials.",
    partOf: {
      label: "OSHA regulation, 29 CFR 1910.1030",
      detail:
        "Requires an exposure control plan, training, engineering and work " +
        "practice controls, PPE, and the hepatitis B vaccine offered at no " +
        "cost to the employee.",
    },
    clinicalRelevance:
      "It is why safety-engineered needles, sharps containers, and your " +
      "hepatitis B vaccination offer exist.",
    relatedTermIds: [
      "safety-engineering-controls",
      "safety-needlestick",
      "safety-ppe",
    ],
    domain: "safety-infection-control",
    difficulty: 1,
    tags: ["high-yield"],
    sources: osha,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-ppe",
    term: "PPE (personal protective equipment)",
    aliases: ["ppe", "personal protective equipment"],
    category: "safety-compliance",
    definition:
      "Barriers worn to keep infectious material off skin, clothing, and " +
      "mucous membranes — gloves, gowns, masks, and eye protection.",
    partOf: {
      label: "Required controls under the Bloodborne Pathogens Standard",
      detail:
        "The last line of defense, after engineering controls and safe work " +
        "practices have done what they can.",
    },
    clinicalRelevance:
      "Gloves are changed between patients and are never a substitute for hand " +
      "hygiene — hands are washed after removing them.",
    relatedTermIds: ["safety-bbp", "safety-hand-hygiene"],
    domain: "safety-infection-control",
    difficulty: 1,
    tags: ["high-yield"],
    sources: osha,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-hand-hygiene",
    term: "Hand hygiene",
    category: "safety-compliance",
    definition:
      "Cleaning hands with soap and water or an alcohol-based hand rub to " +
      "remove or kill organisms.",
    partOf: {
      label: "Standard precautions",
      detail:
        "The single most effective infection control measure, performed before " +
        "gloving and after removing gloves.",
    },
    clinicalRelevance:
      "Alcohol rub is not enough when hands are visibly soiled, or after " +
      "caring for a patient with *C. difficile* — those need soap and water.",
    relatedTermIds: ["safety-ppe", "safety-standard-precautions"],
    domain: "safety-infection-control",
    difficulty: 1,
    tags: ["high-yield"],
    sources: [SRC_CDC_HAND_HYGIENE, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-engineering-controls",
    term: "Engineering controls",
    category: "safety-compliance",
    definition:
      "Devices that isolate or remove a hazard from the workplace — safety " +
      "needles, sharps containers, self-sheathing devices.",
    partOf: {
      label: "The hierarchy of controls under the Bloodborne Pathogens Standard",
      detail:
        "Engineering controls change the equipment; work practice controls " +
        "change the behavior; PPE is the barrier of last resort.",
    },
    mnemonic:
      "Engineering = equipment. Work practice = what you do with your hands.",
    confusableWithIds: ["safety-work-practice-controls", "safety-ppe"],
    relatedTermIds: ["safety-sharps-container", "safety-bbp"],
    domain: "safety-infection-control",
    difficulty: 2,
    tags: ["high-yield", "sound-alike"],
    sources: osha,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-work-practice-controls",
    term: "Work practice controls",
    category: "safety-compliance",
    definition:
      "Changes to how a task is performed that reduce exposure — not recapping " +
      "needles, disposing of sharps at the point of use, no eating in the lab.",
    partOf: {
      label: "The hierarchy of controls under the Bloodborne Pathogens Standard",
      detail:
        "The behavior half of the pairing with engineering controls.",
    },
    confusableWithIds: ["safety-engineering-controls"],
    relatedTermIds: ["safety-sharps-container", "safety-needlestick"],
    domain: "safety-infection-control",
    difficulty: 2,
    tags: ["high-yield", "sound-alike"],
    sources: osha,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-sharps-container",
    term: "Sharps container",
    category: "safety-compliance",
    definition:
      "A rigid, puncture-resistant, leak-proof, labeled container for used " +
      "needles and other sharps.",
    partOf: {
      label: "Required engineering controls",
      detail:
        "Kept as close to the point of use as possible, and replaced when it " +
        "reaches the manufacturer's fill line rather than when it is full.",
    },
    clinicalRelevance:
      "The needle goes in immediately after activation of its safety feature, " +
      "with the whole assembly, and is never recapped or carried down a hall.",
    relatedTermIds: ["safety-needlestick", "safety-engineering-controls"],
    domain: "safety-infection-control",
    difficulty: 1,
    tags: ["high-yield"],
    sources: osha,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-needlestick",
    term: "Needlestick exposure",
    aliases: ["needlestick", "sharps injury", "percutaneous exposure"],
    category: "safety-compliance",
    definition:
      "An injury in which a contaminated needle or sharp breaks the skin.",
    partOf: {
      label: "Occupational exposure incidents",
      detail:
        "Reportable under the exposure control plan; the source patient's " +
        "testing and any follow-up are handled by employee health.",
    },
    clinicalRelevance:
      "Wash the site with soap and water immediately, then report it at once. " +
      "Post-exposure options are time-sensitive, and an unreported stick cannot " +
      "be treated.",
    relatedTermIds: ["safety-bbp", "safety-sharps-container", "proc-anchoring"],
    domain: "safety-infection-control",
    difficulty: 1,
    tags: ["high-yield"],
    sources: osha,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-aseptic-technique",
    term: "Aseptic technique",
    pronunciation: "ay-SEP-tik",
    category: "safety-compliance",
    definition:
      "Working in a way that keeps organisms out of a site or specimen.",
    partOf: {
      label: "Infection control practice",
      detail:
        "At its most rigorous for blood cultures, where the antiseptic must be " +
        "applied for the full contact time and allowed to dry.",
    },
    wordParts: [
      { part: "a-", meaning: "without" },
      { part: "sept-", meaning: "infection / putrefaction" },
    ],
    relatedTermIds: ["lab-blood-culture", "safety-antiseptic"],
    domain: "safety-infection-control",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-antiseptic",
    term: "Antiseptic (versus disinfectant)",
    aliases: ["antiseptic", "disinfectant"],
    category: "safety-compliance",
    definition:
      "An antiseptic is used on living tissue; a disinfectant is used on " +
      "surfaces and equipment.",
    partOf: {
      label: "Infection control agents",
      detail:
        "70% isopropyl alcohol is the routine skin antiseptic; a dilute bleach " +
        "solution is a common surface disinfectant. They are not " +
        "interchangeable.",
    },
    clinicalRelevance:
      "Alcohol must be allowed to dry: wet alcohol stings, contaminates the " +
      "specimen, and causes hemolysis. For a blood alcohol collection, a " +
      "non-alcohol antiseptic is used instead.",
    mnemonic: "Anti-septic goes on Anatomy; disinfectant goes on Desks.",
    confusableWithIds: ["safety-aseptic-technique"],
    relatedTermIds: ["hand-hemolysis", "lab-toxicology"],
    domain: "safety-infection-control",
    difficulty: 2,
    tags: ["high-yield", "sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-biohazard",
    term: "Biohazard",
    category: "safety-compliance",
    definition:
      "A biological material capable of causing harm, and the label warning of " +
      "it.",
    partOf: {
      label: "Hazard communication requirements",
      detail:
        "The orange-red symbol must appear on specimen transport bags, sharps " +
        "containers, refrigerators holding specimens, and regulated waste.",
    },
    relatedTermIds: ["safety-bbp", "safety-sharps-container"],
    domain: "safety-infection-control",
    difficulty: 1,
    tags: [],
    sources: osha,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-hipaa",
    term: "HIPAA",
    aliases: ["health insurance portability and accountability act"],
    pronunciation: "HIP-uh",
    category: "safety-compliance",
    definition:
      "The federal law setting national standards for protecting patients' " +
      "identifiable health information.",
    partOf: {
      label: "U.S. healthcare privacy law",
      detail:
        "Covers what may be disclosed, to whom, and under what circumstances. " +
        "Protected health information includes far more than a diagnosis.",
    },
    clinicalRelevance:
      "Discussing a patient in a corridor, leaving a requisition face-up, or " +
      "looking up a relative's results are all violations.",
    confusableWithIds: ["safety-clia", "proc-informed-consent"],
    relatedTermIds: ["proc-informed-consent", "hand-chain-of-custody"],
    domain: "patient-identification",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-clia",
    term: "CLIA",
    aliases: ["clinical laboratory improvement amendments"],
    pronunciation: "KLEE-uh",
    category: "safety-compliance",
    definition:
      "The federal standards that regulate laboratory testing quality on human " +
      "specimens in the United States.",
    partOf: {
      label: "U.S. laboratory regulation",
      detail:
        "Categorizes tests by complexity — waived, moderate, and high — with " +
        "different personnel and quality requirements for each.",
    },
    confusableWithIds: ["safety-hipaa"],
    relatedTermIds: ["safety-scope-of-practice"],
    difficulty: 2,
    tags: ["high-yield", "sound-alike"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-scope-of-practice",
    term: "Scope of practice",
    category: "safety-compliance",
    definition:
      "The boundary of what a certified or licensed person is permitted and " +
      "trained to do.",
    partOf: {
      label: "Professional accountability",
      detail:
        "Set by state law, by certification, and by facility policy — whichever " +
        "is most restrictive governs.",
    },
    clinicalRelevance:
      "Interpreting a result, advising on a diagnosis, or performing a " +
      "procedure you are not authorized for all fall outside it, however " +
      "confident you feel.",
    relatedTermIds: ["safety-negligence", "proc-informed-consent"],
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "safety-negligence",
    term: "Negligence",
    category: "safety-compliance",
    definition:
      "Failure to give the standard of care a reasonable person in the same " +
      "role would give, resulting in harm.",
    partOf: {
      label: "Legal concepts in healthcare",
      detail:
        "Malpractice is negligence by a professional acting in their " +
        "professional capacity.",
    },
    clinicalRelevance:
      "Drawing from a patient who refused, leaving a fainting patient alone, or " +
      "continuing to probe through nerve pain are the examples typically used.",
    confusableWithIds: ["safety-scope-of-practice"],
    relatedTermIds: ["proc-informed-consent", "comp-nerve-injury"],
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
];
