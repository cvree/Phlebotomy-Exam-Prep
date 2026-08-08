import {
  PROGRESS_SCHEMA_VERSION,
  createEmptyProgress,
  type StoredProgress,
} from "./schema";

/**
 * Migrations for persisted progress.
 *
 * Two rules make this safe:
 *
 * 1. Every step is pure and takes the previous shape to the next one. Adding a
 *    field means adding a step, never editing an existing one.
 * 2. `migrateProgress` never throws. Storage is a place users' data goes to
 *    survive, and a parse failure must degrade to an empty-but-valid state
 *    rather than crash a study session.
 */

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

/**
 * v1 → v2: drill attempts and the study streak were added.
 *
 * v1 stores existed before drills shipped, so they have neither key.
 */
function migrateV1ToV2(input: UnknownRecord): UnknownRecord {
  return {
    ...input,
    version: 2,
    drills: asArray(input.drills),
    streak: isRecord(input.streak)
      ? input.streak
      : { current: 0, longest: 0, lastStudyDate: null },
  };
}

const STEPS: Record<number, (input: UnknownRecord) => UnknownRecord> = {
  1: migrateV1ToV2,
};

export type MigrationOutcome = {
  progress: StoredProgress;
  /** True when the stored payload was unusable and was replaced. */
  reset: boolean;
  /** Version found on disk, when it could be read. */
  fromVersion?: number;
};

export function migrateProgress(raw: string | null, now: string): MigrationOutcome {
  if (raw === null) {
    return { progress: createEmptyProgress(now), reset: false };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { progress: createEmptyProgress(now), reset: true };
  }

  if (!isRecord(parsed)) {
    return { progress: createEmptyProgress(now), reset: true };
  }

  const fromVersion =
    typeof parsed.version === "number" && Number.isFinite(parsed.version)
      ? parsed.version
      : 1;

  // A store written by a *newer* build of the app. Downgrading data is not
  // something we can do safely, so we keep it untouched on disk by treating
  // this session as read-fresh rather than rewriting it from an older shape.
  if (fromVersion > PROGRESS_SCHEMA_VERSION) {
    return { progress: createEmptyProgress(now), reset: true, fromVersion };
  }

  let working: UnknownRecord = { ...parsed, version: fromVersion };
  for (let version = fromVersion; version < PROGRESS_SCHEMA_VERSION; version += 1) {
    const step = STEPS[version];
    if (!step) {
      return { progress: createEmptyProgress(now), reset: true, fromVersion };
    }
    working = step(working);
  }

  return {
    progress: normaliseProgress(working, now),
    reset: false,
    fromVersion,
  };
}

/**
 * Coerces a migrated payload into a valid `StoredProgress`.
 *
 * Anything of the wrong type is replaced with an empty default rather than
 * trusted, because the payload came from a place a user can edit by hand.
 */
export function normaliseProgress(
  input: UnknownRecord,
  now: string,
): StoredProgress {
  const empty = createEmptyProgress(now);
  return {
    version: PROGRESS_SCHEMA_VERSION,
    createdAt: typeof input.createdAt === "string" ? input.createdAt : now,
    updatedAt: typeof input.updatedAt === "string" ? input.updatedAt : now,
    questionStats: isRecord(input.questionStats)
      ? (input.questionStats as StoredProgress["questionStats"])
      : empty.questionStats,
    attempts: asArray(input.attempts),
    sessions: asArray(input.sessions),
    drills: asArray(input.drills),
    mockResults: asArray(input.mockResults),
    streak: isRecord(input.streak)
      ? {
          current: typeof input.streak.current === "number" ? input.streak.current : 0,
          longest: typeof input.streak.longest === "number" ? input.streak.longest : 0,
          lastStudyDate:
            typeof input.streak.lastStudyDate === "string"
              ? input.streak.lastStudyDate
              : null,
        }
      : empty.streak,
  };
}
