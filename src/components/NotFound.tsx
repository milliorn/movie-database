import React from "react";
import { useNavigate } from "react-router-dom";
import NoImage from "../images/no_image.jpg";
import { GoBack, Message, Title, Wrapper } from "./NotFound.styles";

/**
 * Renders the NotFound component.
 *
 * @returns The JSX.Element representing the NotFound component.
 */
function NotFound(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <GoBack type="button" onClick={() => { void navigate(-1); }}>
        &larr; Go back
      </GoBack>
      <Title>Page Not Found</Title>
      <Message>
        The page you are looking for does not exist or may have been moved.
      </Message>
      <img src={NoImage} alt="Page not found" width={200} />
    </Wrapper>
  );
}

export default NotFound;
