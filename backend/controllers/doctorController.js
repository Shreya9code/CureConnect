import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

// Doctor Signup
const signupDoctor = async (req, res) => {
  try {
    const {
      name, email, password, image, speciality,
      degree, experience, about, fees, address, date, phone
    } = req.body;

    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new doctorModel({
      name, email, password: hashedPassword, image, speciality,
      degree, experience, about, fees, address, date, phone,
    });

    await newDoctor.save();

    const token = jwt.sign({ id: newDoctor._id }, process.env.JWT_SECRET);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change Doctor Availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.status(200).json({ success: true, message: "✅Availability changed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all Doctors
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log("Error fetching doctors:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Appointments for a Doctor
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.docId;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Mark Appointment as Completed
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);

    if (appointment && appointment.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      res.json({ success: true, message: "✅Appointment completed" });
    } else {
      res.json({ success: false, message: "Mark failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Cancel Appointment
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);

    if (appointment && appointment.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      res.json({ success: true, message: "Appointment cancelled" });
    } else {
      res.json({ success: false, message: "Cancellation failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Doctor Dashboard Data
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.docId;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    let patients = new Set();

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
    console.log(error);
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
