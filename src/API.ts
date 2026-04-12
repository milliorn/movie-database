import { BACKEND_API_URL } from "./config";
import type { Cast, Crew, MoviePropTypes } from "./Global.props";

/**
 * Represents a collection of movies.
 */
interface Movies {
  page: number;
  results: MoviePropTypes[];
  total_pages: number;
  total_results: number;
}

/**
 * Represents the credits for a movie or TV show.
 */
interface Credits {
  cast: Cast[];
  crew: Crew[];
  id: number;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  return (await response.json()) as unknown as T;
}

/**
 * The API object provides methods for fetching movies, movie details, credits, and more.
 */
const api = {
  /**
   * Fetches a list of movies based on the search term and page number.
   * @param searchTerm - The search term to filter movies.
   * @param page - The page number of the movie list.
   * @returns A promise that resolves to a Movies object.
   */
  fetchMovies: async (searchTerm: string, page: number): Promise<Movies> => {
    const endpoint = searchTerm
      ? `${BACKEND_API_URL}/api/movies?searchTerm=${searchTerm}&page=${page}`
      : `${BACKEND_API_URL}/api/movies?page=${page}`;
    return fetchJSON<Movies>(endpoint);
  },
  /**
   * Fetches details of a specific movie.
   * @param movieId - The ID of the movie.
   * @returns A promise that resolves to a MoviePropTypes object.
   */
  fetchMovie: async (movieId: string): Promise<MoviePropTypes> =>
    fetchJSON<MoviePropTypes>(`${BACKEND_API_URL}/api/movie/${movieId}`),
  /**
   * Fetches the credits for a specific movie.
   * @param movieId - The ID of the movie.
   * @returns A promise that resolves to a Credits object.
   */
  fetchCredits: async (movieId: string): Promise<Credits> =>
    fetchJSON<Credits>(`${BACKEND_API_URL}/api/credits/${movieId}`),
  /**
   * Fetches a list of top rated movies based on the page number.
   * @param page - The page number of the movie list.
   * @returns A promise that resolves to a Movies object.
   */
  fetchTopRatedMovies: async (page: number): Promise<Movies> =>
    fetchJSON<Movies>(`${BACKEND_API_URL}/api/movies/top_rated?page=${page}`),
  /**
   * Fetches a list of upcoming movies based on the page number.
   * @param page - The page number of the movie list.
   * @returns A promise that resolves to a Movies object.
   */
  fetchUpcomingMovies: async (
    page: number,
    searchTerm?: string,
  ): Promise<Movies> => {
    const endpoint = searchTerm
      ? `${BACKEND_API_URL}/api/movies?searchTerm=${searchTerm}&page=${page}`
      : `${BACKEND_API_URL}/api/movies/upcoming?page=${page}`;
    return fetchJSON<Movies>(endpoint);
  },
  /**
   * Fetches a list of now playing movies based on the page number.
   * @param page - The page number of the movie list.
   * @returns A promise that resolves to a Movies object.
   */
  fetchNowPlayingMovies: async (
    page: number,
    searchTerm?: string,
  ): Promise<Movies> => {
    const endpoint = searchTerm
      ? `${BACKEND_API_URL}/api/movies?searchTerm=${searchTerm}&page=${page}`
      : `${BACKEND_API_URL}/api/movies/now_playing?page=${page}`;
    return fetchJSON<Movies>(endpoint);
  },
};

export { api };
export type { Credits, Movies };
