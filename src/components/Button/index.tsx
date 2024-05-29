import React from "react";
import { Props } from "./button.props";
import { Wrapper } from "./button.styles";

function Button({ text, callback }: Props): React.JSX.Element {
  return (
    <Wrapper type="button" onClick={callback}>
      {text}
    </Wrapper>
  );
}

export default Button;
