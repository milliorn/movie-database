import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import useMovieFetch from "../hooks/useMoviesFetch";
import NoImage from "../images/no_image.jpg";
import Actor from "./Actor";
import BreadCrumb from "./BreadCrumb";
import ErrorView from "./ErrorView";
import Grid from "./Grid";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import NotFound from "./NotFound";
import Spinner from "./Spinner";

const MOVIE_ID_RE = /^\d+$/;

const appNamePromise: Promise<string> = fetch("manifest.json")
  .then((r) => {
    if (!r.ok) throw new Error(`${r.status}`);
    return r.json() as Promise<{ name: string }>;
  })
  .then((d) => d.name)
  .catch(() => "");

/**
 * Renders the Movie component.
 *
 * @returns The JSX.Element representing the Movie component.
 */
function Movie(): React.JSX.Element {
  const { movieId } = useParams<{ movieId?: string }>();
  const { state: movie, loading, error } = useMovieFetch(movieId ?? "");

  useEffect(() => {
    if (!movieId || !movie) {
      return;
    }
    void appNamePromise.then((appName) => {
      document.title = appName ? `${movie.title} - ${appName}` : movie.title;
    });
  }, [movie, movieId]);

  if (!movieId || !MOVIE_ID_RE.test(movieId)) {
    return <NotFound />;
  }

  if (loading) return <Spinner />;
  if (error)
    return (
      <ErrorView message="Failed to load movie details. Please try again." />
    );
  if (!movie) return <ErrorView message="Movie not found." />;

  return (
    <>
      <BreadCrumb movieTitle={movie.title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  );
}

export default Movie;
