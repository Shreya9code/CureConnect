import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]; 

  const navigate = useNavigate();

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "N/A"; 
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = () => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments.reverse());
  };

  const cancelAppointment = (appointmentId) => {
    let updatedAppointments = appointments.map((appointment) =>
      appointment._id === appointmentId
        ? { ...appointment, cancelled: true }
        : appointment
    );
    
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    toast.success("Appointment cancelled successfully!");
  };

  useEffect(() => {
    getUserAppointments();
  }, []);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">
            No appointments found
          </p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b mt-3"
            >
              <div>
                {item.docData?.image ? (
                  <img
                    className="w-32 !bg-teal-50"
                    src={item.docData.image}
                    alt="Doctor"
                  />
                ) : (
                  <p>No image</p>
                )}
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData?.name || "Unknown Doctor"}
                </p>
                <p>{item.docData?.speciality || "Speciality not available"}</p>
                <p className="text-zinc-700 font-medium mt-1">Address</p>
                <p className="text-xs">
                  {item.docData?.address?.line1 || "Address not available"}
                </p>
                <p className="text-xs">{item.docData?.address?.line2 || ""}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>
                  {slotDateFormat(item.slotDate) || "N/A"} |{" "}
                  {item.slotTime || "N/A"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => alert("Payment feature coming soon!")}
                    className="px-4 py-2 !bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Pay
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-4 py-2 !bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                )}
                {item.cancelled && !item.isCompleted && (
                  <span className="px-4 py-2 !bg-gray-300 text-gray-700 font-medium rounded-lg shadow">
                    Appointment Cancelled
                  </span>
                )}
                {item.isCompleted && (
                  <button className="px-4 py-2 !bg-green-500 text-white font-medium rounded-lg shadow">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
