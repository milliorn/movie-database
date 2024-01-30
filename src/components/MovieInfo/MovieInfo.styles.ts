import styled from "styled-components";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";
// Types
type Props = {
  backdrop: string;
};

export const Wrapper = styled.div<Props>`
  background: ${({ backdrop }) =>
    backdrop ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop})` : "#000"};
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
  animation: animateMovieInfo 1s;

  @keyframes animatedMovieInfo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    display: block;
    max-height: none;
  }
`;

export const Text = styled.div`
  color: var(--white);
  overflow: hidden;
  padding: 20px 40px;
  text-align: center;
  width: 100%;

  .genre {
    font-weight: 800;
    display: flex;
    justify-content: start;  
    align-items: center;
    gap: 10px;
  }

  .website {
    margin: 2rem 0;
  }

  .website a {
    text-decoration: none;
    color: var(--white);
    cursor: pointer;
  }

  .rating-directors {
    display: flex;
    justify-content: space-evenly;
  }

  .score {
    align-items: center;
    background: #fff;
    border-radius: 9999px;
    color: #000;
    font-weight: 800;
    justify-content: center;
  }

  .director {
    margin: 0 0 0 40px;

    p {
      margin: 0;
    }
  }

  h1 {
    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }

  @media screen and (max-width: 640px) {
    .director,
    .rating,
    .score,
    .release,
    .status {
      margin: 0;
    }

    .rating-directors {
      flex-direction: column;
      align-items: center;
    }
  }
`;
