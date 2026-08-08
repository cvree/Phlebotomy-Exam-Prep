import type {
  CertificationId,
  Difficulty,
  DomainId,
  Question,
  ReviewStatus,
  SourceReference,
} from "@/types/content";

export type ChoiceKey = "a" | "b" | "c" | "d";

const CHOICE_KEYS: ChoiceKey[] = ["a", "b", "c", "d"];

/**
 * The shape question authors write. It exists so the bank files read like
 * question sheets rather than object graphs, and so shared metadata
 * (certifications, review status, sources) is applied in one place instead of
 * being repeated — and drifting — on every item.
 */
export type QuestionSeed = {
  id: string;
  subdomain?: string;
  difficulty: Difficulty;
  stem: string;
  choices: Record<ChoiceKey, string>;
  correct: ChoiceKey;
  explanation: string;
  /** Why a specific distractor is wrong. Optional and often worth writing. */
  why?: Partial<Record<ChoiceKey, string>>;
  /** Shown under "Remember" after the explanation. */
  tip?: string;
  tags?: string[];
  /** Overrides the file-level default when an item needs a specific source. */
  sources?: SourceReference[];
  /** Overrides the file-level default. */
  reviewStatus?: ReviewStatus;
  lastReviewedAt?: string;
};

export type BankDefaults = {
  domain: DomainId;
  certifications: CertificationId[];
  sources: SourceReference[];
  reviewStatus: ReviewStatus;
};

/**
 * Expands authored seeds into fully-typed `Question` records.
 *
 * Throws on a seed whose `correct` key has no matching choice text, so a typo
 * fails at import time rather than showing a student an unanswerable question.
 */
export function buildQuestions(
  defaults: BankDefaults,
  seeds: QuestionSeed[],
): Question[] {
  return seeds.map((seed) => {
    const choices = CHOICE_KEYS.map((key) => ({
      id: key,
      text: seed.choices[key],
    })).filter((choice) => choice.text.length > 0);

    if (!choices.some((choice) => choice.id === seed.correct)) {
      throw new Error(
        `Question ${seed.id}: correct choice "${seed.correct}" has no text.`,
      );
    }

    const choiceExplanations = seed.why
      ? Object.fromEntries(
          Object.entries(seed.why).filter(
            (entry): entry is [string, string] => typeof entry[1] === "string",
          ),
        )
      : undefined;

    return {
      id: seed.id,
      certifications: defaults.certifications,
      domain: defaults.domain,
      subdomain: seed.subdomain,
      difficulty: seed.difficulty,
      stem: seed.stem,
      choices,
      correctChoiceId: seed.correct,
      explanation: seed.explanation,
      choiceExplanations,
      memoryTip: seed.tip,
      tags: seed.tags ?? [],
      sources: seed.sources ?? defaults.sources,
      reviewStatus: seed.reviewStatus ?? defaults.reviewStatus,
      lastReviewedAt: seed.lastReviewedAt,
      version: 1,
    } satisfies Question;
  });
}
