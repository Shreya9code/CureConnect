import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*left*/}
        <div>
          <img 
          className="mb-5 w-40"
          src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta
            facere ducimus, animi non at doloribus voluptatibus soluta repellat
            repellendus, mollitia amet ipsum, ex dolorum fugit explicabo quis
            ullam assumenda.
          </p>
        </div>
        {/*center*/}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/*right*/}
        <div>
          <p className="text-xl font-medium mb-5">Get in touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 8240781544</li>
            <li>cureconnect@gmail.com</li>
          </ul>
        </div>
      </div>
      {/*copyright*/}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2025@ Cure Connect - All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
