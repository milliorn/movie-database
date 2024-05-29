import { MovieState } from "../../hooks/useMovieFetch";

export type WrapperProps = {
  $backdrop: string;
};

export type MovieInfoProps = {
  movie: MovieState;
};