import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import "./Posts.css";

import { postsIndex } from "../../api";

const ReviewsPosts = props => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    postsIndex(props.user)
      .then(res => {
        const reviewsPosts = res.data.post.filter(
          interviews => interviews.typeofpost === "مراجعات"
        );
        setPost(reviewsPosts);
      })
      .catch(err => console.log(err));
  }, []);

  const reviews = (
    <div>
      <h3>المراجعات</h3>
      <div className="card-header">
        {post.map((post, index) => {
          return (
            <div
              key={index}
              className="card shadow-sm p-3 mb-5 bg-white rounded"
            >
              <Link className="card-link" to={`/post/${post._id}`}>
                <div className="card-body">
                  <p className="card-title">{post.title}</p>
                  <p>{new Date(`${post.createdAt}`).toDateString()}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="newsposts-cont">
      <div className="text-center">
        <hr />
        {!post.length > 0 ? (
          <div style={{ padding: "72px", fontSize: "20px" }}>
            <p>لايوجد</p>
            <Link className="btn btn-primary" to={`/create/post`}>
              إنشاء
            </Link>
          </div>
        ) : (
          reviews
        )}
      </div>
    </div>
  );
};

export default withRouter(ReviewsPosts);
