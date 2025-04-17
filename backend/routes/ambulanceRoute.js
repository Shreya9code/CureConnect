import express from "express";
import { registerAmbulanceDriver, loginAmbulanceDriver } from "../controllers/ambulanceController.js";

const ambulanceRouter = express.Router();

ambulanceRouter.post("/signup", registerAmbulanceDriver);
ambulanceRouter.post("/login", loginAmbulanceDriver);

export default ambulanceRouter;
