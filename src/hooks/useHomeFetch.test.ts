import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "../test/server";
import { mockMoviesPage1 } from "../test/handlers";
import useHomeFetch from "./useHomeFetch";

describe("useHomeFetch", () => {
  it("fetches from /api/movies on mount", async () => {
    let capturedUrl = "";
    server.use(
      http.get("http://localhost:3001/api/movies", ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockMoviesPage1);
      }),
    );

    const { result } = renderHook(() => useHomeFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(capturedUrl).toContain("/api/movies");
    expect(result.current.state.results).toHaveLength(2);
  });

  it("caches results under the home prefix", async () => {
    const { result } = renderHook(() => useHomeFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(localStorage.getItem("homeState")).not.toBeNull();
  });

  it("does not sort results by date", async () => {
    const { result } = renderHook(() => useHomeFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Results arrive in API order — Movie A (2024) before Movie B (2023)
    const titles = result.current.state.results.map((r) => r.title);
    expect(titles).toEqual(["Movie A", "Movie B"]);
  });

  it("sets error state when the API fails", async () => {
    server.use(
      http.get("http://localhost:3001/api/movies", () => {
        return HttpResponse.json({ message: "Server Error" }, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useHomeFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
  });
});
