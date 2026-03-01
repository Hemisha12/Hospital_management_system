import React, { useContext, useState, useEffect } from "react";
import "./Appointment.css";
import { useNavigate, useParams } from "react-router-dom";
import { Appcontext } from "../../context/Appcontext";
import { img } from "../../Img/img";
import RelatedDoctors from "../../components/RelatedDoctors/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorData } =
    useContext(Appcontext);

  const navigate = useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Load doctor info + slots
  useEffect(() => {
    if (doctors.length > 0) {
      const doctor = doctors.find((d) => String(d._id) === String(docId));
      setDocInfo(doctor || null);

      if (doctor) {
        generateSlots(doctor);
      }
    }
    // eslint-disable-next-line
  }, [doctors, docId]);

  // Generate slots for 7 days
  const generateSlots = (doctor) => {
    setDocSlot([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Start time logic
      if (i === 0) {
        const now = new Date();
        let nextHour = now.getHours();
        let nextMinute = now.getMinutes() < 30 ? 30 : 0;
        if (nextMinute === 0) nextHour += 1;

        // Ensure start is not before 10 AM
        if (nextHour < 10) nextHour = 10;

        currentDate.setHours(nextHour, nextMinute, 0, 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      // End time (9:00 PM)
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      const slots = [];
      while (currentDate < endTime) {
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        // Breaks
        if (
          (hours > 12 && hours < 14) ||
          hours === 16 ||
          (hours === 20 && minutes < 30)
        ) {
          currentDate.setMinutes(currentDate.getMinutes() + 30);
          continue;
        }

        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const slotDate = currentDate.toISOString().split("T")[0]; // yyyy-mm-dd
        const isAvailable =
          !doctor?.slots_booked?.[slotDate]?.includes(formattedTime);

        if (isAvailable) {
          slots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      if (slots.length === 0) {
        slots.push({
          datetime: null,
          time: "No slots",
        });
      }

      setDocSlot((prev) => [...prev, slots]);
    }
  };

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const selectedSlot = docSlot[slotIndex].find((s) => s.time === slotTime);

      if (!selectedSlot || !selectedSlot.datetime) {
        toast.error("Invalid slot selection");
        return;
      }

      const slotDate = selectedSlot.datetime.toISOString().split("T")[0];

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    docInfo && (
      <div className="doc-info">
        {/* Doctor Image */}
        <div className="doc-img">
          <img src={docInfo.image} alt={docInfo.name} />
        </div>

        {/* Doctor Details */}
        <div className="doc-details">
          <p>
            <b className="name">{docInfo.name}</b>
            <img className="icon" src={img.verified_icon} alt="verified" />
          </p>

          <div className="doc-degree">
            <p>
              {docInfo.degree} - {docInfo.department}{" "}
              <button className="expe">{docInfo.experience}</button>
            </p>
          </div>

          <div>
            <p>
              <b>Appointment Fee</b> : {currencySymbol}
              {docInfo.fee}
            </p>
          </div>

          {/* Dates */}
          <div className="doc-dateTime">
            <p>Booking slots</p>
            <div className="doc-dateTime">
              {docSlot.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`dateTime ${slotIndex === index ? "active" : ""}`}
                >
                  <p className="date">
                    {item[0]?.datetime
                      ? daysOfWeek[item[0].datetime.getDay()]
                      : "N/A"}
                  </p>
                  <p className="time">
                    {item[0]?.datetime
                      ? item[0].datetime.toLocaleDateString([], {
                          day: "numeric",
                          month: "short",
                        })
                      : "No slots"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="doc-Time">
            {docSlot[slotIndex]?.map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`time-slot-btn ${
                  item.time === slotTime ? "active" : ""
                }`}
                disabled={item.time === "No slots"}
              >
                {item.time.toLowerCase()}
              </button>
            ))}
          </div>

          {/* Book Button */}
          <button onClick={bookAppointment} className="dr-book-app">
            Book an appointment
          </button>

          {/* Related Doctors */}
          <RelatedDoctors docId={docId} department={docInfo.department} />
        </div>
      </div>
    )
  );
};

export default Appointment;
