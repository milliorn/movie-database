/**
 * Renders a breadcrumb component that displays the navigation path for a movie.
 *
 * @component
 * @param {BreadCrumbProps} props - The props object containing the movie title.
 * @returns {JSX.Element} The rendered breadcrumb component.
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import { BreadCrumbProps } from "./props";
import { Content, Wrapper } from "./styles";

function BreadCrumb({ movieTitle }: BreadCrumbProps): React.JSX.Element {
  const navigate = useNavigate(); // React Router hook to navigate to a different page

  return (
    <Wrapper>
      <Content>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "var(--white)",
            cursor: "pointer",
            textDecoration: "none",
            fontSize: "var(--fontMed)",
          }}
        >
          Previous Page
        </button>
        <span>|</span>
        <span>{movieTitle}</span>
      </Content>
    </Wrapper>
  );
}

export default BreadCrumb;
