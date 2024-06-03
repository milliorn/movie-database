/**
 * Styles for the SearchBar component.
 */
import styled from "styled-components";

/**
 * Wrapper style for the SearchBar component.
 */
const Wrapper = styled.div`
  align-items: center;
  background: var(--darkGrey);
  display: flex;
  height: 6rem;
  padding: 0 0.5rem;
`;

/**
 * Content style for the SearchBar component.
 */
const Content = styled.div`
  background: var(--medGrey);
  border-radius: 1.5rem;
  color: var(--white);
  height: 3.5rem;
  margin: 0 auto;
  max-width: var(--maxWidth);
  overflow: hidden;
  position: relative;
  width: 100%;

  img {
    height: 30px;
    left: 15px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
  }

  input {
    background: transparent;
    border: 0;
    color: var(--white);
    font-size: var(--fontBig);
    height: 40px; /* Fixed height */
    left: 0;
    margin: 8px 0;
    padding-left: 60px; /* Fixed padding to not resize dynamically */
    position: absolute;
    width: 100%; /* Full width */

    :focus {
      outline: none;
    }
  }
};
`;

export { Wrapper, Content };
