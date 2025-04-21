import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";

const PatientHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="text-center text-red-500 mt-10">
        <h2>Please login as a patient to view the patient home page.</h2>
      </div>
    );
  }

  return (
    <div>
      <Header /> {/* Moved Header to the top */}

      {/* Quick Access Options */}
      <div className="mt-8 p-4 !bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Link
            to="/doctors"
            className="p-4 !bg-blue-500 !text-white text-xl text-center rounded-lg shadow-md hover:!bg-blue-600 hover:!text-white"
          >
            Book Appointment
          </Link>
          <Link
            to="/my-appointments"
            className="p-4 !bg-teal-500 !text-white text-xl text-center rounded-lg shadow-md hover:!bg-teal-600 hover:!text-white"
          >
            My Appointments
          </Link>
          <Link
            to="/patient/book-ambulance"
            className="p-4 !bg-red-500 !text-white text-xl text-center rounded-lg shadow-md hover:!bg-red-600 hover:!text-white"
          >
            Ambulance Booking
          </Link>
        </div>
      </div>

      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default PatientHome;
