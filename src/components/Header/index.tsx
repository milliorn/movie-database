import React from "react";
import { Link } from "react-router-dom";
import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";
import { Content, LogoImg, TMDBLogoImg, Wrapper } from "./styles";

/**
 * Renders the header component.
 *
 * @returns The JSX.Element representing the header component.
 */
function Header(): React.JSX.Element {
  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <LogoImg src={RMDBLogo} alt="rmdb-logo" width="334" height="52" />
        </Link>
        <Link to='https://www.themoviedb.org' target="_blank" rel="noopener noreferrer" >
          <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" width="300" height="118" />
        </Link>
      </Content>
    </Wrapper>
  );
}

export default Header;