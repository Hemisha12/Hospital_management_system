import React, { useState } from "react";
import "./Banner.css";
import { img } from "../../Img/img";
// import { useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import "../../pages/Login/Login.css";

const Banner = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="contain-bg">
      {/* Left Side */}
      <div className="app_img">
        <div className="text-size">
          <p>Book Appointment</p>
          <p>With 100+ Trusted Doctors</p>
          <button className="banner-btn" onClick={() => setShowLogin(true)}>
            Create account
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div>
        <img src={img.appoinment_img} alt="Doctor" />
      </div>

      {/* Login Modal */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
};
export default Banner;
