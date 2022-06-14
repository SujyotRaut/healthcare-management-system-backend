import cores from 'cors';
import express from 'express';
import auth from './src/middleware/auth.middleware';
import bedRouter from './src/routes/bed.routes';
import doctorRouter from './src/routes/doctor.routes';
import insuranceRouter from './src/routes/insurance.routes';
import medicineRouter from './src/routes/medicine.routes';
import roomRouter from './src/routes/room.routes';
import staffRouter from './src/routes/staff.routes';
import userRouter from './src/routes/user.routes';
import wardRouter from './src/routes/ward.routes';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cores({ origin: '*' }));

// Routers
app.use('/users', userRouter);
app.use('/doctors', auth, doctorRouter);
app.use('/staff', auth, staffRouter);
app.use('/wards', auth, wardRouter);
app.use('/rooms', auth, roomRouter);
app.use('/beds', auth, bedRouter);
app.use('/medicines', auth, medicineRouter);
app.use('/insurance', auth, insuranceRouter);

app.get('/', (req, res) => res.send('Server is up & running!'));

app.listen(port, () => console.log(`http://localhost:${port}`));
