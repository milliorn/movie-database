import React, { useEffect, useState } from "react";
import type { HeroImageProps } from "./props";
import { Content, Text, Wrapper } from "./styles";

/**
 * Renders a hero image component with a title and text.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.image - The URL of the hero image.
 * @param {string} props.title - The title of the hero image.
 * @param {string} props.text - The text of the hero image.
 * @returns {JSX.Element} - The rendered hero image component.
 */
function HeroImage({ image, title, text }: HeroImageProps): React.JSX.Element {
  const [loaded, setLoaded] = useState(false); // Image loaded state

  // Preload the image and set the loaded state
  useEffect(() => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
      setLoaded(true);
    };
    
    return () => {
      img.onload = null;
    };
  }, [image]);

  return (
    <>
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
