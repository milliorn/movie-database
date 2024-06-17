import { useCallback, useEffect, useState } from "react";
import { api } from "../API";
import { initialState } from "./props";

function useNowPlayingMovies() {
  const [ error, setError ] = useState(false);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState("");  // manage the search term state
  const [ state, setState ] = useState(initialState);

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
