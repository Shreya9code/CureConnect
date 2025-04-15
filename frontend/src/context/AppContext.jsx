// frontend/src/context/AppContext.jsx

import { createContext, useState, useEffect } from "react";
import { doctors as doctorData } from "../assets/assets";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "Rs.";

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // Load doctors from local dummy data (offline mode)
  const getDoctorsData = () => {
    toast.info("Using offline data for doctors");
    setDoctors(doctorData);
  };

  // Load user & token from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("currentUser");

    if (storedToken && storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUserData(parsedUser);
      } catch (e) {
        console.error("Corrupt user data in localStorage:", e);
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
      }
    }

    getDoctorsData();
  }, []);

  // Keep user data in sync with localStorage when it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("currentUser", JSON.stringify(userData));
    }
  }, [userData]);

  // Function to logout user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setToken(null);
    setUserData(null);
    toast.success("Logged out successfully");
  };

  const value = {
    currencySymbol,
    token,
    setToken,
    userData,
    setUserData,
    doctors,
    getDoctorsData,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
