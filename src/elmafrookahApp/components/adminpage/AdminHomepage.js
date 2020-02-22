import React from "react";
import "./AdminHomepage.css";

import { Link } from "react-router-dom";
import reviewsIcon from "../../../images/reviewsicon.png";
import interviewsIcon from "../../../images/interviewsicon.png";
import profileIcon from "../../../images/profileicon1.png";

import addIcon from "../../../images/addicon.png";
const authenticatedOptions = (
  <React.Fragment>
    <Link className="btn btn-primary btn-sm" to="/create/post">
      إنشاء
      <img src={addIcon} alt="add-icon" />
    </Link>
    <Link className="btn btn-primary btn-sm" to="/change-password">
      تغيير كلمة المرور
    </Link>
    <Link className="btn btn-primary btn-sm" to="/sign-out">
      تسجيل خروج
    </Link>
  </React.Fragment>
);

const AdminHomepage = ({ user }) => {
  return (
    <div>
      <div id="adminhomepage">
        <aside className="side-menu">{user ? authenticatedOptions : ""}</aside>
        <div className="allitems-cont">
          <Link to="/interviews/posts">
            <div className="div-row">
              <img
                style={{ width: "27%" }}
                src={interviewsIcon}
                alt="articleicon"
              />
              <p>فيتشر/المقابلات</p>
            </div>
          </Link>
          <Link to="/reviews/posts">
            <div className="div-row">
              <img
                style={{ width: "83%", borderRadius: "6px" }}
                src={reviewsIcon}
                alt="articleicon"
              />
              <p>المراجعات</p>
            </div>
          </Link>
          <Link to="/profile/posts">
            <div className="div-row">
              <img
                style={{ width: "58%", borderRadius: "6px" }}
                src={profileIcon}
                alt="profileicon"
              />
              <p>بروفايل</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
