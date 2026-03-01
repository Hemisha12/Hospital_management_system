import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// api for doctor login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await appointmentModel
      .find({ docId })
      .populate("userId", "name dob image")
      .populate("docId", "fee");

    const formattedAppointments = appointments.map((app) => {
      let formattedSlotDateTime = "Invalid Date";

      if (app.slotDate) {
        let dateObj = new Date(app.slotDate);

        // Agar slotTime mila hai to set karo
        if (app.slotTime) {
          const [hours, minutes] = app.slotTime.split(":").map(Number);
          dateObj.setHours(hours || 0);
          dateObj.setMinutes(minutes || 0);
        }

        if (!isNaN(dateObj)) {
          const day = dateObj.getDate().toString().padStart(2, "0");
          const month = dateObj.toLocaleString("en-US", { month: "short" }); // Sept
          const year = dateObj.getFullYear();

          let hours = dateObj.getHours();
          const minutes = dateObj.getMinutes().toString().padStart(2, "0");
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;

          formattedSlotDateTime = `${day} ${month} ${year} , ${hours}:${minutes} ${ampm}`;
        }
      }

      return {
        ...app._doc,
        formattedSlotDateTime,
      };
    });
    res.json({ success: true, appointments: formattedAppointments });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.json({ success: false, message: error.message });
  }
};

//api doctor complete appointment
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api doctor cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation  Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    // Get docId from middleware (authDoctor)
    const docId = req.docId;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    appointments.forEach((item) => {
      if (item.isCompleted) {
        earnings += item.amount;
      }
    });

    // collect unique patients
    let patients = new Set();
    appointments.forEach((item) => {
      patients.add(item.userId.toString());
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.size,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log("Dashboard error:", error);
    res.json({ success: false, message: error.message });
  }
};

// api for doctor profile
const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log("Dashboard error:", error);
    res.json({ success: false, message: error.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fee, available, phone } = req.body;
    if (!docId || !fee || available === undefined) {
      return res.json({ success: false, message: "Invalid data" });
    }
    const updatedDoc = await doctorModel.findByIdAndUpdate(
      docId,
      {
        fee,
        available,
        phone,
      },
      { new: true }
    );
    if (!updatedDoc) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log("Dashboard error:", error);
    res.json({ success: false, message: error.message });
  }
};
export {
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
