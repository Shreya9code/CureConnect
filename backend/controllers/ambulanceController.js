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
// 🚗 Driver accepts a booking
export const acceptBookingController = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { driverId } = req.body;

    const booking = await AmbulanceBooking.findById(bookingId);
    if (!booking) {
      return res.status(404).send({ success: false, message: "Booking not found" });
    }

    // Only update if the booking is pending
    if (booking.status !== "pending") {
      return res.status(400).send({ success: false, message: "This booking cannot be accepted" });
    }

    // Update the booking with the driver's details
    booking.status = "assigned";
    booking.driverId = driverId;

    await booking.save();

    // Find the driver and notify the patient
    const driver = await ambulanceDriverModel.findById(driverId);
    if (!driver) {
      return res.status(404).send({ success: false, message: "Driver not found" });
    }

    // You can add logic here to notify the patient via email/SMS
    const patient = await userModel.findById(booking.user);
    if (patient) {
      // Send notification to patient (you can use email/SMS for real-world apps)
      // Example: Send an email/SMS with driver details (phone number, vehicle number)
      console.log(`Notification sent to patient: Driver Details: ${driver.name}, Phone: ${driver.phone}, Vehicle: ${driver.vehicleNumber}`);
    }

    res.status(200).send({
      success: true,
      message: "Booking accepted by driver. Patient notified with driver's details.",
      data: booking,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

/*
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
// 🚗 Get all pending bookings for a driver
export const getPendingBookingsForDriver = async (req, res) => {
  try {
    const driverId = req.userId; // Assuming driver's ID is in the request

    const bookings = await AmbulanceBooking.find({ driverId: null, status: "pending" });

    res.status(200).send({
      success: true,
      message: "Pending bookings fetched successfully",
      data: bookings,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: "Server error" });
  }
};
