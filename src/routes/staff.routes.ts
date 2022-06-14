import express from 'express';
import { addStaff, deleteStaff, getAllStaff, getStaff, updateStaff } from '../controllers/staff.controllers';
import checkAdmin from '../middleware/checkAdmin.middleware';

const staffRouter = express.Router();

staffRouter.get('/', getAllStaff);
staffRouter.get('/:id', getStaff);
staffRouter.post('/', checkAdmin, addStaff);
staffRouter.put('/:id', checkAdmin, updateStaff);
staffRouter.delete('/:id', checkAdmin, deleteStaff);

export default staffRouter;
