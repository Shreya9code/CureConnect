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
    const userKey = email.toLowerCase(); // Using email as key for better uniqueness

    try {
      if (state === "Sign Up") {
        if (!email || !password || !name) {
          toast.error("All fields are required!");
          setIsLoading(false);
          return;
        }

        // Check if user already exists
        if (localStorage.getItem(userKey)) {
          toast.error("User already exists with this email!");
          setIsLoading(false);
          return;
        }

        const userData = { 
          name, 
          email, 
          password, 
          role,
          createdAt: new Date().toISOString() 
        };

        localStorage.setItem(userKey, JSON.stringify(userData));
        localStorage.setItem("currentUser", JSON.stringify(userData));
        localStorage.setItem("token", "dummyToken123");
        setToken("dummyToken123");
        
        toast.success("Account created successfully!");
        //navigate(role === "Doctor" ? "/doctor" : "/");
        navigate(role === "Doctor" ? "/doctor" : role === "Patient" ? "/patient" : "/");

      } else {
        const storedUser = JSON.parse(localStorage.getItem(userKey));

        if (!storedUser) {
          toast.error("User not found. Please sign up first.");
          setIsLoading(false);
          return;
        }

        if (storedUser.password !== password) {
          toast.error("Invalid password");
          setIsLoading(false);
          return;
        }

        // Update current user data
        localStorage.setItem("currentUser", JSON.stringify(storedUser));
        localStorage.setItem("token", "dummyToken123");
        setToken("dummyToken123");
        
        toast.success("Logged in successfully!");
        
        // Redirect based on role
        switch (storedUser.role) {
          case "Patient":
            navigate("/patient");
            break;
          case "Doctor":
            navigate("/doctor");
            break;
          case "Ambulance Driver":
            navigate("/ambulance"); // You might want to create this route
            break;
          default:
            navigate("/");
        }
      }
      
      // Clear form fields
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      // Check if we have a current user to determine where to redirect
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser?.role === "Doctor") {
        navigate("/doctor");
      } else if (currentUser?.role === "Patient") {
        navigate("/patient");
      }
    }
  }, [token, navigate]);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-lg border border-gray-200 bg-blue-50">
        <div className="text-center">
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
          {["Patient", "Doctor", "Ambulance Driver"].map((r) => (
            <div
              key={r}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer ${
                role === r
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-blue-400 text-white hover:bg-blue-500"
              }`}
              onClick={() => setRole(r)}
            >
              {r}
            </div>
          ))}
        </div>

        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div className="space-y-4">
            <p className="text-sm text-center text-gray-500">
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
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : state === "Sign Up" ? (
                "Create Account"
              ) : (
                "Login"
              )}
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