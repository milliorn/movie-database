import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "../test/server";
import { mockCredits, mockMovie, BASE } from "../test/handlers";
import { TTL_MS } from "../helpers";
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
      http.get(`${BASE}/api/movie/:movieId`, () => HttpResponse.error()),
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
      http.get(`${BASE}/api/credits/:movieId`, () => HttpResponse.error()),
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

  it("loads from cache and skips the API on a second render", async () => {
    // Prime the cache via a first render
    const { result: first } = renderHook(() => useMovieFetch("123"));
    await waitFor(() => {
      expect(first.current.loading).toBe(false);
    });

    // Block the API so a real fetch would fail
    server.use(
      http.get(`${BASE}/api/movie/:id`, () =>
        HttpResponse.json({}, { status: 500 }),
      ),
    );

    const { result: second } = renderHook(() => useMovieFetch("123"));
    await waitFor(() => {
      expect(second.current.loading).toBe(false);
    });

    expect(second.current.state?.title).toBe("Test Movie");
    expect(second.current.error).toBe(false);
  });

  it("re-fetches when the cache entry has expired", async () => {
    const expiredTimestamp = Date.now() - TTL_MS - 1000;
    localStorage.setItem(
      "123",
      JSON.stringify({
        data: { ...mockMovie, actors: [], directors: [] },
        timestamp: expiredTimestamp,
      }),
    );

    let fetchCalled = false;
    server.use(
      http.get(`${BASE}/api/movie/:movieId`, () => {
        fetchCalled = true;
        return HttpResponse.json(mockMovie);
      }),
    );

    const { result } = renderHook(() => useMovieFetch("123"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetchCalled).toBe(true);
    expect(result.current.error).toBe(false);
  });

  it("re-fetches when movieId changes", async () => {
    const secondMovie = { ...mockMovie, id: 456, title: "Second Movie" };
    let lastFetchedId = "";

    server.use(
      http.get(`${BASE}/api/movie/:movieId`, ({ params }) => {
        lastFetchedId = params["movieId"] as string;
        return HttpResponse.json(
          lastFetchedId === "456" ? secondMovie : mockMovie,
        );
      }),
    );

    const { result, rerender } = renderHook(
      ({ movieId }: { movieId: string }) => useMovieFetch(movieId),
      { initialProps: { movieId: "123" } },
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.state?.title).toBe("Test Movie");

    rerender({ movieId: "456" });

    await waitFor(() => {
      expect(result.current.state?.title).toBe("Second Movie");
    });
    expect(lastFetchedId).toBe("456");
  });

  it("crew with no directors results in an empty directors array", async () => {
    server.use(
      http.get(`${BASE}/api/credits/:movieId`, () => {
        return HttpResponse.json({
          id: 123,
          cast: mockCredits.cast,
          crew: [{ credit_id: 1, job: "Producer", name: "Producer Only" }],
        });
      }),
    );

    const { result } = renderHook(() => useMovieFetch("123"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.state?.directors).toHaveLength(0);
    expect(result.current.state?.actors).toHaveLength(mockCredits.cast.length);
  });

  it("persists fetched state to localStorage", async () => {
    const { result } = renderHook(() => useMovieFetch("123"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const cached = localStorage.getItem("123");
    expect(cached).not.toBeNull();

    const parsed = JSON.parse(cached ?? "{}") as { data: { title: string } };
    expect(parsed.data.title).toBe(mockMovie.title);
  });
});
