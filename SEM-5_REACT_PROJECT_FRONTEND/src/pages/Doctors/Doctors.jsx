import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Doctors.css";
import { Appcontext } from "../../context/Appcontext";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
const DoctorCards = () => {
  const { doctors } = useContext(Appcontext);
  const [filterdoc, setfilterdoc] = useState([]);
  const { speciality } = useParams();
  const navigate = useNavigate();
  const applyfilter = useCallback(() => {
    if (speciality) {
      setfilterdoc(doctors.filter((doc) => doc.department === speciality));
    } else {
      setfilterdoc(doctors);
    }
  }, [doctors, speciality]);

  useEffect(() => {
    applyfilter();
  }, [applyfilter]);

  return (
    <>
      {/* Departments */}
      <div className="departments">
        <div
          onClick={() =>
            speciality === "Orthopedics"
              ? navigate("/doctors")
              : navigate("/doctors/Orthopedics")
          }
          className={`dept-card ${
            speciality === "Orthopedics" ? "active" : ""
          }`}
        >
          🦴 <span>Orthopedics</span>
        </div>
        <div
          onClick={() =>
            speciality === "Cardiology"
              ? navigate("/doctors")
              : navigate("/doctors/Cardiology")
          }
          className={`dept-card ${speciality === "Cardiology" ? "active" : ""}`}
        >
          🫀 <span>Cardiology</span>
        </div>
        <div
          onClick={() =>
            speciality === "Dentistry"
              ? navigate("/doctors")
              : navigate("/doctors/Dentistry")
          }
          className={`dept-card ${speciality === "Dentistry" ? "active" : ""}`}
        >
          🦷 <span>Dentistry</span>
        </div>
        <div
          onClick={() =>
            speciality === "Oncology"
              ? navigate("/doctors")
              : navigate("/doctors/Oncology")
          }
          className={`dept-card ${speciality === "Oncology" ? "active" : ""}`}
        >
          🔬 <span>Oncology</span>
        </div>
        <div
          onClick={() =>
            speciality === "Physiotherapy"
              ? navigate("/doctors")
              : navigate("/doctors/Physiotherapy")
          }
          className={`dept-card ${
            speciality === "Physiotherapy" ? "active" : ""
          }`}
        >
          🏋️ <span>Physiotherapy</span>
        </div>
        <div
          onClick={() =>
            speciality === "Plastic Surgery"
              ? navigate("/doctors")
              : navigate("/doctors/Plastic Surgery")
          }
          className={`dept-card ${
            speciality === "Plastic Surgery" ? "active" : ""
          }`}
        >
          🩺<span>Plastic Surgery</span>
        </div>
      </div>

      {/* Doctors List */}
      <div className="main">
        <div className="card-wrapper1">
          {filterdoc.map((doc, index) => (
            <div key={index} className="card-wrapper">
              <div className="flip-card">
                {/* Front */}
                <div className="card-side card-front">
                  <img src={doc.image} alt={doc.name} />

                  <h3>{doc.name}</h3>
                  <h3>{doc.department}</h3>
                </div>

                {/* Back */}
                <div className="card-side card-back">
                  <ul className="dr-info">
                    <li>
                      <b>Name:</b> {doc.name}
                    </li>
                    <li>{/* <b>Degree:</b> {doc.degree} */}</li>
                    <li>
                      <b>Age:</b> {doc.age}
                    </li>
                    <li>
                      <b>Gender:</b> {doc.gender}
                    </li>
                    <li>
                      <b>Ph:</b> {doc.phone}
                    </li>
                    <li>
                      <b>Department:</b> {doc.department}
                    </li>
                  </ul>
                  <button
                    onClick={() => navigate(`/appointment/${doc._id}`)}
                    className="get-app"
                  >
                    Get Appoinment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorCards;
