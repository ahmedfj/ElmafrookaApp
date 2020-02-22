import React, { useState } from "react";

import "./Searchbar.scss";
import searchBarIcon from "../../images/searchbaricon.png";

import { withRouter } from "react-router-dom";

const Searchbar = props => {
  const [searchText, setSearchText] = useState("");


  const handleChange = e => {
    const value = e.target.value;

    setSearchText(value);
  };
  const onSubmit = e => {
    e.preventDefault();
    props.history.push(`/search/${searchText}`)

  };
  return (
    <div className={`search-cont`}>
      <div className="searchForm">
        <form onSubmit={onSubmit} className="form-search">
          <input
            onChange={handleChange}
            style={{width:`${props.width}`}}
            className="form-input"
            type="text"
            value={searchText}
          />
          <button className="btn btn-primary btn-sm" type="submit">
            <img src={searchBarIcon} alt="searchIcon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Searchbar);
