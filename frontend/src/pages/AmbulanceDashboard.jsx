import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AmbulanceDashboard = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
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
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error accepting booking");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚑 Ambulance Driver Dashboard</h1>

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
    </div>
  );
};

export default AmbulanceDashboard;
