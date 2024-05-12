import { useState, useEffect } from "react";
// API
import API, { MoviePropTypes } from "../API";
// Helpers
import { getPersistedState } from "../helpers";

const initialState = {
  page: 0,
  results: [] as MoviePropTypes[],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ state, setState ] = useState(initialState);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);

  const fetchMovies = async (page: number, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setState((prev) => ({
        ...movies,
        results: page > 1 ? [ ...prev.results, ...(movies.results || []) ] : [ ...(movies.results || []) ],
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
};
