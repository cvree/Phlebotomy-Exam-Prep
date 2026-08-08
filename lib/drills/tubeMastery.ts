import type { Tube } from "@/types/content";
import { TUBES } from "@/data/tubes/tubes";
import { createRandom, shuffle } from "@/lib/scoring/selection";

/**
 * Tube & additive drill.
 *
 * A small question engine over the tube dataset. Each mode is a projection —
 * "what is the prompt" and "what is the answer" — so adding a mode is adding a
 * row to `TUBE_DRILL_MODES`, not writing new drill UI.
 */

export type TubeDrillMode =
  | "tube-to-additive"
  | "additive-to-tube"
  | "tube-to-specimen"
  | "tube-to-use";

export type TubeDrillModeConfig = {
  id: TubeDrillMode;
  name: string;
  description: string;
  /** Text shown above the answer options. */
  promptFor: (tube: Tube) => string;
  /** The correct answer text. */
  answerFor: (tube: Tube) => string;
  /** True when the *prompt* is the tube, so the card can show its illustration. */
  showsTubeInPrompt: boolean;
  available: boolean;
};

export const TUBE_DRILL_MODES: TubeDrillModeConfig[] = [
  {
    id: "tube-to-additive",
    name: "Tube → Additive",
    description: "See a tube, name what is inside it.",
    promptFor: (tube) => `Which additive does the ${tube.displayName} tube contain?`,
    answerFor: (tube) => tube.additive,
    showsTubeInPrompt: true,
    available: true,
  },
  {
    id: "additive-to-tube",
    name: "Additive → Tube",
    description: "See an additive, name the tube that carries it.",
    promptFor: (tube) => `Which tube contains ${lowerFirst(tube.additive)}?`,
    answerFor: (tube) => tube.displayName,
    showsTubeInPrompt: false,
    available: true,
  },
  {
    id: "tube-to-specimen",
    name: "Tube → Specimen type",
    description: "Serum, plasma, or whole blood?",
    promptFor: (tube) => `What specimen type does the ${tube.displayName} tube produce?`,
    answerFor: (tube) => tube.specimenType,
    showsTubeInPrompt: true,
    available: false,
  },
  {
    id: "tube-to-use",
    name: "Tube → Common use",
    description: "Match a tube to what it is ordered for.",
    promptFor: (tube) => `Which test is the ${tube.displayName} tube commonly used for?`,
    answerFor: (tube) => tube.commonUses[0] ?? "",
    showsTubeInPrompt: true,
    available: false,
  },
];

export function getTubeDrillMode(id: TubeDrillMode): TubeDrillModeConfig {
  const mode = TUBE_DRILL_MODES.find((entry) => entry.id === id);
  if (!mode) {
    throw new Error(`Unknown tube drill mode: ${id}`);
  }
  return mode;
}

export type TubeDrillQuestion = {
  tubeId: string;
  prompt: string;
  /** The tube to illustrate, when the mode shows one. */
  promptTube: Tube | null;
  options: { id: string; text: string; tubeId: string }[];
  correctOptionId: string;
  /** Shown after answering. */
  teaching: string;
};

const OPTION_COUNT = 4;

/**
 * Builds a round of questions.
 *
 * Distractors are drawn from other tubes and de-duplicated by *answer text*,
 * not by tube. Several tubes legitimately share an answer — lavender and pink
 * are both EDTA — and offering two options that read the same makes a question
 * unanswerable.
 */
export function buildTubeDrill(
  mode: TubeDrillModeConfig,
  count: number,
  seed: number,
  pool: Tube[] = TUBES,
): TubeDrillQuestion[] {
  const random = createRandom(seed);
  const eligible = pool.filter((tube) => mode.answerFor(tube).trim().length > 0);
  const subjects = shuffle(eligible, random).slice(0, count);

  return subjects.map((tube, index) => {
    const correctText = mode.answerFor(tube);

    const distractors: Tube[] = [];
    const usedText = new Set([correctText]);
    for (const candidate of shuffle(eligible, createRandom(seed + index + 1))) {
      if (distractors.length >= OPTION_COUNT - 1) break;
      if (candidate.id === tube.id) continue;
      const text = mode.answerFor(candidate);
      if (usedText.has(text)) continue;
      usedText.add(text);
      distractors.push(candidate);
    }

    const options = shuffle(
      [tube, ...distractors],
      createRandom(seed + index + 500),
    ).map((option, optionIndex) => ({
      id: `o${optionIndex}`,
      text: mode.answerFor(option),
      tubeId: option.id,
    }));

    const correctOption = options.find((option) => option.tubeId === tube.id);

    return {
      tubeId: tube.id,
      prompt: mode.promptFor(tube),
      promptTube: mode.showsTubeInPrompt ? tube : null,
      options,
      correctOptionId: correctOption?.id ?? "o0",
      teaching: buildTeaching(tube),
    };
  });
}

function buildTeaching(tube: Tube): string {
  const position = tube.orderOfDrawPosition
    ? ` It is drawn at position ${tube.orderOfDrawPosition} in the order of draw.`
    : " Its position in the order of draw depends on which additive version is stocked.";
  return `${tube.displayName}: ${tube.additive}. ${tube.additiveAction}${position}`;
}

export type TubeDrillGrade = {
  total: number;
  correct: number;
  accuracy: number;
  perfect: boolean;
  /** Tube ids answered incorrectly, for the review list. */
  missedTubeIds: string[];
};

export function gradeTubeDrill(
  questions: TubeDrillQuestion[],
  answers: Record<string, string>,
): TubeDrillGrade {
  let correct = 0;
  const missedTubeIds: string[] = [];

  for (const question of questions) {
    if (answers[question.tubeId] === question.correctOptionId) {
      correct += 1;
    } else {
      missedTubeIds.push(question.tubeId);
    }
  }

  return {
    total: questions.length,
    correct,
    accuracy: questions.length === 0 ? 0 : correct / questions.length,
    perfect: questions.length > 0 && correct === questions.length,
    missedTubeIds,
  };
}

function lowerFirst(text: string): string {
  // Leaves acronyms alone: "EDTA" must not become "eDTA".
  if (text.length < 2) return text.toLowerCase();
  const [first, second] = [text[0] ?? "", text[1] ?? ""];
  if (second === second.toUpperCase() && second !== second.toLowerCase()) {
    return text;
  }
  return first.toLowerCase() + text.slice(1);
}
