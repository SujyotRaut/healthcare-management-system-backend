import { Patient, PrismaClient, User } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerAdmin: RequestHandler = async (req, res) => {
  const { id, ...other }: User = req.body;
  const isUserExist = await prisma.user.findUnique({ where: { username: req.body.username } });
  if (isUserExist) return res.json({ status: 'fail', message: 'Username already exist' });
  const user = await prisma.user.create({ data: { ...other, role: 'admin' } });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.json({ status: 'success', data: { accessToken: token } });
};

export const registerPatient: RequestHandler = async (req, res) => {
  const { id, city, address, ...other }: User & Patient = req.body;
  const isUserAlreadyExist = await prisma.user.findUnique({ where: { username: req.body.username } });
  if (isUserAlreadyExist) return res.json({ status: 'fail', message: 'username already exist' });
  const user = await prisma.user.create({ data: { ...other, role: 'patient' } });
  await prisma.patient.create({ data: { id: user.id, city, address } });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.json({ status: 'success', data: { accessToken: token } });
};

export const login: RequestHandler = async (req, res) => {
  const { username, password }: { username: string; password: string } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || user.password !== password) return res.json({ status: 'fail', message: 'username or password is invalid' });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.json({ status: 'success', data: { accessToken: token } });
};

export const me: RequestHandler = async (req, res) => {
  res.json({ status: 'success', data: { me: res.locals.user } });
};

export const getUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ status: 'success', data: { users } });
};
