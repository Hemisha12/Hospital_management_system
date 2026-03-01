import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUSer = new userModel(userData);
    const user = await newUSer.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api for user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, dob, gender } = req.body;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }

    let imageURL = null;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageURL = uploadResult.secure_url;
    }

    // ✅ Get userId from authuser middleware
    const userId = req.userId;
    console.log("Upadte userid", userId);
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        phone: String(phone),
        dob,
        gender,
        ...(imageURL && { image: imageURL }),
      },
      { new: true } // return updated document
    );
    console.log("Updated user", updatedUser);
    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile Updated", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;

    const userId = req.userId;
    if (!userId)
      return res.json({ success: false, message: "User not authorized" });

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData || !docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked || {};

    // ✅ Normalize slotDate into yyyy-mm-dd
    let formattedDate = slotDate;
    if (slotDate && !slotDate.includes("-")) {
      if (slotDate.length === 6) {
        const day = slotDate.substring(0, 2);
        const month = slotDate.substring(2, 4);
        const year = slotDate.substring(4, 6);
        formattedDate = `20${year}-${month}-${day}`; // "2025-09-09"
      }
    }

    // ✅ Use formattedDate string as key for slots_booked
    if (slots_booked[formattedDate]?.includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    slots_booked[formattedDate] = slots_booked[formattedDate] || [];
    slots_booked[formattedDate].push(slotTime);

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const newAppointment = new appointmentModel({
      userId,
      docId,
      slotDate: new Date(formattedDate), // ✅ store as Date
      slotTime,
      userData,
      docData,
      amount: docData.fee,
      date: Date.now(),
    });

    await newAppointment.save();
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const listAppointment = async (req, res) => {
  try {
    const userId = req.userId; // from JWT
    const appointments = await appointmentModel
      .find({ userId })
      .sort({ date: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("List Appointment Error:", error);
    res.json({ success: false, message: error.message });
  }
};
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId; // ✅ from auth middleware

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // ✅ verify appointment belongs to logged-in user
    if (String(appointmentData.userId) !== String(userId)) {
      return res.json({ success: false, message: "Unauthorized action" });
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
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};
