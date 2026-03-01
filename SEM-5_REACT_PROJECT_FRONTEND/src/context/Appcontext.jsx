import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const Appcontext = createContext();

const AppcontextProvider = (props) => {
  console.log("CHECKING");
  console.log(import.meta.env.VITE_BACKEND_URL);
  const backendUrl = "https://hospital-management-system-1-38bm.onrender.com";

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(false);
  // const getDoctorData = async () => {
  //   console.log("Backend URL:", backendUrl);
  //   try {
  //     const { data } = await axios.get(backendUrl + "/api/doctor/list");
  //     if (data.success) {
  //       setDoctors(data.doctors);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };
  const getDoctorData = async () => {
    try {
      console.log("Fetching doctors from backend...");
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      console.log("Doctors API Response:", data);
      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors state updated:", data.doctors);
      } else {
        console.log("Doctors API returned success: false", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(
        "Doctors fetch error:",
        error.response ? error.response.data : error.message,
      );
      toast.error(error.message);
    }
  };
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    doctors,
    getDoctorData,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);
  return (
    <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>
  );
};
export default AppcontextProvider;
