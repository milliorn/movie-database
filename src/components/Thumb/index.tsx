import React from "react";
import { Link } from "react-router-dom";
import type { ThumbProps } from "./props";
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
  movieTitle,
}: ThumbProps): React.JSX.Element {
  const altText = movieTitle ? `${movieTitle} poster` : "movie poster";

  return (
    <div className="">
      {clickable ? (
        <Link to={`/${movieId}`} aria-label={movieTitle ?? "View movie"}>
          <Image
            src={image}
            alt={altText}
            $isClicked={true}
            width={780}
            height={1170}
          />
        </Link>
      ) : (
        <Image src={image} alt={altText} $isClicked={false} />
      )}
      <ThumbInfoContainer>
        <RatingText>Rating: {rating?.toFixed(1)}</RatingText>
        <RatingText>👍 {vote_count}</RatingText>
      </ThumbInfoContainer>
    </div>
  );
}

export default Thumb;
