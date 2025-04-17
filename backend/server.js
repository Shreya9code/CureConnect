import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from './config/cloudinary.js'
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import ambulanceRouter from "./routes/ambulanceRoute.js";
import verifyRoutes from "./routes/verifyRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();
connectCloudinary()

// Middleware
app.use(express.json());
app.use(cors());

// Route middlewares
app.use("/api/doctor", doctorRouter);
app.use('/api/user',userRouter)//localhost:4000/api/user/login
app.use("/api/ambulance", ambulanceRouter);
app.use("/api", verifyRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("✅ API is working");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server started at PORT ${port}`);
});
