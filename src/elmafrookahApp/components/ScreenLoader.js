import React from "react";
import "./ScreenLoader.css"
import {Animated} from "react-animated-css";
import logo from '../../images/logo/logo.png'
const ScreenLoader = () => {

 
  return (
    <div
      style={{ height: "100%", width: "100%", padding: "50px",textAlign:"center" }}>
       <Animated className="anim-div" animationIn="rotateIn" iteration-count="infinite"  isVisible={true}>
         <img style={{width: "20%"}} src={logo} alt="logo"/>

      </Animated>
 
    </div>

  
  
  );
};

export default ScreenLoader;
