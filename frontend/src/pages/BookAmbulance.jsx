import React, { useState, useEffect } from "react";
import FullMap from "../components/FullMap";
import axios from "axios";
import { toast } from "react-toastify";

const BookAmbulance = () => {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [distance, setDistance] = useState(null); // added distance
  const [bookingId, setBookingId] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const PER_KM_RENT = 7; // Example rate ₹7 per km

  const checkBookingStatus = async (bookingId) => {
    try {
      const res = await axios.get(
        `https://cureconnect-backend-90kf.onrender.com/api/user/ambulance/status/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const status = res.data.data.status;
      setBookingStatus(status);

      if (status === "assigned") {
        toast.success("✅ Driver accepted your request!");
        setDriverDetails(res.data.driver);
        fetchMyBookings();
      } else {
        setTimeout(() => checkBookingStatus(bookingId), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBooking = async () => {
    if (!pickup || !destination) {
      toast.error("Please select both pickup and destination");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://cureconnect-backend-90kf.onrender.com/api/user/ambulance/book",
        {
          pickupLocation: pickup,
          destination: destination,
          distance: distance, // Included
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message || "🚑 Booking request sent! Waiting for driver...");
      const newBookingId = res.data.data._id;
      setBookingId(newBookingId);
      setBookingStatus("pending");
      setDriverDetails(null);
      setLoading(false);
      checkBookingStatus(newBookingId);
      fetchMyBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
      console.error(err);
      setLoading(false);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await axios.get("https://cureconnect-backend-90kf.onrender.com/api/user/ambulance/my-bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMyBookings(res.data.data.reverse());
    } catch (err) {
      console.error("Error fetching my bookings:", err);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const totalRent = distance ? (distance * PER_KM_RENT).toFixed(2) : 0;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚑 Book Ambulance</h1>

      <FullMap
        setPickup={setPickup}
        setDestination={setDestination}
        setRouteInfo={setRouteInfo}
        setDistance={setDistance} // pass setDistance
      />

      {/* Distance and Rent Info */}
      {distance && (
        <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
          <p><strong>📏 Distance:</strong> {distance} km</p>
          <p><strong>💰 Per Km Rent:</strong> ₹{PER_KM_RENT}</p>
          <p><strong>🧮 Total Rent:</strong> ₹{totalRent}</p>
        </div>
      )}

      <button
        onClick={handleBooking}
        className="mt-4 !bg-blue-600 text-white p-2 rounded hover:!bg-blue-700"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Now"}
      </button>

      {/* Booking Info */}
      {bookingId && (
        <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
          <p className="text-sm text-gray-600 mb-2">
            Booking ID: <span className="font-mono">{bookingId}</span>
          </p>

          {bookingStatus === "pending" && (
            <p className="text-yellow-600 font-semibold">
              ⏳ Booking Status: Pending. Waiting for a driver...
            </p>
          )}
          {bookingStatus === "assigned" && driverDetails && (
            <div className="text-green-600 font-semibold">
              ✅ Booking Status: Assigned<br />
              Driver: {driverDetails.name}<br />
              📞 Phone: {driverDetails.phone}<br />
              🚐 Vehicle: {driverDetails.vehicleNumber}
            </div>
          )}
        </div>
      )}

      {/* My Bookings */}
      <h2 className="text-xl font-bold mt-10 mb-2">📜 My Ambulance Bookings</h2>
      {myBookings.length === 0 ? (
        <p className="text-gray-500">You have no previous bookings.</p>
      ) : (
        <div className="space-y-4">
          {myBookings.map((booking) => (
            <div key={booking._id} className="border rounded p-4 shadow-sm bg-white">
              <p><strong>🟢 Status:</strong> {booking.status}</p>
              <p><strong>📍 Pickup:</strong> {booking.pickupLocation}</p>
              <p><strong>🏁 Destination:</strong> {booking.destination}</p>
              <p><strong>🗓️ Date:</strong> {booking.date}</p>
              <p><strong>⏰ Time:</strong> {new Date(booking.time).toLocaleTimeString()}</p>
              {booking.driverId && (
                <div className="mt-2 text-sm text-gray-700">
                  <p><strong>🚐 Driver Assigned</strong></p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookAmbulance;
