import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,bookAmbulanceController,getAllAmbulanceDrivers /*paymentRazorpay, verifyRazorpay*/,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import { upload } from "../middlewares/multer.js";
import { doctorList } from "../controllers/doctorController.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);

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
userRouter.get('/list', doctorList);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/ambulance/book",authUser, bookAmbulanceController);
userRouter.get("/ambulance/drivers", authUser, getAllAmbulanceDrivers);
export default userRouter;
