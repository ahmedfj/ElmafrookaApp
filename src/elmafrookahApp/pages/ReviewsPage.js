import React, { useState, useEffect } from "react";

import "./Pages.scss";
import { publishedPostIndex } from "../api";
import reviewsIcon from "../../images/reviewsicon.png";
import ScreenLoader from "../components/ScreenLoader"

import PostCards from "../components/post-cards/PostCards";
const ReviewsPage = props => {
  const [post, setPost] = useState([]);
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    publishedPostIndex()
      .then(res => {
        const publishedPost = res.data.post.filter(
          p => p.publishpost === true && p.typeofpost === "مراجعات"
        );
        setPost(publishedPost);
        setTimeout(() => {
          setLoader(false) 
        }, 1000);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div id="reviews-page">
      <hr />
      <div className="page-title">
        <p>مــــراجعــــات</p>
        <img className="" src={reviewsIcon} alt="news-icon" />
      </div>
      <hr />
      { isLoading ? <ScreenLoader/> : <PostCards post={post} />}  
      
    </div>
  );
};

export default ReviewsPage;
