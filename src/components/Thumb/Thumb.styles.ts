import styled from "styled-components";

export const Image = styled.img`
  animation: animateThumb 0.5s;
  border-radius: 20px;
  width: 100%; // ensures image is not larger than its container
  aspect-ratio: 2/ 3; // Adjust according to your most common aspect ratio
  object-fit: cover; // covers the area of the div without distorting ratio
  transition: all 0.3s;

  :hover {
    opacity: 0.8;
  }

  @keyframes animateThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ThumbInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem; // added padding for spacing
  align-items: center; // centers items vertically
`;

export const RatingText = styled.p`
  color: var(--lightGrey);
  font-size: var(--fontBig);
  font-weight: bold;
  margin: 0 auto;
  z-index: -100; // This is a hack to fix the z-index issue with the rating text
`;
