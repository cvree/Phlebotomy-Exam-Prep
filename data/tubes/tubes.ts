import type { Tube } from "@/types/content";
import {
  SRC_CLSI_GP41,
  SRC_MANUFACTURER_IFU,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

/**
 * Blood collection tubes as study objects.
 *
 * Closure colour is a convention, not a guarantee: additives and colours vary
 * by manufacturer, and some facilities stock tubes that do not match the
 * pattern below. Every surface that renders a tube also renders its additive
 * and colour *name*, so nothing depends on colour perception alone.
 */

const baseSources = [SRC_CLSI_GP41, SRC_MANUFACTURER_IFU, SRC_TEXTBOOK_CURRICULUM];

export const TUBES: Tube[] = [
  {
    id: "blood-culture",
    displayName: "Blood culture bottle / yellow SPS",
    colorNames: ["Yellow (SPS)", "Culture bottle"],
    swatch: { cap: "#E5B416", body: "#F5E9C4", label: "#7A5B00" },
    additive: "Sodium polyanethol sulfonate (SPS), or culture broth",
    additiveAction:
      "Anticoagulates and reduces the action of complement, phagocytes, and " +
      "some antibiotics so organisms can grow.",
    specimenType: "Whole blood (sterile)",
    commonUses: ["Blood cultures (aerobic and anaerobic)"],
    orderOfDrawPosition: 1,
    inversions: "8–10 gentle inversions",
    specialHandling: [
      "Requires rigorous site antisepsis before collection",
      "Drawn first to protect sterility, regardless of the other tubes ordered",
      "Follow your facility's bottle order and fill volume exactly",
    ],
    caveats: [
      "Fill volume matters: under-filling reduces organism recovery and " +
        "over-filling can dilute the broth.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "light-blue",
    displayName: "Light blue",
    colorNames: ["Light blue"],
    swatch: { cap: "#7FBEE8", body: "#DCEEF9", label: "#0F4E75" },
    additive: "3.2% buffered sodium citrate",
    additiveAction:
      "Binds calcium reversibly, which stops the coagulation cascade without " +
      "destroying the clotting factors being measured.",
    specimenType: "Plasma",
    commonUses: [
      "Prothrombin time (PT/INR)",
      "Activated partial thromboplastin time (aPTT)",
      "Fibrinogen and factor assays",
      "D-dimer",
    ],
    orderOfDrawPosition: 2,
    inversions: "3–4 gentle inversions",
    specialHandling: [
      "Must be filled to the indicated line — the 9:1 blood-to-citrate ratio " +
        "is part of the test",
      "Short draws are a common rejection reason",
    ],
    caveats: [
      "A discard tube may be required before the citrate tube when a winged " +
        "(butterfly) set is used, because the tubing holds air that would " +
        "otherwise short-fill the tube. Follow your facility's policy.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "red-plain",
    displayName: "Red (plain / clot activator)",
    colorNames: ["Red"],
    swatch: { cap: "#C0392B", body: "#F6DAD6", label: "#7A1F16" },
    additive:
      "None (glass), or silica clot activator (plastic). No gel separator.",
    additiveAction:
      "Blood is allowed to clot completely; the liquid left above the clot is " +
      "serum.",
    specimenType: "Serum",
    commonUses: [
      "Chemistry panels",
      "Serology and immunology",
      "Blood bank (facility dependent)",
      "Therapeutic drug monitoring where gel is contraindicated",
    ],
    orderOfDrawPosition: 3,
    inversions: "5 inversions (plastic with clot activator); none for plain glass",
    specialHandling: [
      "Must clot fully before centrifugation — typically about 30 minutes",
    ],
    caveats: [
      "Some drug assays require a gel-free tube because the gel can absorb " +
        "the drug. Check the assay requirements.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "gold-sst",
    displayName: "Gold / red–grey (SST)",
    colorNames: ["Gold", "Red and grey marbled ('tiger top')"],
    swatch: { cap: "#D4A017", body: "#F7EBCB", label: "#6B4E06" },
    additive: "Silica clot activator plus thixotropic separator gel",
    additiveAction:
      "Speeds clotting, then the gel forms a physical barrier between serum " +
      "and cells during centrifugation.",
    specimenType: "Serum",
    commonUses: [
      "Routine chemistry panels",
      "Lipid panels",
      "Thyroid and hormone testing",
    ],
    orderOfDrawPosition: 3,
    inversions: "5 inversions",
    specialHandling: [
      "Allow full clotting before spinning",
      "Do not re-spin a gel tube after the barrier has formed",
    ],
    caveats: [
      "Gel can interfere with some drug levels and certain immunoassays.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "green-heparin",
    displayName: "Green",
    colorNames: ["Green", "Dark green"],
    additive: "Sodium heparin or lithium heparin",
    swatch: { cap: "#1E8449", body: "#D6EEDD", label: "#0E4A28" },
    additiveAction:
      "Activates antithrombin, which inhibits thrombin and factor Xa, so no " +
      "clot forms and plasma can be tested immediately.",
    specimenType: "Plasma",
    commonUses: [
      "STAT and routine chemistry",
      "Ammonia",
      "Lactate",
      "Chromosome / cytogenetic studies (sodium heparin)",
    ],
    orderOfDrawPosition: 4,
    inversions: "8–10 inversions",
    specialHandling: [
      "Mix promptly and thoroughly — heparin tubes clot if under-mixed",
    ],
    caveats: [
      "Lithium heparin cannot be used for lithium levels; sodium heparin " +
        "cannot be used for sodium levels.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "light-green-pst",
    displayName: "Light green / green–grey (PST)",
    colorNames: ["Light green", "Green and grey marbled"],
    swatch: { cap: "#7DCEA0", body: "#E4F5EA", label: "#1D6B41" },
    additive: "Lithium heparin plus separator gel",
    additiveAction:
      "Heparin prevents clotting; the gel separates plasma from cells during " +
      "centrifugation.",
    specimenType: "Plasma",
    commonUses: ["Rapid-turnaround chemistry panels", "Electrolytes"],
    orderOfDrawPosition: 4,
    inversions: "8–10 inversions",
    caveats: [
      "Same lithium and gel interference considerations as the tubes above.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "lavender-edta",
    displayName: "Lavender / purple",
    colorNames: ["Lavender", "Purple"],
    swatch: { cap: "#8E6BBF", body: "#EAE1F5", label: "#4A2D75" },
    additive: "K2 or K3 EDTA",
    additiveAction:
      "Chelates calcium irreversibly, preventing clotting while preserving " +
      "cell shape and size for counting.",
    specimenType: "Whole blood",
    commonUses: [
      "Complete blood count (CBC)",
      "ESR",
      "Haemoglobin A1c",
      "Peripheral blood smears",
      "Reticulocyte count",
    ],
    orderOfDrawPosition: 5,
    inversions: "8–10 inversions",
    specialHandling: [
      "Mix immediately — clots and microclots invalidate cell counts",
      "Fill adequately: excess EDTA relative to blood shrinks red cells",
    ],
    caveats: [
      "EDTA carryover into a later tube can falsely lower calcium and " +
        "falsely raise potassium. This is the main reason EDTA sits late in " +
        "the order of draw.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "pink-edta",
    displayName: "Pink",
    colorNames: ["Pink"],
    swatch: { cap: "#E48AAE", body: "#FADCE7", label: "#8C2F55" },
    additive: "K2 EDTA",
    additiveAction: "Same chelation mechanism as the lavender EDTA tube.",
    specimenType: "Whole blood",
    commonUses: [
      "Blood bank: type and screen, crossmatch",
      "Antibody screening",
    ],
    orderOfDrawPosition: 5,
    inversions: "8–10 inversions",
    specialHandling: [
      "Blood bank labelling requirements are stricter than routine testing — " +
        "many facilities require the collector's identifier and the exact " +
        "collection time on the tube",
    ],
    caveats: [
      "Not every facility uses pink for blood bank. Follow local policy.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "pearl-white",
    displayName: "Pearl white / white",
    colorNames: ["Pearl white", "White"],
    swatch: { cap: "#E8E6E1", body: "#F7F6F4", label: "#5C574E" },
    additive: "K2 EDTA plus separator gel",
    additiveAction:
      "EDTA prevents clotting; the gel isolates plasma for nucleic acid work.",
    specimenType: "Plasma",
    commonUses: ["Molecular / PCR testing", "Viral load assays"],
    orderOfDrawPosition: 5,
    inversions: "8–10 inversions",
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "gray-fluoride",
    displayName: "Grey",
    colorNames: ["Grey", "Gray"],
    swatch: { cap: "#8E9196", body: "#E6E8EA", label: "#40454A" },
    additive:
      "Sodium fluoride with potassium oxalate (or sodium fluoride / EDTA)",
    additiveAction:
      "Fluoride inhibits glycolysis so glucose is not consumed by cells in " +
      "the tube; the oxalate or EDTA component prevents clotting.",
    specimenType: "Plasma",
    commonUses: [
      "Glucose and glucose tolerance testing",
      "Lactate",
      "Blood alcohol (ethanol)",
    ],
    orderOfDrawPosition: 6,
    inversions: "8–10 inversions",
    specialHandling: [
      "For blood alcohol, use a non-alcohol antiseptic to clean the site",
    ],
    caveats: [
      "Fluoride slows glycolysis but does not stop it instantly. Timely " +
        "processing still matters.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "royal-blue",
    displayName: "Royal blue",
    colorNames: ["Royal blue", "Dark blue"],
    swatch: { cap: "#1F4E9C", body: "#D9E3F5", label: "#12336B" },
    additive: "No additive, EDTA, or heparin depending on the test",
    additiveAction:
      "The tube itself is manufactured to be low in trace metals; the " +
      "additive varies with what is being measured.",
    specimenType: "Whole blood",
    commonUses: ["Trace element testing (zinc, copper, lead, selenium)", "Toxicology"],
    specialHandling: [
      "Check the label band: royal blue tubes come in additive and " +
        "additive-free versions that are not interchangeable",
    ],
    caveats: [
      "Position in the order of draw depends on which additive the tube " +
        "contains. Follow your facility's protocol rather than assuming.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "tan-lead",
    displayName: "Tan",
    colorNames: ["Tan", "Beige"],
    swatch: { cap: "#C8A77B", body: "#F2E8DA", label: "#6E4F2A" },
    additive: "K2 EDTA (certified low lead)",
    additiveAction:
      "EDTA prevents clotting; the tube is certified to contain minimal lead " +
      "so it does not contaminate the result.",
    specimenType: "Whole blood",
    commonUses: ["Blood lead levels"],
    caveats: [
      "Availability and colour convention vary by manufacturer and facility.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
  {
    id: "yellow-acd",
    displayName: "Yellow (ACD)",
    colorNames: ["Yellow (ACD solution A or B)"],
    swatch: { cap: "#E8C84A", body: "#FAF0CC", label: "#7A6207" },
    additive: "Acid citrate dextrose (ACD)",
    additiveAction:
      "Citrate anticoagulates while dextrose keeps cells metabolically viable " +
      "for culture-based and cellular testing.",
    specimenType: "Whole blood",
    commonUses: ["HLA typing", "Paternity testing", "DNA studies"],
    caveats: [
      "Do not confuse the yellow ACD tube with the yellow SPS tube used for " +
        "blood cultures. They contain different additives and are drawn at " +
        "different points in the sequence.",
    ],
    sources: baseSources,
    reviewStatus: "needs-review",
    version: 1,
  },
];

const TUBE_MAP = new Map(TUBES.map((tube) => [tube.id, tube]));

export function getTube(id: string): Tube {
  const tube = TUBE_MAP.get(id);
  if (!tube) {
    throw new Error(`Unknown tube: ${id}`);
  }
  return tube;
}

export function findTube(id: string): Tube | undefined {
  return TUBE_MAP.get(id);
}

/** Tubes that hold a fixed position in the CLSI order of draw. */
export function getOrderedTubes(): Tube[] {
  return TUBES.filter((tube) => tube.orderOfDrawPosition !== undefined).sort(
    (a, b) => (a.orderOfDrawPosition ?? 0) - (b.orderOfDrawPosition ?? 0),
  );
}
