import styled from "styled-components";

/**
 * Wrapper component for the BreadCrumb component.
 *
 * This component provides a container for the BreadCrumb component.
 */
export const Wrapper = styled.div`
  align-items: center;
  background: var(--medGrey);
  color: var(--white);
  display: flex;
  height: 70px;
  justify-content: center;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  padding: 0 20px;
  width: 100%;
  align-items: center;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: var(--fontSmall);
  }

  span {
    color: var(--white);
    font-size: var(--fontMed);
    padding-right: 10px;
  }

  button {
    animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  }

  button:hover {
    animation: none;
    opacity: 0.5;
  }
`;
