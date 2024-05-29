import React from "react";
import { Props } from "./button.props";
import { Wrapper } from "./button.styles";

function Button({ text, callback }: Props) {
  return (
    <Wrapper type="button" onClick={callback}>
      {text}
    </Wrapper>
  );
}

export default Button;
