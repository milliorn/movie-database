import { act, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { server } from "../test/server";
import { mockMovie, mockMoviesPage1, mockMoviesPage2 } from "../test/handlers";
import type { MoviePropTypes } from "../Global.props";
import type { MoviesState } from "./props";
import useMovieFetch from "./useMovieFetch";

const fetcher = vi.fn((page: number, _searchTerm: string) =>
  Promise.resolve(page === 1 ? mockMoviesPage1 : mockMoviesPage2),
);

describe("useMovieFetch (list hook)", () => {
  it("fetches page 1 on mount and sets loading states correctly", async () => {
    const { result } = renderHook(() => useMovieFetch(fetcher, "home"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(false);
    expect(result.current.state.results).toHaveLength(2);
    expect(result.current.state.page).toBe(1);
  });

  it("sets error state when the fetcher throws", async () => {
    const errorFetcher = vi.fn(() => Promise.reject(new Error("API down")));
    const { result } = renderHook(() => useMovieFetch(errorFetcher, "home"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
    expect(result.current.state.results).toHaveLength(0);
  });

  it("appends results when loading more (page > 1)", async () => {
    const { result } = renderHook(() => useMovieFetch(fetcher, "home"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setIsLoadingMore(true);
    });

    await waitFor(() => {
      expect(result.current.state.results).toHaveLength(4);
    });

    expect(result.current.state.page).toBe(2);
    expect(result.current.state.results[0]?.title).toBe("Movie A");
    expect(result.current.state.results[2]?.title).toBe("Movie C");
  });

  it("resets results and refetches when search term changes", async () => {
    const { result } = renderHook(() => useMovieFetch(fetcher, "home"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSearchTerm("batman");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetcher).toHaveBeenCalledWith(1, "batman");
  });

  it("sorts results by release_date descending when sortByDate is true", async () => {
    const newerMovie: MoviePropTypes = {
      ...mockMovie,
      id: 1,
      title: "Movie A",
      release_date: "2024-01-01",
    };
    const olderMovie: MoviePropTypes = {
      ...mockMovie,
      id: 2,
      title: "Movie B",
      release_date: "2023-06-15",
    };
    const unsortedFetcher = vi.fn(
      (): Promise<MoviesState> =>
        Promise.resolve({
          page: 1,
          results: [olderMovie, newerMovie],
          total_pages: 1,
          total_results: 2,
        }),
    );

    const { result } = renderHook(() =>
      useMovieFetch(unsortedFetcher, "home", true),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const dates = result.current.state.results.map((r) => r.release_date);
    expect(dates[0]).toBe("2024-01-01");
    expect(dates[1]).toBe("2023-06-15");
  });

  it("loads from cache and skips the fetcher", async () => {
    const cached = { ...mockMoviesPage1 };
    localStorage.setItem(
      "homeState",
      JSON.stringify({ data: cached, timestamp: Date.now() }),
    );

    const spy = vi.fn(() => Promise.resolve(mockMoviesPage1));
    const { result } = renderHook(() => useMovieFetch(spy, "home"));

    await waitFor(() => {
      expect(result.current.state.results).toHaveLength(2);
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it("uses MSW-intercepted fetch when the api object is the fetcher", async () => {
    server.use(
      http.get("http://localhost:3001/api/movies", () => {
        return HttpResponse.json(mockMoviesPage1);
      }),
    );

    const apiFetcher = (_page: number, searchTerm: string) =>
      fetch(
        `http://localhost:3001/api/movies?searchTerm=${searchTerm}&page=${String(_page)}`,
      ).then((r) => r.json() as Promise<typeof mockMoviesPage1>);

    const { result } = renderHook(() => useMovieFetch(apiFetcher, "home"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.state.results).toHaveLength(2);
  });
});
