/**
 * Core content types.
 *
 * Everything a student sees — questions, tubes, the order of draw, certification
 * structure — is data that conforms to these types. UI components render this
 * data; they never encode clinical facts themselves.
 */

/** Certifications the platform can serve. NHA CPT is the only one live today. */
export type CertificationId = "nha-cpt" | "ascp-pbt" | "ncct-cpt";

/**
 * Our study taxonomy. These are the areas *we* organise practice around.
 * They are deliberately NOT presented as the official domain list of any
 * certifying body — see `CertificationConfig.domainWeightsVerified`.
 */
export type DomainId =
  | "safety-infection-control"
  | "patient-identification"
  | "patient-preparation"
  | "anatomy-physiology"
  | "venipuncture-technique"
  | "order-of-draw"
  | "specimen-handling"
  | "complications"
  | "special-collections";

/**
 * Editorial lifecycle for every piece of clinical content.
 *
 * draft         — written, not checked by anyone.
 * needs-review  — complete and internally consistent, awaiting review by a
 *                 qualified phlebotomy educator / MLS professional.
 * reviewed      — a named reviewer has checked it against cited references.
 * published     — reviewed and cleared for presentation without a caveat badge.
 */
export type ReviewStatus = "draft" | "needs-review" | "reviewed" | "published";

/**
 * A pointer to a real, citable reference.
 *
 * We store document titles and publishers rather than invented page numbers or
 * quotations. `note` records exactly how much verification has actually
 * happened, so nothing here can be mistaken for a checked citation.
 */
export type SourceReference = {
  /** Human-readable title of the standard, guideline, or textbook. */
  label: string;
  publisher?: string;
  /** Only ever a stable, real URL. Omitted when unsure. */
  url?: string;
  /** ISO date the URL was last opened by a human. */
  accessedAt?: string;
  note?: string;
};

export type Choice = {
  id: string;
  text: string;
};

/** 1 = recall, 2 = application, 3 = analysis / multi-step reasoning. */
export type Difficulty = 1 | 2 | 3;

export type Question = {
  id: string;
  certifications: CertificationId[];
  domain: DomainId;
  subdomain?: string;
  difficulty: Difficulty;
  stem: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  /** Why each distractor is wrong, keyed by choice id. */
  choiceExplanations?: Record<string, string>;
  /** A short, high-value takeaway or mnemonic shown under "Remember". */
  memoryTip?: string;
  tags: string[];
  sources: SourceReference[];
  reviewStatus: ReviewStatus;
  /** ISO date. */
  lastReviewedAt?: string;
  version: number;
};

export type DomainConfig = {
  id: DomainId;
  name: string;
  /** Compact label for chips, charts, and mobile. */
  shortName: string;
  /** One sentence a student can actually use to decide what to study. */
  description: string;
  /** What this area covers, as study bullets. */
  covers: string[];
  /** Route of the matching study page, when one exists. */
  studyHref?: string;
  /**
   * Share of practice we allocate to this area, 0–1. This is *our* editorial
   * weighting, not a published exam blueprint.
   */
  practiceWeight: number;
};

export type CertificationConfig = {
  id: CertificationId;
  /** Full name, e.g. "Certified Phlebotomy Technician (CPT)". */
  name: string;
  shortName: string;
  organization: string;
  organizationShort: string;
  /** Whether students can select this certification today. */
  status: "live" | "planned";
  summary: string;
  /**
   * Official exam facts. Left `undefined` unless a human has verified them
   * against current material from the certifying body. Never guessed.
   */
  official: {
    questionCount?: number;
    timeLimitMinutes?: number;
    passingScoreNote?: string;
    /** True only once every populated field above has been checked. */
    examStructureVerified: boolean;
    lastVerifiedAt?: string;
    /** What a human needs to confirm, shown in the UI while unverified. */
    verificationChecklist: string[];
  };
  /** Our practice-format mock exam. Explicitly ours, never "the real thing". */
  mockExamFormat: {
    questionCount: number;
    timeLimitMinutes: number;
    note: string;
  };
  domains: DomainConfig[];
  /** True only if `domains` mirrors a published, verified exam blueprint. */
  domainWeightsVerified: boolean;
};

/** A blood collection tube as a study object. */
export type Tube = {
  id: string;
  /** e.g. "Lavender / purple". */
  displayName: string;
  /** Closure colours, as words. Always shown as text, never colour alone. */
  colorNames: string[];
  /** CSS colours for the tube illustration. Decorative only. */
  swatch: { cap: string; body: string; label: string };
  additive: string;
  additiveAction: string;
  specimenType: "Whole blood" | "Plasma" | "Serum" | "Whole blood (sterile)";
  commonUses: string[];
  /** Position in the CLSI order of draw, when it has a fixed one. */
  orderOfDrawPosition?: number;
  /** Inversions after collection, per common manufacturer guidance. */
  inversions?: string;
  specialHandling?: string[];
  caveats?: string[];
  sources: SourceReference[];
  reviewStatus: ReviewStatus;
  lastReviewedAt?: string;
  version: number;
};

/** One position in the order of draw. A position can contain several tubes. */
export type OrderOfDrawStep = {
  position: number;
  /** e.g. "Coagulation tube". */
  name: string;
  /** Tube ids that belong at this position. */
  tubeIds: string[];
  /** Why this position sits where it does — the carryover rationale. */
  rationale: string;
};

export type OrderOfDrawSequence = {
  id: string;
  name: string;
  steps: OrderOfDrawStep[];
  caveats: string[];
  sources: SourceReference[];
  reviewStatus: ReviewStatus;
  lastReviewedAt?: string;
  version: number;
};
