import React, { useContext } from "react";
import "./Sidebar.css";
import { AdminContext } from "../../context/AdminContext";
import { NavLink } from "react-router-dom";
import { img } from "../../Img/img";
import { DoctorContext } from "../../context/DoctorContext";
const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <>
      <div className="sidebar">
        {aToken && (
          <ul className="ul">
            <NavLink
              className={({ isActive }) =>
                `my-link ${isActive ? "active" : ""}`
              }
              to={"/admin-dashboard"}
            >
              <img src={img.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `my-link ${isActive ? "active" : ""}`
              }
              to={"/all-appoiments"}
            >
              <img src={img.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `my-link ${isActive ? "active" : ""}`
              }
              to={"/add-doctor"}
            >
              <img src={img.add_icon} alt="" />
              <p>Add Doctor</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `my-link ${isActive ? "active" : ""}`
              }
              to={"/doctor-list"}
            >
              <img src={img.people_icon} alt="" />
              <p>Doctor List</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `my-link ${isActive ? "active" : ""}`
              }
              to={"/all-users"}
            >
              <img src={img.people_icon} alt="" />
              <p>all users</p>
            </NavLink>
          </ul>
        )}

        {dToken && (
          <ul className="ul">
            <NavLink
              className={({ isActive }) =>
                `my-link ${isActive ? "active" : ""}`
              }
              to={"/doctor-dashboard"}
            >
              <img src={img.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `my-link ${isActive ? "active" : ""}`
              }
              to={"/doctor-appointments"}
            >
              <img src={img.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `my-link ${isActive ? "active" : ""}`
              }
              to={"/doctor-profile"}
            >
              <img src={img.people_icon} alt="" />
              <p>Profile </p>
            </NavLink>
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
