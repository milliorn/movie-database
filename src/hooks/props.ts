import { Cast, Crew, MoviePropTypes } from "../Global.props";

/**
 * Represents the state of a movie with additional properties for actors and directors.
 */
type MovieState = MoviePropTypes & { actors: Cast[]; directors: Crew[] };

/**
 * Represents the initial state for movies.
 */
const initialState = {
  page: 0,
  results: [] as MoviePropTypes[],
  total_pages: 0,
  total_results: 0,
};

/**
 * Represents the state of movies.
 */
interface MoviesState {
  page: number;
  results: MoviePropTypes[];
  total_pages: number;
  total_results: number;
}

/**
 * Represents the initial state for movies.
 */
const moviesState: MoviesState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export type { MovieState, MoviesState };

export { initialState, moviesState };
