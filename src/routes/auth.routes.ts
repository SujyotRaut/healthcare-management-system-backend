import { Patient, PrismaClient, User } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const admin: RequestHandler = async (req, res) => {
  const { id, city, address, ...other }: User & Patient = req.body;
  const isUserExist = await prisma.user.findUnique({ where: { username: req.body.username } });
  if (isUserExist) return res.json({ status: 'fail', message: 'Username already exist' });
  const user = await prisma.user.create({ data: { ...other, role: 'admin' } });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.json({ staus: 'success', data: { accessToken: token } });
};

export const login: RequestHandler = async (req, res) => {
  const { username, password }: { username: string; password: string } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || user.password !== password)
    return res.json({ status: 'fail', message: 'Uesrname or passsword is invalid' });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.json({ staus: 'success', data: { accessToken: token } });
};

export const register: RequestHandler = async (req, res) => {
  const { id, city, address, ...other }: User & Patient = req.body;
  const isUserAlreadyExist = await prisma.user.findUnique({ where: { username: req.body.username } });
  if (isUserAlreadyExist) return res.json({ status: 'fail', message: 'Username already exist' });
  const user = await prisma.user.create({ data: { ...other, role: 'patient' } });
  await prisma.patient.create({ data: { id: user.id, city, address } });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.json({ staus: 'success', data: { accessToken: token } });
};
