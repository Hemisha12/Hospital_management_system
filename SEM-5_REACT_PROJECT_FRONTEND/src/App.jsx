import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Doctors from "./pages/Doctors/Doctors";
import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import Myprofile from "./pages/MyProfile/MyProfile";
import MyAppointment from "./pages/MyAppointment/MyAppointment";
import Appointment from "./pages/Appointment/Appointment";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<Myprofile />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
