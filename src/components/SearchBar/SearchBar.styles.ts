import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  background: var(--darkGrey);
  display: flex;
  height: 6rem;
  padding: 0 0.5rem;
`;

export const Content = styled.div`
  background: var(--medGrey);
  border-radius: 1.5rem; /* 24px */
  color: var(--white);
  height: 3.5rem; /* 56px */
  margin: 0 auto;
  max-width: var(--maxWidth);
  position: relative;
  width: 100%;
  overflow: hidden;

  img {
    position: absolute;
    left: 15px;
    top: 50%; /* Center vertically */
    transform: translateY(-50%); /* Center vertically */
    width: 30px;
    height: 30px; /* Fixed dimensions */
  }

  input {
    background: transparent;
    border: 0;
    color: var(--white);
    font-size: var(--fontBig);
    height: 40px;
    left: 0;
    margin: 8px 0;
    padding: 0 0 0 60px;
    position: absolute;
    width: calc(100% - 60px); /* Adjust width to accommodate image */

    :focus {
      outline: none;
    }
  }
`;
