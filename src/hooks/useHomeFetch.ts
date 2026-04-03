import { useCallback } from "react";
import { api } from "../API";
import useMovieFetch, { type MovieFetchResult } from "./useMovieFetch";

function useHomeFetch(): MovieFetchResult {
  const fetcher = useCallback(
    (page: number, searchTerm: string) => api.fetchMovies(searchTerm, page),
    [],
  );

  return useMovieFetch(fetcher, "home");
}

export default useHomeFetch;
