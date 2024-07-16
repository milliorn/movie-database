import { useCallback, useEffect, useState } from "react";
import { api } from "../API";
import { MoviesState, moviesState } from "./props";
import { getPersistedState } from "../helpers";

/**
 * Custom hook for fetching now playing movies.
 * It provides the current state of the movies, loading status, error status,
 * search term, and a function to load more movies.
 *
 * @returns {Object} - An object containing the current state of the movies, loading status, error status,
 * search term, and a function to load more movies.
 */
function useNowPlayingMovies() {
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState<MoviesState>(moviesState);

  /**
   * Fetches movies based on the provided page number and search term.
   * If a search term is provided, it fetches movies matching the search term.
   * Otherwise, it fetches now playing movies and sorts them by release date.
   *
   * @param {number} page - The page number of the movies to fetch.
   * @returns {Promise<void>} - A promise that resolves when the movies are fetched.
   */
  const fetchMovies = useCallback(
    async (page: number, searchTerm = "") => {
      try {
        setError(false);
        setLoading(true);

        const movies = await api.fetchNowPlayingMovies(page, searchTerm);

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
        console.error("Failed to fetch now playing movies:", err);
      } finally {
        setLoading(false);
      }
    },
    [setError, setLoading, setState],
  );

  useEffect(() => {
    if (!searchTerm) {
      const sessionState =
        getPersistedState<typeof moviesState>("nowPlayingState");

      if (sessionState) {
        console.log("Grabbing from sessionStorage");
        setState(sessionState as typeof moviesState);
        return;
      }
    }

    console.log("Grabbing from API");

    setState(moviesState);
    fetchMovies(1, searchTerm);
  }, [searchTerm, fetchMovies]);

  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [fetchMovies, isLoadingMore, searchTerm, state.page]);

  useEffect(() => {
    if (!searchTerm)
      sessionStorage.setItem("nowPlayingState", JSON.stringify(state));
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

export default useNowPlayingMovies;
