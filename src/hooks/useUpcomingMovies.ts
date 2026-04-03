import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../API";
import type { MoviesState } from "./props";
import { moviesState } from "./props";
import { getCacheKey, getPersistedState, pruneSearchCache, setPersistedState } from "../helpers";

/**
 * Custom hook for fetching upcoming movies from the API.
 *
 * @returns {{
 *   state: MoviesState,
 *   loading: boolean,
 *   error: boolean,
 *   searchTerm: string,
 *   setSearchTerm: (term: string) => void,
 *   setIsLoadingMore: (isLoading: boolean) => void
 * }} - An object containing the state, loading status, error status, search term, and functions to update the search term and loading status.
 */
function useUpcomingMovies(): {
  state: MoviesState;
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
  const [state, setState] = useState(moviesState);

  /**
   * Fetches upcoming movies from the API.
   *
   * @param {number} page - The page number of the movies to fetch.
   * @param {string} searchTerm - The search term to filter the movies.
   * @returns {Promise<void>} - A promise that resolves when the movies are fetched.
   */
  const fetchMovies = useCallback(async (page: number, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await api.fetchUpcomingMovies(page, searchTerm);

      movies.results.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );

      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : movies.results,
      }));
    } catch (err) {
      setError(true);
      console.error("Failed to fetch upcoming movies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      const cacheKey = getCacheKey("upcoming", searchTerm);

      const cached = getPersistedState<typeof moviesState>(cacheKey);

      if (cached) {
        console.log("Grabbing from localStorage:", cacheKey);
        setState(cached);
        return;
      }

      console.log("Grabbing from API");
      setState(moviesState);
      await fetchMovies(1, searchTerm);
    };

    void load();
  }, [searchTerm, fetchMovies]);

  useEffect(() => {
    if (!isLoadingMore) return;

    const loadMore = async () => {
      await fetchMovies(state.page + 1, searchTerm);
      setIsLoadingMore(false);
    };

    void loadMore();
  }, [fetchMovies, isLoadingMore, searchTerm, state.page]);

  useEffect(() => {
    if (state.results.length === 0) return;

    setPersistedState(getCacheKey("upcoming", searchTerm), state);
    
    if (searchTerm) pruneSearchCache("upcoming");
  }, [searchTerm, state]);

  return {
    state,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    setIsLoadingMore,
  };
}

export default useUpcomingMovies;
