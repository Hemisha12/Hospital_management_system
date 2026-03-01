import React, { useContext, useEffect } from "react";
import "./DoctorList.css";
import { AdminContext } from "../../../context/AdminContext";
const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  console.log("Doctors inside component:", doctors);
  return (
    <div className="all-doc">
      <h1>All Doctors</h1>
      <div className="doc-card">
        {doctors?.map((item, index) => (
          <div key={index} className="doc-info">
            <img src={item.image} alt="" />
            <div className="doc-name">
              <p>{item.name}</p>
              <p>{item.department}</p>
              <div className="doc-checkbox">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
