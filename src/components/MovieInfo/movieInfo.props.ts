import { MovieState } from "../../hooks/useMoviesFetch";

export type WrapperProps = {
  $backdrop: string;
};

export type MovieInfoProps = {
  movie: MovieState;
};