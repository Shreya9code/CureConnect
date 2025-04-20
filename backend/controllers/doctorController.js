import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary';

// Doctor Signup
const signupDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, date, phone } = req.body;
// ✅ Parse address if sent as stringified JSON
const address = typeof req.body.address === 'string'
? JSON.parse(req.body.address)
: req.body.address;
    // Check if image is provided
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);

    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Doctor already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new doctor
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      image: cloudinaryResponse.secure_url, // Use only secure_url for the image
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date,
      phone,
    });

    // Save the doctor to the database
    await newDoctor.save();

    // Create JWT token
    const token = jwt.sign({ id: newDoctor._id }, process.env.JWT_SECRET);

    // Send success response
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if doctor exists
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    console.log("Generated JWT Payload:", { id: doctor._id });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Change Doctor Availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    // Find doctor by ID
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Toggle availability
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.status(200).json({ success: true, message: "✅Availability changed" });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all Doctors
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Appointments for a Doctor
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    console.log("Fetching appointments for doctor:", req.docId);

    // Find appointments for the doctor
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Fetch Appointments Error:",error.stack);
    res.json({ success: false, message: error.message });
  }
};

// Mark Appointment as Completed
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    // Find appointment by ID
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Check if the appointment belongs to the doctor
    if (appointment.docId.toString() !== docId) {
      return res.status(400).json({ success: false, message: "Not authorized to mark this appointment" });
    }

    // Mark the appointment as completed
    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
    res.json({ success: true, message: "✅Appointment completed" });
  } catch (error) {
    console.error(error.stack);
    res.json({ success: false, message: error.message });
  }
};

// Cancel Appointment
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    // Find appointment by ID
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Check if the appointment belongs to the doctor
    if (appointment.docId.toString() !== docId) {
      return res.status(400).json({ success: false, message: "Not authorized to cancel this appointment" });
    }

    // Cancel the appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.error(error.stack);
    res.json({ success: false, message: error.message });
  }
};

// Doctor Dashboard Data
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;

    // Fetch appointments for the doctor
    const appointments = await appointmentModel.find({ docId });

    // Guard condition for empty appointments
    if (!appointments || appointments.length === 0) {
      return res.status(200).json({ success: true, dashData: { earnings: 0, appointments: 0, patients: 0, latestAppointments: [] } });
    }

    let earnings = 0;
    let patients = new Set();

    // Calculate earnings and patient count
    appointments.forEach((app) => {
      if (app.isCompleted && app.payment) earnings += app.amount;
      patients.add(app.userId.toString());
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.size,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error.stack);
    res.json({ success: false, message: error.message });
  }
};

export {
  signupDoctor,
  loginDoctor,
  changeAvailability,
  doctorList,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
};
