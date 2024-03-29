import React, { useState, useEffect, useRef } from "react";
// Image
import searchIcon from "../../images/search-icon.svg";
// Styles
import { Wrapper, Content } from "./SearchBar.styles";
// types
type Props = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<Props> = ({ setSearchTerm }) => {
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
    <Wrapper>
      <Content>
        <img
          alt="search-icon"
          height="50%"
          loading="lazy"
          src={searchIcon}
          width="100%"
        />
        <input
          id="searchBar"
          name="searchBar"
          onChange={(event) => setState(event.currentTarget.value)}
          placeholder="Search Movie"
          type="text"
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

export default SearchBar;
