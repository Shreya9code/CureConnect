import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaClinicMedical, FaChartLine, FaPhoneAlt } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section id="home" className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Your Health is Our <span className="text-blue-600">Top Priority</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Connect with top healthcare professionals, book appointments, and manage your health records all in one place.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#services"
              className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-100 hover:text-blue-700 transition duration-300 ease-in-out font-semibold shadow-sm hover:shadow-md"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
            alt="Doctor with patient" 
            className="rounded-lg shadow-xl w-full max-w-md"
          />
        </div>
      </section>

      {/* Tools Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Smart AI-powered Healthcare Tools</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <Link
            to="/wellness"
            className="p-4 !bg-teal-300 text-white text-center rounded-lg shadow-md hover:!bg-teal-600"
          >
            Wellness Program
          </Link>

          <a
            href="https://diseaseprediction-alt.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 !bg-pink-400 text-white text-center rounded-lg shadow-md hover:!bg-pink-600"
          >
            Disease Prediction
          </a>

          <div
            onClick={() => window.open("https://prescription-analysis-mizb3ivqzwznmadiyu8xh7.streamlit.app/", "_blank")}
            className="flex items-center justify-center px-4 py-2 !bg-green-500 text-white font-medium rounded-lg shadow hover:!bg-green-600 transition cursor-pointer h-full"
          >
            Open Prescription Reader
          </div>

          <Link
            to="/reminder"
            className="p-4 !bg-fuchsia-400 text-white text-center rounded-lg shadow-md hover:!bg-purple-600"
          >
            Medicine Reminder
          </Link>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="container mx-auto px-6 py-16 bg-white rounded-xl shadow-md">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive healthcare services tailored for different types of users. Whether you're a patient, doctor, or caregiver, we have something to assist you.
          </p>
        </div>
        
        {/* General Features (Accessible Without Registration) */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">🌐 General Features (Accessible Without Registration)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<FaUserMd className="text-blue-600 text-3xl" />} 
              title="📝 Prescription Analysis" 
              description="Upload your medical prescription and get an organized analysis of medicines and tests."
            />
            <ServiceCard 
              icon={<FaChartLine className="text-blue-600 text-3xl" />} 
              title="🩺 Disease Prediction" 
              description="Answer a few simple health-related questions to get early predictions of possible diseases."
            />
            <ServiceCard 
              icon={<FaPhoneAlt className="text-blue-600 text-3xl" />} 
              title="⏰ Medicine Reminder" 
              description="Set up reminders to take your medicines on time and stay consistent with your treatment."
            />
          </div>
        </div>

        {/* Patient Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">🧑‍⚕️ Patients (Users) Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<FaCalendarAlt className="text-blue-600 text-3xl" />} 
              title="📅 Book Doctor Appointments" 
              description="Search and book appointments with doctors based on specialty and location."
            />
            <ServiceCard 
              icon={<FaClinicMedical className="text-blue-600 text-3xl" />} 
              title="📋 View Appointment List" 
              description="Easily access your list of upcoming and past doctor appointments with full details."
            />
            <ServiceCard 
              icon={<FaPhoneAlt className="text-blue-600 text-3xl" />} 
              title="🚑 Book Ambulance Services" 
              description="Quickly request and book ambulance services for emergencies."
            />
          </div>
        </div>

        {/* Doctor Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">👨‍⚕️ Doctors Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<FaCalendarAlt className="text-blue-600 text-3xl" />} 
              title="📅 View Appointments/Bookings" 
              description="View and manage all your appointment bookings from patients."
            />
            <ServiceCard 
              icon={<FaUserMd className="text-blue-600 text-3xl" />} 
              title="📃 Review Patient Information" 
              description="Review details shared by patients to prepare for consultations."
            />
            <ServiceCard 
              icon={<FaCalendarAlt className="text-blue-600 text-3xl" />} 
              title="✅ Manage Appointments" 
              description="Accept or cancel patient appointments as needed."
            />
          </div>
        </div>

        {/* Ambulance Driver Services */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">🚑 Ambulance Drivers Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<FaCalendarAlt className="text-blue-600 text-3xl" />} 
              title="📋 View Ambulance Bookings" 
              description="Check the list of ambulance requests made by patients."
            />
            <ServiceCard 
              icon={<FaUserMd className="text-blue-600 text-3xl" />} 
              title="📃 Review Patient Details" 
              description="Access patient details to ensure timely and appropriate service."
            />
            <ServiceCard 
              icon={<FaCalendarAlt className="text-blue-600 text-3xl" />} 
              title="🚗 Manage Service Availability" 
              description="Update your availability status for accepting ambulance bookings."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to take control of your health?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust CureConnect for their healthcare needs.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 !bg-blue-600 !text-white rounded-lg hover:!bg-blue-700 font-medium text-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="border p-6 flex flex-col gap-3 hover:!bg-blue-500 hover:!text-white transition-all duration-300 rounded-xl shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;
