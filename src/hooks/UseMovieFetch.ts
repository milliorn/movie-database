import { useEffect, useState } from "react";
import API, { Cast, Crew } from "../API";
import { getPersistedState } from "../helpers";
import { MoviePropTypes } from "./props";

export type MovieState = MoviePropTypes & { actors: Cast[]; directors: Crew[] };

export const useMovieFetch = (movieId: string) => {
  const [ state, setState ] = useState<MovieState>({} as MovieState);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);
        // Get directors only
        const directors = credits.crew.filter(
          (member) => member.job === "Director"
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
  }, [ movieId ]);

  // Write to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [ movieId, state ]);

  return { state, loading, error };
};
