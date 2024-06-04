/**
 * Styles for the MovieInfoBar component.
 */
import styled from "styled-components";

/**
 * Wrapper for the MovieInfoBar component.
 */
const Wrapper = styled.div`
  align-items: center;
  background: var(--darkGrey);
  display: flex;
  min-height: 100px;
  padding: 0 20px;
`;

/**
 * Content container for the MovieInfoBar component.
 */
const Content = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: var(--maxWidth);
  width: 100%;

  /**
   * Column container for the MovieInfoBar component.
   */
  .column {
    align-items: center;
    background: var(--medGrey);
    border-radius: 20px;
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 0 20px;

    /**
     * Styles for the first child column.
     */
    :first-child {
      margin-left: 0;
    }

    /**
     * Styles for the last child column.
     */
    :last-child {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 768px) {
    display: block;

    /**
     * Styles for the column container in mobile view.
     */
    .column {
      margin: 20px 0;
    }
  }
};
`;

export { Content, Wrapper };
