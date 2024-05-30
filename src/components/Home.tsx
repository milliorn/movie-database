import React, { useEffect } from "react";
import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import { useHomeFetch } from "../hooks/useHomeFetch";
import NoImage from "../images/no_image.jpg";
import Button from "./Button";
import Grid from "./Grid";
import HeroImage from "./HeroImage";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";
import Thumb from "./Thumb";

function Home() {
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();

  // console.log(state);

  useEffect(() => {
    fetch("manifest.json")
      .then((response) => response.json())
      .then((data) => {
        const websiteName = data.name;
        document.title = websiteName;
      })
      .catch((error) => {
        console.error("Error fetching manifest.json", error);
      });
  }, []);

  if (error) return <div>Something went wrong...oops!</div>;

  return (
    <div>
      {state.results[ 0 ] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[ 0 ].backdrop_path}`}
          title={state.results[ 0 ].original_title}
          text={state.results[ 0 ].overview} />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? "Search Results" : "Popular Movies"}>
        {state.results.map((movie) => (
          <Thumb
            key={movie.id}
            clickable={true}
            image={movie.poster_path
              ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
              : NoImage}
            movieId={movie.id}
            rating={movie.vote_average}
            vote_count={movie.vote_count} />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
    </div>
  );
}

export default Home;
