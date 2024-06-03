import styled from "styled-components";

/**
 * Wrapper component for the Actor component.
 * 
 * @remarks
 * This component provides a styled wrapper for the Actor component.
 */
export const Wrapper = styled.div`
  background: var(--darkGrey);
  border-radius: 20px;
  color: var(--white);
  padding: 5px;
  text-align: center;

  h3 {
    margin: 10px 0 0 0;
  }

  p {
    margin: 5px 0;
  }
`;

export const Image = styled.img`
  border-radius: 15px;
  display: block;
  height: 200px;
  object-fit: cover;
  width: 100%;
`;
