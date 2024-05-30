import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import { useMovieFetch } from "../hooks/useMoviesFetch";
import NoImage from "../images/no_image.jpg";
import Actor from "./Actor";
import BreadCrumb from "./BreadCrumb";
import Grid from "./Grid";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Spinner from "./Spinner";

const Movie: React.FC = () => {
  const { movieId } = useParams<{ movieId?: string }>(); // Ensure movieId is possibly undefined
  const { state: movie, loading, error } = useMovieFetch(movieId || ''); // Always call the hook unconditionally

  useEffect(() => {
    if (!movieId) {
      return; // Do nothing if no movieId
    }
    fetch("manifest.json")
      .then(response => response.json())
      .then(data => {
        const websiteName = data.name;
        // Update the title of the page when movie data changes
        if (movie && movie.original_title) {
          const newTitle = `${movie.original_title} - ${websiteName}`;
          document.title = newTitle;
        }
      })
      .catch(error => {
        console.error("Error fetching manifest.json", error);
      });
  }, [movie, movieId]); // Dependency array includes movieId to handle changes

  if (!movieId) {
    return <div>No movie selected</div>; // Handling the case when no movieId is present
  }
  
  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;

  // console.log(movie);

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map(actor => (
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
};

export default Movie;
