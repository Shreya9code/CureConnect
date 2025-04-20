import express from "express";
import { registerAmbulanceDriver, loginAmbulanceDriver,acceptBookingController,getPendingBookingsForDriver/*bookAmbulance */} from "../controllers/ambulanceController.js";
import { authAmbulance } from "../middlewares/authAmbulance.js";
const ambulanceRouter = express.Router();

ambulanceRouter.post("/signup", registerAmbulanceDriver);
ambulanceRouter.post("/login", loginAmbulanceDriver);
ambulanceRouter.post("/accept-booking/:bookingId", authAmbulance, acceptBookingController);
ambulanceRouter.get('/pending-bookings',authAmbulance, getPendingBookingsForDriver);
export default ambulanceRouter;
