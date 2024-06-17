import { useEffect, useState } from "react";
import { api } from "../API";
import { MoviePropTypes } from "../Global.props";

const initialState = {
  page: 0,
  results: [] as MoviePropTypes[],
  total_pages: 0,
  total_results: 0,
};

function useNowPlayingMovies() {
  const [ error, setError ] = useState(false);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ state, setState ] = useState(initialState);

  const fetchMovies = async (page: number) => {
    setLoading(true);
    setError(false);
    try {
      const movies = await api.fetchNowPlayingMovies(page);
      setState(prev => ({
        ...movies,
        results: page > 1 ? [ ...prev.results, ...movies.results ] : movies.results,
      }));
    } catch (err) {
      setError(true);
      console.error("Failed to fetch now playing movies:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  useEffect(() => {
    if (!isLoadingMore) return;
    fetchMovies(state.page + 1);
    setIsLoadingMore(false);
  }, [ isLoadingMore, state.page ]);

  return { state, loading, error, setIsLoadingMore };
}

export default useNowPlayingMovies;
