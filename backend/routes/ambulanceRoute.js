import express from "express";
import { registerAmbulanceDriver, loginAmbulanceDriver,acceptBookingController,getPendingBookingsForDriver,/*bookAmbulance */
getDriverBookings,
getAcceptedBookings} from "../controllers/ambulanceController.js";
import { authAmbulance } from "../middlewares/authAmbulance.js";
const ambulanceRouter = express.Router();

ambulanceRouter.post("/signup", registerAmbulanceDriver);
ambulanceRouter.post("/login", loginAmbulanceDriver);
ambulanceRouter.post("/accept-booking/:bookingId", authAmbulance, acceptBookingController);
ambulanceRouter.get('/pending-bookings',authAmbulance, getPendingBookingsForDriver);
ambulanceRouter.get('/my-bookings', authAmbulance, getDriverBookings);
ambulanceRouter.get("/accepted-bookings", authAmbulance, getAcceptedBookings);

export default ambulanceRouter;
