import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../../context/Appcontext";
import { useNavigate } from "react-router-dom";
import "./RelatedDoctors.css";
const RelatedDoctors = ({ department, docId }) => {
  const { doctors } = useContext(Appcontext);
  const navigate = useNavigate();

  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && department) {
      const doctorsData = doctors.filter(
        (doc) => doc.department === department && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, department, docId]);

  return (
    <div className="doctor">
      <h1>Top Doctors to Book</h1>
      <p>Simply browse through our extensive list of trusted doctors.</p>
      <div className="doctor-sec">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="doctor-card"
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

export default RelatedDoctors;
