import { useCallback, useEffect, useState } from "react";
import { api } from "../API";
import { MoviesState, moviesState } from "./props";
import { getPersistedState } from "../helpers";

function useUpcomingMovies() {
  const [ error, setError ] = useState(false);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ state, setState ] = useState<MoviesState>(moviesState);

  const fetchMovies = useCallback(
    async (page: number, searchTerm = "") => {
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
            page > 1
              ? [ ...prev.results, ...movies.results ]
              : movies.results,
        }));
      } catch (err) {
        setError(true);
        console.error("Failed to fetch now playing movies:", err);
      } finally {
        setLoading(false);
      }
    },
    [ setError, setLoading, setState ],
  );

  useEffect(() => {
    if (!searchTerm) {
      const sessionState = getPersistedState<typeof moviesState>("upcomingState");

      if (sessionState) {
        console.log("Grabbing from sessionStorage");
        setState(sessionState as typeof moviesState);
        return;
      }
    }

    console.log("Grabbing from API");

    setState(moviesState);
    fetchMovies(1, searchTerm);

  }, [ searchTerm, fetchMovies ]);

  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);

  }, [ fetchMovies, isLoadingMore, searchTerm, state.page ]);

  useEffect(() => {
    if (!searchTerm) sessionStorage.setItem("upcomingState", JSON.stringify(state));
  }, [ searchTerm, state ]);

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
