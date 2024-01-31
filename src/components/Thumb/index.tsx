import React from "react";
import { Link } from "react-router-dom";
import { Image, RatingText, ThumbInfoContainer } from "./Thumb.styles";

// Types
type Props = {
  clickable: boolean;
  image: string;
  movieId?: number;
  rating?: number;
  vote_count?: number;
};

const Thumb: React.FC<Props> = ({
  image,
  movieId,
  clickable,
  rating,
  vote_count,
}) => (
  <div>
    {clickable ? (
      <Link to={`/${movieId}`}>
        <Image src={image} alt="movie-thumb" />
      </Link>
    ) : (
      <Image src={image} alt="movie-thumb" />
    )}
    <ThumbInfoContainer>
      {rating && (
        <RatingText style={{ marginTop: "0.125rem" }}>
          Rating: {rating.toFixed()}/10
        </RatingText>
      )}
      {vote_count && <RatingText>👍 {vote_count}</RatingText>}
    </ThumbInfoContainer>
  </div>
);

export default Thumb;
