import { api } from "../API";
import useMovieFetch, { type MovieFetchResult } from "./useMovieFetch";

function useNowPlayingMovies(): MovieFetchResult {
  return useMovieFetch(api.fetchNowPlayingMovies, "nowPlaying", true);
}

export default useNowPlayingMovies;
