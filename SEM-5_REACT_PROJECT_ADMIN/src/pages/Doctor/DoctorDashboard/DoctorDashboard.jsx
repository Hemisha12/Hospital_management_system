import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../../context/DoctorContext";
import { img } from "../../../Img/img";
import { AppContext } from "../../../context/AppContext";
import "./DoctorDashboard.css";
const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="dashboard">
        <div className="dashboard-cards-section">
          <div className="dashboard-card">
            <img src={img.doctor_icon} alt="Doctors" />
            <div className="card-content">
              {/* ✅ doctors is not in dashData, maybe show earnings */}
              <p className="card-number">
                {currency}
                {dashData.earnings}
              </p>
              <p className="card-label">Earnings</p>
            </div>
          </div>

          <div className="dashboard-card">
            <img src={img.appointments_icon} alt="Appointments" />
            <div className="card-content">
              <p className="card-number">{dashData.appointments}</p>
              <p className="card-label">Appointments</p>
            </div>
          </div>

          <div className="dashboard-card">
            <img src={img.patients_icon} alt="Patients" />
            <div className="card-content">
              <p className="card-number">{dashData.patients}</p>
              <p className="card-label">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="latest-bookings-section">
          <div className="section-heading">
            <img src={img.list_icon} alt="List" />
            <span>Latest Bookings</span>
          </div>
          {/* you can map dashData.latestAppointments here */}
        </div>
        {dashData.latestAppointments &&
        dashData.latestAppointments.length > 0 ? (
          <div className="booking-list">
            {dashData.latestAppointments.map((item) => (
              <div className="booking-item" key={item._id}>
                <img
                  src={item.userData?.image || "/images/default-doctor.png"}
                  alt={item.userData?.name || "Doctor"}
                  className="doctor-image"
                />
                <div className="booking-details">
                  <p className="doctor-name">{item.userData?.name || "N/A"}</p>
                  <p className="booking-info">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="cancel">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="complete">Completed</p>
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
        ) : (
          <p className="no-bookings">No latest bookings found</p>
        )}
      </div>
    )
  );
};

export default DoctorDashboard;
