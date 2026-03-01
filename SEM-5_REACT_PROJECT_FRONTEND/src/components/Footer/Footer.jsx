import React from "react";
import "./Footer.css";
import { img } from "../../Img/img";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer>
        <div className="footer" id="footer">
          <div className="footer-content">
            <div className="footer-content-left">
              <img src={img.logo_img} alt="Logo" />
              <p>
                Seventh Floor, Office No.706, City Care, Rundh-Vesu, B/s. Rajoo
                India, Nr. Mitul Square, Vesu, Surat, Gujarat 395007
              </p>
            </div>
            <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/doctors">Schedule</NavLink>
                </li>
                {/* <li>
                  <NavLink to="/contact">Contact Us</NavLink>
                </li> */}
              </ul>
            </div>
            <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+91-234-345-3532</li>
                <li>hospital@citycare.com</li>
              </ul>
            </div>
          </div>
          <hr />
          <p className="footer-copyright">
            © 2025 hospital@citycare.com - All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
