import styled from "styled-components";

/**
 * Wrapper component for the header.
 */
const Wrapper = styled.div`
  background: var(--darkGrey);
  padding: 0 1.25rem;
`;

/**
 * Content component for the header.
 */
const Content = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--maxWidth);
  padding: 1.25rem 0;
`;

/**
 * Logo image component for the header.
 */
const LogoImg = styled.img`
  width: 12rem; /* 192px */
  @media screen and (max-width: 500px) {
    width: 10rem; /* 160px */
  }
`;

/**
 * TMDB logo image component for the header.
 */
const TMDBLogoImg = styled.img`
  width: 6rem; /* 96px */
  height: auto; /* ensure the height adjusts to maintain the aspect ratio */
  
  @media screen and (max-width: 500px) {
    width: 5rem; /* 80px */
  }
`;

export { Content, LogoImg, TMDBLogoImg, Wrapper };
