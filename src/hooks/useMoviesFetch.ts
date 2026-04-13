import { useEffect, useState } from "react";
import { api } from "../API";
import { getPersistedState, setPersistedState } from "../helpers";
import type { MovieState } from "./props";

/**
 * Custom hook for fetching movie data.
 *
 * @param movieId - The ID of the movie to fetch.
 * @returns An object containing the movie state, loading status, and error status.
 */
function useMovieFetch(movieId: string): {
  state: MovieState | null;
  loading: boolean;
  error: boolean;
} {
  const [state, setState] = useState<MovieState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const sessionState = getPersistedState<MovieState>(movieId);

      if (sessionState) {
        setState(sessionState);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const [movie, credits] = await Promise.all([
          api.fetchMovie(movieId),
          api.fetchCredits(movieId),
        ]);
        const directors = credits.crew.filter(
          (member) => member.job === "Director",
        );

        const nextState: MovieState = {
          ...movie,
          actors: credits.cast,
          directors,
        };
        setPersistedState(movieId, nextState);
        setState(nextState);

        setLoading(false);
      } catch (_err) {
        setError(true);
        setLoading(false);
      }
    };

    void fetchMovie();
  }, [movieId]);

  return { state, loading, error };
}

export default useMovieFetch;
