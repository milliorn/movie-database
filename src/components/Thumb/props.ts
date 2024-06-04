/**
 * Represents the props for the Thumb component.
 */
export type ThumbProps = {
  /**
   * Specifies whether the Thumb component is clickable or not.
   */
  clickable: boolean;

  /**
   * The URL of the image to be displayed in the Thumb component.
   */
  image: string;

  /**
   * The ID of the movie associated with the Thumb component.
   */
  movieId?: number;

  /**
   * The rating of the movie associated with the Thumb component.
   */
  rating?: number;

  /**
   * The vote count of the movie associated with the Thumb component.
   */
  vote_count?: number;
};
