import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import "./Posts.css";

import { postsIndex } from "../../api";

const NewsPosts = props => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let showIndex = true;
    postsIndex(props.user)
      .then(res => {
        const newsPosts = res.data.post.filter(
          news => news.typeofpost === "تقارير"
        );
        return showIndex ? setPosts(newsPosts) : null;
      })
      .catch(err => (showIndex ? console.log(err) : null));
    return () => (showIndex = false);
  }, []);

  const allNews = (
    <div>
      <h3>التقارير</h3>

      <div className="card-header">
        {posts.map((post, index) => {
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
        {posts.length > 0 ? (
          allNews
        ) : (
          <div style={{ padding: "72px", fontSize: "20px" }}>
            <p>لايوجد</p>

            <Link className="btn btn-primary" to={`/create/post`}>
              إنشاء
            </Link>
          </div>
        )}
        {!posts ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default withRouter(NewsPosts);
