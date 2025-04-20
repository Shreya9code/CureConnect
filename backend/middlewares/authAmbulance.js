import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AmbulanceDriver from "../models/ambulanceDriverModel.js";

dotenv.config();

export const authAmbulance = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AmbulanceDriver.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ message: "Driver not found" });

    req.user = user; // attaches user to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
