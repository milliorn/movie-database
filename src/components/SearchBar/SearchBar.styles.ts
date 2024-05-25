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
  border-radius: 1.5rem;
  color: var(--white);
  height: 3.5rem;
  margin: 0 auto;
  max-width: var(--maxWidth);
  position: relative;
  width: 100%;
  overflow: hidden;

  img {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
  }

  input {
    background: transparent;
    border: 0;
    color: var(--white);
    font-size: var(--fontBig);
    left: 0;
    margin: 8px 0;
    padding-left: 60px; /* Fixed padding to not resize dynamically */
    position: absolute;
    width: 100%; /* Full width */
    height: 40px; /* Fixed height */

    :focus {
      outline: none;
    }
  }
`;
