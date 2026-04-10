const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachedEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * Calculates the time in hours and minutes based on the given time in minutes.
 * @param time - The time in minutes.
 * @returns A string representing the time in the format "Xh Ym".
 */
function calcTime(time: number): string {
  const hours: number = Math.floor(time / 60);
  const mins: number = time % 60;
  return `${hours}h ${mins}m`;
}

/**
 * Formatter for USD currency.
 */
const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

/**
 * Converts a number representing money into a formatted string.
 *
 * @param money - The amount of money to convert.
 * @returns The formatted string representing the money.
 */
function convertMoney(money: number): string {
  return usdFormatter.format(money);
}

/**
 * Persists state to localStorage with a timestamp for TTL checking.
 *
 * @param key - The localStorage key.
 * @param data - The data to persist.
 */
function setPersistedState(key: string, data: unknown): void {
  try {
    const entry: CachedEntry<unknown> = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    console.error("Failed to save state for key", key, ":", error);
  }
}

/**
 * Retrieves persisted state from localStorage, returning null if missing or expired.
 *
 * @param key - The localStorage key.
 * @returns The cached data, or null if not found or expired.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
function getPersistedState<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) return null;

    const entry = JSON.parse(raw) as CachedEntry<T>;

    if (Date.now() - entry.timestamp > TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.error("Failed to parse state for key", key, ":", error);
    localStorage.removeItem(key);
    return null;
  }
}

function getCacheKey(prefix: string, searchTerm: string): string {
  return searchTerm
    ? `${prefix}Search_${encodeURIComponent(searchTerm)}`
    : `${prefix}State`;
}

const SEARCH_CACHE_LIMIT = 30;

/**
 * Evicts the oldest search cache entries for a given prefix when the count
 * exceeds SEARCH_CACHE_LIMIT, preventing unbounded localStorage growth.
 *
 * @param prefix - The cache key prefix (e.g. "home", "nowPlaying").
 */
function pruneSearchCache(prefix: string): void {
  const pattern = `${prefix}Search_`;
  const entries: { key: string; timestamp: number }[] = [];

  for (const key of Object.keys(localStorage)) {
    if (key.startsWith(pattern)) {
      try {
        const raw = localStorage.getItem(key);

        if (raw) {
          const { timestamp } = JSON.parse(raw) as CachedEntry<unknown>;
          entries.push({ key, timestamp });
        }
      } catch {
        localStorage.removeItem(key);
      }
    }
  }

  if (entries.length > SEARCH_CACHE_LIMIT) {
    entries
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(0, entries.length - SEARCH_CACHE_LIMIT)
      .forEach(({ key }) => {
        localStorage.removeItem(key);
      });
  }
}

export {
  calcTime,
  convertMoney,
  getCacheKey,
  getPersistedState,
  pruneSearchCache,
  setPersistedState,
};
