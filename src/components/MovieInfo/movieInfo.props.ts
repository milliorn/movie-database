import { MovieState } from "../../hooks/useMoviesFetch";

type WrapperProps = {
  $backdrop: string;
};

type MovieInfoProps = {
  movie: MovieState;
};

export type { WrapperProps, MovieInfoProps };
