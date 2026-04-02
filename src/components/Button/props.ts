/**
 * Represents the props for the Button component.
 */
export interface ButtonProps {
  /**
   * The callback function to be executed when the button is clicked.
   */
  callback: () => void;

  /**
   * The text to be displayed on the button.
   */
  text: string;
}
