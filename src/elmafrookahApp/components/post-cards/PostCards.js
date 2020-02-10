import React from "react";
import "./PostCards.scss";

import logo from "../../../images/logo/logo.png";
import newsIcon from "../../../images/newsicon.png";
import interviewsLIcon from "../../../images/leftarrow.png";
import interviewsRIcon from "../../../images/rightarrow.png";
import reviewsIcon from "../../../images/reviewsicon.png";
import profileIcon from "../../../images/profileicon1.png";

import { Link } from "react-router-dom";

const PostCards = ({ post }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className="public-card-box">
      {post.map((post, index) => {
        return (
          <div key={index} className={`public-card`}>
            <div className="img-row">
            {post.typeofpost === "تقارير" ? (
                <img className="posticon" src={newsIcon} alt="item" />
              ) : post.typeofpost === "مقابلات" ? (
                <img className="posticon" src={interviewsLIcon} alt="item" />
              ) : post.typeofpost === "فيتشر" ? (
                <img className="posticon" src={interviewsRIcon} alt="item" />
              ) : post.typeofpost === "مراجعات" ? (
                <img className="posticon" src={reviewsIcon} alt="item" />
              ) : (
                post.typeofpost === "بروفايل" ? (
                  <img className="posticon" src={profileIcon} alt="item" />
                ) :""
              )}
              {post.imge ? (
                <img
                  className="publicpostimg"
                  src={`${post.imge}`}
                  alt="item"
                />            
              ) : (
                <img className="publicpostimgLogo" style={{width:"81%"}} src={logo} alt="item" />
              )}
            </div>
            <div className="cardTitle">
              <div className="title-date">
                <span>
                  {new Date(`${post.createdAt}`).toLocaleDateString(
                    "ar-EG",
                    options
                  )}
                </span>

                <Link to={`/posts/${post._id}/${post.title}`}>
                  <h5
                    style={{
                      color:"rgb(61, 127, 179)"
                    }}
                  >
                    {post.title}
                  </h5>
                </Link>
              </div>

              <p>{post.shortdescription}</p>
            </div>
              <Link style={{marginLeft: "15px"}} to={`/posts/${post._id}/${post.title}`}>إقرأ المزيد</Link>

          </div>
        );
      })}
    </div>
  );
};

export default PostCards;
