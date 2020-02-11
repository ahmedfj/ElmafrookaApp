import React, { useState } from "react";
import "./CarouselBox.scss";
import { Carousel } from "react-bootstrap";
import {Link} from "react-router-dom"
import newsIcon from "../../images/crnewsicon.png";
import interviewsLIcon from "../../images/crleftarrow.png";
import interviewsRIcon from "../../images/crrightarrow.png";
import reviewsIcon from "../../images/crreviews.png";
import profileIcon from "../../images/crprofileicon.png";

const CarouselBox = ({ post }) => {
  const onCarousel = post.filter(p => p.isoncarousel === true);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  const first = onCarousel[0] ? onCarousel[0] : "";
  const second = onCarousel[1] ? onCarousel[1] : "";
  const third = onCarousel[2] ? onCarousel[2] : "";

  const showNewsIcons = (
    <React.Fragment>
      <img className="posticonCr" src={newsIcon} alt="item" />
    </React.Fragment>
  );

  const showIterVLIcons = (
    <React.Fragment>
      <img className="posticonCr" src={interviewsLIcon} alt="item" />
    </React.Fragment>
  );

  const showIterVRIcons = (
    <React.Fragment>
      <img className="posticonCr" src={interviewsRIcon} alt="item" />
    </React.Fragment>
  );

  const showReviewscons = (
    <React.Fragment>
      <img className="posticonCr" src={reviewsIcon} alt="item" />
    </React.Fragment>
  );
  const showProfilecons = (
    <React.Fragment>
      <img className="posticonCr" src={profileIcon} alt="item" />
    </React.Fragment>
  );
  return (
    <div className="carousel-container">
      <p
        className="m-logo-title"
        style={{ textAlign: "center", color: "rgb(61, 127, 179)" }}
      >
        مبادرة غير ربحية لنشر ثقافة السينما والنقد السينمائي
      </p>
      <Carousel
        controls={false}
        activeIndex={index}
        direction={direction}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <img
            className="d-block w-50"
            src={first.carouselimge}
            alt="Firstslide"
          />

          <Carousel.Caption>
            <div className="icon-box">
               {first.typeofpost === "تقارير"
              ? showNewsIcons
              : first.typeofpost === "مقابلات"
              ? showIterVLIcons
              : first.typeofpost === "فيتشر"
              ? showIterVRIcons
              : first.typeofpost === "مراجعات"
              ? showReviewscons
              : first.typeofpost === "بروفايل"
              ? showProfilecons
              : ""}
            </div>
           
              <div className="title-box">
                <Link to={`/posts/${first._id}/${first.title}`}>{first.title}</Link> 
             <p>{first.shortdescription}</p>
              </div>
 
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-50"
            src={second.carouselimge}
            alt="Secondlide"
          />
          <Carousel.Caption>
            <div className="icon-box">
            {second.typeofpost === "تقارير"
              ? showNewsIcons
              : second.typeofpost === "مقابلات"
              ? showIterVLIcons
              : second.typeofpost === "فيتشر"
              ? showIterVRIcons
              : second.typeofpost === "مراجعات"
              ? showReviewscons
              : second.typeofpost === "بروفايل"
              ? showProfilecons
              : ""} 
              </div>
              <div className="title-box">
                 <Link to={`/posts/${second._id}/${second.title}`}>{second.title}</Link> 
            <p>{second.shortdescription}</p>
              </div>
          
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-50"
            src={third.carouselimge}
            alt="Firstslide"
          />

          <Carousel.Caption>
            <div className="icon-box">
            {third.typeofpost === "تقارير"
              ? showNewsIcons
              : third.typeofpost === "مقابلات"
              ? showIterVLIcons
              : third.typeofpost === "فيتشر"
              ? showIterVRIcons
              : third.typeofpost === "مراجعات"
              ? showReviewscons
              : third.typeofpost === "بروفايل"
              ? showProfilecons
              : ""}
               </div>
              <div className="title-box">
                  <Link to={`/posts/${third._id}/${third.title}`}>{third.title}</Link> 
             <p>{third.shortdescription}</p>
              </div>
          
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselBox;
