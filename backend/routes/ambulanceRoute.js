import express from "express";
import { registerAmbulanceDriver, loginAmbulanceDriver,acceptBookingController,getPendingBookingsForDriver/*bookAmbulance */} from "../controllers/ambulanceController.js";
import authUser from "../middlewares/authUser.js"
const ambulanceRouter = express.Router();

ambulanceRouter.post("/signup", registerAmbulanceDriver);
ambulanceRouter.post("/login", loginAmbulanceDriver);
ambulanceRouter.post("/accept-booking/:bookingId", acceptBookingController);
ambulanceRouter.post('/pending-bookings', getPendingBookingsForDriver);
export default ambulanceRouter;
