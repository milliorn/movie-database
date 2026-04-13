import styled from "styled-components";
import { PageMessage, PageTitle, PageWrapper } from "../pageStyles";

export const Wrapper = styled(PageWrapper)`
  color: var(--white);
  gap: 1rem;
  margin: 6rem auto;
  max-width: 480px;
  padding: 0 1rem;
  text-align: center;
`;

export const Title = styled(PageTitle)`
  font-size: var(--fontSuperBig);
`;

export const Message = styled(PageMessage)`
  font-size: var(--fontMed);
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  background: var(--darkGrey);
  border: 2px solid var(--white);
  border-radius: 1rem;
  color: var(--white);
  cursor: pointer;
  font-size: var(--fontMed);
  min-width: 140px;
  padding: 0.6rem 1.5rem;
  text-decoration: none;
  transition:
    background 0.2s,
    color 0.2s;

  &:focus-visible {
    outline: 2px solid var(--white);
    outline-offset: 2px;
  }

  &:hover {
    background: var(--lightGrey);
    color: var(--darkGrey);
  }
`;
