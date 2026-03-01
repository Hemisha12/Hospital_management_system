import React from "react";
import { img } from "../../Img/img";
import "./Home.css"; // Create a new CSS file for homepage styling
import TopDoctors from "../../components/TopDoctors/TopDoctors";
import Banner from "../../components/Banner/Banner";
const HomePage = () => {
  return (
    <>
      {/* Section 1 */}
      <div className="section1">
        <div className="text-container1">
          <h1>
            Hospital Information <br />
            Management System (HIMS)
          </h1>
          <p>
            SaaS-based Digital Healthcare platform. An Integrated <br />
            Solution with billing for In-patient (IP) and Out-Patient (OP){" "}
            <br />
            to enable easy Insurance claims, HIPAA-compliant, Secure <br />
            patient data storage.
          </p>
        </div>
        <div className="image-container1">
          <img src={img.home_img} alt="Hospital" />
        </div>
      </div>
      {/* Section 2 */}
      <div className="section2">
        <div className="image-container2">
          <img src={img.appo_img} alt="Appointment" />
        </div>
        <div className="text-container2">
          <h1>Appointment Management Software</h1>
          <p>
            A comprehensive cloud-based OPD software with a patient dashboard,
            <br />
            multi-chain appointment management, best appointment scheduling
            platform,
            <br />
            and customizable electronic medical records (EMR) for doctors.
          </p>
        </div>
      </div>
      {/* Features Section */}
      <div className="hex-grid">
        <div className="hex">
          {/* <img
            src="https://img.icons8.com/ios-filled/50/hospital-room.png"
            alt="icon"
          /> */}
          <h3>Complete Healthcare Solution</h3>
          <p>
            Seamless data flow between departments for effortless patient data
            management.
          </p>
        </div>
        <div className="hex">
          {/* <img
            src="https://img.icons8.com/ios-filled/50/cloud.png"
            alt="icon"
          /> */}
          <h3>Stable Cloud Solution</h3>
          <p>
            99.99% uptime for over a decade. Mobile apps for doctors and
            patients.
          </p>
        </div>
        <div className="hex">
          {/* <img
            src="https://img.icons8.com/ios-filled/50/cheap-2.png"
            alt="icon"
            height="50px"
            width="70px"
          /> */}
          {/* <img
            className="img-icon"
            src={img.doctor_img}
            alt="icon"
            height="50px"
            width="70px"
          /> */}
          <h3>Patient-Centric Design</h3>
          <p>
            24/7 booking, feedback tools, and telemedicine for higher
            engagement.
          </p>
        </div>
      </div>
      <div className="hex-grid1">
        <div className="hex">
          {/* <img
            src="https://img.icons8.com/ios-filled/50/shield.png"
            alt="icon"
          /> */}
          <h3>Secure & Reliable</h3>
          <p>
            Robust protocols safeguard data privacy and ensure confidentiality.
          </p>
        </div>
        <div className="hex">
          {/* <img
            src="https://img.icons8.com/ios-filled/50/cheap-2.png"
            alt="icon"
          /> */}
          <h3>Affordable</h3>
          <p>Modular pricing for scalability with low upfront investment.</p>
        </div>
      </div>
      <TopDoctors />
      <Banner />
    </>
  );
};

export default HomePage;
