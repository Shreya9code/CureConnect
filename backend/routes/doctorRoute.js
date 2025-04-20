import express from 'express';
import {
  signupDoctor,
  loginDoctor,
  doctorList,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
} from '../controllers/doctorController.js';
import { upload } from '../middlewares/multer.js';  // multer for image handling
import authDoctor from '../middlewares/authDoctor.js'; // Doctor authentication middleware

const doctorRouter = express.Router();

// Modify signup route to handle image upload
doctorRouter.post(
  '/signup',
  upload.single('image'),  // Ensure multer handles the image
  signupDoctor  // Pass to signupDoctor controller
);

// Other routes
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/list', doctorList);
doctorRouter.get('/appointments',authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointments', appointmentComplete);
doctorRouter.get('/cancel-appointment', appointmentCancel);
doctorRouter.get('/dashboard',authDoctor, doctorDashboard);

export default doctorRouter;
