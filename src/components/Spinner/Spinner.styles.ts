import styled from "styled-components";

export const Spinner = styled.div`
  animation: spin 0.8s linear infinite;
  border-radius: 50%;
  border-top: 5px solid var(--medGrey);
  border: 5px solid var(--lightGrey);
  height: 50px;
  margin: 20px auto;
  width: 50px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
