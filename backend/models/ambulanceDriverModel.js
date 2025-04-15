import mongoose from "mongoose";

const ambulanceDriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  vehicleNumber: { type: String },
  available: { type: Boolean, default: true },
  location: {
    lat: Number,
    lng: Number,
  },
});

//module.exports = mongoose.model("AmbulanceDriver", ambulanceDriverSchema);
const ambulanceDriverModel = mongoose.models.ambulanceDriver || mongoose.model('ambulanceDriver', ambulanceDriverSchema);
export default ambulanceDriverModel;