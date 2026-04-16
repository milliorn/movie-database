import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { mockCredits } from "../test/handlers";
import { server } from "../test/server";
import useMovieFetch from "./useMoviesFetch";

describe("useMoviesFetch", () => {
  it("fetches movie and credits then merges them into state", async () => {
    const { result } = renderHook(() => useMovieFetch("123"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(false);
    expect(result.current.state?.title).toBe("Test Movie");
    expect(result.current.state?.actors).toHaveLength(mockCredits.cast.length);
  });

  it("filters crew to only include directors in state.directors", async () => {
    const { result } = renderHook(() => useMovieFetch("123"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const directors = result.current.state?.directors ?? [];
    expect(directors.every((d) => d.job === "Director")).toBe(true);
  });

  it("caches the result in localStorage under the movieId key", async () => {
    const { result } = renderHook(() => useMovieFetch("123"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(localStorage.getItem("123")).not.toBeNull();
  });

  it("loads from cache and skips the API on a second render", async () => {
    // Prime the cache via a first render
    const { result: first } = renderHook(() => useMovieFetch("123"));
    await waitFor(() => { expect(first.current.loading).toBe(false); });

    // Block the API so a real fetch would fail
    server.use(
      http.get("http://localhost:3001/api/movie/:id", () =>
        HttpResponse.json({}, { status: 500 }),
      ),
    );

    const { result: second } = renderHook(() => useMovieFetch("123"));
    await waitFor(() => { expect(second.current.loading).toBe(false); });

    expect(second.current.state?.title).toBe("Test Movie");
    expect(second.current.error).toBe(false);
  });

  it("sets error state when the API fails", async () => {
    server.use(
      http.get("http://localhost:3001/api/movie/:movieId", () =>
        HttpResponse.json({ message: "Not found" }, { status: 500 }),
      ),
    );

    const { result } = renderHook(() => useMovieFetch("999"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
    expect(result.current.state).toBeNull();
  });

  it("starts with loading true", () => {
    const { result } = renderHook(() => useMovieFetch("123"));
    expect(result.current.loading).toBe(true);
  });
});
