import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

import sittingicon from "../images/sittingicon.png";
const authOptions = (
  <React.Fragment>
    <Link className="btn btn-primary btn-sm" to="/dashboard">
      لوحة التحكم
      <img src={sittingicon} alt="sitting-icon" />
    </Link>
  </React.Fragment>
);
const AdminMenu = ({ user }) => {
  return (
    <div id="admin-menu">
      {user && <span>Welcome, {user.email}</span>}
      {/* { alwaysOptions } */}
      {authOptions}
    </div>
  );
};

export default AdminMenu;
