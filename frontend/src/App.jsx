import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WellnessProgram from "./pages/WellnessProgram";
import MedicineReminder from "./pages/MedicineReminder";
import MentalHealth from "./pages/MentalHealth";
import DoctorDashboard from "./pages/DoctorDashboard";
import HomePage from "./pages/HomePage";
import { useLocation } from "react-router-dom";
import AmbulanceDashboard from "./pages/AmbulanceDashboard";
import BookAmbulance from "./pages/BookAmbulance";


const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check if user is logged in by looking at localStorage for token or user data
  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace with your token key
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove user session data
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    // Notify user
    toast.success("Logged out successfully!");

    // Redirect to login page
    setIsLoggedIn(false);
    navigate("/login");
  };

  // If user is logged in, redirect them to /patient when trying to visit the homepage or /patient
  useEffect(() => {
    if (isLoggedIn && (location.pathname === "/" || location.pathname === "/patient")) {
      navigate("/patient");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <HomePage />} />
        <Route path="/patient" element={isLoggedIn ? <Home /> : <HomePage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={isLoggedIn ? <MyProfile onLogout={handleLogout} /> : <HomePage />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/wellness" element={<WellnessProgram />} />
        <Route path="/reminder" element={<MedicineReminder />} />
        <Route path="/mental-health" element={<MentalHealth />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/ambulance" element={<AmbulanceDashboard />} />
        <Route path="/patient/book-ambulance" element={<BookAmbulance />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
