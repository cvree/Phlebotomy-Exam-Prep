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
  label: "Standard phlebotomy programme curriculum (general)",
  note:
    "Reflects material taught consistently across mainstream phlebotomy " +
    "textbooks and training programmes. Not attributed to a single edition, " +
    "and not verified against one.",
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
  SRC_MANUFACTURER_IFU,
  SRC_TEXTBOOK_CURRICULUM,
];
