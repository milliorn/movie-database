import React from "react";
import {
  ActionButton,
  ActionLinkButton,
  Actions,
  Message,
  Title,
  Wrapper,
} from "./styles";

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
        <ActionLinkButton to="/">Go Home</ActionLinkButton>
      </Actions>
    </Wrapper>
  );
}

export default ErrorView;
