import express from 'express';
import { getUsers, login, me, registerAdmin, registerPatient } from '../controllers/user.controllers';
import auth from '../middleware/auth.middleware';
import checkAdmin from '../middleware/checkAdmin.middleware';

const userRouter = express.Router();

userRouter.get('/me', auth, me);
userRouter.get('/', auth, checkAdmin, getUsers);
userRouter.post('/login', login);
userRouter.post('/register-admin', registerAdmin);
userRouter.post('/register-patient', registerPatient);

export default userRouter;
