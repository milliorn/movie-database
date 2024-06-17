import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import Button from "../Button";
import Grid from "../Grid";
import HeroImage from "../HeroImage";
import Spinner from "../Spinner";
import Thumb from "../Thumb";
import NoImage from "../../images/no_image.jpg";


function NowPlayingMovies() {
  const { state, loading, error, setIsLoadingMore } = useNowPlayingMovies();

  if (error) return <div>Something went wrong...oops!</div>;

  console.log(state);

  return (
    <div>
      {state.results[ 0 ] && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[ 0 ].backdrop_path}`}
          title={state.results[ 0 ].original_title}
          text={state.results[ 0 ].overview}
        />
      )}
      <Grid header="Now Playing Movies">
        {state.results.map(movie => (
          <Thumb
            key={movie.id}
            clickable
            image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
            movieId={movie.id}
            rating={movie.vote_average}
            vote_count={movie.vote_count}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
    </div>
  );
}

export default NowPlayingMovies;
