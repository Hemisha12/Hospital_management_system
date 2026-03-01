import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../../context/AdminContext";
import { AppContext } from "../../../context/AppContext";
import { img } from "../../../Img/img";
import "./AllAppointments.css";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="all-appointments-container">
      <h2>All Appointments</h2>
      <div className="appointments-table-wrapper">
        {appointments && appointments.length > 0 ? (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Patient</th>
                <th>Age</th>
                <th>Date & Time</th>
                <th>Doctor</th>
                <th>Fees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td className="patient-cell">
                    <img
                      src={item.userData?.image || "/images/default-user.png"}
                      alt="Patient"
                    />
                    {item.userData?.name || "N/A"}
                  </td>
                  <td>{calculateAge(item.userData?.dob) || "N/A"}</td>
                  <td>
                    {slotDateFormat(item.slotDate) || "N/A"},{" "}
                    {item.slotTime || "N/A"}
                  </td>
                  <td className="patient-cell">
                    <img
                      src={item.docData?.image || "/images/default-doctor.png"}
                      alt="Doctor"
                    />
                    {item.docData?.name || "N/A"}
                  </td>
                  <td>
                    {currency}
                    {item.amount || "0"}
                  </td>

                  {
                    // <td className="cancel">
                    //   {item.cancelled ? (
                    //     <p>Cancelled</p>
                    //   ) : (
                    //     <img
                    //       className="cancel-btn"
                    //       onClick={() => cancelAppointment(item._id)}
                    //       src={img.cancel_icon}
                    //       alt="Cancel"
                    //     />
                    //   )}
                    // </td>
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
                  }
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-appointments-message">No appointments found</p>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
