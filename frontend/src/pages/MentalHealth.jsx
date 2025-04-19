import React from "react";
import { useNavigate } from "react-router-dom";

const MentalHealth = () => {
  const navigate = useNavigate();

  const handleRequestNow = () => {
    navigate("/patient/book-ambulance");
  };

  return (
    <div className="p-4 bg-red-100 rounded-lg">
      <h2 className="text-xl font-bold">Book an Ambulance</h2>
      <p>Quickly request an ambulance for emergencies.</p>
      <button
        onClick={handleRequestNow}
        className="bg-red-500 text-white p-1 rounded"
      >
        Request Now
      </button>
    </div>
  );
};

export default MentalHealth;
