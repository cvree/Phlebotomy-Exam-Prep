import type { VocabTerm } from "@/types/vocab";
import {
  SRC_CLSI_GP41,
  SRC_MANUFACTURER_IFU,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

/**
 * Additives.
 *
 * Every entry answers three things a student is actually asked: what the
 * additive is, what it does *chemically*, and which tube it belongs to. The
 * third is the `partOf` relation, and it is what turns a list of colors into
 * something derivable.
 *
 * Closure colors are conventions, not guarantees — the caveat lives on the
 * study pages and on every surface that renders a tube.
 */

const base = [SRC_CLSI_GP41, SRC_MANUFACTURER_IFU, SRC_TEXTBOOK_CURRICULUM];

export const TUBE_ADDITIVE_TERMS: VocabTerm[] = [
  {
    id: "add-anticoagulant",
    term: "Anticoagulant",
    pronunciation: "an-tee-koh-AG-yoo-lant",
    category: "tube-additives",
    definition:
      "An additive that prevents blood from clotting in the tube.",
    partOf: {
      label: "Lavender, light blue, green, gray, and yellow SPS tubes",
      detail:
        "Any tube that yields whole blood or plasma contains one. Red and gold " +
        "tubes contain the opposite — a clot activator.",
    },
    wordParts: [
      { part: "anti-", meaning: "against" },
      { part: "coagul-", meaning: "clotting" },
    ],
    clinicalRelevance:
      "Anticoagulated tubes must be inverted gently right after collection. " +
      "An unmixed tube clots, and a clotted CBC is unusable.",
    confusableWithIds: ["add-clot-activator", "add-antiglycolytic"],
    relatedTermIds: ["add-edta", "add-heparin", "add-sodium-citrate"],
    domain: "order-of-draw",
    difficulty: 1,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-chelation",
    term: "Chelation",
    aliases: ["chelating agent", "chelate"],
    pronunciation: "kee-LAY-shun",
    category: "tube-additives",
    definition:
      "Binding a metal ion so tightly that it is removed from the reaction — " +
      "how EDTA and citrate stop clotting.",
    partOf: {
      label: "The mechanism behind EDTA and citrate tubes",
      detail:
        "Both chelate calcium (factor IV). Without free calcium the " +
        "coagulation cascade cannot proceed.",
    },
    mnemonic: "A chelate is a claw — it grabs the calcium and will not let go.",
    relatedTermIds: ["add-edta", "add-sodium-citrate", "blood-coagulation-cascade"],
    difficulty: 3,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-edta",
    term: "EDTA",
    aliases: [
      "ethylenediaminetetraacetic acid",
      "k2 edta",
      "k3 edta",
      "potassium edta",
    ],
    pronunciation: "ee-dee-tee-AY",
    category: "tube-additives",
    definition:
      "An anticoagulant that irreversibly chelates calcium and preserves cell " +
      "shape for counting.",
    detail:
      "Supplied as a potassium salt (K₂ spray-dried, K₃ liquid). It is the " +
      "additive that best preserves cell morphology, which is why hematology " +
      "runs on it.",
    partOf: {
      label: "Lavender / purple tube (and the pink blood bank tube)",
      detail:
        "Both the lavender and pink closures carry EDTA; the pink tube is a " +
        "blood-bank-labeled version with specific labeling requirements.",
    },
    clinicalRelevance:
      "EDTA carryover into a later tube falsely lowers calcium and falsely " +
      "raises potassium — one of the main reasons the order of draw exists.",
    mnemonic: "EDTA = Everything Do The Anticoagulating, for the CBC.",
    confusableWithIds: ["add-sodium-citrate", "add-heparin", "add-potassium-oxalate"],
    relatedTermIds: ["lab-cbc", "add-carryover", "add-chelation"],
    domain: "order-of-draw",
    difficulty: 1,
    tags: ["high-yield", "additive"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-sodium-citrate",
    term: "Sodium citrate",
    aliases: ["citrate", "3.2% sodium citrate", "buffered sodium citrate"],
    pronunciation: "SOH-dee-um SIT-rayt",
    category: "tube-additives",
    definition:
      "A 3.2% anticoagulant that binds calcium reversibly, leaving the clotting " +
      "factors intact for coagulation testing.",
    partOf: {
      label: "Light blue tube",
      detail:
        "Drawn second in the CLSI order, after blood cultures, so that no " +
        "other additive can contaminate it.",
    },
    clinicalRelevance:
      "The 9:1 blood-to-citrate ratio is part of the test. A short-filled light " +
      "blue tube is over-anticoagulated and gets rejected.",
    mnemonic: "Citrate is reversible — the factors must survive to be measured.",
    confusableWithIds: ["add-edta", "add-heparin"],
    relatedTermIds: ["lab-pt-inr", "lab-aptt", "add-chelation", "hand-qns"],
    domain: "order-of-draw",
    difficulty: 1,
    tags: ["high-yield", "additive"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-heparin",
    term: "Heparin",
    aliases: ["lithium heparin", "sodium heparin", "ammonium heparin"],
    pronunciation: "HEP-uh-rin",
    category: "tube-additives",
    definition:
      "An anticoagulant that works by activating antithrombin, which then " +
      "inhibits thrombin and factor Xa.",
    detail:
      "It is the only common tube anticoagulant that does not work by binding " +
      "calcium, which is why heparinized plasma can be used for electrolytes.",
    partOf: {
      label: "Green tube (and the light green / PST plasma separator tube)",
      detail:
        "Lithium heparin for most chemistry; sodium heparin where lithium " +
        "levels are being measured; the salt matters.",
    },
    clinicalRelevance:
      "Lithium heparin cannot be used for a lithium level, and sodium heparin " +
      "cannot be used for a sodium level. The salt is part of the answer.",
    confusableWithIds: ["add-edta", "add-sodium-citrate"],
    relatedTermIds: ["lab-electrolytes", "lab-ammonia"],
    domain: "order-of-draw",
    difficulty: 2,
    tags: ["high-yield", "additive"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-antiglycolytic",
    term: "Antiglycolytic agent",
    pronunciation: "an-tee-gly-koh-LIT-ik",
    category: "tube-additives",
    definition:
      "An additive that stops blood cells from continuing to consume glucose " +
      "after collection.",
    partOf: {
      label: "Gray tube",
      detail:
        "Sodium fluoride is the antiglycolytic; it is paired with potassium " +
        "oxalate, which does the actual anticoagulating.",
    },
    wordParts: [
      { part: "anti-", meaning: "against" },
      { part: "glyc(o)-", meaning: "sugar" },
      { part: "-lysis", meaning: "breakdown" },
    ],
    clinicalRelevance:
      "Without it, glucose falls roughly 5–7% per hour at room temperature and " +
      "the result reads falsely low.",
    confusableWithIds: ["add-anticoagulant"],
    relatedTermIds: ["add-sodium-fluoride", "hand-glycolysis", "lab-glucose"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-sodium-fluoride",
    term: "Sodium fluoride",
    aliases: ["naf", "fluoride"],
    category: "tube-additives",
    definition:
      "The antiglycolytic additive that preserves glucose by poisoning the " +
      "cells' glycolysis pathway.",
    partOf: {
      label: "Gray tube",
      detail:
        "Usually combined with potassium oxalate; sodium fluoride alone " +
        "preserves glucose but does not prevent clotting.",
    },
    clinicalRelevance:
      "The tube of choice for glucose tolerance testing and blood alcohol " +
      "collection, where the sample may sit before it is run.",
    confusableWithIds: ["add-potassium-oxalate", "add-antiglycolytic"],
    relatedTermIds: ["lab-glucose", "lab-gtt", "add-antiglycolytic"],
    domain: "order-of-draw",
    difficulty: 2,
    tags: ["high-yield", "additive"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-potassium-oxalate",
    term: "Potassium oxalate",
    aliases: ["oxalate"],
    pronunciation: "poh-TAS-ee-um OKS-uh-layt",
    category: "tube-additives",
    definition:
      "An anticoagulant that precipitates calcium out of solution, used " +
      "alongside sodium fluoride.",
    partOf: {
      label: "Gray tube",
      detail:
        "The anticoagulant half of the gray tube's pairing — fluoride " +
        "preserves the glucose, oxalate keeps the specimen liquid.",
    },
    confusableWithIds: ["add-sodium-fluoride", "add-edta"],
    relatedTermIds: ["add-sodium-fluoride"],
    domain: "order-of-draw",
    difficulty: 3,
    tags: ["additive"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-sps",
    term: "SPS (sodium polyanethol sulfonate)",
    aliases: ["sps", "sodium polyanethol sulfonate", "sodium polyanetholsulfonate"],
    category: "tube-additives",
    definition:
      "An anticoagulant that also reduces the action of complement, phagocytes, " +
      "and some antibiotics so organisms can grow.",
    partOf: {
      label: "Yellow SPS tube and blood culture bottles",
      detail:
        "Collected first in the order of draw to protect sterility, regardless " +
        "of what else is ordered.",
    },
    clinicalRelevance:
      "The reason blood cultures go first: any other tube touching the needle " +
      "first risks contaminating a test whose whole purpose is sterility.",
    confusableWithIds: ["add-acd"],
    relatedTermIds: ["lab-blood-culture", "safety-aseptic-technique"],
    domain: "order-of-draw",
    difficulty: 2,
    tags: ["high-yield", "additive"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-acd",
    term: "ACD (acid citrate dextrose)",
    aliases: ["acd", "acid citrate dextrose"],
    category: "tube-additives",
    definition:
      "A citrate anticoagulant with added dextrose that keeps cells alive and " +
      "viable for testing.",
    partOf: {
      label: "Yellow ACD tube",
      detail:
        "A different yellow tube from the SPS one — same closure color, " +
        "completely different purpose. Read the label band.",
    },
    clinicalRelevance:
      "Used for DNA testing, HLA typing, and parentage studies, where the " +
      "cells themselves must survive to be analyzed.",
    mnemonic:
      "Two yellows: SPS grows bugs, ACD keeps cells alive for DNA.",
    confusableWithIds: ["add-sps", "add-sodium-citrate"],
    relatedTermIds: ["lab-hla-typing"],
    domain: "special-collections",
    difficulty: 3,
    tags: ["sound-alike", "additive"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-clot-activator",
    term: "Clot activator",
    aliases: ["silica", "silica clot activator"],
    category: "tube-additives",
    definition:
      "Silica particles that speed up clotting by giving platelets a surface " +
      "to activate on.",
    partOf: {
      label: "Red (plastic) and gold / SST tubes",
      detail:
        "The functional opposite of an anticoagulant: these tubes are meant " +
        "to clot, because the test needs serum.",
    },
    clinicalRelevance:
      "Even with an activator, the tube must clot fully — usually about 30 " +
      "minutes — before it is centrifuged.",
    confusableWithIds: ["add-anticoagulant", "add-thixotropic-gel"],
    relatedTermIds: ["blood-serum", "add-thixotropic-gel"],
    domain: "order-of-draw",
    difficulty: 2,
    tags: ["high-yield", "additive"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-thixotropic-gel",
    term: "Thixotropic separator gel",
    aliases: ["separator gel", "gel", "sst gel"],
    pronunciation: "thik-soh-TROH-pik",
    category: "tube-additives",
    definition:
      "An inert gel with a density between cells and serum that forms a " +
      "physical barrier during centrifugation.",
    partOf: {
      label: "Gold / SST serum tubes and light green / PST plasma tubes",
      detail:
        "The gel is not an anticoagulant and does nothing until the tube is " +
        "spun; it then migrates to the middle and locks the layers apart.",
    },
    clinicalRelevance:
      "Gel can absorb some drugs, so therapeutic drug monitoring often calls " +
      "for a plain red tube instead. Never re-spin a gel tube after the " +
      "barrier has formed.",
    confusableWithIds: ["add-clot-activator"],
    relatedTermIds: ["blood-serum", "hand-centrifugation", "hand-aliquot"],
    domain: "specimen-handling",
    difficulty: 2,
    tags: ["high-yield", "additive"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-thrombin",
    term: "Thrombin",
    pronunciation: "THROM-bin",
    category: "tube-additives",
    definition:
      "The enzyme that converts fibrinogen to fibrin; added to some tubes to " +
      "produce serum in about five minutes.",
    partOf: {
      label: "Orange / rapid serum tubes (RST)",
      detail:
        "Used when a STAT chemistry cannot wait the usual 30-minute clotting " +
        "time.",
    },
    confusableWithIds: ["add-clot-activator"],
    relatedTermIds: ["blood-fibrin", "hand-stat"],
    domain: "specimen-handling",
    difficulty: 3,
    tags: ["additive"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-trace-element-free",
    term: "Trace element-free tube",
    aliases: ["royal blue tube", "trace metal tube"],
    category: "tube-additives",
    definition:
      "A tube manufactured to contain no detectable metal contamination, for " +
      "testing metals at trace concentrations.",
    partOf: {
      label: "Royal blue tube",
      detail:
        "Comes in more than one version — with EDTA, with heparin, or with no " +
        "additive at all. The label band, not the cap, tells you which.",
    },
    clinicalRelevance:
      "Ordinary tube glass and stoppers leach enough zinc or lead to ruin a " +
      "trace element result, so the tube itself is the control.",
    relatedTermIds: ["lab-toxicology"],
    domain: "special-collections",
    difficulty: 3,
    tags: [],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "add-carryover",
    term: "Additive carryover",
    aliases: ["carryover", "cross-contamination"],
    category: "tube-additives",
    definition:
      "Transfer of additive from one tube into the next through the needle, " +
      "altering the second tube's results.",
    partOf: {
      label: "The rationale for the order of draw",
      detail:
        "The CLSI sequence exists to make any carryover that does happen " +
        "harmless to the tube that follows.",
    },
    clinicalRelevance:
      "The classic example: EDTA carried into a chemistry tube gives a falsely " +
      "high potassium and a falsely low calcium.",
    relatedTermIds: ["add-edta", "proc-order-of-draw"],
    domain: "order-of-draw",
    difficulty: 2,
    tags: ["high-yield"],
    sources: base,
    reviewStatus: "needs-review",
    version: 1,
  },
];
