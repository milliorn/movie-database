import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "../test/server";
import { mockMovie, BASE } from "../test/handlers";
import type { MoviesState } from "./props";
import useNowPlayingMovies from "./useNowPlayingMovies";

describe("useNowPlayingMovies", () => {
  it("fetches from /api/movies/now_playing on mount", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/movies/now_playing`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json({
          page: 1,
          results: [mockMovie],
          total_pages: 1,
          total_results: 1,
        } satisfies MoviesState);
      }),
    );

    const { result } = renderHook(() => useNowPlayingMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(capturedUrl).toContain("/api/movies/now_playing");
    expect(result.current.state.results).toHaveLength(1);
  });

  it("caches results under the nowPlaying prefix", async () => {
    server.use(
      http.get(`${BASE}/api/movies/now_playing`, () => {
        return HttpResponse.json({
          page: 1,
          results: [mockMovie],
          total_pages: 1,
          total_results: 1,
        } satisfies MoviesState);
      }),
    );

    const { result } = renderHook(() => useNowPlayingMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(localStorage.getItem("nowPlayingState")).not.toBeNull();
  });

  it("sorts results by release_date descending", async () => {
    const older: typeof mockMovie = { ...mockMovie, id: 1, title: "Older", release_date: "2022-01-01" };
    const newer: typeof mockMovie = { ...mockMovie, id: 2, title: "Newer", release_date: "2024-06-01" };

    server.use(
      http.get(`${BASE}/api/movies/now_playing`, () => {
        return HttpResponse.json({
          page: 1,
          results: [older, newer],
          total_pages: 1,
          total_results: 2,
        } satisfies MoviesState);
      }),
    );

    const { result } = renderHook(() => useNowPlayingMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const titles = result.current.state.results.map((r) => r.title);
    expect(titles).toEqual(["Newer", "Older"]);
  });

  it("sets error state when the API fails", async () => {
    server.use(
      http.get(`${BASE}/api/movies/now_playing`, () => {
        return HttpResponse.json({ message: "Server Error" }, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useNowPlayingMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
  });
});
