import { BACKEND_API_URL } from "./config";
import { Cast, Crew, MoviePropTypes } from "./Global.props";

/**
 * Represents a collection of movies.
 */
type Movies = {
  page: number;
  results: MoviePropTypes[];
  total_pages: number;
  total_results: number;
};

/**
 * Represents the credits for a movie or TV show.
 */
type Credits = {
  cast: Cast[];
  crew: Crew[];
  id: number;
};

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
    return await (await fetch(endpoint)).json();
  },
  /**
   * Fetches details of a specific movie.
   * @param movieId - The ID of the movie.
   * @returns A promise that resolves to a MoviePropTypes object.
   */
  fetchMovie: async (movieId: string): Promise<MoviePropTypes> => {
    const response = await fetch(`${BACKEND_API_URL}/api/movie/${movieId}`);
    return await response.json();
  },
  /**
   * Fetches the credits for a specific movie.
   * @param movieId - The ID of the movie.
   * @returns A promise that resolves to a Credits object.
   */
  fetchCredits: async (movieId: string): Promise<Credits> => {
    const response = await fetch(`${BACKEND_API_URL}/api/credits/${movieId}`);
    return await response.json();
  },
  /**
   * Fetches a list of top rated movies based on the page number.
   * @param page - The page number of the movie list.
   * @returns A promise that resolves to a Movies object.
   */
  fetchTopRatedMovies: async (page: number): Promise<Movies> => {
    const response = await fetch(
      `${BACKEND_API_URL}/api/movies/top_rated?page=${page}`,
    );
    return await response.json();
  },
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

    const response = await fetch(endpoint);
    return await response.json();
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

    const response = await fetch(endpoint);
    return await response.json();
  },
};

export { api };
export type { Credits, Movies };
