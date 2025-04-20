import { useState, useEffect } from "react";
import { Bell, Calendar, User } from "lucide-react";
import axios from "axios";

const doctorData = {
  name: "Dr. Ananya Sharma",
  specialization: "Cardiologist",
  profilePic: "https://via.placeholder.com/150",
  appointments: [
    { id: 1, patient: "Rahul Sen", time: "10:30 AM" },
    { id: 2, patient: "Neha Gupta", time: "11:00 AM" },
  ],
};

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
  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (!doctor)
    return <div className="p-6 text-red-600">Failed to load doctor data</div>;

  return (
    <div className="p-6 !bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center !bg-white p-4 shadow-md rounded-xl">
        <div className="flex items-center gap-4">
          <img
            src={doctor?.image}
            alt="Doctor"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">
              {doctor?.name || "Doctor Name"}
            </h1>
            <p className="text-gray-600">
              {doctor?.speciality || "Speciality"}
            </p>
          </div>
        </div>
        {/*<button><Bell className="w-5 h-5" /></button>*/}
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Upcoming Appointments */}
        <div className="!bg-white p-4 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Appointments({appointments.length})
          </h2>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <div
                key={appt._id}
                className="mt-3 p-3 !bg-gray-200 rounded-lg flex justify-between"
              >
                <img
                  src={appt.userData.image}
                  alt="Patient"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span>{appt?.userData?.name || "Unknown Patient"}</span>
                <span className="text-gray-500">{appt?.slotDate}</span>
                <span className="text-gray-500">{appt?.slotTime}</span>
                <div className="text-sm">📧 {appt?.userData?.email}</div>
                <div className="text-sm">
                  📍 {appt?.userData?.address?.line1 || ""},{" "}
                  {appt?.userData?.address?.line2 || ""}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-2">No upcoming appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
}