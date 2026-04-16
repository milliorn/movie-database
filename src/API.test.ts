import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "./test/server";
import { api } from "./API";
import { mockMovie, mockCredits, mockMoviesPage1, BASE } from "./test/handlers";

describe("api.fetchMovies", () => {
  it("fetches without a search term using only page param", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/movies`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockMoviesPage1);
      }),
    );

    await api.fetchMovies("", 1);
    expect(capturedUrl).toBe(`${BASE}/api/movies?page=1`);
  });

  it("fetches with a search term including searchTerm param", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/movies`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockMoviesPage1);
      }),
    );

    await api.fetchMovies("batman", 2);
    expect(capturedUrl).toBe(`${BASE}/api/movies?searchTerm=batman&page=2`);
  });

  it("returns the parsed movies response", async () => {
    const result = await api.fetchMovies("", 1);
    expect(result).toEqual(mockMoviesPage1);
  });

  it("throws on a non-ok response", async () => {
    server.use(
      http.get(`${BASE}/api/movies`, () => {
        return HttpResponse.json({ message: "Not Found" }, { status: 404 });
      }),
    );

    await expect(api.fetchMovies("", 1)).rejects.toThrow("API error: 404");
  });
});

describe("api.fetchMovie", () => {
  it("fetches the correct movie endpoint", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/movie/:movieId`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockMovie);
      }),
    );

    await api.fetchMovie("123");
    expect(capturedUrl).toBe(`${BASE}/api/movie/123`);
  });

  it("returns the parsed movie", async () => {
    const result = await api.fetchMovie("123");
    expect(result).toEqual(mockMovie);
  });

  it("throws on a non-ok response", async () => {
    server.use(
      http.get(`${BASE}/api/movie/:movieId`, () => {
        return HttpResponse.json({ message: "Not Found" }, { status: 404 });
      }),
    );

    await expect(api.fetchMovie("999")).rejects.toThrow("API error: 404");
  });
});

describe("api.fetchCredits", () => {
  it("fetches the correct credits endpoint", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/credits/:movieId`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockCredits);
      }),
    );

    await api.fetchCredits("123");
    expect(capturedUrl).toBe(`${BASE}/api/credits/123`);
  });

  it("returns the parsed credits", async () => {
    const result = await api.fetchCredits("123");
    expect(result).toEqual(mockCredits);
  });

  it("throws on a non-ok response", async () => {
    server.use(
      http.get(`${BASE}/api/credits/:movieId`, () => {
        return HttpResponse.json({ message: "Server Error" }, { status: 500 });
      }),
    );

    await expect(api.fetchCredits("123")).rejects.toThrow("API error: 500");
  });
});

describe("api.fetchTopRatedMovies", () => {
  it("fetches the correct top_rated endpoint with page param", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/movies/top_rated`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockMoviesPage1);
      }),
    );

    await api.fetchTopRatedMovies(1);
    expect(capturedUrl).toBe(`${BASE}/api/movies/top_rated?page=1`);
  });

  it("returns the parsed movies response", async () => {
    const result = await api.fetchTopRatedMovies(1);
    expect(result).toEqual(mockMoviesPage1);
  });
});

describe("api.fetchUpcomingMovies", () => {
  it("fetches the upcoming endpoint without search term", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/movies/upcoming`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockMoviesPage1);
      }),
    );

    await api.fetchUpcomingMovies(1);
    expect(capturedUrl).toBe(`${BASE}/api/movies/upcoming?page=1`);
  });

  it("falls back to /api/movies with searchTerm when provided", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/movies`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockMoviesPage1);
      }),
    );

    await api.fetchUpcomingMovies(1, "marvel");
    expect(capturedUrl).toBe(`${BASE}/api/movies?searchTerm=marvel&page=1`);
  });
});

describe("api.fetchNowPlayingMovies", () => {
  it("fetches the now_playing endpoint without search term", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/movies/now_playing`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockMoviesPage1);
      }),
    );

    await api.fetchNowPlayingMovies(1);
    expect(capturedUrl).toBe(`${BASE}/api/movies/now_playing?page=1`);
  });

  it("falls back to /api/movies with searchTerm when provided", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${BASE}/api/movies`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockMoviesPage1);
      }),
    );

    await api.fetchNowPlayingMovies(1, "nolan");
    expect(capturedUrl).toBe(`${BASE}/api/movies?searchTerm=nolan&page=1`);
  });
});
