import { Cast, Crew, MoviePropTypes } from "../Global.props";

type MovieState = MoviePropTypes & { actors: Cast[]; directors: Crew[] };

const initialState = {
  page: 0,
  results: [] as MoviePropTypes[],
  total_pages: 0,
  total_results: 0,
};

export type { MovieState };

export { initialState };