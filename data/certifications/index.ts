import type {
  CertificationConfig,
  CertificationId,
  MockExamForm,
} from "@/types/content";
import { DOMAINS } from "./domains";

/**
 * Our mock exam papers.
 *
 * Three lengths, because the paper a student can actually sit changes as an
 * exam date approaches: a short diagnostic early on, a standard paper for
 * regular checks, and a full-length one for stamina. The timing is held at a
 * constant minute-and-a-bit per question across all three so a student's
 * pacing transfers between them.
 *
 * None of these is a replica of any certifying body's exam. We have not
 * verified the NHA's published question count or time limit, so we did not
 * guess at them — see `NHA_CPT.official`.
 */
export const MOCK_EXAM_FORMS: MockExamForm[] = [
  {
    id: "quick",
    name: "Quick paper",
    questionCount: 25,
    timeLimitMinutes: 30,
    description:
      "A short timed paper for a lunch break, or a first look at where you " +
      "stand across all ten areas.",
  },
  {
    id: "standard",
    name: "Standard paper",
    questionCount: 50,
    timeLimitMinutes: 60,
    description:
      "Our regular practice format. Long enough to spread across every area " +
      "and short enough to sit often.",
  },
  {
    id: "full",
    name: "Full-length paper",
    questionCount: 100,
    timeLimitMinutes: 120,
    description:
      "The stamina test. Two hours of sustained concentration, which is the " +
      "part a short paper cannot rehearse.",
  },
];

/**
 * Certification configuration.
 *
 * Rule: no field under `official` is populated unless a human has checked it
 * against current material published by the certifying body. Right now nobody
 * has, so those fields are `undefined`, `examStructureVerified` is `false`, and
 * the UI renders a verification notice wherever exam structure is discussed.
 *
 * `mockExam` is ours. Those are study formats we chose, and they are labeled
 * that way everywhere they appear.
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
  mockExam: {
    forms: MOCK_EXAM_FORMS,
    defaultFormId: "standard",
    note:
      "These are our practice formats, not replicas of the real exam. We have " +
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

/**
 * Resolves a mock exam form id, falling back to the certification's default.
 *
 * Falls back rather than throwing because the id can arrive from a URL or from
 * a session saved before a form was renamed — neither is a reason to strand a
 * student on an error screen.
 */
export function getMockExamForm(
  certification: CertificationConfig,
  formId?: string,
): MockExamForm {
  const { forms, defaultFormId } = certification.mockExam;
  const found = formId ? forms.find((form) => form.id === formId) : undefined;
  const fallback = forms.find((form) => form.id === defaultFormId) ?? forms[0];
  if (!fallback) {
    throw new Error(`Certification ${certification.id} defines no mock forms.`);
  }
  return found ?? fallback;
}
