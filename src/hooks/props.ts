import { Cast, Crew, MoviePropTypes } from "../Global.props";

type MovieState = MoviePropTypes & { actors: Cast[]; directors: Crew[] };

const initialState = {
  page: 0,
  results: [] as MoviePropTypes[],
  total_pages: 0,
  total_results: 0,
};

interface MoviesState {
  page: number;
  results: MoviePropTypes[];
  total_pages: number;
  total_results: number;
}

const moviesState: MoviesState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export type { MovieState, MoviesState };

export { initialState, moviesState };
