import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AmbulanceDashboard = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [isLoading, setIsLoading] = useState(true); // To handle loading state
  const [isError, setIsError] = useState(false); // To handle errors

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return; // If no token, don't fetch
      }
      setIsLoggedIn(true); // User is logged in

      const [pendingRes, acceptedRes] = await Promise.all([
        axios.get("http://localhost:4000/api/ambulance/pending-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:4000/api/ambulance/accepted-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setPendingBookings(pendingRes.data.data || []);
      setAcceptedBookings(acceptedRes.data.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      toast.error("Failed to fetch bookings");
      setIsError(true); // Set error flag if there's an issue
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAccept = async (bookingId) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/ambulance/accept-booking/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message || "Booking accepted");
      fetchBookings(); // Refresh bookings after acceptance
    } catch (err) {
      toast.error(err.response?.data?.message || "Error accepting booking");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>; // You can display a loading spinner or text
  }

  if (!isLoggedIn || isError) {
    return <p className="text-red-500">Please login to view your bookings.</p>; // Show login message in red
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚑 Ambulance Driver Dashboard</h1>

      {/* Show sections only if logged in */}
      {isLoggedIn && (
        <>
          {/* Pending Bookings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-2">🕒 Pending Requests</h2>
            <div className="grid gap-4">
              {pendingBookings.length === 0 ? (
                <p className="text-gray-500">No pending bookings</p>
              ) : (
                pendingBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 !bg-white shadow rounded-xl space-y-1"
                  >
                    <p>
                      <strong>Patient:</strong>{" "}{booking._id}
                      {booking.user?.name || "Unknown"} (
                      {booking.user?.email || "No email"})
                    </p>
                    <p>
                      <strong>Pickup:</strong> {booking.pickupLocation}
                    </p>
                    <p>
                      <strong>Destination:</strong> {booking.destination}
                    </p>
                    <p>
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {booking.time}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="capitalize">{booking.status}</span>
                    </p>
                    <button
                      onClick={() => handleAccept(booking._id)}
                      className="!bg-green-600 text-white px-4 py-1 rounded hover:!bg-green-700"
                    >
                      Accept
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Accepted Bookings */}
          <section>
            <h2 className="text-xl font-semibold mb-2">✅ Accepted Bookings</h2>
            <div className="grid gap-4">
              {acceptedBookings.filter((b) => b.status === "assigned").length === 0 ? (
                <p className="text-gray-500">No accepted bookings yet.</p>
              ) : (
                acceptedBookings
                  .filter((b) => b.status === "assigned")
                  .map((booking) => (
                    <div
                      key={booking._id}
                      className="p-4 bg-white shadow rounded-xl space-y-1"
                    >
                      <p>
                        <strong>Patient:</strong>{" "}
                        {booking.user?.name || "Unknown"} (
                        {booking.user?.email || "No email"})
                      </p>
                      <p>
                        <strong>Pickup:</strong> {booking.pickupLocation}
                      </p>
                      <p>
                        <strong>Date:</strong> {booking.date}
                      </p>
                      <p>
                        <strong>Time:</strong> {booking.time}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span className="capitalize">{booking.status}</span>
                      </p>
                      <p>
                        <strong>Your Name:</strong> {booking.driverId?.name}
                      </p>
                      <p>
                        <strong>Your Phone:</strong> {booking.driverId?.phone}
                      </p>
                      <p>
                        <strong>Vehicle Number:</strong>{" "}
                        {booking.driverId?.vehicleNumber}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AmbulanceDashboard;
