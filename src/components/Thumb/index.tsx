import React from "react";
import { Link } from "react-router-dom";
import { ThumbProps } from "./props";
import { Image, RatingText, ThumbInfoContainer } from "./styles";

/**
 * Renders a thumbnail component for a movie.
 *
 * @param {ThumbProps} props - The props for the Thumb component.
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
          <Image src={image} alt="movie-thumb" $isClicked={true} />
        </Link>
      ) : (
        <Image src={image} alt="movie-thumb" $isClicked={false} />
      )}
      <ThumbInfoContainer>
        <RatingText>Rating: {rating?.toFixed(1)}</RatingText>
        <RatingText>👍 {vote_count}</RatingText>
      </ThumbInfoContainer>
    </div>
  );
}

export default Thumb;
