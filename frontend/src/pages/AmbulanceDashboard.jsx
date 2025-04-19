import React, { useEffect, useState } from "react";

const AmbulanceDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings([
      {
        id: 1,
        patientName: "Ravi Kumar",
        date: "2025-04-10",
        time: "11:30 AM",
        pickup: "Park Street, Kolkata",
      },
      {
        id: 2,
        patientName: "Anjali Sharma",
        date: "2025-04-12",
        time: "03:00 PM",
        pickup: "Salt Lake Sector V, Kolkata",
      },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚑 Ambulance Driver Dashboard</h1>
      <p className="mb-6 text-gray-600">Here are your previous appointments:</p>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-4 bg-white shadow rounded-xl">
            <p><strong>Patient:</strong> {booking.patientName}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Pickup:</strong> {booking.pickup}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmbulanceDashboard;