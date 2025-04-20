import React, { useState } from "react";
import FullMap from "../components/FullMap";
import axios from "axios";
import { toast } from "react-toastify";

const BookAmbulance = () => {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(false); // to show a loading state while booking

  // Booking handler when user clicks the 'Book Now' button
  const handleBooking = async () => {
    if (!pickup || !destination) {
      toast.error("Please select both pickup and destination");
      return;
    }

    setLoading(true); // Set loading to true while waiting for the response

    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/ambulance/book",
        {
          pickupLocation: pickup, // Use pickup location
          destination: destination, // Use destination (if applicable)
          time: new Date().toISOString(), // Send the current time for the booking
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message || "Booking request sent to drivers");
      setLoading(false); // Reset loading state

      // Optionally, handle a response that confirms the booking, show status
      setTimeout(() => {
        toast.success("✅ Driver accepted the request!"); // Simulate driver acceptance after 5 seconds (for now)
      }, 5000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
      setLoading(false); // Reset loading state
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
        disabled={loading} // Disable button when booking is in progress
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
};

export default BookAmbulance;
