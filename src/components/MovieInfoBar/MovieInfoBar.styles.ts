import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  background: var(--darkGrey);
  display: flex;
  min-height: 100px;
  padding: 0 20px;
`;

export const Content = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: var(--maxWidth);
  width: 100%;

  .column {
    align-items: center;
    background: var(--medGrey);
    border-radius: 20px;
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 0 20px;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 768px) {
    display: block;

    .column {
      margin: 20px 0;
    }
  }
`;
