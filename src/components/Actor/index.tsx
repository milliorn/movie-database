import React from "react";
import { ActorProps } from "./props";
import { Image, Wrapper } from "./styles";

/**
 * Renders an actor component.
 *
 * @param {ActorProps} props - The component props.
 * @param {string} props.name - The name of the actor.
 * @param {string} props.character - The character played by the actor.
 * @param {string} props.imageUrl - The URL of the actor's image.
 * @returns {React.JSX.Element} The rendered actor component.
 */
function Actor({ name, character, imageUrl }: ActorProps): React.JSX.Element {
  return (
    <Wrapper>
      <Image src={imageUrl} alt="actor-thumb" />
      <h3>{name}</h3>
      <p>{character}</p>
    </Wrapper>
  );
}

export default Actor;
