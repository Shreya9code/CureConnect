import { useState, useEffect } from "react";
import { Bell, Calendar, User } from "lucide-react";
import axios from "axios";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/doctor/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", res.data);
        const dashData = res?.data?.dashData;
        if (!dashData) {
          console.error("dashData is undefined:", res.data);
          return;
        }
        setAppointments(dashData.latestAppointments || []);
        const firstAppointment = dashData?.latestAppointments?.[0];
        if (firstAppointment?.docData) {
          setDoctor(firstAppointment.docData);
        } else {
          console.error("No docData found in appointments");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);
  const cancelAppointment = async (docId, appointmentId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/doctor/cancel-appointment",
        { docId, appointmentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Appointment cancelled");
      // Refresh appointments
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, cancelled: true } : appt
        )
      );
    } catch (err) {
      alert("Cancel failed: " + err.response?.data?.message);
      console.error("Cancel appointment error:", err);
    }
  };
  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (!doctor)
    return <div className="p-6 text-red-600">Please login as doctor to view doctor data</div>;

  return (
    <div className="min-h-screen !bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-8">
      {/* Header */}
      <div className="!bg-white p-6 shadow-xl rounded-3xl flex justify-between items-center mb-8">
      <div className="flex items-center gap-5">
          <img
            src={doctor?.image}
            alt="Doctor"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-300 shadow-md"
            />
          <div>
          <h1 className="text-3xl font-extrabold text-blue-800">
              {doctor?.name || "Doctor Name"}
            </h1>
            <p className="text-lg text-blue-500 mt-1 tracking-wide">
              {doctor?.speciality || "Speciality"}
            </p>
          </div>
        </div>
      </div>
      {/* Dashboard Content */}
      <div className="grid grid-cols-1 gap-8">
      {/* Upcoming Appointments */}
      <div className="bg-white/80 backdrop-blur-lg border border-blue-200 p-6 rounded-3xl shadow-xl transition-all hover:scale-[1.01]">
      <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2 mb-4">
      <Calendar className="w-5 h-5 text-blue-500" /> Appointments({appointments.length})
          </h2>
          {appointments.length > 0 ? (
                      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="!bg-gray-100 hover:!bg-gray-200 transition-all rounded-lg p-4 mb-4 shadow-sm flex flex-col gap-2"
              >
                 <div className="flex items-center gap-4">
                  <img
                    src={appt.userData.image}
                    alt="Patient"
                    className="w-14 h-14 rounded-full object-cover border border-blue-300"
                  />
                  <div>
                    <p className="font-semibold text-blue-900">
                      {appt?.userData?.name || "Unknown Patient"}
                    </p>
                    <p className="text-sm text-blue-600">{appt?.userData?.email}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-blue-700 mt-2">
                  <span>📅 {appt?.slotDate}</span>
                  <span>🕒 {appt?.slotTime}</span>
                </div>
                <div className="text-sm text-blue-700">
                  📍 {appt?.userData?.address?.line1 || ""},{" "}
                  {appt?.userData?.address?.line2 || ""}
                </div>
                {!appt.cancelled ? (
                    <button
                      onClick={() =>
                        cancelAppointment(appt.docId, appt._id)
                      }
                      className="mt-3 !bg-red-500 hover:!bg-red-600 text-white px-3 py-1 rounded text-sm self-end"
                    >
                      Cancel Appointment
                    </button>
                  ) : (
                    <span className="mt-3 text-red-500 font-semibold text-sm self-end">
                      ❌ Cancelled
                    </span>
                  )}
              </div>
            ))}</div>
          ) : (
            <p className="text-blue-700 mt-2">No upcoming appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
}