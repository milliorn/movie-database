import React, {useState, useEffect} from "react";
import { Content, Text, Wrapper } from "./HeroImage.styles";

type Props = {
  image: string;
  title: string;
  text: string;
};

const HeroImage: React.FC<Props> = ({ image, title, text }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setLoaded(true);
  }, [image]);

  return (
    <Wrapper $image={loaded ? image : ""}>
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
