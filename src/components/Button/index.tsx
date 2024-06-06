import React from "react";
import { ButtonProps } from "./props";
import { Wrapper } from "./styles";

/**
 * Renders a button component.
 *
 * @param {ButtonProps} props - The props for the button component.
 * @returns {React.JSX.Element} The rendered button component.
 */
function Button({ text, callback }: ButtonProps): React.JSX.Element {
  return (
    <Wrapper type="button" onClick={callback}>
      {text}
    </Wrapper>
  );
}

export default Button;
