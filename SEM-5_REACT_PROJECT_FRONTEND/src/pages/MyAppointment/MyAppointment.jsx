import React, { useContext, useState, useEffect } from "react";
import { Appcontext } from "../../context/Appcontext";
import "./MyAppointment.css";
import { img } from "../../Img/img";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { backendUrl, token } = useContext(Appcontext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // ✅ Format slotDate ("2025-09-09") → "09 Sep 2025"
  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "";

    try {
      const date = new Date(slotDate);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const day = date.getDate().toString().padStart(2, "0");
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error("Invalid date format:", slotDate);
      return slotDate;
    }
  };

  // ✅ Get logged in user appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log("Appointments:", data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // ✅ Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments(); // refresh list after cancel
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="my-appointment-container">
      <h2>My Appointments</h2>
      <div>
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div className="appointment-card" key={index}>
              {/* Doctor image */}
              <div>
                <img
                  src={item.docData?.image || img.default_doctor}
                  alt="Doctor"
                />
              </div>

              {/* Appointment details */}
              <div className="appointment-details">
                <p className="doctor-name">{item.docData?.name}</p>
                <p className="doctor-department">{item.docData?.department}</p>
                <p>
                  <span>Date & Time:</span> {slotDateFormat(item.slotDate)} |{" "}
                  {item.slotTime}
                </p>
              </div>

              {/* Action buttons */}
              <div className="appointment-actions">
                {!item.cancelled && !item.isCompleted && (
                  <button
                    className="pay-btn"
                    onClick={() => toast.info("Feature not available")}
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    className="cancel-btn"
                    onClick={() => cancelAppointment(item._id)}
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="cancelled-btn">
                    Appointment Cancelled
                  </button>
                )}

                {item.isCompleted && <button>Completed</button>}
              </div>
            </div>
          ))
        ) : (
          <p>No Appointments Found</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointment;
