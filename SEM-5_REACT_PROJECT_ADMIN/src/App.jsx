import React, { useContext } from "react";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList/DoctorList";
import "./App.css";

import AllAppointments from "./pages/Admin/AllAppointments/AllAppointments";
import { DoctorContext } from "./context/DoctorContext";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile/DoctorProfile";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard/DoctorDashboard";
import AllUsers from "./pages/Admin/allusers/allusers";
import Home from "./pages/home";
const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return aToken || dToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="sidebar">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appoiments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorList />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/all-users" element={<AllUsers />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
