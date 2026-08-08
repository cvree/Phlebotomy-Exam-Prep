/**
 * The only place in the app that knows `localStorage` exists.
 *
 * Everything above this file talks to a `StorageDriver`. Swapping in Supabase,
 * Firebase, or an authenticated API later means writing one more driver, not
 * touching the study engine.
 */
export type StorageDriver = {
  read(key: string): string | null;
  write(key: string, value: string): void;
  remove(key: string): void;
};

/** Used on the server, in tests, and whenever localStorage is unavailable. */
export function createMemoryDriver(
  initial: Record<string, string> = {},
): StorageDriver {
  const store = new Map(Object.entries(initial));
  return {
    read: (key) => store.get(key) ?? null,
    write: (key, value) => {
      store.set(key, value);
    },
    remove: (key) => {
      store.delete(key);
    },
  };
}

/**
 * A localStorage driver that degrades instead of throwing.
 *
 * Private browsing modes and full quotas both make localStorage throw on
 * write. A student losing their progress is bad; a study session crashing
 * mid-question is worse, so failures are swallowed here.
 */
export function createLocalStorageDriver(): StorageDriver {
  return {
    read(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    write(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        // Quota exceeded or storage blocked. The in-memory state is still
        // correct for this session; only persistence is lost.
      }
    },
    remove(key) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // See above.
      }
    },
  };
}

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getDefaultDriver(): StorageDriver {
  return isBrowser() ? createLocalStorageDriver() : createMemoryDriver();
}
