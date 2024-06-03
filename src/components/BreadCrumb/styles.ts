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

  span {
    color: var(--white);
    font-size: var(--fontMed);
    padding-right: 10px;

    @media screen and (max-width: 768px) {
      font-size: var(--fontSmall);
    }
  }
`;
