import React from "react";
import { Link } from "react-router-dom";
import { Image, RatingText, ThumbInfoContainer } from "./styles";
import { ThumbProps } from "./props";

/**
 * Thumbnail component for displaying movie information.
 *
 * @param {ThumbProps} props - The props for the Thumb component.
 * @param {string} props.image - The URL of the movie thumbnail image.
 * @param {number} props.movieId - The ID of the movie.
 * @param {boolean} props.clickable - Indicates whether the thumbnail is clickable.
 * @param {number} props.rating - The rating of the movie.
 * @param {number} props.vote_count - The number of votes for the movie.
 * @returns {React.JSX.Element} The rendered Thumb component.
 */
function Thumb({
  image,
  movieId,
  clickable,
  rating,
  vote_count,
}: ThumbProps): React.JSX.Element {
  return (
    <div>
      {clickable ? (
        <Link to={`/${movieId}`}>
          <Image src={image} alt="movie-thumb" />
        </Link>
      ) : (
        <Image src={image} alt="movie-thumb" />
      )}
      <ThumbInfoContainer>
        <RatingText>Rating: {rating?.toFixed(1)}</RatingText>
        <RatingText>👍 {vote_count}</RatingText>
      </ThumbInfoContainer>
    </div>
  );
}

export default Thumb;
