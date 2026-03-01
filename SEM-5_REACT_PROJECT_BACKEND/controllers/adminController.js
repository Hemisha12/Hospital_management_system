// import validator from "validator";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import cloudinary from "../config/cloudinary.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department,
      age,
      gender,
      phone,
      degree,
      experience,
      fee,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const imageUrl = await cloudinary.uploader.upload(req.file.path, {
      folder: "doctors",
    });
    const doctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      phone,
      department,
      degree,
      experience,
      fee,
      image: imageUrl.secure_url,
      date: new Date(), // ✅ Cloudinary URL
    });
    //doctor password

    const savedDoctor = await doctor.save();
    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor: savedDoctor,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentails" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const allDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const appointmentAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .populate("userId", "name email image")
      .populate("docId", "name department image")
      .sort({ date: -1, slotTime: -1, createdAt: -1 });

    const formattedAppointments = appointments.map((appointment) => {
      const date = new Date(appointment.date);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return {
        ...appointment.toObject(),
        formattedDate: `${formattedDate} | ${appointment.slotTime}`,
      };
    });

    res.json({ success: true, appointments: formattedAppointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
// api for aapoinment cancelled
const appoinmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    // ✅ from auth middleware

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // cancel appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // release doctor's slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (doctorData?.slots_booked?.[slotDate]) {
      doctorData.slots_booked[slotDate] = doctorData.slots_booked[
        slotDate
      ].filter((e) => e !== slotTime);
    }

    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked: doctorData.slots_booked,
    });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointment: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const allUsers = async (req, res) => {
  try {
    // password field ko exclude kar rahe hain security ke liye
    const users = await userModel.find({}).select("-password");
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctor,
  appoinmentCancel,
  adminDashboard,
  allUsers,
};
