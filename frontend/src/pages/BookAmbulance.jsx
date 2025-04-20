import React, { useState } from "react";
import FullMap from "../components/FullMap";
import axios from "axios";
import { toast } from "react-toastify";

const BookAmbulance = () => {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  const handleBooking = async () => {
    if (!pickup || !destination) {
      toast.error("Please select both pickup and destination");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/ambulance/book",
        {
          pickup,
          destination,
          time: new Date().toISOString(), // real-time booking
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message || "Booking request sent to drivers");

      // Simulate driver accepting after a delay (replace with socket/polling)
      setTimeout(() => {
        toast.success("✅ Driver accepted the request!");
      }, 5000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚑 Book Ambulance</h1>
      <FullMap
        setPickup={setPickup}
        setDestination={setDestination}
        setRouteInfo={setRouteInfo}
      />
      <button
        onClick={handleBooking}
        className="mt-4 !bg-blue-600 text-white p-2 rounded hover:!bg-blue-700"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookAmbulance;
