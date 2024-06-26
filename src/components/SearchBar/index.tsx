import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../../images/search-icon.svg";
import { SearchBarProps } from "./props";
import { Content, Wrapper } from "./styles";

/**
 * Renders a search bar component.
 *
 * @param setSearchTerm - A function to set the search term.
 * @returns The search bar component.
 */
function SearchBar({ setSearchTerm }: SearchBarProps): React.JSX.Element {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <Wrapper className="">
      <Content>
        <img
          alt="search-icon"
          src={searchIcon}
          style={{
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "30px",
            height: "30px",
          }}
        />
        <input
          id="searchBar"
          name="searchBar"
          onChange={(event) => setState(event.currentTarget.value)}
          placeholder="Search Movie"
          type="text"
          value={state}
          style={{ padding: "0 0 0 60px", width: "100%", height: "40px" }}
        />
      </Content>
    </Wrapper>
  );
}

export default SearchBar;
