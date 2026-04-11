import styled from "styled-components";

const Wrapper = styled.div`
  animation: animateHeroImage 1s;
  background: var(--darkGrey);
  display: block;
  height: 38rem;
  overflow: hidden;
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

const BackgroundImage = styled.img`
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Overlay = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 41%,
    rgba(0, 0, 0, 0.65) 100%
  );
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: var(--maxWidth);
  padding: 1.25rem;
  position: relative;
  z-index: 1;
`;

const Text = styled.div`
  bottom: 40px;
  color: var(--white);
  margin-right: 1.25rem;
  max-width: 42rem;
  min-height: 6rem;
  position: absolute;
  z-index: 1;

  h1 {
    font-size: var(--fontSuperBig);

    @media screen and (max-width: 720px) {
      font-size: var(--fontBig);
    }
  }

  p {
    backdrop-filter: blur(4px);
    font-size: var(--fontMed);
    letter-spacing: 0.5px;
    line-height: 1.5;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

    @media screen and (max-width: 720px) {
      font-size: var(--fontSmall);
    }
  }

  @media screen and (max-width: 720px) {
    max-width: 100%;
  }
`;

export { BackgroundImage, Content, Overlay, Text, Wrapper };
