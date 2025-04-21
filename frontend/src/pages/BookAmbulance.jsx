import React, { useState,useEffect } from "react";
import FullMap from "../components/FullMap";
import axios from "axios";
import { toast } from "react-toastify";

const BookAmbulance = () => {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null); 
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false); // to show a loading state while booking
  const checkBookingStatus = async (bookingId) => {
    try {
      const res = await axios.get(
        `https://cureconnect-backend-90kf.onrender.com/api/user/ambulance/status/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );console.log(res.data.data)
      const status = res.data.data.status;
      setBookingStatus(status);

      if (status === "assigned") {
        toast.success("✅ Driver accepted your request!");
        setDriverDetails(res.data.driver);
        fetchMyBookings();
      }else {
        setTimeout(() => checkBookingStatus(bookingId), 4000); // check again in 3s
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Booking handler when user clicks the 'Book Now' button
  const handleBooking = async () => {
    if (!pickup || !destination) {
      toast.error("Please select both pickup and destination");
      return;
    }
    setLoading(true); // Set loading to true while waiting for the response
    try {
      const res = await axios.post(
        "https://cureconnect-backend-90kf.onrender.com/api/user/ambulance/book",
        {
          pickupLocation: pickup, // Use pickup location
          destination: destination, // Use destination (if applicable)
          //time: new Date().toISOString(), // Send the current time for the booking
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res)
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
      console.log(err)
      setLoading(false); // Reset loading state
    }
  };
 // 🧠 Fetch all previous bookings
 const fetchMyBookings = async () => {
  try {
    const res = await axios.get("https://cureconnect-backend-90kf.onrender.com/api/user/ambulance/my-bookings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setMyBookings(res.data.data.reverse()); // latest first
  } catch (err) {
    console.error("Error fetching my bookings:", err);
  }
};

useEffect(() => {
  fetchMyBookings();
}, []);
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
          )}</div>)}
          {/* 🚘 Booking History */}
      <h2 className="text-xl font-bold mt-10 mb-2">📜 My Ambulance Bookings</h2>

{myBookings.length === 0 ? (
  <p className="text-gray-500">You have no previous bookings.</p>
) : (
  <div className="space-y-4">
    {myBookings.map((booking) => (
      <div key={booking._id} className="border rounded p-4 shadow-sm bg-white">
        <p><strong>🟢 Status:</strong>{" "}
          {booking.status === "pending" ? (
            <span className="text-yellow-600">Pending</span>
          ) : booking.status === "assigned" ? (
            <span className="text-green-600">Assigned</span>
          ) : (
            <span className="text-gray-600">Completed</span>
          )}
        </p>
        <p><strong>📍 Pickup:</strong> {booking.pickupLocation}</p>
        <p><strong>🏁 Destination:</strong> {booking.destination}</p>
        <p><strong>🗓️ Date:</strong> {booking.date}</p>
        <p><strong>⏰ Time:</strong> {new Date(booking.time).toLocaleTimeString()}</p>
        {booking.driverId && (
          <div className="mt-2 text-sm text-gray-700">
            <p><strong>🚐 Driver:</strong> {booking.driverId.name}</p>
            <p><strong>📞 Phone:</strong> {booking.driverId.phone}</p>
            <p><strong>🔢 Vehicle:</strong> {booking.driverId.vehicleNumber}</p>
          </div>
        )}
      </div>
    ))}
    </div>)}</div>
  );
};

export default BookAmbulance;
