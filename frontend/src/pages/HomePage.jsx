import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaClinicMedical, FaCalendarAlt, FaChartLine, FaPhoneAlt } from 'react-icons/fa';
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

      {/* Services Section */}
      <section id="services" className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive healthcare services to meet all your medical needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<FaUserMd className="text-blue-600 text-3xl" />} 
            title="Expert Doctors" 
            description="Consult with board-certified physicians and specialists across various fields."
          />
          <ServiceCard 
            icon={<FaClinicMedical className="text-blue-600 text-3xl" />} 
            title="Medical Treatments" 
            description="Advanced treatments and procedures using cutting-edge technology."
          />
          <ServiceCard 
            icon={<FaCalendarAlt className="text-blue-600 text-3xl" />} 
            title="Easy Appointments" 
            description="Book, reschedule or cancel appointments with just a few clicks."
          />
          <ServiceCard 
            icon={<GiHealthNormal className="text-blue-600 text-3xl" />} 
            title="Health Checkups" 
            description="Comprehensive health screenings and preventive care programs."
          />
          <ServiceCard 
            icon={<FaChartLine className="text-blue-600 text-3xl" />} 
            title="Health Tracking" 
            description="Monitor your health metrics and progress over time."
          />
          <ServiceCard 
            icon={<FaPhoneAlt className="text-blue-600 text-3xl" />} 
            title="Emergency Care" 
            description="24/7 emergency services and immediate medical attention."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Qualified Doctors</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Medical Support</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Patients</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
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
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;
