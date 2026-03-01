import React, { useContext, useState, useRef, useEffect } from "react";
import { img } from "../../Img/img";
import "./Navbar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Login from "../../pages/Login/Login";
import { Appcontext } from "../../context/Appcontext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSignup, setShowSignup] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token, setToken, userData } = useContext(Appcontext);

  const dropdownRef = useRef(null);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/");
  };

  const openSignup = () => {
    setModalKey((prev) => prev + 1);
    setShowSignup(true);
  };

  // Close dropdown when route changes (user navigates)
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <img
            className="logo"
            onClick={() => navigate("/")}
            src={img.logo_img}
            alt="Logo"
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/doctors">Schedule</NavLink>
          {/* <NavLink to="/contact">Contact Us</NavLink> */}

          <div className="button">
            {token && userData ? (
              <div className="profile_icon" ref={dropdownRef}>
                {/* clicking either image toggles the dropdown */}
                <img
                  className="profile"
                  src={userData.image || img.default_doctor}
                  alt="profile"
                  onClick={() => setDropdownOpen((p) => !p)}
                  style={{ cursor: "pointer" }}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                />
               
                {dropdownOpen && (
                  <div className="profile_info" role="menu">
                    <div>
                      <p
                        role="menuitem"
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/my-profile");
                        }}
                      >
                        My Profile
                      </p>
                      <p
                        role="menuitem"
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/my-appointments");
                        }}
                      >
                        My Appointment
                      </p>
                      <p
                        role="menuitem"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={openSignup} className="button-link">
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {showSignup && (
        <Login key={modalKey} onClose={() => setShowSignup(false)} />
      )}
    </header>
  );
};

export default Navbar;
