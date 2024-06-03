import { Cast, Crew, MoviePropTypes } from "../Global.props";

type MovieState = MoviePropTypes & { actors: Cast[]; directors: Crew[] };

export type { MovieState };