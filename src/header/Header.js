import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo/logo.png";
import "./Header.scss";
import newsIcon from "../images/newsicon.png";
import interviewsLIcon from "../images/leftarrow.png";
import interviewsRIcon from "../images/rightarrow.png";
import reviewsIcon from "../images/reviewsicon.png";
import profileIcon from "../images/profileicon1.png";
import searchIcon from "../images/m-searchbaricon.png";

import AdminMenu from "./AdminMenu";

const Header = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);

  const alwaysOptions = (
    <React.Fragment>
      <Link className="headLink" to="/profile">
      بروفــــــايـل{" "}
        <img className="posticonHead" src={profileIcon} alt="item" />{" "}
      </Link>
      <Link
        
        className="headLink"
        to="/feature"
      >
        فيــــتــــشـر{" "}
        <img className="posticonHead" src={interviewsRIcon} alt="item" />{" "}
      </Link>

      <Link
        
        className="headLink"
        to="/reviews"
      >
        مــــراجعــــات{" "}
        <img
          style={{ height: "13%" }}
          className="posticonHead"
          src={reviewsIcon}
          alt="item"
        />
      </Link>

      <Link
        onClick={() => setShowMenu(false)}
        id="logo-names"
        className="logoLink"
        to="/"
      >
        <img src={logo} alt="img-logo" />
        <p>الـمفــــروكـــة</p>
        <p className="eng-name">Elmafrooka</p>
      </Link>
      <Link
        className="headLink"
        to="/long-interviews"
      >
        مقـــــــابــــــلات{" "}
        <img className="posticonHead" src={interviewsLIcon} alt="item" />
      </Link>

      <Link
        className="headLink"
        to="/news"
      >
        تـــقـــــــاريــــر{" "}
        <img className="posticonHead" src={newsIcon} alt="item" />
      </Link>

      <Link className="headLink" to="/">
      الــــرئـــيـسـيــة
      </Link>
    </React.Fragment>
  );

  //Mobile responsive burger menu
  const burger = (
    <div onClick={() => setShowMenu(!showMenu)} className="burger">
      <div className="line-1"></div>
      <div className="line-2"></div>
      <div className="line-3"></div>
    </div>
  );
  //Mobile responsive search icon
  const search = (
    <React.Fragment>
      <Link
        onClick={() => setShowMenu(false)}
        className="m-searchbar"
        to="/search"
      >
        <img
          style={{ width: "21px" }}
          className="posticonHead"
          src={searchIcon}
          alt="item"
        />
      </Link>
    </React.Fragment>
  );

  const showList = (
    <div className="showList">
      <ul>
        <li>
          <Link
            onClick={() => setShowMenu(false)}
            className="m-headLink"
            to="/"
          >
            الــــرئـــيـسـيــة
          </Link>
        </li>
        <li>
          {" "}
          <Link
            onClick={() => setShowMenu(false)}
            
            className="m-headLink"
            to="/feature"
          >
            فيــــتــــشـر{" "}
            <img className="posticonHead" src={interviewsRIcon} alt="item" />{" "}
          </Link>
        </li>
        <li>
          {" "}
          <Link
            onClick={() => setShowMenu(false)}
            
            className="m-headLink"
            to="/reviews"
          >
            مــــراجعــــات{" "}
            <img
              className="posticonHead"
              src={reviewsIcon}
              alt="item"
            />
          </Link>
        </li>
        <li>
          {" "}
          <Link
            onClick={() => setShowMenu(false)}
            className="m-headLink"
            to="/long-interviews"
          >
            مقـــــــابــــــلات{" "}
            <img className="posticonHead" src={interviewsLIcon} alt="item" />
          </Link>
        </li>
        <li>
          {" "}
          <Link
            onClick={() => setShowMenu(false)}
            className="m-headLink"
            to="/news"
          >
            تـــقـــــــاريــــر{" "}
            <img className="posticonHead" src={newsIcon} alt="item" />
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setShowMenu(false)}
            className="m-headLink"
            to="/profile"
          >
            بروفــــــايـل{" "}
            <img className="posticonHead" src={profileIcon} alt="item"/>
          </Link>
        </li>
      </ul>
    </div>
  );
  return (
    <div className="header-container">
      <header className="main-header">
        <nav>
          {burger}
          {alwaysOptions}
          {search}
        </nav>
        {user ? <AdminMenu user={user} /> : ""}
      </header>
      {showMenu ? showList : ""}
    
    </div>
  );
};

export default Header;
