import type {
  ActiveMockSession,
  ActivePracticeSession,
  MockResult,
} from "@/types/study";
import { getDefaultDriver, type StorageDriver } from "./driver";
import { migrateProgress } from "./migrations";
import {
  LIMITS,
  PROGRESS_SCHEMA_VERSION,
  STORAGE_KEYS,
  createEmptyProgress,
  type StoredProgress,
} from "./schema";

type Listener = (progress: StoredProgress) => void;

/**
 * The single owner of persisted study data.
 *
 * Components never touch storage keys or JSON — they call methods here, or go
 * through the `StudyProgressProvider` that wraps this. That keeps the
 * persistence format changeable without a hunt through the component tree.
 */
export class StudyProgressRepository {
  private driver: StorageDriver;
  private cache: StoredProgress | null = null;
  private listeners = new Set<Listener>();
  private clock: () => Date;

  constructor(options: { driver?: StorageDriver; clock?: () => Date } = {}) {
    this.driver = options.driver ?? getDefaultDriver();
    this.clock = options.clock ?? (() => new Date());
  }

  private now(): string {
    return this.clock().toISOString();
  }

  load(): StoredProgress {
    if (this.cache) {
      return this.cache;
    }
    const raw = this.driver.read(STORAGE_KEYS.progress);
    const { progress } = migrateProgress(raw, this.now());
    this.cache = progress;
    return progress;
  }

  /**
   * Applies a pure update and persists the result.
   *
   * Callers return a whole new `StoredProgress`; nothing mutates in place, so
   * React state comparisons stay honest.
   */
  update(mutator: (current: StoredProgress) => StoredProgress): StoredProgress {
    const next = trim({
      ...mutator(this.load()),
      version: PROGRESS_SCHEMA_VERSION,
      updatedAt: this.now(),
    });
    this.cache = next;
    this.persist(next);
    this.emit(next);
    return next;
  }

  reset(): StoredProgress {
    const fresh = createEmptyProgress(this.now());
    this.cache = fresh;
    this.driver.remove(STORAGE_KEYS.progress);
    this.driver.remove(STORAGE_KEYS.practiceSession);
    this.driver.remove(STORAGE_KEYS.mockSession);
    this.driver.remove(STORAGE_KEYS.lastMockResult);
    this.emit(fresh);
    return fresh;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Everything a student would want if they moved to another device. */
  exportJSON(): string {
    return JSON.stringify(
      {
        exportedAt: this.now(),
        schemaVersion: PROGRESS_SCHEMA_VERSION,
        app: "phlebotomy-exam-prep",
        progress: this.load(),
      },
      null,
      2,
    );
  }

  // --- Resumable sessions -------------------------------------------------
  //
  // Kept in their own keys so a corrupt in-flight session can never take the
  // long-term progress record down with it.

  readPracticeSession(): ActivePracticeSession | null {
    return readJSON<ActivePracticeSession>(
      this.driver,
      STORAGE_KEYS.practiceSession,
    );
  }

  writePracticeSession(session: ActivePracticeSession): void {
    this.driver.write(STORAGE_KEYS.practiceSession, JSON.stringify(session));
  }

  clearPracticeSession(): void {
    this.driver.remove(STORAGE_KEYS.practiceSession);
  }

  readMockSession(): ActiveMockSession | null {
    return readJSON<ActiveMockSession>(this.driver, STORAGE_KEYS.mockSession);
  }

  writeMockSession(session: ActiveMockSession): void {
    this.driver.write(STORAGE_KEYS.mockSession, JSON.stringify(session));
  }

  clearMockSession(): void {
    this.driver.remove(STORAGE_KEYS.mockSession);
  }

  readLastMockResult(): MockResult | null {
    return readJSON<MockResult>(this.driver, STORAGE_KEYS.lastMockResult);
  }

  writeLastMockResult(result: MockResult): void {
    this.driver.write(STORAGE_KEYS.lastMockResult, JSON.stringify(result));
  }

  private persist(progress: StoredProgress): void {
    this.driver.write(STORAGE_KEYS.progress, JSON.stringify(progress));
  }

  private emit(progress: StoredProgress): void {
    for (const listener of this.listeners) {
      listener(progress);
    }
  }
}

function readJSON<T>(driver: StorageDriver, key: string): T | null {
  const raw = driver.read(key);
  if (raw === null) {
    return null;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    driver.remove(key);
    return null;
  }
}

/** Keeps the record inside the localStorage budget, dropping oldest first. */
export function trim(progress: StoredProgress): StoredProgress {
  return {
    ...progress,
    attempts: tail(progress.attempts, LIMITS.attempts),
    sessions: tail(progress.sessions, LIMITS.sessions),
    drills: tail(progress.drills, LIMITS.drills),
    mockResults: tail(progress.mockResults, LIMITS.mockResults),
    vocab: {
      ...progress.vocab,
      // Card state is never trimmed: it is one small object per term, bounded
      // by the size of the bank, and losing it would silently reset a
      // student's review schedule.
      sessions: tail(progress.vocab.sessions, LIMITS.vocabSessions),
    },
  };
}

function tail<T>(items: T[], max: number): T[] {
  return items.length <= max ? items : items.slice(items.length - max);
}

/** Shared instance for the browser. Tests construct their own. */
let singleton: StudyProgressRepository | null = null;

export function getProgressRepository(): StudyProgressRepository {
  if (!singleton) {
    singleton = new StudyProgressRepository();
  }
  return singleton;
}
