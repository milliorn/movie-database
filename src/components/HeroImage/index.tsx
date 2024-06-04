import React, { useEffect, useState } from "react";
import { HeroImageProps } from "./props";
import { Content, Text, Wrapper } from "./styles";

/**
 * Renders a hero image component with a title and text.
 *
 * @param {HeroImageProps} props - The component props.
 * @param {string} props.image - The URL of the image to be displayed.
 * @param {string} props.title - The title to be displayed.
 * @param {string} props.text - The text to be displayed.
 * @returns {React.JSX.Element} The rendered hero image component.
 */
function HeroImage({ image, title, text }: HeroImageProps): React.JSX.Element {
  // State to track if the image has loaded
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Image preloading: Create a new Image object to manage loading
    const img = new Image();
    // Set the source, initiating the loading process
    img.src = image;
    // On image load completion, set 'loaded' to true to signify readiness
    img.onload = () => setLoaded(true);
    // Re-run this effect if 'image' prop changes, allowing for reactive updates
  }, [image]);

  return (
    <Wrapper $image={loaded ? image : ""}>
      {/* Render the image or nothing based on its loaded state to prevent layout shifts */}
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
