import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="p-5 font-sans text-gray-800">
      <div className="text-center mb-5">
        <p className="text-2xl font-bold">
          ABOUT <span className="text-violet-700">US</span>
        </p>
      </div>
      <div className="flex items-center justify-center">
        <img
          src={assets.about_image}
          alt="About Us"
          className="w-full md:w-96 mr-0 md:mr-5 mb-5 md:mb-0 rounded-lg shadow-lg"
        />
        <div className="max-w-xl leading-relaxed">
          <p>
            Welcome to <b className="text-blue-500">CureConnect</b>, your
            trusted companion in healthcare management and wellness. Our mission
            is to revolutionize the way healthcare services are accessed and
            managed, making them more convenient, efficient, and accessible for
            everyone.
          </p>
          <p className="font-bold text-green-500 mt-4">Our Vision</p>
          <p>
            At CureConnect, we envision a world where healthcare is not
            just a necessity but an empowering experience. We aim to bridge the
            gap between patients and healthcare providers through innovative
            technology and compassionate care.
          </p>
          <h3 className="text-teal-600 mt-4 font-bold">Our Services</h3>
          <ul className="list-disc ml-5">
            <li>
              <b className="text-blue-500">Appointment Scheduling</b>:
              Seamlessly book appointments with doctors and specialists at your
              convenience.
            </li>
            <li>
              <b className="text-blue-500">Video Consultations</b>: Connect with
              healthcare professionals through secure video calls from the
              comfort of your home.
            </li>
            <li>
              <b className="text-blue-500">Ambulance Services</b>: Get quick
              access to emergency ambulance services whenever needed.
            </li>
            <li>
              <b className="text-blue-500">Disease Prediction</b>: Utilize
              cutting-edge machine learning algorithms to predict common
              diseases and take proactive measures.
            </li>
            <li>
              <b className="text-blue-500">Ambulance Services</b>:
              Prioritize your safety and well-being, connecting you with professional and well-equipped ambulances available 24/7. 
            </li>
          </ul>
          <p>
            <b className="font-bold text-green-500 mt-4">Our Commitment</b>
          </p>
          <p>
            We are committed to providing reliable, efficient, and user-friendly
            healthcare solutions. Our team of experts is dedicated to constantly
            improving our services to meet the evolving needs of our users. Join
            us in our journey to transform healthcare and make a difference in
            the lives of millions.
          </p>
        </div>
      </div>
      <div className="text-xl my-4 text-center">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US?</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5text-[-15px] hover:bg-teal-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-lg">
          <b>Efficiency:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle
          </p>
          <p>Access to a neteork of trusted doctors</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5text-[-15px] hover:bg-teal-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-lg">
          <b>Convenience:</b>
          <p>
            Access to a neteork of trusted doctors and healthcare professionals
            in your area
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5text-[-15px] hover:bg-teal-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-lg">
          <b>Personalization:</b>
          <p>
            Tailored recommendation and reminders to help you stay on top of
            your health
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
