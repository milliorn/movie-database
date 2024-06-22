/**
 * Styles for the Thumb component.
 */
import styled from "styled-components";

type ImageProps = {
  alt: string;
  $isClicked: boolean;
  src: string;
};

/**
 * Styled image component for the Thumb.
 */
const Image = styled.img<ImageProps>`
  aspect-ratio: 2/3;
  border-radius: 20px;
  object-fit: cover;
  transition: all 0.3s;
  width: 100%;
  border: ${({ $isClicked }) => $isClicked ? '2px solid var(--white)' : 'none'};

  &:hover {
    opacity: ${({ $isClicked }) => $isClicked ? '0.8' : '1'};
  }

  animation: animateThumb 0.5s;
  @keyframes animateThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/**
 * Container for the Thumb information.
 */
const ThumbInfoContainer = styled.div`
  align-items: center; // centers items vertically
  display: flex;
  justify-content: space-between;
  padding: 0.5rem; // added padding for spacing
`;

/**
 * Text component for the rating.
 */
const RatingText = styled.p`
  color: var(--lightGrey);
  font-size: var(--fontBig);
  font-weight: bold;
  margin: 0 auto;
  z-index: -100; // This is a hack to fix the z-index issue with the rating text
`;

export { Image, RatingText, ThumbInfoContainer };
