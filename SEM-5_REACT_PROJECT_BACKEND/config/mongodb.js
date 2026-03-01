import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Databased Connected"));
  await mongoose.connect(`${process.env.MONGODB_URI}/citycare`);
  //  console.log("Mongodb", process.env.MONGODB_URI);
};

export default connectDB;
