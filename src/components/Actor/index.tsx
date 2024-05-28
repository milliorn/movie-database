import React from "react";
import { Props } from "./actor.props";
import { Image, Wrapper } from "./actor.styles";

const Actor: React.FC<Props> = ({ name, character, imageUrl }) => (
  <Wrapper>
    <Image src={imageUrl} alt="actor-thumb" />
    <h3>{name}</h3>
    <p>{character}</p>
  </Wrapper>
);

export default Actor;
