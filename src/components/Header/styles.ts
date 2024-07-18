import styled from "styled-components";
import { Link } from "react-router-dom";

const NavOverlay = styled.div<{ $show: boolean }>`
  align-items: center;
  background: var(--darkGrey);
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: ${({ $show }) => ($show ? '0' : '-100%')};
  transition: top 700ms ease-in-out;
  width: 100%;
  z-index: 10;
`;

const NavItem = styled(Link)`
  color: white;
  font-size: 2rem;
  padding: 10px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: var(--medGrey);
  }
`;

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
  cursor: pointer;
  height: auto; /* ensure the height adjusts to maintain the aspect ratio */
  width: 12rem; /* 192px */
  z-index: 100;

  @media screen and (max-width: 500px) {
    width: 10rem; /* 160px */
  }
`;

/**
 * TMDB logo image component for the header.
 */
const TMDBLogoImg = styled.img`
  height: auto; /* ensure the height adjusts to maintain the aspect ratio */
  width: 6rem; /* 96px */

  @media screen and (max-width: 500px) {
    width: 5rem; /* 80px */
  }
`;

export { Content, LogoImg, TMDBLogoImg, Wrapper, NavOverlay, NavItem };
