import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  calcTime,
  convertMoney,
  getCacheKey,
  getPersistedState,
  pruneSearchCache,
  setPersistedState,
} from "./helpers";

describe("calcTime", () => {
  it("converts minutes to hours and minutes", () => {
    expect(calcTime(120)).toBe("2h 0m");
    expect(calcTime(90)).toBe("1h 30m");
    expect(calcTime(145)).toBe("2h 25m");
  });

  it("handles less than one hour", () => {
    expect(calcTime(45)).toBe("0h 45m");
  });

  it("handles zero", () => {
    expect(calcTime(0)).toBe("0h 0m");
  });
});

describe("convertMoney", () => {
  it("formats a number as USD currency", () => {
    expect(convertMoney(1000000)).toBe("$1,000,000");
    expect(convertMoney(0)).toBe("$0");
    expect(convertMoney(500)).toBe("$500");
  });
});

describe("getCacheKey", () => {
  it("returns prefixState when searchTerm is empty", () => {
    expect(getCacheKey("home", "")).toBe("homeState");
    expect(getCacheKey("nowPlaying", "")).toBe("nowPlayingState");
  });

  it("returns prefixSearch_<encoded> when searchTerm is provided", () => {
    expect(getCacheKey("home", "batman")).toBe("homeSearch_batman");
    expect(getCacheKey("home", "the dark knight")).toBe(
      "homeSearch_the%20dark%20knight",
    );
  });
});

describe("setPersistedState / getPersistedState", () => {
  it("stores and retrieves a value", () => {
    setPersistedState("testKey", { foo: "bar" });
    expect(getPersistedState("testKey")).toEqual({ foo: "bar" });
  });

  it("returns null for a missing key", () => {
    expect(getPersistedState("nonexistent")).toBeNull();
  });

  it("returns null and removes the entry when TTL has expired", () => {
    const expiredTimestamp = Date.now() - 25 * 60 * 60 * 1000; // 25 hours ago
    localStorage.setItem(
      "expiredKey",
      JSON.stringify({ data: "stale", timestamp: expiredTimestamp }),
    );

    expect(getPersistedState("expiredKey")).toBeNull();
    expect(localStorage.getItem("expiredKey")).toBeNull();
  });

  it("returns null and removes the entry for corrupted JSON", () => {
    localStorage.setItem("badKey", "not-valid-json{{{");
    expect(getPersistedState("badKey")).toBeNull();
    expect(localStorage.getItem("badKey")).toBeNull();
  });

  it("catches and logs when the data cannot be serialized", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementationOnce(vi.fn());
    const circular: Record<string, unknown> = {};
    circular["self"] = circular;
    setPersistedState("anyKey", circular);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to save state for key",
      "anyKey",
      ":",
      expect.any(TypeError),
    );
  });
});

describe("pruneSearchCache", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not prune when entries are within the limit", () => {
    for (let i = 0; i < 5; i++) {
      localStorage.setItem(
        `homeSearch_query${String(i)}`,
        JSON.stringify({ data: {}, timestamp: Date.now() }),
      );
    }

    pruneSearchCache("home");

    expect(
      Object.keys(localStorage).filter((k) => k.startsWith("homeSearch_")),
    ).toHaveLength(5);
  });

  it("evicts the oldest entries when over the 30-entry limit", () => {
    for (let i = 0; i < 35; i++) {
      vi.setSystemTime(Date.now() + i * 1000);
      localStorage.setItem(
        `homeSearch_query${String(i)}`,
        JSON.stringify({ data: {}, timestamp: Date.now() }),
      );
    }

    pruneSearchCache("home");

    const remaining = Object.keys(localStorage).filter((k) =>
      k.startsWith("homeSearch_"),
    );
    expect(remaining).toHaveLength(30);
    for (let i = 0; i < 5; i++) {
      expect(
        localStorage.getItem(`homeSearch_query${String(i)}`),
      ).toBeNull();
    }
    for (let i = 5; i < 35; i++) {
      expect(
        localStorage.getItem(`homeSearch_query${String(i)}`),
      ).not.toBeNull();
    }
  });

  it("ignores keys from other prefixes", () => {
    for (let i = 0; i < 35; i++) {
      localStorage.setItem(
        `nowPlayingSearch_query${String(i)}`,
        JSON.stringify({ data: {}, timestamp: Date.now() }),
      );
    }
    localStorage.setItem(
      "homeSearch_unrelated",
      JSON.stringify({ data: {}, timestamp: Date.now() }),
    );

    pruneSearchCache("home");

    expect(
      Object.keys(localStorage).filter((k) =>
        k.startsWith("nowPlayingSearch_"),
      ),
    ).toHaveLength(35);
    expect(localStorage.getItem("homeSearch_unrelated")).not.toBeNull();
  });

  it("removes corrupted entries encountered during pruning", () => {
    localStorage.setItem("homeSearch_corrupt", "invalid-json{");

    pruneSearchCache("home");

    expect(localStorage.getItem("homeSearch_corrupt")).toBeNull();
  });

  it("skips entries whose getItem returns a falsy value", () => {
    localStorage.setItem("homeSearch_empty", "");

    pruneSearchCache("home");

    // Entry is silently skipped (not pushed to entries, not removed)
    expect(localStorage.getItem("homeSearch_empty")).toBe("");
  });
});
