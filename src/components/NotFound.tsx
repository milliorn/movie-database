import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NoImage from "../images/no_image.jpg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 24px;
`;

const GoBack = styled.button`
  background: none;
  border: none;
  color: var(--white);
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--lightGrey);
  }
`;

const Title = styled.h1`
  color: var(--white);
  font-size: 1.5rem;
  margin: 0;
`;

const Message = styled.p`
  color: var(--lightGrey);
  font-size: 1rem;
  margin: 0;
  text-align: center;
`;

/**
 * Renders the NotFound component.
 *
 * @returns The JSX.Element representing the NotFound component.
 */
function NotFound(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <GoBack type="button" onClick={() => { navigate(-1); }}>
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
