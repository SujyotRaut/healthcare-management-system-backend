import express from 'express';
import {
  addMedicine,
  deleteMedicine,
  getMedicine,
  getMedicines,
  updateMedicine,
} from '../controllers/medicine.controllers';

const medicineRouter = express.Router();

medicineRouter.get('/', getMedicines);
medicineRouter.get('/:id', getMedicine);
medicineRouter.post('/', addMedicine);
medicineRouter.put('/:id', updateMedicine);
medicineRouter.delete('/:id', deleteMedicine);

export default medicineRouter;
