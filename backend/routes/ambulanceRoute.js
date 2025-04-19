import express from "express";
import { registerAmbulanceDriver, loginAmbulanceDriver,bookAmbulance } from "../controllers/ambulanceController.js";
import { authAmbulance } from "../middlewares/authAmbulance.js"; // use correct path

const ambulanceRouter = express.Router();

ambulanceRouter.post("/signup", registerAmbulanceDriver);
ambulanceRouter.post("/login", loginAmbulanceDriver);
ambulanceRouter.post("/book",authAmbulance, bookAmbulance);

export default ambulanceRouter;
