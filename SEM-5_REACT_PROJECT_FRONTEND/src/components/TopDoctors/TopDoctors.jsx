import React, { useContext } from "react";
import "./TopDoctors.css";
// import { doctors } from "../../Img/img";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/Appcontext";
// import { doctors   } from "../../Img/img";
const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(Appcontext);
  return (
    <div className="doctor">
      <h1>Top Doctors to Book</h1>
      <p>Simply browse through our extensive list of trusted doctors.</p>
      <div className="doctor-sec">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="doctorcard"
            key={index}
          >
            <img src={item.image} alt="imag2" />
            <div className="doctor-info">
              <div className="doctor-avl">
                {/* <p></p> */}
                <p className="status-do">Available</p>
              </div>
              <p className="doctor-name ">{item.name}</p>
              <p className="doctor-department">{item.department}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <button>more</button> */}
    </div>
  );
};

export default TopDoctors;
