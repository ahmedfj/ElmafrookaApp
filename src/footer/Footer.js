import React from "react";
import "./Footer.css";

import twitterIcon from "../images/social-media/twitter.png";
import instIcon from "../images/social-media/inst.png";
import titleIcon from "../images/logo/logo-title.png";
import Searchbar from "../elmafrookahApp/components/Searchbar";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerBody">
        <div className="footer-title">
          <h3>الـمفــــروكـــة</h3>
          <p>مبادرة غير ربحية لنشر ثقافة السينما وإثراء المحتوى العربي</p>
          <p> بدعم من مهرجان البحر الأحمر السينمائي الدولي</p>

        </div>
        <div className="footer-contact">
          <p>تواصلوا معنا على</p>
          <p className="contac-email">ElMafrooka@redseafilmfest.com</p>
        </div>
        <div className="socialMedia">
          <a href="https://twitter.com/elmafrooka">
            <img src={twitterIcon} alt="twitter" />
          </a>
          <a href="https://www.instagram.com/elmafrooka">
            <img src={instIcon} alt="instgram" />
          </a>
        </div>
      </div>
      <div className="logo-title">
      <Searchbar/>

        <p>Powered by</p>
        <img src={titleIcon} alt="title" />
      </div>
    </footer>
  );
};

export default Footer;
