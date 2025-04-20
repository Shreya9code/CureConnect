import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AmbulanceDashboard = () => {
  const [bookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const [pendingRes, acceptedRes] = await Promise.all([
        axios.get("http://localhost:4000/api/ambulance/pending-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:4000/api/ambulance/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setPendingBookings(pendingRes.data.data || []);
      setAcceptedBookings(acceptedRes.data.data || []);
      console.log(pendingRes.data.data);
      console.log(acceptedRes.data.data);
    } catch (err) {
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
      fetchBookings(); // Refresh list
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
          {bookings.length === 0 && <p>No pending bookings</p>}
          {bookings.map((booking) => (
            <div key={booking._id} className="p-4 bg-white shadow rounded-xl">
              <p>
                <strong>Patient:</strong> {booking.user}
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
                <strong>Status:</strong> {booking.status}
              </p>
              <button
                onClick={() => handleAccept(booking._id)}
                className="!bg-green-600 text-white px-4 py-1 rounded hover:!bg-green-700"
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* Accepted Bookings */}
      <section>
        <h2 className="text-xl font-semibold mb-2">✅ Accepted Bookings</h2>
        <div className="grid gap-4">
        {acceptedBookings.filter(b => b.status === "assigned").length === 0 ? (
  <p className="text-gray-500">No accepted bookings yet.</p>
) : (
  acceptedBookings
    .filter(b => b.status === "assigned")
    .map((booking) => (
              <div
                key={booking._id}
                className="p-4 bg-white shadow rounded-xl space-y-1"
              >
                <p>
                  <strong>Patient:</strong> {booking.user}
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
                  <strong>Status:</strong> {booking.status}
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
