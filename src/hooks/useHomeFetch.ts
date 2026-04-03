import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../API";
import { getCacheKey, getPersistedState, pruneSearchCache, setPersistedState } from "../helpers";
import { initialState } from "./props";

/**
 * Custom hook for fetching movies from the API based on the specified page and search term.
 * @returns An object containing the state, loading status, error status, search term, and functions to update the search term and load more movies.
 */
function useHomeFetch(): {
  state: typeof initialState;
  loading: boolean;
  error: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initialState);

  /**
   * Fetches movies from the API based on the specified page and search term.
   * @param page - The page number to fetch movies from.
   * @param searchTerm - The search term to filter movies by.
   */
  const fetchMovies = useCallback(async (page: number, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await api.fetchMovies(searchTerm, page);

      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial and search
  useEffect(() => {
    const load = async () => {
      const cacheKey = getCacheKey("home", searchTerm);
      const cached = getPersistedState<typeof initialState>(cacheKey);

      if (cached) {
        console.log("Grabbing from localStorage:", cacheKey);
        setState(cached);
        return;
      }

      console.log("Grabbing from API");
      setState(initialState);
      await fetchMovies(1, searchTerm);
    };

    void load();
  }, [fetchMovies, searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) return;

    const loadMore = async () => {
      await fetchMovies(state.page + 1, searchTerm);
      setIsLoadingMore(false);
    };

    void loadMore();
  }, [isLoadingMore, state.page, searchTerm, fetchMovies]);

  useEffect(() => {
    if (state.results.length === 0) return;

    setPersistedState(getCacheKey("home", searchTerm), state);
    
    if (searchTerm) pruneSearchCache("home");
  }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}

export default useHomeFetch;
