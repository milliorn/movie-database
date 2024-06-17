import { useEffect, useState } from "react";
import { api } from "../API";
import { getPersistedState } from "../helpers";
import { initialState } from "./props";

/**
 * Custom hook for fetching movies for the home page.
 * @returns An object containing the state, loading status, error status, search term, setSearchTerm function, and isLoadingMore status.
 */
function useHomeFetch() {
  const [ error, setError ] = useState(false);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ state, setState ] = useState(initialState);

  /**
   * Fetches movies from the API based on the specified page and search term.
   * @param page - The page number to fetch movies from.
   * @param searchTerm - The search term to filter movies by.
   */
  const fetchMovies = async (page: number, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await api.fetchMovies(searchTerm, page);

      setState((prev) => ({
        ...movies,
        results:
          page > 1
            ? [ ...prev.results, ...(movies.results || []) ]
            : [ ...(movies.results || []) ],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial and search
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = getPersistedState<typeof initialState>("homeState");

      if (sessionState) {
        console.log("Grabbing from sessionStorage");
        setState(sessionState as typeof initialState);
        return;
      }
    }
    console.log("Grabbing from API");
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [ searchTerm ]);

  useEffect(() => {
    if (!isLoadingMore) return;
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [ isLoadingMore, searchTerm, state.page ]);

  useEffect(() => {
    if (!searchTerm) sessionStorage.setItem("homeState", JSON.stringify(state));
  }, [ searchTerm, state ]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}

export default useHomeFetch;
