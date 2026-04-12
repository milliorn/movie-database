import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin: 6rem auto;
  max-width: 480px;
  padding: 0 1rem;
  text-align: center;
`;

export const Title = styled.h1`
  color: var(--white);
  font-size: var(--fontSuperBig);
  margin: 0;
`;

export const Message = styled.p`
  color: var(--lightGrey);
  font-size: var(--fontMed);
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  background: var(--darkGrey);
  border-radius: 1rem;
  border: 2px solid var(--white);
  color: var(--white);
  cursor: pointer;
  font-size: var(--fontMed);
  min-width: 140px;
  outline: none;
  padding: 0.6rem 1.5rem;
  transition: background 0.2s;

  &:hover {
    background: var(--lightGrey);
    color: var(--darkGrey);
  }
`;
