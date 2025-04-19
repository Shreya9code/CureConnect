import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import ambulanceDriverModel from "../models/ambulanceDriverModel.js";
import AmbulanceBooking from "../models/ambulanceBooking.js";
// generate token
const verificationToken = crypto.randomBytes(32).toString("hex");
//api to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter valid email address" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10); //no of rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,emailToken: verificationToken,
      isVerified: false
    };
    //save user to database
    const newUser = new userModel(userData);
    const user = await newUser.save();
    await sendVerificationEmail(email, verificationToken);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("Generated Token:", token);
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully.pls verify email", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    console.log("JWT Secret:", process.env.JWT_SECRET);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("Generated Token at login:", token);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//api to get user profile data
const getProfile = async (req, res) => {
  try {
    console.log("JWT Secret:", process.env.JWT_SECRET);
    const userId = req.userId;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "User ID not found" });

    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//api to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // Extract user ID from token middleware
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not found" });
    }
    if (!name || !phone || !dob || !gender) {
      return res
        .status(400)
        .json({ success: false, message: "Data Missing!!" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      //upload img to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//api to book app
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from authentication middleware
    const { docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: true, message: "doc not available" });
    }
    let slots_booked = docData.slots_booked;
    //checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: true, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //save new slots in docdata
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//api to get user appointments
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("User ID from token:", userId); // Debugging log
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }
    const appointments = await appointmentModel.find({ userId });
    console.log("Fetched Appointments:", appointments); // Debugging log
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//api to cancel appointment
const cancelAppointment=async (req,res) => {
  try {
    const userId = req.userId;
    console.log("User ID from token:", userId); // Debugging log
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }
    const {appointmentId}=req.body
    const appointmentData=await appointmentModel.findById(appointmentId)
    //verify app user
    if(appointmentData.userId!=userId){
      return res.status(400).json({ success: false, message: "Unauthorized Action!" });

    }
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    //release doc slot
    const {docId,slotDate,slotTime}=appointmentData
    const doctorData=await doctorModel.findById(docId)

    let slots_booked=doctorData.slots_booked
    slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)

    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    res.json({ success: true, message:"app cancelled" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  
  }
}
// Get all available ambulance drivers
export const getAllAmbulanceDriversController = async (req, res) => {
  try {
    const drivers = await ambulanceDriverModel.find({ available: true });
    res.status(200).send({
      success: true,
      data: drivers,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: "Server error" });
  }
};
// 🟢 Book ambulance – only patients can book
export const bookAmbulanceController = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const { pickupLocation, date, time, driverId } = req.body;

    const newBooking = new AmbulanceBooking({
      user: userId,
      pickupLocation,
      date,
      time,
      driverId,
    });

    await newBooking.save();

    res.status(201).send({
      success: true,
      message: "Ambulance booked successfully",
      data: newBooking,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};