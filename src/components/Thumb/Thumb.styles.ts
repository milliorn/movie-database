import styled from "styled-components";

export const Image = styled.img`
  animation: animateThumb 0.5s;
  border-radius: 20px;
  max-width: 720px;
  object-fit: cover;
  transition: all 0.3s;
  width: 100%;

  ::hover {
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
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const RatingText = styled.p`
  color: black;
  font-size: var(--fontBig);
  font-weight: bold;
  margin: 0 auto;
  z-index: -100; // This is a hack to fix the z-index issue with the rating text
`;
