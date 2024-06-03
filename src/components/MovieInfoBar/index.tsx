import React from "react";
import { calcTime, convertMoney } from "../../helpers";
import { MovieInfoBarProps } from "./movieInfoBar.props";
import { Content, Wrapper } from "./styles";

/**
 * Renders the movie information bar component.
 *
 * @param {MovieInfoBarProps} props - The component props.
 * @returns {React.JSX.Element} The rendered component.
 */
function MovieInfoBar({
  time,
  budget,
  revenue,
}: MovieInfoBarProps): React.JSX.Element {
  return (
    <Wrapper>
      <Content>
        <div className="column">
          <p>Running time: {calcTime(time)}</p>
        </div>
        <div className="column">
          <p>Budget: {convertMoney(budget)}</p>
        </div>
        <div className="column">
          <p>Revenue: {convertMoney(revenue)}</p>
        </div>
      </Content>
    </Wrapper>
  );
}

export default MovieInfoBar;
