import React, { useState, useEffect } from "react";

import "./Pages.scss";
import { publishedPostIndex } from "../api";
import profileIcon from "../../images/profileicon1.png";
import ScreenLoader from "../components/ScreenLoader"

import PostCards from "../components/post-cards/PostCards";
const ProfilePage = props => {
  const [post, setPost] = useState([]);
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    publishedPostIndex()
      .then(res => {
        const publishedPost = res.data.post.filter(
          p => p.publishpost === true && p.typeofpost === "بروفايل"
        );
        setPost(publishedPost);
        setTimeout(() => {
          setLoader(false) 
        }, 1000);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div id="profile-page">
      <hr />
      <div className="page-title">
        <p>بروفــــــايـل</p>
        <img className="" src={profileIcon} alt="profile-icon" />
      </div>

      <hr />
      { isLoading ? <ScreenLoader/> : <PostCards post={post} />}  
      
    </div>
  );
};

export default ProfilePage;
