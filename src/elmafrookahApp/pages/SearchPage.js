import React, { useState,useEffect } from "react";

import "./Pages.scss";
import ScreenLoader from "../components/ScreenLoader"
import { withRouter } from "react-router-dom";
import PostCards from "../components/post-cards/PostCards";
import { publishedPostIndex } from "../api";
const SearchPage = ({id}) => {
  const [searchText, setSearchText] = useState(id);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoader] = useState(true);
 

   let showData = true

useEffect(() => {

 if(showData){
  publishedPostIndex()
  .then(res => {
    const publishedPosts = res.data.post.filter(
      post =>{
        let result;
        if (post.publishpost === true && post.title.includes(searchText.trim())){
          
           return result = post
        }else if(post.publishpost === true && post.description.includes(searchText.trim())){
          return result = post
        } else if(post.publishpost === true && post.shortdescription.includes(searchText.trim())){
          return result = post
        } else if(post.publishpost === true && post.writername.includes(searchText.trim())){
          return result = post
        } 
        return result       
      }
        
    );

    setPosts(publishedPosts);
    setTimeout(() => {
      setLoader(false) 
    }, 1000);
  })
  .catch(err =>{
 
          console.log(err)
   
  });
  
  
 }
 
   
 
      
return () => showData = false
 
    
},[searchText])

useEffect(() => {
setSearchText(id)
showData = false

})

  return (
    <div className={`search-page`}>
      { isLoading ? <ScreenLoader/> : <PostCards post={posts} />}  
      
    </div>
  );
};

export default withRouter(SearchPage);
