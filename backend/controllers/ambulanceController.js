import AmbulanceDriver from "../models/ambulanceDriverModel.js";
import AmbulanceBooking from "../models/ambulanceBooking.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

// Register
export const registerAmbulanceDriver = async (req, res) => {
  const { name, email, password, phone, vehicleNumber } = req.body;

  try {
    const existing = await AmbulanceDriver.findOne({ email });
    if (existing) return res.status(400).json({ message: "Driver already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = new AmbulanceDriver({
      name,
      email,
      password: hashedPassword,
      phone,
      vehicleNumber,
    });

    await newDriver.save();

    const token = jwt.sign({ id: newDriver._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: newDriver });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const loginAmbulanceDriver = async (req, res) => {
  const { email, password } = req.body;

  try {
    const driver = await AmbulanceDriver.findOne({ email });
    if (!driver) return res.status(400).json({ message: "Driver not found" });

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user: driver });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const bookAmbulance = async (req, res) => {
  try {
    const { pickupLocation, dateTime } = req.body;
    const userId = req.user._id; // assuming user is authenticated

    const newBooking = new AmbulanceBooking({ pickupLocation, dateTime, userId });
    await newBooking.save();

    res.status(201).json({ message: "Ambulance booked successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: "Booking failed", details: error.message });
  }
};
