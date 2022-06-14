import express from 'express';
import { addWard, deleteWard, getWard, getWards, updateWard } from '../controllers/ward.controllers';
import checkAdmin from '../middleware/checkAdmin.middleware';

const wardRouter = express.Router();

wardRouter.get('/', getWards);
wardRouter.get('/:id', getWard);
wardRouter.post('/', checkAdmin, addWard);
wardRouter.put('/:id', checkAdmin, updateWard);
wardRouter.delete('/:id', checkAdmin, deleteWard);

export default wardRouter;
