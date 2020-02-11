import React, { useState, useEffect } from "react";

import { showPublicPost } from "../api";
import { withRouter } from "react-router-dom";
import newsIcon from "../../images/newsicon.png";
import longInterVIcon from "../../images/leftarrow.png";
import shortInterVIcon from "../../images/rightarrow.png";
import reviewsIcon from "../../images/reviewsicon.png";
import profileIcon from "../../images/profileicon1.png";

import logo from "../../images/logo/logo.png";
import blankImg from "../../images/blank.png";

import "./Pages.scss";
import ReactPlayer from "react-player";
import ScreenLoader from "../components/ScreenLoader"
import RatingStars from "../components/RatingStars";

const ShowPublicPost = ({ postId, name }) => {
  const [post, setPost] = useState({});
  const options = { year: "numeric", month: "long", day: "numeric" };
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    showPublicPost(postId, name)
      .then(res => {
        setPost(res.data.post);
        setTimeout(() => {
          setLoader(false) 
        }, 1000);
      })
      .catch(err => console.log(err));
  }, []);
  const vidPlayer = (
    <div>
      <div className="player-wrapper">
        <ReactPlayer  config={{
    youtube: {
      playerVars: { controls: 1 }
    }
  }} width="100%" height="100%" url={post.videolink} />
      </div>
  
    </div>
  );

  return (
  isLoading ? <ScreenLoader/> : <div id="post-page">
      <hr />
      <div className="page-title">
    
          {  post.typeofpost === "مقابلات"
                ? <p style={{color: "rgb(61, 127, 179)"}}>مقـــــــابــــــلات</p>
                : post.typeofpost === "تقارير"
                ? <p style={{color:  "rgb(61, 127, 179)"}}>تـــقـــــــاريــــر</p>
                : post.typeofpost === "فيتشر"
                ? <p style={{color:  "rgb(61, 127, 179)"}}>فيــــتــــشـر</p>
                : post.typeofpost === "مراجعات"
                ? <p style={{color:  "rgb(61, 127, 179)"}}>مــــراجعــــات</p>
                : post.typeofpost === "بروفايل"
                ? <p style={{color:  "rgb(61, 127, 179)"}}>بروفــــــايـل</p> : ""}
        <img
          className=""
          src={
            post.typeofpost === "مقابلات"
              ? longInterVIcon
              : post.typeofpost === "تقارير"
              ? newsIcon
              : post.typeofpost === "فيتشر"
              ? shortInterVIcon
              : post.typeofpost === "مراجعات"
              ? reviewsIcon
             : post.typeofpost === "بروفايل"
              ? profileIcon : ""
          }
          alt="news-icon"
        />
      </div>
     
      <hr />
      <div className="postBody">
        <div className="title-rate">
          <h3
            style={{
              color:"rgb(61, 127, 179)"}}
          >
            {post.title}
          </h3>
        </div>
       {!post.videolink && !post.imge ?
       <img className="postImage" src={logo} alt="post-img" />
        :  
     <div style={{width: "100%",
           display: "flex", flexDirection:"column",alignItems:"center"}}>
           {post.vidorimg === "صورة" ? (
          <img className="postImage" src={post.imge}  alt="post-img"/>
        ) : post.vidorimg === "فديو" ? (
          vidPlayer
        ) : ""}
        </div>
     
     } 
       
        <div className="m-title-rate">
          <h3 style={{color:"rgb(61, 127, 179)"}}>
            {post.title}
          </h3>
        </div>
        
        {post.writername ?
            
            <div className="writer-box">
              <div className="img-box">
              <img className="writerimg"  src={post.writerimge ? post.writerimge : blankImg} alt="item" />

              </div>
            <div>
            <p style={{fontSize:"17px", padding:"0"}}><span>الكاتب :</span>{post.writername}</p>
            <RatingStars  rating={post.rating}/>
            </div>
           
            </div>
     

        
          :""}
          
        <hr />
        <span>
          {new Date(`${post.createdAt}`).toLocaleDateString("ar-MA", options)}
        </span>
        <p>{post.description}</p>
      </div>
    </div>
  );
};

export default withRouter(ShowPublicPost);
