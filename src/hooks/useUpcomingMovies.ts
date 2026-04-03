import { api } from "../API";
import useMovieFetch, { type MovieFetchResult } from "./useMovieFetch";

function useUpcomingMovies(): MovieFetchResult {
  return useMovieFetch(api.fetchUpcomingMovies, "upcoming", true);
}

export default useUpcomingMovies;
