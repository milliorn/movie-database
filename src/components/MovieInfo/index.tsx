import React from "react";
// Components
import Thumb from "../Thumb";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
// Image
import NoImage from "../../images/no_image.jpg";
import { Content, Wrapper, Text } from "./MovieInfo.styles";
import { MovieState } from "../../hooks/UseMovieFetch";
// Styles
// Types

type Props = {
  movie: MovieState;
};

const MovieInfo: React.FC<Props> = ({ movie }) => (
  console.log(movie),
  (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
          }
          clickable={false}
        />
        <Text>
          <h1>{movie.title}</h1>
          <h2>"{movie.tagline}"</h2>
          {/* <h3>PLOT</h3> */}
          <p>{movie.overview}</p>
          <div className="website">
            <a target="_blank" href={movie.homepage} rel="noreferrer">
              Click to the official website
            </a>
          </div>
          <div className="rating-directors">
            <div className="rating">
              <h3>RATING</h3>
              <div className="score">{movie.vote_average.toPrecision(3)}</div>
            </div>
            <div className="director">
              <h3>DIRECTOR{movie.directors.length > 1 ? "S" : ""}</h3>
              {movie.directors.map((director) => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
            <div className="release">
              <h3>RELEASE DATE</h3>
              <p>{movie.release_date}</p>
            </div>
            <div className="status">
              <h3>STATUS</h3>
              <p>{movie.status}</p>
            </div>
          </div>
        </Text>
      </Content>
    </Wrapper>
  )
);

export default MovieInfo;
