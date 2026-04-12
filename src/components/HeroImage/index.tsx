import React from "react";
import type { HeroImageProps } from "./props";
import { BackgroundImage, Content, Overlay, Text, Wrapper } from "./styles";

function HeroImage({ image, title, text }: HeroImageProps): React.JSX.Element {
  return (
    <Wrapper>
      {image && (
        <BackgroundImage
          src={image}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
        />
      )}
      <Overlay />
      <Content>
        <Text>
          <h1>{title}</h1>
          <p>{text}</p>
        </Text>
      </Content>
    </Wrapper>
  );
}

export default HeroImage;
