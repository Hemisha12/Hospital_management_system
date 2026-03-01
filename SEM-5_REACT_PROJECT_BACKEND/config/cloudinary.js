import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
// console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("Cloud key:", process.env.CLOUDINARY_API_KEY);
// console.log("Cloud s key:", process.env.CLOUDINARY_SECRET_KEY);

export default cloudinary;
// const cloudinary = require("cloudinary").v2;

// const connectCloudinary = () => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY,
//   });

//   console.log("Cloudinary connected:", process.env.CLOUDINARY_CLOUD_NAME);
// };
// export default connectCloudinary;
// module.exports = connectCloudinary;
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY,
// });

// console.log("Cloudinary:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY ? " loaded" : " missing",
// });

// export default cloudinary;
