import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [role, setRole] = useState("Patient");
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const roleColors = {
    Patient: {
      bg: "bg-teal-100",
      text: "text-teal-800",
      selectedBg: "bg-teal-500",
      selectedText: "text-white",
      hover: "hover:bg-teal-200",
    },
    Doctor: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      selectedBg: "bg-blue-500",
      selectedText: "text-white",
      hover: "hover:bg-blue-200",
    },
    "Ambulance Driver": {
      bg: "bg-amber-100",
      text: "text-amber-800",
      selectedBg: "bg-amber-500",
      selectedText: "text-white",
      hover: "hover:bg-amber-200",
    },
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userKey = `${role.toLowerCase()}_user`;

    try {
      if (state === "Sign Up") {
        if (!email || !password || !name) {
          toast.error("All fields are required!");
          return;
        }

        localStorage.setItem(
          userKey,
          JSON.stringify({ name, email, password })
        );
        localStorage.setItem("token", "dummyToken123");
        setToken("dummyToken123");
        toast.success("Account created successfully!");
      } else {
        const storedUser = JSON.parse(localStorage.getItem(userKey));

        if (
          storedUser &&
          storedUser.email === email &&
          storedUser.password === password
        ) {
          localStorage.setItem("token", "dummyToken123");
          setToken("dummyToken123");
          toast.success("Logged in successfully!");
        } else {
          toast.error("Invalid email or password.");
          return;
        }
      }
      setEmail("");
      setPassword("");
      setName("");
      navigate("/");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-4">
      <div className="w-full max-w-md p-8 space-y-6  rounded-xl shadow-lg border border-gray-200 bg-blue-50">
        <div className=" text-center">
          <h2 className="text-3xl font-bold text-blue-900">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            {state === "Sign Up"
              ? "Join us to get started!"
              : "Log in to continue to your account"}
          </p>
        </div>

        <div className="flex justify-between bg-blue-200 p-1 rounded-lg gap-2">
          <div
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
              role === "Patient"
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-blue-400 text-white hover:bg-blue-500"
            }`}
            onClick={() => setRole("Patient")}
          >
            Patient
          </div>
          <div
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
              role === "Doctor"
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-blue-400 text-white hover:bg-blue-500"
            }`}
            onClick={() => setRole("Doctor")}
          >
            Doctor
          </div>
          <div
            className={`flex-1 py-2 px-4 flex items-center justify-center rounded-md text-sm font-semibold transition-all duration-200 ${
              role === "Ambulance Driver"
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-blue-400 text-white hover:bg-blue-500"
            }`}
            onClick={() => setRole("Ambulance Driver")}
          >
            Ambulance Driver
          </div>
        </div>

        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div className="space-y-4">
            <p className="text-sm text-center  text-gray-500">
              {state === "Sign Up" ? "Sign Up as a" : "Login as a"}{" "}
              <span
                className="font-bold"
                style={{ color: roleColors[role].text }}
              >
                {role}
              </span>
            </p>

            {state === "Sign Up" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full px-3 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>

            <div className="text-center text-sm text-gray-600">
              {state === "Sign Up" ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setState("Login")}
                    className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                  >
                    Login here
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setState("Sign Up")}
                    className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
