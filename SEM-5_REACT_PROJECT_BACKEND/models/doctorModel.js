import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    department: { type: String, required: true },
    degree: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, default: "0000000000" },
    experience: { type: String, required: true },
    available: { type: Boolean, default: true },
    fee: { type: Number, required: true },
    date: { type: Date, required: true },
    slots_booked: { type: Object, default: {} },
  },
  { minimize: false }
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
