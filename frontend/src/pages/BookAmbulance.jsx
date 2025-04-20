import React, { useState,useEffect } from "react";
import OSMMap from "../components/OSMMap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";

const BookAmbulance = () => {
  const [pickup, setPickup] = useState("");
  const [date, setDate] = useState(new Date()); // Initialize with current date and time
  const [time, setTime] = useState("");
  const [drivers, setDrivers] = useState([]); // List of available drivers
  const [selectedDriver, setSelectedDriver] = useState(""); // Selected driver ID
  const [bookingStatus, setBookingStatus] = useState(null); // To store and show booking status
  const [error, setError] = useState(""); // To store any errors
// Fetch available drivers from the backend
useEffect(() => {
  const fetchDrivers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/user/ambulance/drivers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDrivers(res.data.data);
    } catch (err) {
      console.error("Error fetching drivers", err);
    }
  };
  fetchDrivers();
}, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateObj = new Date(date);
    const dateString = dateObj.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const timeString = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });// Formats to "HH:mm"
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/ambulance/book",
        {
          pickupLocation: pickup,
          date: dateString,
          time: timeString,
          driverId: selectedDriver, // Include the selected driver
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookingStatus(res.data.data.status);
      toast.success(res.data.message || "Ambulance booked successfully!");
      //alert(res.data.message || "Ambulance booked successfully!");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Booking failed. Please try again.");
      toast.error(err?.response?.data?.message || "Booking failed. Please try again.");
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
{/* Driver Selection */}
<div>
          <label className="block text-gray-700 mb-2">Select Ambulance Driver</label>
          <select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name} - {driver.vehicleNumber}
              </option>
            ))}
          </select>
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
