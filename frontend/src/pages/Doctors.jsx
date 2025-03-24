import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../assets/assets"; // Importing doctors from assets

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // Apply filter based on selected speciality
  useEffect(() => {
    if (speciality) {
      setFilterDoc(
        doctors.filter((doc) => doc.speciality.toLowerCase().trim() === speciality.toLowerCase().trim())
      );
    } else {
      setFilterDoc(doctors);
    }
  }, [speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the Doctors Specialist</p>

      <div className={`flex-col sm:flex-row items-start gap-5 mt-5 ${showFilter ? "flex" : "hidden sm:flex"}`}>
        {/* Filter Button for Mobile */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-teal-400 text-white" : ""}`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* Specialty Filters */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {[
            "General Physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() => (speciality === spec ? navigate("/doctors") : navigate(`/doctors/${spec}`))}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality?.toLowerCase().trim() === spec.toLowerCase().trim() ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors List */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img className="bg-blue-50 object-cover w-full h-40" src={item.image} alt={item.name} />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-teal-500">
                    <p className="w-2 h-2 bg-blue-500 rounded-full"></p>
                    <span>Available</span>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors found for this specialty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
