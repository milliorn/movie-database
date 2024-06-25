import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { HeroImageProps } from "./props";
import { Content, Text, Wrapper } from "./styles";

function HeroImage({ image, title, text }: HeroImageProps): React.JSX.Element {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setLoaded(true);
  }, [image]);

  return (
    <>
      <Helmet>
        <link rel="preload" href={image} as="image" />
      </Helmet>
      <Wrapper $image={loaded ? image : ""}>
        <Content>
          <Text>
            <h1>{title}</h1>
            <p>{text}</p>
          </Text>
        </Content>
      </Wrapper>
    </>
  );
}

export default HeroImage;
