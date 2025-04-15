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
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.post('/signup', signupDoctor); // ✅ new
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/list', doctorList);
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointments', authDoctor, appointmentComplete);
doctorRouter.get('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);

export default doctorRouter;
