import AmbulanceDriver from "../models/ambulanceDriverModel.js";
import User from "../models/userModel.js"
import AmbulanceBooking from "../models/ambulanceBooking.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import ambulanceDriverModel from "../models/ambulanceDriverModel.js";
import userModel from "../models/userModel.js";
import ambulanceBooking from "../models/ambulanceBooking.js";
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

/*
export const bookAmbulance = async (req, res) => {
  try {
    const userId = req.userId; // Get user ID from the token
    const user = await userModel.findById(userId); // Fetch the user

    if (!user || user.userType !== 'patient') {
      return res.status(403).json({ success: false, message: "Only patients can book ambulances" });
    }

    const { pickupLocation, date, time, driverId } = req.body; // Get booking details

    // Check if the driver is available
    const driver = await ambulanceDriverModel.findById(driverId);

    if (!driver) {
      return res.status(404).json({ success: false, message: "Driver not found" });
    }

    if (!driver.available) {
      return res.status(400).json({ success: false, message: "Driver is not available" });
    }

    // Create the ambulance booking
    const newBooking = new ambulanceBooking({
      user: userId,
      pickupLocation,
      date,
      time,
      driver: driverId,
      status: 'assigned', // Mark as assigned once the driver is selected
    });

    const booking = await newBooking.save();

    // Update driver availability and associate the booking
    driver.available = false; // Driver is now booked
    driver.bookings.push(booking._id); // Link the booking to the driver
    await driver.save();

    res.status(201).json({
      success: true,
      message: "Ambulance booked successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Find the booking
    const booking = await ambulanceBookingModel.findById(bookingId).populate('driver');

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Check if the user is the one who made the booking
    if (booking.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: "You can only cancel your own booking" });
    }

    // Update the booking status to canceled
    booking.status = 'canceled';
    await booking.save();

    // Make the driver available again
    const driver = booking.driver;
    driver.available = true;
    driver.bookings = driver.bookings.filter(
      (bookingId) => bookingId.toString() !== bookingId
    );
    await driver.save();

    res.status(200).json({
      success: true,
      message: "Booking canceled successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
*/