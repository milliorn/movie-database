import React from "react";
import { Props } from "./props";
import { Content, Wrapper } from "./styles";

function Grid({ header, children }: Props): React.JSX.Element {
  return (
    <Wrapper>
      <h1>{header}</h1>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default Grid;
