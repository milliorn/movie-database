/**
 * Renders a breadcrumb component that displays the navigation path for a movie.
 *
 * @component
 * @param {BreadCrumbProps} props - The props object containing the movie title.
 * @returns {JSX.Element} The rendered breadcrumb component.
 */
import React from "react";
import { Link } from "react-router-dom";
import { Content, Wrapper } from "./styles";
import { BreadCrumbProps } from "./props";

function BreadCrumb({ movieTitle }: BreadCrumbProps): React.JSX.Element {
  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <span>Home</span>
        </Link>
        <span>|</span>
        <span>{movieTitle}</span>
      </Content>
    </Wrapper>
  );
}

export default BreadCrumb;
