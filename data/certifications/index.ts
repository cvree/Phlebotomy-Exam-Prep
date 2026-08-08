import type { CertificationConfig, CertificationId } from "@/types/content";
import { DOMAINS } from "./domains";

/**
 * Certification configuration.
 *
 * Rule: no field under `official` is populated unless a human has checked it
 * against current material published by the certifying body. Right now nobody
 * has, so those fields are `undefined`, `examStructureVerified` is `false`, and
 * the UI renders a verification notice wherever exam structure is discussed.
 *
 * `mockExamFormat` is ours. It is a study format we chose, and it is labelled
 * that way everywhere it appears.
 */
export const NHA_CPT: CertificationConfig = {
  id: "nha-cpt",
  name: "Certified Phlebotomy Technician (CPT)",
  shortName: "NHA CPT",
  organization: "National Healthcareer Association",
  organizationShort: "NHA",
  status: "live",
  summary:
    "An entry-level phlebotomy certification for technicians performing " +
    "venipuncture and dermal puncture in clinical settings.",
  official: {
    questionCount: undefined,
    timeLimitMinutes: undefined,
    passingScoreNote: undefined,
    examStructureVerified: false,
    verificationChecklist: [
      "Number of scored and pretest questions on the current exam form",
      "Total time allowed to complete the exam",
      "How the passing score is set and reported",
      "Current published test-plan domains and their weightings",
      "Eligibility, recertification, and retake policies",
    ],
  },
  mockExamFormat: {
    questionCount: 50,
    timeLimitMinutes: 60,
    note:
      "This is our practice format, not a replica of the real exam. We have " +
      "not verified the official question count or time limit, so we did not " +
      "guess at them.",
  },
  domains: DOMAINS,
  domainWeightsVerified: false,
};

export const ASCP_PBT: CertificationConfig = {
  ...NHA_CPT,
  id: "ascp-pbt",
  name: "Phlebotomy Technician, PBT(ASCP)",
  shortName: "ASCP PBT",
  organization: "American Society for Clinical Pathology Board of Certification",
  organizationShort: "ASCP",
  status: "planned",
  summary: "Planned. The platform is built to add it without restructuring.",
};

export const NCCT_CPT: CertificationConfig = {
  ...NHA_CPT,
  id: "ncct-cpt",
  name: "National Certified Phlebotomy Technician (NCPT)",
  shortName: "NCCT NCPT",
  organization: "National Center for Competency Testing",
  organizationShort: "NCCT",
  status: "planned",
  summary: "Planned. The platform is built to add it without restructuring.",
};

export const CERTIFICATIONS: CertificationConfig[] = [
  NHA_CPT,
  ASCP_PBT,
  NCCT_CPT,
];

export const DEFAULT_CERTIFICATION_ID: CertificationId = "nha-cpt";

export function getCertification(id: CertificationId): CertificationConfig {
  const found = CERTIFICATIONS.find((cert) => cert.id === id);
  if (!found) {
    throw new Error(`Unknown certification: ${id}`);
  }
  return found;
}

export function getLiveCertifications(): CertificationConfig[] {
  return CERTIFICATIONS.filter((cert) => cert.status === "live");
}
