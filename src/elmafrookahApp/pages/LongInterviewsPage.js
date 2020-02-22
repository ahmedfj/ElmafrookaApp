import React, { useState, useEffect } from "react";

import "./Pages.scss";
import { publishedPostIndex } from "../api";
import longInterVIcon from "../../images/leftarrow.png";
import ScreenLoader from "../components/ScreenLoader";

import PostCards from "../components/post-cards/PostCards";
const LongInterviewsPage = props => {
  const [post, setPost] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [showPost, setShowPost] = useState(16);
  const [loadedPosts, setLoadedPosts] = useState(0);

  const handleLoad = () => {
    setShowPost(showPost + 16);
    console.log(showPost);
  };

  useEffect(() => {
    publishedPostIndex()
      .then(res => {
        const publishedPost = res.data.post.filter(
          p => p.publishpost === true && p.typeofpost === "مقابلات"
        );
        setLoadedPosts(publishedPost.length);
        setPost(publishedPost.reverse().slice(0, showPost));
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      })
      .catch(err => console.log(err));
  }, [showPost]);
  return (
    <div id="longInterviews-page">
      <hr />
      <div className="page-title">
        <p>مقـــــــابــــــلات</p>
        <img className="" src={longInterVIcon} alt="news-icon" />
      </div>

      <hr />
      {isLoading ? <ScreenLoader /> : <PostCards post={post} />}
      <div style={{ width: "100%", textAlign: "center" }}>
        {loadedPosts > 16 ? (
          <button
            style={{ width: "180px", marginTop: "80px" }}
            className="btn btn-outline-primary btn-sm"
            onClick={handleLoad}
          >
            ▼ المزيد
          </button>
        ) : (
          ""
        )}{" "}
      </div>
    </div>
  );
};

export default LongInterviewsPage;
