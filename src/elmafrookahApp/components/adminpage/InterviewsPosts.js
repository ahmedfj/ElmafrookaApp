import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import "./Posts.css";

import { postsIndex } from "../../api";

const InterviewsPosts = props => {
  const [longPost, setLongPost] = useState([]);
  const [shortPost, setShortPost] = useState([]);

  const [isShortInterviews, setIsShortInterviews] = useState(true);
  const [isLongInterviews, setIsLongInterviews] = useState(false);

  useEffect(() => {
    postsIndex(props.user)
      .then(res => {
        const interviewsPostsShort = res.data.post.filter(
          interviews => interviews.typeofpost === "فيتشر"
        );
        const interviewsPostsLong = res.data.post.filter(
          interviews => interviews.typeofpost === "مقابلات"
        );
        setShortPost(interviewsPostsShort);
        setLongPost(interviewsPostsLong);
      })
      .catch(err => console.log(err));
  }, []);

  const longInterviews = (
    <div>
      <h3>المقابلات</h3>

      <div className="card-header">
        {longPost.map((post, index) => {
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

  const shortInterviews = (
    <div>
      <h3>فيتشر</h3>
      <div className="card-header">
        {shortPost.map((post, index) => {
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
        <button
          onClick={() => {
            setIsShortInterviews(true);
            setIsLongInterviews(false);
          }}
          className="btn btn-primary btn-sm"
        >
          فيتشر
        </button>
        <button
          onClick={() => {
            setIsShortInterviews(false);
            setIsLongInterviews(true);
          }}
          className="btn btn-primary btn-sm"
        >
          المقابلات
        </button>

        <hr />

        {isLongInterviews
          ? longInterviews
          : isShortInterviews
          ? shortInterviews
          : ""}
        {!shortPost.length > 0 || !longPost.length > 0 ? (
          <div style={{ padding: "72px", fontSize: "20px" }}>
            <p>لايوجد مقابلات</p>

            <Link className="btn btn-primary" to={`/create/post`}>
              إنشاء
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default withRouter(InterviewsPosts);
