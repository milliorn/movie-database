import styled from "styled-components";
import { PageMessage, PageTitle, PageWrapper } from "./pageStyles";

export const Wrapper = styled(PageWrapper)`
  gap: 1.5rem;
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

export const Title = styled(PageTitle)`
  font-size: var(--fontBig);
`;

export const Message = styled(PageMessage)`
  font-size: var(--fontSmall);
`;
