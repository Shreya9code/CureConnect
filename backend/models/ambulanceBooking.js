import mongoose from "mongoose";

const ambulanceBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },destination: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    driverId: { // Add a reference to the ambulance driver
      type: mongoose.Schema.Types.ObjectId,
      ref: "ambulanceDriver",
      required: false,
    },
    status: { // Track the status of the booking
      type: String,
      default: "pending", // or "assigned", "completed"
      enum: ["pending", "assigned", "completed"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("AmbulanceBooking", ambulanceBookingSchema);