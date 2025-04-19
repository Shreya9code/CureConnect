import React, { useState } from "react";
import OSMMap from "../components/OSMMap"; // Make sure this path is correct
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const BookAmbulance = () => {
  const [pickup, setPickup] = useState("");
  const [date, setDate] = useState(new Date()); // Initialize with current date and time
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateObj = new Date(date);
    const dateString = dateObj.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const timeString = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    try {
      const res = await axios.post(
        "http://localhost:4000/api/ambulance/book",
        {
          pickupLocation: pickup,
          date: dateString,
          time: timeString,        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data.message || "Ambulance booked successfully!");
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message || "Booking failed. Please try again."
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🆘 Book an Ambulance</h1>
      <form className="grid gap-6 max-w-md" onSubmit={handleSubmit}>
        {/* Map Location Picker */}
        <div className="w-full">
          <label className="block text-gray-700 mb-2">Pickup Location</label>
          <OSMMap setPickupLocation={setPickup} />
        </div>

        {/* Date and Time Picker */}
        <div>
          <label className="block text-gray-700 mb-2">Select Date & Time</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="!bg-blue-600 text-white p-2 rounded hover:!bg-blue-700"
        >
          Book Ambulance
        </button>
      </form>
    </div>
  );
};

export default BookAmbulance;
