import express from 'express';
import {
  addInsurance,
  deleteInsurance,
  getAllInsurance,
  getInsurance,
  updateInsurance,
} from '../controllers/insurance.controllers';

const insuranceRouter = express.Router();

insuranceRouter.get('/', getAllInsurance);
insuranceRouter.get('/:id', getInsurance);
insuranceRouter.post('/', addInsurance);
insuranceRouter.put('/:id', updateInsurance);
insuranceRouter.delete('/:id', deleteInsurance);

export default insuranceRouter;
