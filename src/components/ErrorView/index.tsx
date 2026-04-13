import React from "react";
import { Link } from "react-router-dom";
import { ActionButton, Actions, Message, Title, Wrapper } from "./styles";

interface ErrorViewProps {
  message?: string;
}

function ErrorView({
  message = "Something went wrong.",
}: ErrorViewProps): React.JSX.Element {
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
        <ActionButton as={Link} to="/">
          Go Home
        </ActionButton>
      </Actions>
    </Wrapper>
  );
}

export default ErrorView;
