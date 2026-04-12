import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton, Actions, Message, Title, Wrapper } from "./styles";

interface ErrorViewProps {
  message?: string;
}

/**
 * Renders an error state with a retry button and a link back to home.
 */
function ErrorView({
  message = "Something went wrong.",
}: ErrorViewProps): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <Wrapper role="alert">
      <Title>Oops!</Title>
      <Message>{message}</Message>
      <Actions>
        <ActionButton
          type="button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Try Again
        </ActionButton>
        <ActionButton
          type="button"
          onClick={() => {
            void navigate("/");
          }}
        >
          Go Home
        </ActionButton>
      </Actions>
    </Wrapper>
  );
}

export default ErrorView;
