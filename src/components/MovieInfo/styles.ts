/**
 * Styles for the MovieInfo component.
 */

import styled from "styled-components";
import { BACKDROP_SIZE, IMAGE_BASE_URL } from "../../config";
import { WrapperProps } from "./props";

/**
 * Wrapper component for the MovieInfo.
 * @param $backdrop - The backdrop image URL.
 */
export const Wrapper = styled.div<WrapperProps>`
  background: ${({ $backdrop }) =>
    $backdrop ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${$backdrop})` : "#000"};
  animation: animateMovieInfo 1s;
  background-position: center;
  background-size: cover;
  padding: 2.5rem 1.25rem;

  @keyframes animatedMovieInfo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/**
 * Content container for the MovieInfo.
 */
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

/**
 * Text container for the MovieInfo.
 */
export const Text = styled.div`
  color: var(--white);
  overflow: hidden;
  padding: 20px 40px;
  text-align: center;
  width: 100%;

  /**
   * Company logo container.
   */
  .company-logo {
    align-items: center;
    backdrop-filter: blur(8px);
    display: block;
    justify-content: center;
    margin: 1rem auto;

    @media screen and (min-width: 768px) {
      height: 40%;
      width: 40%;
    }
  }

  /**
   * Genre container.
   */
  .genre {
    align-items: center;
    display: flex;
    font-weight: 800;
    gap: 10px;
    justify-content: center;
    margin: 2rem auto;
  }

  /**
   * Website container.
   */
  .website {
    margin: 2rem 0;
  }

  /**
   * Website link.
   */
  .website a {
    color: var(--white);
    cursor: pointer;
    text-decoration: none;
  }

  /**
   * Rating and directors container.
   */
  .rating-directors {
    display: flex;
    justify-content: space-evenly;
  }

  /**
   * Score container.
   */
  .score {
    align-items: center;
    background: #fff;
    border-radius: 9999px;
    color: #000;
    font-weight: 800;
    justify-content: center;
  }

  /**
   * Director container.
   */
  .director {
    margin: 0 0 0 40px;

    p {
      margin: 0;
    }
  }

  /**
   * Heading 1.
   */
  h1 {
    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }

  @media screen and (max-width: 640px) {
    /**
     * Responsive styles for smaller screens.
     */
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
};
`;
