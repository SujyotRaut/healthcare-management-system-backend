import exprss from 'express';
import cores from 'cors';
import jwt from 'jsonwebtoken';
import { Patient, PrismaClient, User } from '@prisma/client';
import { admin, login, register } from './src/routes/auth.routes';
import { getUsers, me } from './src/routes/user.routes';
import auth from './src/middlewares/auth.middleware';
import { addDoctor, deleteDoctor, getDoctor, getDoctors, updateDoctor } from './src/routes/doctor.routes';
import { addStaff, deleteStaff, getStaff, getStaffs, updateStaff } from './src/routes/staff.routes';
import { addWard, deleteWard, getWard, getWards, updateWard } from './src/routes/ward.routes';
import { addRoom, deleteRoom, getRoom, getRooms, updateRoom } from './src/routes/room.routes';
import { addBed, deleteBed, getBed, getBeds, updateBed } from './src/routes/bed.routes';
import { addMedicine, deleteMedicine, getMedicine, getMedicines, updateMedicine } from './src/routes/medicine.routes';
import { addInsurance, deleteInsurance, getInsurance, getInsurances, updateInsurance } from './src/routes/insurance.routes';
import { addDoctorSchedule, getDoctorSchedules } from './src/routes/doctor-shcedule.routes';

const app = exprss();
const port = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(exprss.json());
app.use(exprss.urlencoded({ extended: false }));
app.use(cores({ origin: '*' }));
app.use(auth);

app.get('/', (req, res) => res.send('Server is up & running!'));

// Autherization Routes
app.get('/me', me);
app.get('/users', getUsers);
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

// Medicine Routes
app.get('/medicines', getMedicines);
app.get('/medicine', getMedicine);
app.put('/medicine', addMedicine);
app.post('/medicine', updateMedicine);
app.delete('/medicine', deleteMedicine);

// Insurance Routes
app.get('/insurances', getInsurances);
app.get('/insurance', getInsurance);
app.put('/insurance', addInsurance);
app.post('/insurance', updateInsurance);
app.delete('/insurance', deleteInsurance);

// Schedule Routes
app.get('/doctor-schedules', getDoctorSchedules);
app.put('/doctor-schedule', addDoctorSchedule);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
