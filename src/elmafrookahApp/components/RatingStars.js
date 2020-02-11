import React,{useEffect,useState} from "react";
import "./RatingStars.css";
import darkStar from '../../images/darkstar.png';
import lightStar from '../../images/lightstar.png'
const RatingStars = ({rating}) => {
  const [rateNumb,setRateNumb] = useState(0)
 useEffect(() => {
    switch (rating) {
        case 1:
            setRateNumb(1)
            break;
            case 2:
                setRateNumb(2)
                break;
                case 3:
                    setRateNumb(3)
                    break;
                    case 4:
                        setRateNumb(4)
                        break;
                        case 5:
                            setRateNumb(5)
                            break;
        default:
            break;
    }
     return () => {
        
     };
 },[])
  return (
      <div className="rating-box">
        <div className="ratingstars">
        <img className="star" src={rateNumb > 0 ? darkStar : lightStar} alt="star"/>
        <img className="star" src={rateNumb >= 2 ? darkStar : lightStar} alt="star"/>
        <img className="star" src={rateNumb >= 3 ? darkStar : lightStar} alt="star"/>
        <img className="star" src={rateNumb >= 4 ? darkStar : lightStar} alt="star"/>
        <img className="star" src={rateNumb >= 5 ? darkStar : lightStar} alt="star"/>
        <span style={{margin:"0 15px 0 15px"}}>التقييم :</span>
      </div>
      </div>
   
  
  );
};

export default RatingStars;
