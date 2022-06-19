import express from 'express';
import {
  addDoctor,
  deleteDoctor,
  deleteDoctors,
  getDoctor,
  getDoctors,
  updateDoctor,
} from '../controllers/doctor.controllers';
import checkAdmin from '../middleware/checkAdmin.middleware';

const doctorRouter = express.Router();

doctorRouter.get('/', getDoctors);
doctorRouter.get('/:id', getDoctor);
doctorRouter.post('/', checkAdmin, addDoctor);
doctorRouter.put('/:id', checkAdmin, updateDoctor);
doctorRouter.delete('/:id', checkAdmin, deleteDoctor);
doctorRouter.delete('/', checkAdmin, deleteDoctors);

export default doctorRouter;
