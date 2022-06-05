import exprss from 'express';
import cores from 'cors';
import jwt from 'jsonwebtoken';
import { Patient, PrismaClient, User } from '@prisma/client';
import { admin, login, register } from './src/routes/auth.routes';
import { me } from './src/routes/user.routes';
import auth from './src/middlewares/auth.middleware';
import { addDoctor, deleteDoctor, getDoctor, getDoctors, updateDoctor } from './src/routes/doctor.routes';
import { addStaff, deleteStaff, getStaff, getStaffs, updateStaff } from './src/routes/staff.routes';
import { addWard, deleteWard, getWard, getWards, updateWard } from './src/routes/ward.routes';
import { addRoom, deleteRoom, getRoom, getRooms, updateRoom } from './src/routes/room.routes';
import { addBed, deleteBed, getBed, getBeds, updateBed } from './src/routes/bed.routes';
import { addMedicine, deleteMedicine, getMedicine, updateMedicine } from './src/routes/medicine.routes';

const app = exprss();
const port = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(exprss.json());
app.use(exprss.urlencoded());
app.use(cores({ origin: '*' }));

app.get('/', (req, res) => res.send('Server is up & running!'));

// Autherization Routes
app.get('/user', auth, me);
app.post('/login', login);
app.post('/register', register);
app.post('/admin', admin);

// Doctor Routes
app.get('/doctors', getDoctors);
app.get('/doctor', getDoctor);
app.put('/doctor', addDoctor);
app.post('/doctor', updateDoctor);
app.delete('/doctor', deleteDoctor);

// Staff Routes
app.get('/staffs', getStaffs);
app.get('/staff', getStaff);
app.put('/staff', addStaff);
app.post('/staff', updateStaff);
app.delete('/staff', deleteStaff);

// Ward Routes
app.get('/wards', getWards);
app.get('/ward', getWard);
app.put('/ward', addWard);
app.post('/ward', updateWard);
app.delete('/ward', deleteWard);

// Room Routes
app.get('/rooms', getRooms);
app.get('/room', getRoom);
app.put('/room', addRoom);
app.post('/room', updateRoom);
app.delete('/room', deleteRoom);

// Bed Routes
app.get('/beds', getBeds);
app.get('/bed', getBed);
app.put('/bed', addBed);
app.post('/bed', updateBed);
app.delete('/bed', deleteBed);

// Bed Routes
app.get('/medicines', getMedicines);
app.get('/medicine', getMedicine);
app.put('/medicine', addMedicine);
app.post('/medicine', updateMedicine);
app.delete('/medicine', deleteMedicine);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

function getMedicines(arg0: string, getMedicines: any) {
  throw new Error('Function not implemented.');
}
