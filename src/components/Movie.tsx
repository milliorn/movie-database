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

/**
 * Renders the Movie component.
 *
 * @returns The JSX.Element representing the Movie component.
 */
function Movie(): React.JSX.Element {
  const { movieId } = useParams<{ movieId?: string }>(); // Ensure movieId is possibly undefined
  const { state: movie, loading, error } = useMovieFetch(movieId ?? ""); // Always call the hook unconditionally

  useEffect(() => {
    if (!movieId || !movie) {
      return;
    }
    fetch("manifest.json")
      .then((response) => response.json())
      .then((data: { name: string }) => {
        document.title = `${movie.title} - ${data.name}`;
      })
      .catch((error: unknown) => {
        console.error("Error fetching manifest.json", error);
      });
  }, [movie, movieId]);

  if (!movieId || !/^\d+$/.test(movieId)) {
    return <NotFound />;
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorView message="Failed to load movie details. Please try again." />;
  if (!movie) return <ErrorView message="Movie not found." />;

  // console.log(movie);
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
