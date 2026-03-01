// // import { useState } from "react";
// // import { createContext } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // export const AdminContext = createContext();

// // const AdminContextProvider = (props) => {
// //   const [aToken, setaToken] = useState(
// //     localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
// //   );
// //   const [doctors, setDoctors] = useState([]);
// //   const backendUrl = import.meta.env.VITE_BACKEND_URL;
// //   const getAllDoctors = async () => {
// //     try {
// //       const { data } = await axios.post(
// //         backendUrl + "/api/admin/all-doctors",
// //         {},
// //         { headers: { aToken } }
// //       );
// //       if (data.success) {
// //         setDoctors(data.doctors);
// //         console.log(data.doctors);
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.message);
// //     }
// //   };

// //   const changeAvailability = async (docId) => {
// //     try {
// //       const { data } = await axios.post(
// //         backendUrl + "/api/admin/change-availability",
// //         { docId },
// //         { headers: { aToken } }
// //       );
// //       if (data.success) {
// //         toast.success(data.message);
// //         getAllDoctors();
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.message);
// //     }
// //   };
// //   const value = {
// //     aToken,
// //     setaToken,
// //     backendUrl,
// //     doctors,
// //     getAllDoctors,
// //     changeAvailability,
// //   };
// //   return (
// //     <AdminContext.Provider value={value}>
// //       {props.children}
// //     </AdminContext.Provider>
// //   );
// // };

// // export default AdminContextProvider;
// import { useState, createContext } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AdminContext = createContext();

// const AdminContextProvider = (props) => {
//   const [aToken, setaToken] = useState(
//     localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
//   );
//   const [doctors, setDoctors] = useState([]);
//   const [appointments, setAppointments] = useState([]); // ✅ fixed spelling

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   // ✅ Get all doctors
//   const getAllDoctors = async () => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/admin/all-doctors",
//         {},
//         { headers: { aToken } }
//       );
//       if (data.success) {
//         setDoctors(data.doctors);
//         console.log("Doctors:", data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Change doctor availability
//   const changeAvailability = async (docId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/admin/change-availability",
//         { docId },
//         { headers: { aToken } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         getAllDoctors();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Get all appointments
//   const getAllAppointments = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
//         headers: { aToken },
//       });
//       if (data.success) {
//         setAppointments(data.appointments || []); // ✅ always array
//         console.log("Appointments:", data.appointments);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Cancel appointment
//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/admin/cancel-appointment", // ✅ fixed spelling
//         { appointmentId },
//         { headers: { aToken } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         getAllAppointments();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const value = {
//     aToken,
//     setaToken,
//     backendUrl,
//     doctors,
//     getAllDoctors,
//     changeAvailability,
//     appointments,
//     setAppointments,
//     getAllAppointments,
//     cancelAppointment,
//   };

//   return (
//     <AdminContext.Provider value={value}>
//       {props.children}
//     </AdminContext.Provider>
//   );
// };

// export default AdminContextProvider;

// // import { useState } from "react";
// // import { createContext } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // export const AdminContext = createContext();

// // const AdminContextProvider = (props) => {
// //   const [aToken, setaToken] = useState(
// //     localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
// //   );
// //   const [doctors, setDoctors] = useState([]);

// //   const [appointments, setAppointments] = useState([]);
// //   const backendUrl = import.meta.env.VITE_BACKEND_URL;
// //   const getAllDoctors = async () => {
// //     try {
// //       const { data } = await axios.post(
// //         backendUrl + "/api/admin/all-doctors",
// //         {},
// //         { headers: { aToken } }
// //       );
// //       if (data.success) {
// //         setDoctors(data.doctors);
// //         console.log(data.doctors);
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.message);
// //     }
// //   };

// //   const changeAvailability = async (docId) => {
// //     try {
// //       const { data } = await axios.post(
// //         backendUrl + "/api/admin/change-availability",
// //         { docId },
// //         { headers: { aToken } }
// //       );
// //       if (data.success) {
// //         toast.success(data.message);
// //         getAllDoctors();
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.message);
// //     }
// //   };

// //   const getAllAppointments = async () => {
// //     try {
// //       const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
// //         headers: { aToken },
// //       });
// //       if (data.success) {
// //         setAppointmentes(data.appoinments);
// //         console.log(data.appoinments);
// //       } else {
// //         toast.error(error.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.message);
// //     }
// //   };
// //   const cancelAppointment = async (appoinmentId) => {
// //     try {
// //       const { data } = await axios.post(
// //         backendUrl + "/api/admin/cancel-appoinment",
// //         { appoinmentId },
// //         { headers: { aToken } }
// //       );
// //       if (data.success) {
// //         toast.success(data.message);
// //         getAllAppointments();
// //       } else {
// //         toast.error(error.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.message);
// //     }
// //   };
// //   const value = {
// //     aToken,
// //     setaToken,
// //     backendUrl,
// //     doctors,
// //     getAllDoctors,
// //     changeAvailability,
// //     appointments,
// //     setAppointmentes,
// //     getAllAppointments,
// //     cancelAppointment,
// //   };
// //   return (
// //     <AdminContext.Provider value={value}>
// //       {props.children}
// //     </AdminContext.Provider>
// //   );
// // };

// // export default AdminContextProvider;

import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setaToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);

  const [appointments, setAppointmentes] = useState([]);

  const [dashData, setDashData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });
      if (data.success) {
        setAppointmentes(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const value = {
    aToken,
    setaToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointmentes,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
