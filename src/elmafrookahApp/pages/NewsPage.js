import React, { useState, useEffect } from "react";

import "./Pages.scss";
import { publishedPostIndex } from "../api";
import newsIcon from "../../images/newsicon.png";
import ScreenLoader from "../components/ScreenLoader"

import PostCards from "../components/post-cards/PostCards";
const NewsPage = props => {
  const [post, setPost] = useState([]);
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    publishedPostIndex()
      .then(res => {
        const publishedPost = res.data.post.filter(
          p => p.publishpost === true && p.typeofpost === "تقارير"
        );
        setPost(publishedPost);
        setTimeout(() => {
          setLoader(false) 
        }, 1000);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div id="news-page">
      <hr />
      <div className="page-title">
        <p>تـــقـــــــاريــــر</p>
        <img className="" src={newsIcon} alt="news-icon" />
      </div>

      <hr />
      { isLoading ? <ScreenLoader/> : <PostCards post={post} />}  
      
    </div>
  );
};

export default NewsPage;
