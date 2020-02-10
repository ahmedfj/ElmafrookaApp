import React, { useState, useEffect } from "react";

import "./Pages.scss";
import { publishedPostIndex } from "../api";
import shortInterVIcon from "../../images/rightarrow.png";
import ScreenLoader from "../components/ScreenLoader"

import PostCards from "../components/post-cards/PostCards";
const ShortInterviewsPage = props => {
  const [post, setPost] = useState([]);
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    publishedPostIndex()
      .then(res => {
        const publishedPost = res.data.post.filter(
          p => p.publishpost === true && p.typeofpost === "فيتشر"
        );
        setPost(publishedPost);
      
        setTimeout(() => {
          setLoader(false) 
        }, 1000);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div id="shortInterviews-page">
      <hr />
      <div className="page-title">
        <p>فيــــتــــشـر</p>
        <img className="" src={shortInterVIcon} alt="news-icon" />
      </div>

      <hr />
      { isLoading ? <ScreenLoader/> : <PostCards post={post}/>}  
      
    </div>
  );
};

export default ShortInterviewsPage;
