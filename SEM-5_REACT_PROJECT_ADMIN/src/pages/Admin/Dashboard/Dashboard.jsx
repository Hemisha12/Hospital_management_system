import React, { useContext, useEffect } from "react";
import "./Dashboard.css";
import { AdminContext } from "../../../context/AdminContext";
import { AppContext } from "../../../context/AppContext";
import { img } from "../../../Img/img";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      {/* Dashboard Cards Section */}
      <div className="dashboard-cards-section">
        <div className="dashboard-card">
          <img src={img.doctor_icon} alt="Doctors" />
          <div className="card-content">
            <p className="card-number">{dashData.doctors}</p>
            <p className="card-label">Doctors</p>
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
      <div className="latest-books-section latest-bookings-section">
        <div className="section-heading">
          <img src={img.list_icon} alt="List" />
          <span>Latest Bookings</span>
        </div>

        {dashData.latestAppointment && dashData.latestAppointment.length > 0 ? (
          <div className="booking-list">
            {(dashData.latestAppointment || []).map((item) => (
              <div className="booking-item" key={item._id}>
                <img
                  src={item.docData?.image || "/images/default-doctor.png"}
                  alt={item.docData?.name || "Doctor"}
                  className="doctor-image"
                />
                <div className="booking-details">
                  <p className="doctor-name">{item.docData?.name || "N/A"}</p>
                  <p className="booking-info">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                <td className="cancel">
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
                    </div>
                  )}
                </td>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-bookings">No latest bookings found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
