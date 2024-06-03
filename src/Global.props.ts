/**
 * Represents the properties of a movie.
 */
type MoviePropTypes = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  logo_path: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { name: string; id: number; logo_path: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

/**
 * Represents a crew member in a movie.
 */
type Crew = {
  credit_id: number;
  job: string;
  name: string;
};

/**
 * Represents the cast of a movie.
 */
type Cast = {
  character: string;
  credit_id: string;
  name: string;
  profile_path: string;
};

export type { MoviePropTypes, Crew, Cast };