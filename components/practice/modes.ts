import type { CertificationId, DomainId } from "@/types/content";
import type { PracticeConfig, PracticeMode } from "@/types/study";
import { DEFAULT_CERTIFICATION_ID } from "@/data/certifications";
import { DOMAIN_IDS, domainName } from "@/data/certifications/domains";

export type PracticeModeInfo = {
  id: PracticeMode;
  name: string;
  description: string;
  /** Needs existing progress to produce a sensible session. */
  requiresProgress: boolean;
  defaultCount: number;
};

export const PRACTICE_MODES: PracticeModeInfo[] = [
  {
    id: "quick-10",
    name: "Quick 10",
    description:
      "Ten mixed questions across every area. The fastest way to find out where you stand.",
    requiresProgress: false,
    defaultCount: 10,
  },
  {
    id: "all-domains",
    name: "All areas",
    description:
      "A longer mixed session drawing from the whole bank, weighted across areas.",
    requiresProgress: false,
    defaultCount: 25,
  },
  {
    id: "domain",
    name: "One area",
    description:
      "Focus on a single area — useful straight after reading a study guide.",
    requiresProgress: false,
    defaultCount: 10,
  },
  {
    id: "weak-areas",
    name: "Weak areas",
    description:
      "Targets your three lowest-scoring areas, preferring questions you have not mastered.",
    requiresProgress: true,
    defaultCount: 15,
  },
  {
    id: "missed",
    name: "Missed questions",
    description:
      "Only questions your last answer got wrong. They leave the list once you get them right.",
    requiresProgress: true,
    defaultCount: 15,
  },
  {
    id: "unseen",
    name: "New questions",
    description: "Questions you have never been shown before.",
    requiresProgress: false,
    defaultCount: 15,
  },
];

export function getPracticeMode(id: string): PracticeModeInfo | undefined {
  return PRACTICE_MODES.find((mode) => mode.id === id);
}

const COUNT_LIMITS = { min: 5, max: 60 } as const;

/**
 * Parses a practice configuration out of URL search params.
 *
 * Defensive by design: these values come from a link a student can edit, so
 * anything unrecognised falls back rather than producing a broken session.
 */
export function parsePracticeConfig(
  params: Record<string, string | string[] | undefined>,
): PracticeConfig {
  const rawMode = first(params.mode);
  const mode = getPracticeMode(rawMode ?? "")?.id ?? "quick-10";

  const rawDomain = first(params.domain);
  const domainId =
    rawDomain && DOMAIN_IDS.includes(rawDomain as DomainId)
      ? (rawDomain as DomainId)
      : undefined;

  const parsedCount = Number.parseInt(first(params.count) ?? "", 10);
  const fallbackCount = getPracticeMode(mode)?.defaultCount ?? 10;
  const questionCount = Number.isFinite(parsedCount)
    ? Math.min(COUNT_LIMITS.max, Math.max(COUNT_LIMITS.min, parsedCount))
    : fallbackCount;

  return {
    mode,
    certificationId: (first(params.cert) as CertificationId | undefined)
      ?? DEFAULT_CERTIFICATION_ID,
    domainId: mode === "domain" ? domainId : undefined,
    questionCount,
  };
}

export function describePracticeMode(config: PracticeConfig): string {
  if (config.mode === "domain" && config.domainId) {
    return domainName(config.domainId);
  }
  return getPracticeMode(config.mode)?.name ?? "Practice";
}

export function practiceHref(
  mode: PracticeMode,
  options: { count?: number; domainId?: DomainId } = {},
): string {
  const params = new URLSearchParams({ mode });
  if (options.count) params.set("count", String(options.count));
  if (options.domainId) params.set("domain", options.domainId);
  return `/practice/session?${params.toString()}`;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
