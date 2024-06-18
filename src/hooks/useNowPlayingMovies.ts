import { useCallback, useEffect, useState } from "react";
import { api } from "../API";
import { MoviesState, moviesState } from "./props";

/**
 * Custom hook for fetching now playing movies.
 *
 * This hook fetches movies based on the provided page number and search term.
 * If a search term is provided, it fetches movies matching the search term.
 * Otherwise, it fetches now playing movies and sorts them by release date.
 *
 * @returns {{
 *   state: MoviesState,
 *   loading: boolean,
 *   error: boolean,
 *   searchTerm: string,
 *   setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
 *   setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>
 * }} - An object containing the state, loading status, error status, search term, and functions to update the search term and loading status.
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
    async (page: number) => {
      try {
        setError(false);
        setLoading(true);

        // Explicitly declare movies with a type
        let movies: MoviesState;

        if (searchTerm) {
          movies = await api.fetchMovies(searchTerm, page);
        } else {
          const response = await api.fetchNowPlayingMovies(page);
          movies = {
            ...response,
            results: response.results.sort(
              (a, b) =>
                new Date(b.release_date).getTime() -
                new Date(a.release_date).getTime(),
            ),
          };
        }

        setState((prev) => ({
          ...movies,
          results:
            page > 1 ? [...prev.results, ...movies.results] : movies.results,
        }));
      } catch (err) {
        setError(true);
        console.error("Failed to fetch now playing movies:", err);
      }

      setLoading(false);
    },
    [searchTerm, setError, setLoading, setState],
  );

  useEffect(() => {
    fetchMovies(1);
  }, [searchTerm, fetchMovies]);

  useEffect(() => {
    if (!isLoadingMore) return;
    fetchMovies(state.page + 1);
    setIsLoadingMore(false);
  }, [isLoadingMore, state.page, setIsLoadingMore, fetchMovies]);

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
