import { createContext, useState, useEffect } from "react";
import { doctors as doctorData } from "../assets/assets";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "Rs.";

  // Dummy doctors data (previously fetched from backend)
  const [doctors, setDoctors] = useState(doctorData);

  // No authentication, just assume the user is logged in
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({
    name: "Guest User",
    email: "guest@example.com",
    phone: "1234567890",
    image: "/default-avatar.png", // Use a placeholder
    address: { line1: "Unknown", line2: "" },
    gender: "Not specified",
    dob: "01-01-2000",
  });

  // Function to load doctors (was fetching from backend before)
  const getDoctorsData = () => {
    toast.info("Using offline data for doctors");
    setDoctors(doctorData);
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
