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
  // console.log(movie),
  <Wrapper $backdrop={movie.backdrop_path}>
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
        <p>{movie.overview}</p>
        <div className="website">
          <a target="_blank" href={movie.homepage} rel="noreferrer">
            Click for official website
          </a>
        </div>
        <div className="rating-directors">
          <div className="rating">
            <h3>RATING</h3>
            <div className="score">{movie.vote_average.toFixed()}/10</div>
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
        <div className="genre">
          <h3>GENRE{movie.genres.length > 1 ? "S:" : ":"}</h3>
          {movie.genres.map((genre) => (
            <p key={genre.id}>{genre.name}</p>
          ))}
        </div>
        <div className="production-companies">
          {/* <h3>PRODUCTION COMPANIES</h3> */}
          {movie.production_companies.length > 0 && (
            <img
              key={movie.production_companies[0].id}
              src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.production_companies[0].logo_path}`}
              alt={movie.production_companies[0].name}
              className="company-logo"
            />
          )}
        </div>
      </Text>
    </Content>
  </Wrapper>
);

export default MovieInfo;
