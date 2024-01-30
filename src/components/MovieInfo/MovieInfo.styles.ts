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
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  display: flex;
  margin: 0 auto;
  max-width: var(--maxWidth);

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

.company-logo {
  align-items: center;
  display: inline-flex; 
  height: 50%;
  justify-content: center;
  width: 50%;
  margin: 2rem auto;
}


  .genre {
    align-items: center;
    display: flex;
    font-weight: 800;
    gap: 10px;
    justify-content: center;  
    margin: 2rem auto;
  }

  .website {
    margin: 2rem 0;
  }

  .website a {
    color: var(--white);
    cursor: pointer;
    text-decoration: none;
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
      margin: 0.25rem 0;
    }

    .genre {
      align-items: center;
      flex-column: wrap;
      flex-direction: column;
      gap: 0px;
    }

    .rating-directors {
      align-items: center;
      flex-direction: column;
    }
  }
`;
