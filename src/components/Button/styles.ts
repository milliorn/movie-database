import styled from "styled-components";

/**
 * Wrapper component for the button.
 */
export const Wrapper = styled.button`
  background: var(--darkGrey);
  border-radius: 1rem;
  border: solid var(--white);
  border-width: 2px;
  color: var(--white);
  cursor: pointer;
  display: block;
  font-size: var(--fontBig);
  height: 60px;
  margin: 3rem auto;
  min-width: 200px;
  outline: none;
  transition: all 0.3s;
  width: 25%;

  :hover {
    opacity: 0.8;
  }
`;
