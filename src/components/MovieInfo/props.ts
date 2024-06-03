import { MovieState } from "../../hooks/props";

/**
 * Props for the wrapper component of the MovieInfo component.
 */
type WrapperProps = {
  $backdrop: string;
};

/**
 * Props for the MovieInfo component.
 */
type MovieInfoProps = {
  movie: MovieState;
};

export type { WrapperProps, MovieInfoProps };
