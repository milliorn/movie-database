import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "../test/server";
import { mockCredits, mockMovie } from "../test/handlers";
import useMovieFetch from "./useMoviesFetch";

describe("useMovieFetch", () => {
  it("starts in a loading state", () => {
    const { result } = renderHook(() => useMovieFetch("123"));
    expect(result.current.loading).toBe(true);
    expect(result.current.state).toBeNull();
    expect(result.current.error).toBe(false);
  });

  it("returns movie data with actors and directors after a successful fetch", async () => {
    const { result } = renderHook(() => useMovieFetch("123"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(false);
    expect(result.current.state).toMatchObject({
      id: mockMovie.id,
      title: mockMovie.title,
    });
    expect(result.current.state?.actors).toHaveLength(mockCredits.cast.length);
    // Only the Director crew member should be included, not the Producer
    expect(result.current.state?.directors).toHaveLength(1);
    expect(result.current.state?.directors[0]?.name).toBe("Director One");
  });

  it("sets error state when the movie fetch fails", async () => {
    server.use(
      http.get("http://localhost:3001/api/movie/:movieId", () =>
        HttpResponse.error(),
      ),
    );

    const { result } = renderHook(() => useMovieFetch("123"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
    expect(result.current.state).toBeNull();
  });

  it("sets error state when the credits fetch fails", async () => {
    server.use(
      http.get("http://localhost:3001/api/credits/:movieId", () =>
        HttpResponse.error(),
      ),
    );

    const { result } = renderHook(() => useMovieFetch("123"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
  });

  it("uses cached state from localStorage instead of fetching", async () => {
    const cached = { ...mockMovie, actors: [], directors: [] };
    localStorage.setItem(
      "123",
      JSON.stringify({ data: cached, timestamp: Date.now() }),
    );

    const { result } = renderHook(() => useMovieFetch("123"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.state).toMatchObject({ title: mockMovie.title });
    expect(result.current.error).toBe(false);
  });
});
