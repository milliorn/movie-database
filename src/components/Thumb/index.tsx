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
        <Image src={image} alt="movie-thumb" loading="lazy" style={{ width: '100%', height: 'auto' }} />
      </Link>
    ) : (
      <Image src={image} alt="movie-thumb" loading="lazy" style={{ width: '100%', height: 'auto' }}  />
    )}
    <ThumbInfoContainer>
      {
        <RatingText style={{ marginTop: "0.125rem" }}>
          Rating: {rating?.toFixed()}/10
        </RatingText>
      }
      { <RatingText>👍 {vote_count}</RatingText>}
    </ThumbInfoContainer>
  </div>
);

export default Thumb;
