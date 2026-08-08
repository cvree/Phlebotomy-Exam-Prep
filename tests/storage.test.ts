import { describe, expect, it } from "vitest";
import { createMemoryDriver } from "@/lib/storage/driver";
import { migrateProgress } from "@/lib/storage/migrations";
import {
  StudyProgressRepository,
  trim,
} from "@/lib/storage/progressRepository";
import {
  LIMITS,
  PROGRESS_SCHEMA_VERSION,
  STORAGE_KEYS,
  createEmptyProgress,
} from "@/lib/storage/schema";
import { recordAttempt } from "@/lib/progress/mutations";
import { attemptsFor, T0 } from "./helpers";

const NOW = "2026-03-01T12:00:00.000Z";

describe("migrateProgress", () => {
  it("returns an empty record when nothing is stored", () => {
    const { progress, reset } = migrateProgress(null, NOW);
    expect(reset).toBe(false);
    expect(progress.version).toBe(PROGRESS_SCHEMA_VERSION);
    expect(progress.attempts).toEqual([]);
  });

  it("resets rather than throwing on unparseable data", () => {
    const { progress, reset } = migrateProgress("{not json", NOW);
    expect(reset).toBe(true);
    expect(progress.attempts).toEqual([]);
  });

  it("resets on a stored value that is not an object", () => {
    expect(migrateProgress('"a string"', NOW).reset).toBe(true);
    expect(migrateProgress("[1,2,3]", NOW).reset).toBe(true);
  });

  it("migrates a v1 record forward, preserving its attempts", () => {
    const v1 = JSON.stringify({
      version: 1,
      createdAt: T0,
      updatedAt: T0,
      questionStats: { "q-1": { questionId: "q-1", domain: "order-of-draw", attempts: 1, correct: 1, streak: 1, lastCorrect: true, lastAttemptAt: T0 } },
      attempts: attemptsFor({ domain: "order-of-draw", count: 3, correctPattern: [true] }),
      sessions: [],
      mockResults: [],
      // v1 had neither drills nor streak.
    });

    const { progress, reset, fromVersion } = migrateProgress(v1, NOW);
    expect(reset).toBe(false);
    expect(fromVersion).toBe(1);
    expect(progress.version).toBe(PROGRESS_SCHEMA_VERSION);
    expect(progress.attempts).toHaveLength(3);
    expect(progress.drills).toEqual([]);
    expect(progress.streak).toEqual({ current: 0, longest: 0, lastStudyDate: null });
  });

  it("treats a record with no version as v1", () => {
    const { fromVersion, reset } = migrateProgress(
      JSON.stringify({ attempts: [], questionStats: {} }),
      NOW,
    );
    expect(fromVersion).toBe(1);
    expect(reset).toBe(false);
  });

  it("refuses to downgrade a record written by a newer build", () => {
    const { reset, fromVersion } = migrateProgress(
      JSON.stringify({ version: PROGRESS_SCHEMA_VERSION + 5 }),
      NOW,
    );
    expect(reset).toBe(true);
    expect(fromVersion).toBe(PROGRESS_SCHEMA_VERSION + 5);
  });

  it("replaces fields of the wrong type with safe defaults", () => {
    const { progress } = migrateProgress(
      JSON.stringify({
        version: PROGRESS_SCHEMA_VERSION,
        attempts: "not an array",
        questionStats: 42,
        streak: "nope",
        drills: null,
      }),
      NOW,
    );
    expect(progress.attempts).toEqual([]);
    expect(progress.questionStats).toEqual({});
    expect(progress.drills).toEqual([]);
    expect(progress.streak.current).toBe(0);
  });
});

describe("trim", () => {
  it("keeps the most recent entries and drops the oldest", () => {
    const attempts = attemptsFor({
      domain: "order-of-draw",
      count: LIMITS.attempts + 50,
      correctPattern: [true],
      distinctQuestions: 10,
    });
    const trimmed = trim({ ...createEmptyProgress(NOW), attempts });

    expect(trimmed.attempts).toHaveLength(LIMITS.attempts);
    // The final attempt survives; the first does not.
    expect(trimmed.attempts.at(-1)).toEqual(attempts.at(-1));
    expect(trimmed.attempts[0]).toEqual(attempts[50]);
  });

  it("leaves a short record untouched", () => {
    const progress = createEmptyProgress(NOW);
    expect(trim(progress)).toEqual(progress);
  });
});

