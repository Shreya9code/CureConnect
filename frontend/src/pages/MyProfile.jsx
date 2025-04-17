import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const { userData, logout } = useContext(AppContext);

  // Handle profile update (mocked)
  const updateUserProfileData = () => {
    toast.success("Profile updated successfully!");
    setIsEdit(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout(); // Calls the logout function from AppContext
    toast.success("Logged out successfully!"); // Optional toast notification
  };

  return (
    <div className="max-w-lg flex-col gap-4 text-sm !bg-white shadow-md rounded-lg p-6">
      <label htmlFor="image">
        <div className="inline-block relative cursor-pointer">
          <img
            className="w-36 rounded opacity-75"
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="Profile"
          />
        </div>
        <input
          type="file"
          id="image"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>

      {isEdit ? (
        <input
          className="!bg-gray-200 text-3xl font-medium max-w-60 mt-4 mx-auto block text-center rounded p-2"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData({ ...userData, name: e.target.value })
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4 text-center">
          {userData.name}
        </p>
      )}

      <hr className="!bg-zinc-400 h-[1px] border-none my-4" />

      <div>
        <p className="text-neutral-500 underline mt-3">Contact Information</p>
        <p className="font-medium">Email-id</p>
        <p className="text-blue-500">{userData.email}</p>

        <p className="font-medium">Phone</p>
        {isEdit ? (
          <input
            className="!bg-gray-200 max-w-52 border rounded p-2"
            type="text"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />
        ) : (
          <p className="text-blue-400">{userData.phone}</p>
        )}

        <p className="font-medium">Address</p>
        {isEdit ? (
          <>
            <input
              className="!bg-gray-200 border rounded p-2 mb-2 w-full"
              type="text"
              value={userData.address.line1}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address, line1: e.target.value },
                })
              }
            />
            <input
              className="!bg-gray-200 border rounded p-2 w-full"
              type="text"
              value={userData.address.line2}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address, line2: e.target.value },
                })
              }
            />
          </>
        ) : (
          <p>
            {userData.address.line1}, {userData.address.line2}
          </p>
        )}
      </div>

      <div className="mt-10">
        {isEdit ? (
          <button
            className="border px-8 py-2 rounded !bg-blue-600 hover:!bg-blue-500 text-white"
            onClick={updateUserProfileData}
          >
            Save Info
          </button>
        ) : (
          <button
            className="border px-8 py-2 rounded !bg-blue-600 hover:!bg-blue-500 text-white"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>

      {/* Logout button */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="border px-8 py-2 rounded !bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
