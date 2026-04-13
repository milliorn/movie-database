import type React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  getCacheKey,
  getPersistedState,
  pruneSearchCache,
  setPersistedState,
} from "../helpers";
import type { MoviesState } from "./props";
import { moviesState } from "./props";

type Fetcher = (page: number, searchTerm: string) => Promise<MoviesState>;

export interface MovieFetchResult {
  state: MoviesState;
  loading: boolean;
  error: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>;
}

function useMovieFetch(
  fetcher: Fetcher,
  cachePrefix: string,
  sortByDate = false,
): MovieFetchResult {
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(moviesState);

  const fetchMovies = useCallback(
    async (page: number, searchTerm = "") => {
      try {
        setError(false);
        setLoading(true);

        const movies = await fetcher(page, searchTerm);

        if (sortByDate) {
          const getTime = (date: string) => {
            const t = new Date(date).getTime();
            return isNaN(t) ? -Infinity : t;
          };

          movies.results.sort(
            (a, b) => getTime(b.release_date) - getTime(a.release_date),
          );
        }

        setState((prev) => ({
          ...movies,
          results:
            page > 1 ? [...prev.results, ...movies.results] : movies.results,
        }));
      } catch (err) {
        setError(true);
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    },
    [fetcher, sortByDate],
  );

  useEffect(() => {
    const load = async () => {
      const cacheKey = getCacheKey(cachePrefix, searchTerm);
      const cached = getPersistedState<MoviesState>(cacheKey);

      if (cached) {
        //Grabbing from localStorage
        setState(cached);
        return;
      }

      // Grabbing from API
      setState(moviesState);
      await fetchMovies(1, searchTerm);
    };

    void load();
  }, [searchTerm, fetchMovies, cachePrefix]);

  useEffect(() => {
    if (!isLoadingMore) return;

    const loadMore = async () => {
      await fetchMovies(state.page + 1, searchTerm);
      setIsLoadingMore(false);
    };

    void loadMore();
  }, [fetchMovies, isLoadingMore, searchTerm, state.page]);

  useEffect(() => {
    if (state.results.length === 0 || state.page !== 1) return;

    setPersistedState(getCacheKey(cachePrefix, searchTerm), state);
    if (searchTerm) pruneSearchCache(cachePrefix);
  }, [searchTerm, state, cachePrefix]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}

export default useMovieFetch;
