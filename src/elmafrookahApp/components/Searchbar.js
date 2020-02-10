import React, { useState } from "react";

import "./Searchbar.scss";
import searchBarIcon from "../../images/searchbaricon.png";
// import ScreenLoader from "../components/ScreenLoader"

import { withRouter } from "react-router-dom";
// import PostCards from "../components/post-cards/PostCards";
// import { publishedPostIndex } from "../api";
const Searchbar = props => {
  const [searchText, setSearchText] = useState("");
  // const [posts, setPosts] = useState([]);
  // const [isLoading, setLoader] = useState(true);

  // const fetchData = searchtext => {
  //   publishedPostIndex()
  //     .then(res => {
  //       const publishedPosts = res.data.post.filter(
  //         post =>
  //           post.publishpost === true && post.title.includes(searchtext.trim())
  //       );

  //       setPosts(publishedPosts);
  //       // setTimeout(() => {
  //       //   setLoader(false) 
  //       // }, 1000);
  //     })
  //     .catch(err => console.log(err));
  // };

  const handleChange = e => {
    const value = e.target.value;

    setSearchText(value);
  };
  const onSubmit = e => {
    e.preventDefault();
    // fetchData(searchText);
    props.history.push(`/search/${searchText}`)

  };
  return (
    <div className={`search-cont`}>
      <hr />
      <div className="searchForm">
        <form onSubmit={onSubmit} className="form-search">
          <input
            onChange={handleChange}
            className="form-input"
            type="text"
            value={searchText}
          />
          <button className="btn btn-primary btn-sm" type="submit">
            <img src={searchBarIcon} alt="searchIcon" />
          </button>
        </form>
      </div>
      <hr />
      {/* { isLoading ? <ScreenLoader/> : ""}   */}

      {/* <PostCards post={posts} /> */}
    </div>
  );
};

export default withRouter(Searchbar);
