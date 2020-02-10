import React, { useState, useEffect } from "react";
import PostCards from "./components/post-cards/PostCards";
import { publishedPostIndex } from "./api";
import "./Home.css";
import CarouselBox from "./components/CarouselBox";
import ScreenLoader from "./components/ScreenLoader"
const Home = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    publishedPostIndex()
      .then(res => {
        const publishedPost = res.data.post.filter(
          p => p.publishpostmainpage === true
        );
          
        setPost(publishedPost.slice(0,9).reverse());
        setTimeout(() => {
          setLoader(false) 
        }, 1000);
       
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div id="homepage">
     { isLoading ? (<ScreenLoader/> ): !isLoading ?
     (
       <React.Fragment>
          <CarouselBox post={post} />
          <PostCards post={post} />
       </React.Fragment>
     
     ):""}  
     
    </div>
  );
};

export default Home;
