import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
// Components
import Actor from "./Actor";
import BreadCrumb from "./BreadCrumb";
import Grid from "./Grid";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Spinner from "./Spinner";
// Image
import NoImage from "../images/no_image.jpg";
// Hook
import { useMovieFetch } from "../hooks/UseMovieFetch";

const Movie: React.FC = () => {
  const { movieId } = useParams();

  const { state: movie, loading, error } = useMovieFetch(movieId!);

  useEffect(() => {
    fetch("manifest.json")
      .then((response) => response.json())
      .then((data) => {
        const websiteName = data.name;
        // Update the title of the page when movie data changes
        if (movie && movie.original_title) {
          const newTitle = `${movie.original_title} - ${websiteName}`;
          document.title = newTitle;
        }
      })
      .catch((error) => {
        console.error("Error fetching manifest.json", error);
      });
  }, [movie]);

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
};

export default Movie;
