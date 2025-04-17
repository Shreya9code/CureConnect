import mongoose from "mongoose";

const doctorSchema =new mongoose.Schema({//same str as assets..details
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    speciality: {type: String, required: true},
    degree: {type: String, required: true},
    experience: {type: String, required: true},
    about: {type: String, required: true},
    available: {type: Boolean, default: true},
    fees: {type: Number, required: true},
    address: {type: Object, required: true},
    date: {type: Date, required: true},
    slots_booked: {type: Object, default: {} },
    phone: { type: Number, required: false },
    /*verificationToken: { type: String },  // Token for email verification
    isVerified: { type: Boolean, default: false },  // Boolean to check if email is verified*/  
},{minimize: false});

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorModel;