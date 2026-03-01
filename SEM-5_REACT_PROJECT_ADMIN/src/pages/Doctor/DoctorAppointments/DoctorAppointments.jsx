import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../../context/DoctorContext";
import "./DoctorAppointments.css";
import { AppContext } from "../../../context/AppContext";
import { img } from "../../../Img/img";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="doctor-appointments">
      <h2>All Appointments</h2>

      <div className="table-header">
        <p>No.</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

      {appointments.reverse().map((item, index) => (
        <div key={index} className="table-row">
          <p>{index + 1}</p>
          <div className="patient-info">
            <img src={item.userData.image} alt="" />
            <p>{item.userData.name}</p>
          </div>
          {/* <p className={`payment ${item.payment ? "online" : "cash"}`}>
            {item.payment ? "Online" : "Cash"}
          </p> */}
          <p>{item.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}</p>

          <p>{item.formattedSlotDateTime}</p>

          <p>{item.docData?.fee}</p>
          {item.cancelled ? (
            <p className="cancel">Cancelled</p>
          ) : item.isCompleted ? (
            <p className="complet">Completed</p>
          ) : (
            <div className="cancel-add">
              <img
                onClick={() => cancelAppointment(item._id)}
                src={img.cancel_icon}
                alt="cancel"
              />
              <img
                onClick={() => completeAppointment(item._id)}
                src={img.tick_icon}
                alt="add"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DoctorAppointments;
