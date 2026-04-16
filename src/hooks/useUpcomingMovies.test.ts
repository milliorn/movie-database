import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "../test/server";
import { mockMovie, BASE } from "../test/handlers";
import type { MoviesState } from "./props";
import useUpcomingMovies from "./useUpcomingMovies";

describe("useUpcomingMovies", () => {
  it("fetches from /api/movies/upcoming on mount", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/movies/upcoming`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json({
          page: 1,
          results: [mockMovie],
          total_pages: 1,
          total_results: 1,
        } satisfies MoviesState);
      }),
    );

    const { result } = renderHook(() => useUpcomingMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(capturedUrl).toContain("/api/movies/upcoming");
    expect(result.current.state.results).toHaveLength(1);
  });

  it("caches results under the upcoming prefix", async () => {
    server.use(
      http.get(`${BASE}/api/movies/upcoming`, () => {
        return HttpResponse.json({
          page: 1,
          results: [mockMovie],
          total_pages: 1,
          total_results: 1,
        } satisfies MoviesState);
      }),
    );

    const { result } = renderHook(() => useUpcomingMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(localStorage.getItem("upcomingState")).not.toBeNull();
  });

  it("sorts results by release_date descending", async () => {
    const older: typeof mockMovie = {
      ...mockMovie,
      id: 1,
      title: "Older",
      release_date: "2022-01-01",
    };
    const newer: typeof mockMovie = {
      ...mockMovie,
      id: 2,
      title: "Newer",
      release_date: "2025-03-15",
    };

    server.use(
      http.get(`${BASE}/api/movies/upcoming`, () => {
        return HttpResponse.json({
          page: 1,
          results: [older, newer],
          total_pages: 1,
          total_results: 2,
        } satisfies MoviesState);
      }),
    );

    const { result } = renderHook(() => useUpcomingMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const titles = result.current.state.results.map((r) => r.title);
    expect(titles).toEqual(["Newer", "Older"]);
  });

  it("sets error state when the API fails", async () => {
    server.use(
      http.get(`${BASE}/api/movies/upcoming`, () => {
        return HttpResponse.json({ message: "Server Error" }, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useUpcomingMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
  });
});
