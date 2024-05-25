import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 1.25rem;

  h1 {
    color: var(--white);

    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  img {
    height: auto; // Maintains the natural aspect ratio of the image
    object-fit: cover; // Ensures images cover the area without distorting their aspect ratio
    width: 100%;  // Ensures the image is responsive and fills its container width
  }
`;
