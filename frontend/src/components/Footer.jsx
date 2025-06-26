import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left */}
        <div>
          <img
            className="mb-5 w-40"
            src={assets.logo}
            alt=""
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            At CureConnect, we envision a world where healthcare is not just a necessity but an empowering experience. We aim to bridge the gap between patients and healthcare providers through innovative technology and compassionate care.
          </p>
        </div>
        {/* center */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* right */}
        <div>
          <p className="text-xl font-medium mb-5">Get in touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 8240781544</li>
            <li>cureconnect2025@gmail.com</li>
          </ul>
        </div>
        {/* team */}
        <div>
          <p className="text-xl font-medium mb-5">Team</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Saheli Kundu</li>
            <li>Shreya Denre</li>
          </ul>
        </div>
      </div>
      {/* copyright */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 © Cure Connect — All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;