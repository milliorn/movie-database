import { useCallback, useEffect, useState } from "react";
import { api } from "../API";
import { initialState } from "./props";

/**
 * Custom hook for fetching now playing movies from an API.
 * 
 * @returns {{
 *   state: object,
 *   loading: boolean,
 *   error: boolean,
 *   searchTerm: string,
 *   setSearchTerm: (term: string) => void,
 *   setIsLoadingMore: (isLoading: boolean) => void
 * }} - An object containing the state, loading status, error status, search term, and functions to update the search term and loading status.
 */
function useNowPlayingMovies() {
  const [ error, setError ] = useState(false);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState("");  // manage the search term state
  const [ state, setState ] = useState(initialState);

  /**
   * Fetches movies from the API based on the provided page number.
   * If a search term is provided, it fetches movies based on the search term.
   * Otherwise, it fetches now playing movies.
   *
   * @param {number} page - The page number to fetch movies from.
   * @returns {Promise<void>} - A promise that resolves when the movies are fetched.
   */
  const fetchMovies = useCallback(async (page: number) => {
    try {
      setError(false);
      setLoading(true);

      // Conditionally use the search term in the API request
      const movies = searchTerm
        ? await api.fetchMovies(searchTerm, page)
        : await api.fetchNowPlayingMovies(page);

      setState(prev => ({
        ...movies,
        results: page > 1 ? [ ...prev.results, ...movies.results ] : movies.results,
      }));
    } catch (err) {
      setError(true);
      console.error("Failed to fetch now playing movies:", err);
    }
    setLoading(false);
  }, [ searchTerm, setError, setLoading, setState ]);

  // Fetch movies when the component mounts and when searchTerm changes
  useEffect(() => {
    fetchMovies(1);
  }, [ searchTerm, fetchMovies ]);

  useEffect(() => {
    if (!isLoadingMore) return;
    fetchMovies(state.page + 1);
    setIsLoadingMore(false);
  }, [ isLoadingMore, state.page, setIsLoadingMore, fetchMovies ]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}

export default useNowPlayingMovies;
