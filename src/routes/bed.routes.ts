import express from 'express';
import { addBed, deleteBed, getBed, getBeds, updateBed } from '../controllers/bed.controllers';
import checkAdmin from '../middleware/checkAdmin.middleware';

const bedRouter = express.Router();

bedRouter.get('/', getBeds);
bedRouter.get('/:id', getBed);
bedRouter.post('/', checkAdmin, addBed);
bedRouter.put('/:id', checkAdmin, updateBed);
bedRouter.delete('/:id', checkAdmin, deleteBed);

export default bedRouter;
