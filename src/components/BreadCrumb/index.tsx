import React from "react";
import { Link } from "react-router-dom";
import { Props } from "./breadCrumb.props";
import { Content, Wrapper } from "./breadCrumb.styles";

function BreadCrumb({ movieTitle }: Props) {
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
