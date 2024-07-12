import { useCallback, useEffect, useState } from "react";
import { api } from "../API";
import { MoviesState, moviesState } from "./props";


function useUpcomingMovies() {
  const [ error, setError ] = useState(false);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ state, setState ] = useState<MoviesState>(moviesState);

  const fetchMovies = useCallback(
    async (page: number) => {
      try {
        setError(false);
        setLoading(true);

        let movies: MoviesState;

        if (searchTerm) {
          movies = await api.fetchMovies(searchTerm, page);
        } else {
          const response = await api.fetchUpcomingMovies(page);

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
          results: page > 1 ? [ ...prev.results, ...movies.results ] : movies.results,
        }));
      } catch (err) {
        setError(true);
        console.error("Failed to fetch upcoming movies:", err);
      }

      setLoading(false);
    },
    [ searchTerm, setError, setLoading, setState ],
  );

  useEffect(() => {
    fetchMovies(1);
  }, [ searchTerm, fetchMovies ]);

  useEffect(() => {
    if (!isLoadingMore) return;
    fetchMovies(state.page + 1);
    setIsLoadingMore(false);
  }, [ isLoadingMore, state.page, setIsLoadingMore, fetchMovies ]);

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
