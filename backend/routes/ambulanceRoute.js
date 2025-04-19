import express from "express";
import { registerAmbulanceDriver, loginAmbulanceDriver,bookAmbulance } from "../controllers/ambulanceController.js";
import authUser from "../middlewares/authUser.js"
const ambulanceRouter = express.Router();

ambulanceRouter.post("/signup", registerAmbulanceDriver);
ambulanceRouter.post("/login", loginAmbulanceDriver);
ambulanceRouter.post("/book",authUser, bookAmbulance);

export default ambulanceRouter;
