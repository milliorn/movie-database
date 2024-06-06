import { useEffect, useState } from "react";
import { api } from "../API";
import { getPersistedState } from "../helpers";
import { MovieState } from "./props";

/**
 * Custom hook for fetching movie data.
 *
 * @param movieId - The ID of the movie to fetch.
 * @returns An object containing the movie state, loading status, and error status.
 */
function useMovieFetch(movieId: string): {
  state: MovieState;
  loading: boolean;
  error: boolean;
} {
  const [state, setState] = useState<MovieState>({} as MovieState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const movie = await api.fetchMovie(movieId);
        const credits = await api.fetchCredits(movieId);
        // Get directors only
        const directors = credits.crew.filter(
          (member) => member.job === "Director",
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors,
        });

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    const sessionState = getPersistedState<MovieState>(movieId);

    if (sessionState instanceof Error) {
      console.error("Error retrieving state:", sessionState);

      setError(true);
      setLoading(false);
      return;
    }

    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId]);

  // Write to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state]);

  return { state, loading, error };
}

export default useMovieFetch;
