import React, { useState, useEffect } from "react";

import "./Pages.scss";
import { publishedPostIndex } from "../api";
import profileIcon from "../../images/profileicon1.png";
import ScreenLoader from "../components/ScreenLoader"

import PostCards from "../components/post-cards/PostCards";
const ProfilePage = props => {
  const [post, setPost] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [showPost, setShowPost] = useState(16);
  const handleLoad = () =>{
    
    setShowPost(showPost + 16)  
    console.log(showPost);
  
    }
  useEffect(() => {
    publishedPostIndex()
      .then(res => {
        const publishedPost = res.data.post.filter(
          p => p.publishpost === true && p.typeofpost === "بروفايل"
        );
        setPost(publishedPost.reverse().slice(0,showPost));
        setTimeout(() => {
          setLoader(false) 
        }, 1000);
      })
      .catch(err => console.log(err));
  }, [showPost]);
  return (
    <div id="profile-page">
      <hr />
      <div className="page-title">
        <p>بروفــــــايـل</p>
        <img className="" src={profileIcon} alt="profile-icon" />
      </div>

      <hr />
      { isLoading ? <ScreenLoader/> : <PostCards post={post} />}  
      {post.length > 16 ? <button style={{width:"180px",marginTop:"80px"}} className="btn btn-outline-primary btn-sm" onClick={handleLoad}>▼ المزيد</button>:""}  

    </div>
  );
};

export default ProfilePage;
