/**
 * Represents the props for the HeroImage component.
 */
type HeroImageProps = {
  image: string; // The URL of the image to be displayed.
  text: string; // The text to be displayed on the image.
  title: string; // The title of the image.
};

/**
 * Represents the props for the Wrapper component.
 */
type WrapperProps = {
  $image: string; // The URL of the image to be wrapped.
};

export type { HeroImageProps, WrapperProps };
