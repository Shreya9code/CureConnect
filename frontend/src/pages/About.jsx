import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 font-sans text-gray-800">
      {/* Title */}
      <div className="text-center mb-8">
        <p className="text-3xl font-bold">
          ABOUT <span className="text-violet-700">US</span>
        </p>
      </div>

      {/* Image on top, text below */}
      <div className="flex flex-col items-center">
        <img
          src={assets.about_image}
          alt="About Us"
          className="w-full max-w-md mb-6 rounded-lg shadow-xl object-cover"
        />
        <div className="max-w-3xl text-justify space-y-4 px-2 sm:px-4">
          <p>
            Welcome to <b className="text-blue-600">CureConnect</b>, your trusted companion in healthcare management and wellness. Our mission is to revolutionize the way healthcare services are accessed and managed, making them more convenient, efficient, and accessible for everyone.
          </p>

          <p className="font-bold text-green-600 text-lg">Our Vision</p>
          <p>
            At CureConnect, we envision a world where healthcare is not just a necessity but an empowering experience. We aim to bridge the gap between patients and healthcare providers through innovative technology and compassionate care.
          </p>

          <h3 className="text-teal-600 font-bold text-lg">Our Services</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <b className="text-blue-500">Appointment Scheduling</b>: Book appointments with doctors and specialists at your convenience.
            </li>
            <li>
            <b className="!text-blue-500">Prescription Reader</b>: Easily scan and understand your prescriptions using AI assistance.
            </li>
            <li>
              <b className="text-blue-500">Ambulance Services</b>: Emergency ambulance access, 24/7.
            </li>
            <li>
              <b className="text-blue-500">Disease Prediction</b>: AI-driven analysis to anticipate common diseases.
            </li>
          </ul>

          <p className="font-bold text-green-600 text-lg">Our Commitment</p>
          <p>
            We’re committed to reliable, efficient, and user-friendly healthcare solutions. Our team constantly innovates to meet user needs. Join us to transform healthcare and improve lives.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mt-12 mb-6 text-2xl font-semibold">
        WHY <span className="text-gray-700">CHOOSE US?</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 px-2">
        {/* Card 1 */}
        <div className="border p-6 flex flex-col gap-3 hover:!bg-blue-500 hover:!text-white transition-all duration-300 rounded-xl shadow-md">
          <b>Efficiency</b>
          <p>Book appointments easily and access a trusted network of doctors.</p>
        </div>

        {/* Card 2 */}
        <div className="border p-6 flex flex-col gap-3 hover:!bg-blue-500 hover:!text-white transition-all duration-300 rounded-xl shadow-md">
          <b>Convenience</b>
          <p>Book an ambulance instantly, anytime you need emergency assistance.</p>
        </div>

        {/* Card 3 */}
        <div className="border p-6 flex flex-col gap-3 hover:!bg-blue-500 hover:!text-white transition-all duration-300 rounded-xl shadow-md">
          <b>Personalization</b>
          <p>Stay on top of your health with smart recommendations and alerts.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
