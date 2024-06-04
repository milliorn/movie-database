/**
 * Styles for the Grid component.
 */
import styled from "styled-components";

/**
 * Wrapper for the Grid component.
 */
export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: var(--maxWidth);
  padding: 0 1.25rem;

  /**
   * Styles for the heading inside the Grid component.
   */
  h1 {
    color: var(--white);

    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }
`;

/**
 * Content container for the Grid component.
 */
export const Content = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  /**
   * Styles for the images inside the Grid component.
   */
  img {
    height: auto; // Maintains the natural aspect ratio of the image
    object-fit: cover; // Ensures images cover the area without distorting their aspect ratio
    width: 100%; // Ensures the image is responsive and fills its container width
  }
`;
