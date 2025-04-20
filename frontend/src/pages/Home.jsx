import React from "react";
import { Link } from "react-router-dom"; 
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <Header /> {/* Moved Header to the top */}
      {/* Quick Access Options */}
      <div className="mt-8 p-4 !bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700">Explore More</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <Link
            to="/wellness"
            className="p-4 !bg-teal-300 text-white text-center rounded-lg shadow-md hover:!bg-teal-600"
          >
            Wellness Program
          </Link>

          <a
            href="https://diseaseprediction-alt.onrender.com/"
            className="p-4 !bg-pink-400 text-white text-center rounded-lg shadow-md hover:!bg-pink-600"
          >
            Disease Prediction
          </a>

          <div
            onClick={() => window.open("https://prescription-analysis-mizb3ivqzwznmadiyu8xh7.streamlit.app/", "_blank")}
            className="px-4 py-2 !bg-green-500 text-white font-medium rounded-lg shadow hover:!bg-green-600 transition"
          >
            Open Prescription Reader
          </div>

          <Link
            to="/reminder"
            className="p-4 !bg-fuchsia-400 text-white text-center rounded-lg shadow-md hover:!bg-purple-600"
          >
            Medicine Reminder
          </Link>

          <Link
            to="/"
            className="p-4 !bg-red-500 text-white text-center rounded-lg shadow-md hover:!bg-red-600"
          >
            Ambulance Booking{" "}
          </Link>
        </div>
      </div>
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
