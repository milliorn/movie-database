import React from "react";
import { Props } from "./grid.props";
import { Content, Wrapper } from "./grid.styles";

function Grid({ header, children }: Props): React.JSX.Element {
  return (
    <Wrapper>
      <h1>{header}</h1>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default Grid;
