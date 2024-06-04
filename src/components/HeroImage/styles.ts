import styled from "styled-components";
import { WrapperProps } from "./props";

/**
 * Represents a styled div component for the hero image wrapper.
 * @param $image - The URL of the image to be displayed as the background.
 */
const Wrapper = styled.div<WrapperProps>`
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%),
    url(${({ $image }) => $image}),
    var(--darkGrey) no-repeat center center / cover;
  animation: animateHeroImage 1s;
  background-position: center;
  background-size: 100%, cover;
  display: block;
  height: 38rem;
  position: relative;

  @keyframes animateHeroImage {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/**
 * Represents a styled div component for the content within the hero image.
 */
const Content = styled.div`
  margin: 0 auto;
  max-width: var(--maxWidth);
  padding: 1.25rem; /* 20px */
`;

/**
 * Represents a styled div component for displaying text within the hero image.
 */
const Text = styled.div`
  bottom: 40px;
  color: var(--white);
  margin-right: 1.25rem; /* 20px */
  max-width: 42rem; /* 672px */
  min-height: 6rem; /* 96px */
  position: absolute;
  z-index: 100;

  h1 {
    font-size: var(--fontSuperBig);

    @media screen and(max-width: 720px) {
      font-size: var(--fontBig);
    }
  }

  p {
    font-size: var(--fontMed);

    @media screen and (max-width: 720px) {
      font-size: var(--fontSmall);
    }
  }

  @media screen and (max-width: 720px) {
    max-width: 100%;
  }
};
`;

export { Wrapper, Content, Text };
