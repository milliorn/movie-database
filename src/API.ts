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
 * The API object provides methods for fetching movies, movie details, credits, and authentication.
 */
const api = {
  /**
   * Fetches a list of movies based on the search term and page number.
   * @param searchTerm - The search term to filter movies.
   * @param page - The page number of the search results.
   * @returns A Promise that resolves to a Movies object.
   */
  fetchMovies: async (searchTerm: string, page: number): Promise<Movies> => {
    const endpoint = searchTerm
      ? `${BACKEND_API_URL}/api/movies?searchTerm=${searchTerm}&page=${page}`
      : `${BACKEND_API_URL}/api/movies?page=${page}`;

    return await (await fetch(endpoint)).json();
  },
  /**
   * Fetches details of a specific movie.
   * @param movieId - The ID of the movie to fetch.
   * @returns A Promise that resolves to a Movie object.
   */
  fetchMovie: async (movieId: string): Promise<MoviePropTypes> => {
    const response = await fetch(`${BACKEND_API_URL}/api/movie/${movieId}`); // This is a mock API
    const movie = await response.json();
    return movie;
  },
  /**
   * Fetches the credits for a specific movie.
   * @param movieId - The ID of the movie to fetch credits for.
   * @returns A Promise that resolves to a Credits object.
   */
  fetchCredits: async (movieId: string): Promise<Credits> => {
    const response = await fetch(`${BACKEND_API_URL}/api/credits/${movieId}`); // This is a mock API
    const credits = await response.json();
    return credits;
  },
};

export { api };
export type { Credits, Movies };
