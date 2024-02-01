import styled from "styled-components";

// types
type Props = {
  $image: string;
};

export const Wrapper = styled.div<Props>`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 41%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(${({ $image }) => $image}), var(--darkGrey);
  animation: animateHeroImage 1s;
  background-position: center;
  background-size: 100%, cover;
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

export const Content = styled.div`
  margin: 0 auto;
  max-width: var(--maxWidth);
  padding: 1.25rem; /* 20px */
`;

export const Text = styled.div`
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
`;
