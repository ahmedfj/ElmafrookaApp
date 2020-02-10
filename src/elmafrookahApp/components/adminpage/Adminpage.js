import React from "react";
import "./Admin.css";

import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div id="adminpage">
      <h1>sign in</h1>
      <Link className="btn btn-primary" to="/sign-in">
        Sign in
      </Link>
    </div>
  );
};

export default Admin;
