import type { MovieState } from "../../hooks/props";

/**
 * Props for the wrapper component of the MovieInfo component.
 */
interface WrapperProps {
  $backdrop: string;
}

/**
 * Props for the MovieInfo component.
 */
interface MovieInfoProps {
  movie: MovieState;
}

export type { WrapperProps, MovieInfoProps };
