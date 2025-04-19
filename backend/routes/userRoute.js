import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,bookAmbulanceController /*paymentRazorpay, verifyRazorpay*/,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import { upload } from "../middlewares/multer.js";
import { doctorList } from "../controllers/doctorController.js";

const userRouter = express.Router();

// User registration route
userRouter.post("/signup", registerUser);

// User login route
userRouter.post("/login", loginUser);

// Get user profile route
userRouter.get("/get-profile", authUser, getProfile);

// Update user profile route
userRouter.post(
  "/update-profile",
  authUser, // Authenticate user first
  (req, res, next) => {
    // Check if image is provided
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }
    next(); // If image is provided, proceed with file upload and update
  },
  upload.single("image"), // Handle image upload
  updateProfile // Proceed with profile update
);

// Get list of doctors
userRouter.get('/list', doctorList);

// Book an appointment route
userRouter.post("/book-appointment", authUser, bookAppointment);

// Get user appointments
userRouter.get("/appointments", authUser, listAppointment);

// Cancel appointment route
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/ambulance/book", authUser, bookAmbulanceController);

export default userRouter;
