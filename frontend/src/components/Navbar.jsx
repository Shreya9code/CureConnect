import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, logout, userData } = useContext(AppContext);

  // Logout function with navigation
  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {userData ? (
          <>
            <NavLink to="/my-profile">
              <div
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold cursor-pointer hover:scale-105 transition"
                title={userData.name}
              >
                {userData.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </NavLink>
            <button
              onClick={handleLogout}
              className="!bg-red-600 text-white px-4 py-2 rounded-full font-light cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="!bg-blue-600 text-white px-8 py-3 rounded-full font-light cursor-pointer block"
          >
            Create Account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          showMenu ? "fixed w-full" : "h-0 w-0"
        } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden !bg-white transition-all`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img className="w-36" src={assets.logo} alt="Logo" />
          <img
            className="w-7"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close menu"
          />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <NavLink to="/">
            <p className="px-4 py-2 rounded-full inline-block">Home</p>
          </NavLink>
          <NavLink to="/doctors">
            <p className="px-4 py-2 rounded-full inline-block">All Doctors</p>
          </NavLink>
          <NavLink to="/about">
            <p className="px-4 py-2 rounded-full inline-block">About</p>
          </NavLink>
          <NavLink to="/contact">
            <p className="px-4 py-2 rounded-full inline-block">Contact</p>
          </NavLink>

          {/* Logout button in mobile menu */}
          {userData && (
            <button
              onClick={handleLogout}
              className="!bg-red-600 text-white px-8 py-2 rounded-full font-light cursor-pointer mt-4"
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