describe("StudyProgressRepository", () => {
  function repository() {
    const driver = createMemoryDriver();
    return {
      driver,
      repo: new StudyProgressRepository({
        driver,
        clock: () => new Date(NOW),
      }),
    };
  }

  it("persists updates and reloads them", () => {
    const { driver, repo } = repository();
    const attempt = attemptsFor({
      domain: "order-of-draw",
      count: 1,
      correctPattern: [true],
    })[0]!;

    repo.update((current) => recordAttempt(current, attempt));

    const reloaded = new StudyProgressRepository({
      driver,
      clock: () => new Date(NOW),
    }).load();

    expect(reloaded.attempts).toHaveLength(1);
    expect(reloaded.questionStats[attempt.questionId]?.correct).toBe(1);
  });

  it("stamps the schema version and updatedAt on every write", () => {
    const { repo } = repository();
    const next = repo.update((current) => current);
    expect(next.version).toBe(PROGRESS_SCHEMA_VERSION);
    expect(next.updatedAt).toBe(NOW);
  });

  it("notifies subscribers and stops after unsubscribe", () => {
    const { repo } = repository();
    const seen: number[] = [];
    const unsubscribe = repo.subscribe((progress) =>
      seen.push(progress.attempts.length),
    );

    const attempt = attemptsFor({
      domain: "order-of-draw",
      count: 1,
      correctPattern: [true],
    })[0]!;
    repo.update((current) => recordAttempt(current, attempt));
    expect(seen).toEqual([1]);

    unsubscribe();
    repo.update((current) => recordAttempt(current, { ...attempt, questionId: "z" }));
    expect(seen).toEqual([1]);
  });

  it("round-trips a resumable mock session", () => {
    const { repo } = repository();
    const session = {
      id: "mock-1",
      certificationId: "nha-cpt" as const,
      questionIds: ["a", "b"],
      index: 1,
      answers: { a: "a" },
      flagged: ["b"],
      startedAt: NOW,
      durationSeconds: 3600,
      secondsRemaining: 3000,
      lastTickAt: NOW,
      submitted: false,
    };

    repo.writeMockSession(session);
    expect(repo.readMockSession()).toEqual(session);

    repo.clearMockSession();
    expect(repo.readMockSession()).toBeNull();
  });

  it("discards a corrupt session rather than throwing", () => {
    const { driver, repo } = repository();
    driver.write(STORAGE_KEYS.mockSession, "{broken");
    expect(repo.readMockSession()).toBeNull();
    // And clears the bad value so it cannot fail again.
    expect(driver.read(STORAGE_KEYS.mockSession)).toBeNull();
  });

  it("clears in-flight sessions as well as progress on reset", () => {
    const { driver, repo } = repository();
    driver.write(STORAGE_KEYS.practiceSession, "{}");
    driver.write(STORAGE_KEYS.mockSession, "{}");

    repo.update((current) =>
      recordAttempt(
        current,
        attemptsFor({ domain: "order-of-draw", count: 1, correctPattern: [true] })[0]!,
      ),
    );

    const fresh = repo.reset();
    expect(fresh.attempts).toEqual([]);
    expect(driver.read(STORAGE_KEYS.progress)).toBeNull();
    expect(driver.read(STORAGE_KEYS.practiceSession)).toBeNull();
    expect(driver.read(STORAGE_KEYS.mockSession)).toBeNull();
    expect(repo.load().attempts).toEqual([]);
  });

  it("exports a self-describing payload", () => {
    const { repo } = repository();
    const exported = JSON.parse(repo.exportJSON());
    expect(exported.app).toBe("phlebotomy-exam-prep");
    expect(exported.schemaVersion).toBe(PROGRESS_SCHEMA_VERSION);
    expect(exported.progress.attempts).toEqual([]);
  });
});
