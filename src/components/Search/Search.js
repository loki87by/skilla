import React, { useState, useRef, useEffect } from "react";
import Sprite from "../Sprite/Sprite";
import cross from "../../assets/cross.svg";
import search from "../../assets/search.svg";
import "./Search.css";

function Search(props) {
  const [searchIsOpen, setSearchOpen] = useState(false);

  const searchRef = useRef(null);

  function openSearch() {
    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchOpen(false);
  }

  useEffect(() => {
    if (searchIsOpen) {
      searchRef.current.focus();
    }
  });

  return (
    <div className={`Search ${props.class}`}>
    <Sprite
      src={search}
      click={openSearch}
      class={`Search__icon ${props.iconClass} ${
        searchIsOpen && "Search__icon_opened"
      }`}
      width="16"
      height="16"
      title="искать"
      id="search"
    />
    {searchIsOpen ? (
      <div className="Search__container">
        <input
          ref={searchRef}
          className={`Search__input ${props.inputClass}`}
          id={props.class ? props.class : 'Search__input'}
          type="text"
          value={props.searchValue}
          onKeyUp={(e) => {props.checkSearchValue(e)}}
          onChange={(e) => {
            props.getSearchValue(e.target.value);
          }}
        />
        {props.label ? <label onClick={props.labelFunc} className="Search__label" htmlFor={props.class ? props.class : 'Search__input'}>{props.label}</label> : ''}
        <Sprite
          src={cross}
          click={closeSearch}
          class="Search__close"
          width="14"
          height="14"
          title="закрыть"
          id="cross"
        />
      </div>
    ) : (
      props.children
    )}
  </div>
  );
}

export default Search;
