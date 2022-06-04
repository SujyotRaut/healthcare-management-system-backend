import exprss from 'express';
import cores from 'cors';
import jwt from 'jsonwebtoken';
import { Patient, PrismaClient, User } from '@prisma/client';
import { login, register } from './src/routes/auth.rotes';
import { me } from './src/routes/user.rotes';
import auth from './src/middlewares/auth.middleware';

const app = exprss();
const port = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(exprss.json());
app.use(exprss.urlencoded());
app.use(cores({ origin: '*' }));

app.get('/', (req, res) => res.send('Server is up & running!'));

app.get('/user', auth, me);
app.post('/login', login);
app.post('/register', register);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

async function _addRoles() {
  await prisma.userRole.create({ data: { role: 'admin' } });
  await prisma.userRole.create({ data: { role: 'doctor' } });
  await prisma.userRole.create({ data: { role: 'staff' } });
  await prisma.userRole.create({ data: { role: 'patient' } });
}
