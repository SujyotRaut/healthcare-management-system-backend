import { Doctor, Patient, PrismaClient, User } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getDoctors: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany({ where: { role: 'doctor' }, include: { doctor: true } });
  const doctors = users.map(({ doctor, ...other }) => ({ ...doctor, ...other }));
  res.json({ status: 'success', data: { doctors } });
};

export const getDoctor: RequestHandler = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.body.id }, include: { doctor: true } });
  if (!user) return res.json({ status: 'fail', message: `Doctor does not exist` });
  const { doctor, ...other } = user as User & { doctor: Doctor };
  res.json({ status: 'success', data: { doctor: { ...doctor, ...other } } });
};

export const addDoctor: RequestHandler = async (req, res) => {
  const { id, role, experience, qualification, specilization, ...other }: User & Doctor = req.body;
  const isUserNameExist = await prisma.user.findUnique({ where: { username: other.username } });
  if (isUserNameExist) return res.json({ status: 'fail', message: 'Username already exist' });
  const user = await prisma.user.create({ data: { ...other, role: 'doctor' } });
  const doctor = await prisma.doctor.create({ data: { id: user.id, experience, qualification, specilization } });
  res.json({ status: 'success', data: { doctor: { ...doctor, ...user } } });
};

export const updateDoctor: RequestHandler = async (req, res) => {
  const { id, role, username, experience, qualification, specilization, ...other }: User & Doctor = req.body;
  const user = await prisma.user.update({ where: { id }, data: { ...other } });
  const doctor = await prisma.doctor.update({ where: { id }, data: { experience, qualification, specilization } });
  res.json({ status: 'success', data: { doctor: { ...doctor, ...user } } });
};

export const deleteDoctor: RequestHandler = async (req, res) => {
  const isDoctorExist = await prisma.user.findUnique({ where: { id: req.body.id } });
  if (!isDoctorExist) return res.json({ status: 'fail', message: 'Doctor does not exist' });
  await prisma.doctor.delete({ where: { id: req.body.id } });
  await prisma.user.delete({ where: { id: req.body.id } });
  res.json({ status: 'success', data: {} });
};
