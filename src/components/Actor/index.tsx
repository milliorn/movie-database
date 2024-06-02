import React from "react";
import { Props } from "./props";
import { Image, Wrapper } from "./styles";

function Actor({ name, character, imageUrl }: Props): React.JSX.Element {
  return (
    <Wrapper>
      <Image src={imageUrl} alt="actor-thumb" />
      <h3>{name}</h3>
      <p>{character}</p>
    </Wrapper>
  );
}

export default Actor;
