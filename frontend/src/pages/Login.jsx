import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { setToken, setUserData } = useContext(AppContext);

  const [state, setState] = useState("Login"); // "Login" or "Sign Up"
  const [role, setRole] = useState("User");

  // Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Doctor-specific fields
  const [image, setImage] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [vehicleNumber, setVehicleNumber] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const roleToEndpoint = {
      User: "user",
      Doctor: "doctor",
      AmbulanceDriver: "ambulance",
    };

    const baseURL = `http://localhost:4000/api/${roleToEndpoint[role]}`;
    const url = state === "Login" ? `${baseURL}/login` : `${baseURL}/signup`;

    const body =
      state === "Login"
        ? { email, password }
        : role === "Doctor"
        ? {
            name,
            email,
            password,
            image,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: {
              line1: addressLine1,
              line2: addressLine2,
            },
            phone,
            date,
          }
        : role === "Ambulance"
        ? {
            name,
            email,
            password,
            phone,
            vehicleNumber,
          }
        : { name, email, password };

    try {
      const res = await axios.post(url, body);
      const token = res?.data?.token;
      const user = res?.data?.user || res?.data;

      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("role", role.toLowerCase());

      setToken(token);
      setUserData(user);

      toast.success(`${state} successful! Welcome ${user.name || "back"} 🎉`);

      if (role === "Doctor") navigate("/doctor");
      else if (role === "AmbulanceDriver"|| role === "Ambulance") navigate("/ambulance");
      else navigate("/patient");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center !bg-gray-200 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {state === "Login" ? "Login" : "Register"} as {role}
        </h2>

        <div className="flex justify-center gap-4">
          {["User", "Doctor", "AmbulanceDriver"].map((r) => (
            <button
              key={r}
              className={`px-4 py-1 rounded ${
                role === r ? "!bg-blue-600 text-white" : "!bg-gray-200"
              }`}
              onClick={() => setRole(r)}
            >
              {r === "AmbulanceDriver" ? "Ambulance" : r}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-3">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />

          {/* Doctor-specific fields */}
          {state === "Sign Up" && role === "Doctor" && (
            <>
              <input
                type="text"
                placeholder="Speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Address Line 1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </>
          )}
          {state === "Sign Up" && role === "AmbulanceDriver" && (
            <>
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Vehicle Number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full !bg-blue-600 text-white p-2 rounded hover:!bg-blue-700"
          >
            {state === "Login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center">
          {state === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
          >
            {state === "Login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
