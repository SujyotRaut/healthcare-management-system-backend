import express from 'express';
import { addRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/room.controllers';
import checkAdmin from '../middleware/checkAdmin.middleware';

const roomRouter = express.Router();

roomRouter.get('/', getRooms);
roomRouter.get('/:id', getRoom);
roomRouter.post('/', checkAdmin, addRoom);
roomRouter.put('/:id', checkAdmin, updateRoom);
roomRouter.delete('/:id', checkAdmin, deleteRoom);

export default roomRouter;
