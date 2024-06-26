import React from "react";
import { COMPANY_POSTER_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from "../../images/no_image.jpg";
import Thumb from "../Thumb";
import { MovieInfoProps } from "./props";
import { Content, Text, Wrapper } from "./styles";

/**
 * Renders the movie information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Movie} props.movie - The movie object containing the information to be displayed.
 * @returns {JSX.Element} - The rendered movie information component.
 */
function MovieInfo({ movie }: MovieInfoProps): React.JSX.Element {
  // console.log(movie);
  return (
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
          {movie.tagline && <h3>{movie.tagline}</h3>}
          <p className="movie-overview">{movie.overview}</p>
          {movie.homepage && (
            <div className="website">
              <a target="_blank" href={movie.homepage} rel="noreferrer">
                Click for official website
              </a>
            </div>
          )}
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
            {movie.production_companies.map(
              (company) =>
                company.logo_path != null && (
                  <img
                    key={company.id}
                    src={`${IMAGE_BASE_URL}${COMPANY_POSTER_SIZE}${company.logo_path}`}
                    alt={company.name}
                    className="company-logo"
                  />
                ),
            )}
          </div>
        </Text>
      </Content>
    </Wrapper>
  );
}

export default MovieInfo;
