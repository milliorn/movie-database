import React from "react";
import { GridProps } from "./props";
import { Content, Wrapper } from "./styles";

/**
 * Renders a grid component with a header and content.
 *
 * @param {GridProps} props - The props for the Grid component.
 * @param {string} props.header - The header text.
 * @param {React.ReactNode} props.children - The content to be rendered inside the grid.
 * @returns {React.JSX.Element} The rendered Grid component.
 */
function Grid({ header, children }: GridProps): React.JSX.Element {
  return (
    <Wrapper>
      <h1>{header}</h1>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default Grid;
