import React, { useState, useEffect } from "react";

import "./Pages.scss";
import { publishedPostIndex } from "../api";
import shortInterVIcon from "../../images/rightarrow.png";
import ScreenLoader from "../components/ScreenLoader"

import PostCards from "../components/post-cards/PostCards";
const ShortInterviewsPage = props => {
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
          p => p.publishpost === true && p.typeofpost === "فيتشر"
        );
        setPost(publishedPost.slice(0,9).reverse().slice(0,showPost));
      
        setTimeout(() => {
          setLoader(false) 
        }, 1000);
      })
      .catch(err => console.log(err));
  }, [showPost]);
  return (
    <div id="shortInterviews-page">
      <hr />
      <div className="page-title">
        <p>فيــــتــــشـر</p>
        <img className="" src={shortInterVIcon} alt="news-icon" />
      </div>

      <hr />
      { isLoading ? <ScreenLoader/> : <PostCards post={post}/>}  
      {post.length > 16 ? <button style={{width:"180px",marginTop:"80px"}} className="btn btn-outline-primary btn-sm" onClick={handleLoad}>▼ المزيد</button>:""}  

    </div>
  );
};

export default ShortInterviewsPage;
