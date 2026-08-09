import type { SourceReference } from "@/types/content";

/**
 * Shared reference pointers.
 *
 * These name real, citable documents. We deliberately do not store clause
 * numbers, page numbers, or quotations, because nobody has opened these
 * documents as part of authoring this content — the `note` field says so.
 *
 * When a reviewer verifies an item, they add the precise citation there and
 * move the item's `reviewStatus` to "reviewed".
 */

export const SRC_CLSI_GP41: SourceReference = {
  label:
    "CLSI GP41 — Collection of Diagnostic Venous Blood Specimens (7th edition)",
  publisher: "Clinical and Laboratory Standards Institute",
  note: "Standard cited by title. Specific clauses not verified by a reviewer.",
};

export const SRC_CLSI_GP42: SourceReference = {
  label: "CLSI GP42 — Collection of Capillary Blood Specimens (7th edition)",
  publisher: "Clinical and Laboratory Standards Institute",
  note: "Standard cited by title. Specific clauses not verified by a reviewer.",
};

export const SRC_OSHA_BBP: SourceReference = {
  label: "OSHA Bloodborne Pathogens Standard, 29 CFR 1910.1030",
  publisher: "U.S. Occupational Safety and Health Administration",
  url: "https://www.osha.gov/bloodborne-pathogens",
  note: "Regulation cited by title and citation number. Text not quoted.",
};

export const SRC_CDC_STANDARD_PRECAUTIONS: SourceReference = {
  label: "CDC Standard Precautions for All Patient Care",
  publisher: "U.S. Centers for Disease Control and Prevention",
  url: "https://www.cdc.gov/infection-control/hcp/basics/standard-precautions.html",
  note: "Guidance cited by title. Wording not quoted.",
};

export const SRC_CDC_HAND_HYGIENE: SourceReference = {
  label: "CDC Hand Hygiene in Healthcare Settings",
  publisher: "U.S. Centers for Disease Control and Prevention",
  url: "https://www.cdc.gov/clean-hands/hcp/clinical-safety/",
  note: "Guidance cited by title. Wording not quoted.",
};

export const SRC_TEXTBOOK_CURRICULUM: SourceReference = {
  label: "Standard phlebotomy program curriculum (general)",
  note:
    "Reflects material taught consistently across mainstream phlebotomy " +
    "textbooks and training programs. Not attributed to a single edition, " +
    "and not verified against one.",
};

export const SRC_CA_BPC_1246: SourceReference = {
  label:
    "California Business and Professions Code §§ 1245–1246.5 (Clinical Laboratory Technology, certified phlebotomy technicians)",
  publisher: "California Legislative Information",
  url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=1246",
  note:
    "Statute cited by title and section number. Text not quoted, and specific " +
    "clauses have not been checked against the current chaptered version by a " +
    "reviewer — the Legislature can amend this section, so verify against the " +
    "current statute before relying on a specific number cited here.",
};

export const SRC_CDPH_LFS: SourceReference = {
  label:
    "California Department of Public Health, Laboratory Field Services — Certified Phlebotomy Technician I and II certification",
  publisher: "California Department of Public Health",
  url: "https://www.cdph.ca.gov/Programs/OSPHLD/LFS/Pages/Phlebotomist-CPTI.aspx",
  note:
    "Program requirements (training hours, supervised procedure counts, fees, " +
    "renewal) are set by CDPH and can change. This content has not been " +
    "verified against a current CDPH publication by a reviewer — confirm " +
    "specifics on the CDPH Laboratory Field Services site or by calling LFS " +
    "before relying on an hour or procedure count cited here.",
};

export const SRC_MANUFACTURER_IFU: SourceReference = {
  label: "Blood collection tube manufacturer instructions for use",
  note:
    "Tube additives, draw volumes, and inversion counts vary by manufacturer " +
    "and lot. Always follow the instructions for use supplied with the tubes " +
    "your facility stocks.",
};

/** Every source object, for the methodology page. */
export const ALL_SOURCES: SourceReference[] = [
  SRC_CLSI_GP41,
  SRC_CLSI_GP42,
  SRC_OSHA_BBP,
  SRC_CDC_STANDARD_PRECAUTIONS,
  SRC_CDC_HAND_HYGIENE,
  SRC_CA_BPC_1246,
  SRC_CDPH_LFS,
  SRC_MANUFACTURER_IFU,
  SRC_TEXTBOOK_CURRICULUM,
];
