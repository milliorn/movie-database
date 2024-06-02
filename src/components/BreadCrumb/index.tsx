import React from "react";
import { Link } from "react-router-dom";
import { Props } from "./props";
import { Content, Wrapper } from "./styles";

function BreadCrumb({ movieTitle }: Props): React.JSX.Element {
  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <span>Home</span>
        </Link>
        <span>|</span>
        <span>{movieTitle}</span>
      </Content>
    </Wrapper>
  );
}

export default BreadCrumb;
