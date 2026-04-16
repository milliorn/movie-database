import { http, HttpResponse } from "msw";
import type { MoviePropTypes } from "../Global.props";

export const BASE = "http://localhost:3001";

export const mockMovie: MoviePropTypes = {
  adult: false,
  backdrop_path: "/backdrop.jpg",
  budget: 200000000,
  genres: [{ id: 28, name: "Action" }],
  homepage: "",
  id: 123,
  logo_path: null,
  original_language: "en",
  original_title: "Test Movie",
  overview: "A test movie overview.",
  popularity: 100,
  poster_path: "/poster.jpg",
  production_companies: [],
  release_date: "2024-01-01",
  revenue: 500000000,
  runtime: 120,
  status: "Released",
  tagline: "Just a test.",
  title: "Test Movie",
  vote_average: 7.5,
  vote_count: 1000,
};

export const mockCredits = {
  id: 123,
  cast: [
    {
      character: "Hero",
      credit_id: "c1",
      name: "Actor One",
      profile_path: null,
    },
    {
      character: "Villain",
      credit_id: "c2",
      name: "Actor Two",
      profile_path: null,
    },
  ],
  crew: [
    { credit_id: 1, job: "Director", name: "Director One" },
    { credit_id: 2, job: "Producer", name: "Producer One" },
  ],
};

export const mockMoviesPage1 = {
  page: 1,
  results: [
    { ...mockMovie, id: 1, title: "Movie A", release_date: "2024-01-01" },
    { ...mockMovie, id: 2, title: "Movie B", release_date: "2023-06-15" },
  ],
  total_pages: 2,
  total_results: 4,
};

export const mockMoviesPage2 = {
  page: 2,
  results: [
    { ...mockMovie, id: 3, title: "Movie C", release_date: "2022-03-10" },
    { ...mockMovie, id: 4, title: "Movie D", release_date: "2021-11-20" },
  ],
  total_pages: 2,
  total_results: 4,
};

export const handlers = [
  http.get(`${BASE}/api/movie/:movieId`, () => {
    return HttpResponse.json(mockMovie);
  }),

  http.get(`${BASE}/api/credits/:movieId`, () => {
    return HttpResponse.json(mockCredits);
  }),

  http.get(`${BASE}/api/movies`, () => {
    return HttpResponse.json(mockMoviesPage1);
  }),

  http.get(`${BASE}/api/movies/top_rated`, () => {
    return HttpResponse.json(mockMoviesPage1);
  }),

  http.get(`${BASE}/api/movies/upcoming`, () => {
    return HttpResponse.json(mockMoviesPage1);
  }),

  http.get(`${BASE}/api/movies/now_playing`, () => {
    return HttpResponse.json(mockMoviesPage1);
  }),
];
