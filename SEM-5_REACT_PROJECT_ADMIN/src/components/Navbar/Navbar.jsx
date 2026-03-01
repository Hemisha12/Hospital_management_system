import React, { useContext } from "react";
import { img } from "../../Img/img";
import { AdminContext } from "../../context/AdminContext";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
const Navbar = () => {
  const { aToken, setaToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    aToken && setaToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };
  return (
    <header>
      <div className="admin-info">
        <div className="admin-logo">
          <img src={img.logo} />
          <button className="token">{aToken ? "Admin" : "Doctor"}</button>
        </div>
        <button onClick={logout} className="logout">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
