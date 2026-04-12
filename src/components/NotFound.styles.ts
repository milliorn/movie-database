import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  padding: 3.75rem 1.25rem;
`;

export const GoBack = styled.button`
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
  font-size: var(--fontSmall);
  text-decoration: underline;

  &:hover {
    color: var(--lightGrey);
  }
`;

export const Title = styled.h1`
  color: var(--white);
  font-size: var(--fontBig);
  margin: 0;
`;

export const Message = styled.p`
  color: var(--lightGrey);
  font-size: var(--fontSmall);
  margin: 0;
  text-align: center;
`;
