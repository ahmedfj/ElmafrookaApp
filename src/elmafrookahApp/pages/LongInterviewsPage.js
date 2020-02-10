import React, { useState, useEffect } from "react";

import "./Pages.scss";
import { publishedPostIndex } from "../api";
import longInterVIcon from "../../images/leftarrow.png";
import ScreenLoader from "../components/ScreenLoader"

import PostCards from "../components/post-cards/PostCards";
const LongInterviewsPage = props => {
  const [post, setPost] = useState([]);
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    publishedPostIndex()
      .then(res => {
        const publishedPost = res.data.post.filter(
          p => p.publishpost === true && p.typeofpost === "مقابلات"
        );
        setPost(publishedPost);
        setTimeout(() => {
          setLoader(false) 
        }, 1000);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div id="longInterviews-page">
      <hr />
      <div className="page-title">
        <p>مقـــــــابــــــلات</p>
        <img className="" src={longInterVIcon} alt="news-icon" />
      </div>

      <hr />
      { isLoading ? <ScreenLoader/> : <PostCards post={post} />}  
      
    </div>
  );
};

export default LongInterviewsPage;
