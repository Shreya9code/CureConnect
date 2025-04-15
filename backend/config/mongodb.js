import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");

    // Connection event listeners
    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err);
    });

    await mongoose.connect(process.env.MONGODB_URI);
    
  } catch (error) {
    console.error("❌ Error connecting to the database:", error.message);
  }
};

export default connectDB;
