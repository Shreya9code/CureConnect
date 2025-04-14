import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap !bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20 w-full">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" /> schedule your appointments
            hassle-free and much more
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 !bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto hover:scale-105 transition-all duration-300"
        >
          Book Appointments <img className="w-3" src={assets.arrow_icon} />
        </a>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 relative flex justify-center items-center">
        <img
          className="w-full h-auto max-h-[500px] object-cover rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
