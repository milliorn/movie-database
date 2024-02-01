import styled from "styled-components";

export const Wrapper = styled.div`
  background: var(--darkGrey);
  padding: 0 1.25rem;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--maxWidth);
  padding: 1.25rem 0;
`;

export const LogoImg = styled.img`
  width: 12rem; /* 192px */
  @media screen and (max-width: 500px) {
    width: 10rem; /* 160px */
  }
`;

export const TMDBLogoImg = styled.img`
  width: 6rem; /* 96px */
  @media screen and (max-width: 500px) {
    width: 5rem; /* 80px */
  }
`;
