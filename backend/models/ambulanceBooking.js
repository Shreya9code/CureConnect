import mongoose from "mongoose";

const ambulanceBookingSchema = new mongoose.Schema({
  pickupLocation: { type: String, required: true },
  dateTime: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("AmbulanceBooking", ambulanceBookingSchema);
