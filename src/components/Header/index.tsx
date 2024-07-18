import { useState } from "react";
import { Link } from "react-router-dom";
import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";
import { Content, LogoImg, NavItem, NavOverlay, TMDBLogoImg, Wrapper } from "./styles";


function Header() {
  const [ navOpen, setNavOpen ] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
    document.body.style.overflow = navOpen ? "auto" : "hidden";
  };

  return (
    <Wrapper>
      <Content>
        <LogoImg src={RMDBLogo} alt="RMDB Logo" onClick={toggleNav} width="334" height="52" />

        <NavOverlay show={navOpen}>
          <NavItem onClick={() => setNavOpen(false)}>Popular</NavItem>
          <NavItem onClick={() => setNavOpen(false)}>Now Playing</NavItem>
          <NavItem onClick={() => setNavOpen(false)}>Upcoming</NavItem>
        </NavOverlay>

        <Link to="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
          <TMDBLogoImg
            src={TMDBLogo}
            alt="tmdb-logo"
            width="300"
            height="118"
          />
        </Link>
      </Content>
    </Wrapper>
  );
}

export default Header;
