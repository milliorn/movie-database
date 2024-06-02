import React from "react";
import { Props } from "./props";
import { Wrapper } from "./styles";

function Button({ text, callback }: Props): React.JSX.Element {
  return (
    <Wrapper type="button" onClick={callback}>
      {text}
    </Wrapper>
  );
}

export default Button;
