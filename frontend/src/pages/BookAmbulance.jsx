import React, { useState } from "react";
import OSMMap from "../components/OSMMap"; // Make sure this path is correct
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookAmbulance = () => {
  const [pickup, setPickup] = useState("");
  const [date, setDate] = useState(new Date()); // Initialize with current date and time
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Ambulance booked from ${pickup} on ${date.toLocaleDateString()} at ${time}`);
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
