import type { DomainConfig, DomainId } from "@/types/content";

/**
 * Our study taxonomy.
 *
 * These ten areas are how *we* organize practice and report mastery. They are
 * built from widely-taught phlebotomy curriculum areas, not copied from any
 * certifying body's published exam blueprint. `practiceWeight` is our own
 * editorial allocation and is flagged as unverified in the certification config.
 */
export const DOMAINS: DomainConfig[] = [
  {
    id: "safety-infection-control",
    name: "Safety & Infection Control",
    shortName: "Safety",
    description:
      "Standard precautions, PPE, sharps handling, and what to do after an exposure.",
    covers: [
      "Standard precautions and transmission-based precautions",
      "PPE selection, donning, and doffing order",
      "Sharps safety devices and disposal",
      "Hand hygiene",
      "Post-exposure response",
      "Biohazard, chemical, and fire safety basics",
    ],
    practiceWeight: 0.12,
  },
  {
    id: "patient-identification",
    name: "Patient Identification",
    shortName: "Patient ID",
    description:
      "Two-identifier verification, requisition matching, and labeling at the bedside.",
    covers: [
      "Two independent patient identifiers",
      "Active versus passive identification",
      "Inpatient armband verification",
      "Unidentified and outpatient scenarios",
      "Requisition-to-patient matching",
      "Labelling in the presence of the patient",
    ],
    practiceWeight: 0.1,
  },
  {
    id: "patient-preparation",
    name: "Patient Preparation",
    shortName: "Patient Prep",
    description:
      "Consent, fasting and timing requirements, positioning, and site assessment.",
    covers: [
      "Explaining the procedure and obtaining consent",
      "Fasting, basal state, and timed collections",
      "Patient positioning and safety",
      "Assessing for latex allergy and prior complications",
      "Site selection and contraindications",
      "Managing anxious or needle-averse patients",
    ],
    practiceWeight: 0.1,
  },
  {
    id: "anatomy-physiology",
    name: "Anatomy & Physiology",
    shortName: "A&P",
    description:
      "Antecubital venous anatomy, blood composition, and the systems behind the tests.",
    covers: [
      "Antecubital fossa vein patterns",
      "Median cubital, cephalic, and basilic veins",
      "Nearby nerves and the brachial artery",
      "Arteries, veins, and capillaries",
      "Blood composition and haemostasis",
      "Body-system vocabulary used on requisitions",
    ],
    practiceWeight: 0.1,
  },
  {
    id: "venipuncture-technique",
    name: "Venipuncture Technique",
    shortName: "Technique",
    description:
      "Equipment selection, tourniquet use, needle angle, and dermal puncture.",
    covers: [
      "Evacuated tube, syringe, and winged infusion sets",
      "Needle gauge and length selection",
      "Tourniquet application and time limits",
      "Site cleansing and antiseptic choice",
      "Needle insertion angle and bevel orientation",
      "Capillary/dermal puncture technique",
    ],
    practiceWeight: 0.12,
  },
  {
    id: "order-of-draw",
    name: "Order of Draw",
    shortName: "Order of Draw",
    description:
      "The CLSI collection sequence, why additive carryover matters, and tube identity.",
    covers: [
      "The CLSI GP41 collection sequence",
      "Additive carryover and its effect on results",
      "Discard tubes with winged sets",
      "Tube color, additive, and specimen type",
      "Mixing and inversion requirements",
      "Tubes whose position varies by facility",
    ],
    studyHref: "/study/order-of-draw",
    practiceWeight: 0.11,
  },
  {
    id: "specimen-handling",
    name: "Specimen Handling",
    shortName: "Handling",
    description:
      "Labelling, transport, temperature, light protection, and rejection criteria.",
    covers: [
      "Required label elements and timing",
      "Mixing, clotting, and centrifugation basics",
      "Chilled, warmed, and light-protected specimens",
      "Transport time limits and stability",
      "Chain of custody",
      "Specimen rejection criteria",
    ],
    studyHref: "/study/specimen-handling",
    practiceWeight: 0.11,
  },
  {
    id: "complications",
    name: "Complications",
    shortName: "Complications",
    description:
      "Hematoma, syncope, nerve injury, hemolysis, and failed draws — and how to respond.",
    covers: [
      "Hematoma prevention and response",
      "Syncope and pre-syncope management",
      "Nerve involvement and when to stop",
      "Petechiae, edema, and scarred sites",
      "Hemolysis: causes and consequences",
      "Failed draws and redirection limits",
    ],
    studyHref: "/study/venipuncture-complications",
    practiceWeight: 0.11,
  },
  {
    id: "special-collections",
    name: "Special Collections",
    shortName: "Special",
    description:
      "Blood cultures, glucose tolerance, blood bank, pediatric and geriatric draws.",
    covers: [
      "Blood culture site prep and volume",
      "Glucose tolerance testing",
      "Blood bank identification requirements",
      "Therapeutic drug monitoring timing",
      "Pediatric and neonatal collection",
      "Geriatric and difficult-access patients",
    ],
    practiceWeight: 0.05,
  },
  {
    id: "california-requirements",
    name: "California Requirements",
    shortName: "California",
    description:
      "CDPH Certified Phlebotomy Technician (CPT1/CPT2) licensing, scope of practice, and supervision rules for practicing in California.",
    covers: [
      "Why national certification alone does not authorize a draw in California",
      "CPT1 vs. CPT2: scope of practice and how to qualify for each",
      "Training hours, supervised procedure counts, and CDPH-approved agencies",
      "Applying to CDPH Laboratory Field Services and keeping a certificate current",
      "Supervision and competency-verification requirements",
      "Where state rules add to, rather than replace, federal and CLSI standards",
    ],
    studyHref: "/study/california-requirements",
    practiceWeight: 0.08,
  },
];

const DOMAIN_MAP = new Map<DomainId, DomainConfig>(
  DOMAINS.map((domain) => [domain.id, domain]),
);

export const DOMAIN_IDS: DomainId[] = DOMAINS.map((domain) => domain.id);

export function getDomain(id: DomainId): DomainConfig {
  const domain = DOMAIN_MAP.get(id);
  if (!domain) {
    throw new Error(`Unknown domain: ${id}`);
  }
  return domain;
}

/** Safe lookup for values that came out of storage and may be stale. */
export function findDomain(id: string): DomainConfig | undefined {
  return DOMAIN_MAP.get(id as DomainId);
}

export function domainName(id: string): string {
  return findDomain(id)?.name ?? id;
}

export function domainShortName(id: string): string {
  return findDomain(id)?.shortName ?? id;
}
