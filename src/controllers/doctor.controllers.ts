import { Doctor, PrismaClient, User } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getDoctors: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany({ where: { role: 'doctor' }, include: { doctor: true } });
  const doctors = users.map(({ doctor, ...other }) => ({ ...doctor, ...other }));
  res.json({ status: 'success', data: { doctors } });
};

export const getDoctor: RequestHandler = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id }, include: { doctor: true } });
  if (!user) return res.json({ status: 'fail', message: `Doctor does not exist` });
  const { doctor, ...other } = user as User & { doctor: Doctor };
  res.json({ status: 'success', data: { doctor: { ...doctor, ...other } } });
};

export const addDoctor: RequestHandler = async (req, res) => {
  const { id, role, experience, qualifications, specialization, ...other }: User & Doctor = req.body;
  const isUsernameExist = await prisma.user.findUnique({ where: { username: other.username } });
  if (isUsernameExist) return res.json({ status: 'fail', message: 'Username already exist' });
  const user = await prisma.user.create({ data: { ...other, role: 'doctor' } });
  const doctor = await prisma.doctor.create({ data: { id: user.id, experience, qualifications, specialization } });
  res.json({ status: 'success', data: { doctor: { ...doctor, ...user } } });
};

export const updateDoctor: RequestHandler = async (req, res) => {
  const { id, role, username, experience, qualifications, specialization, ...other }: User & Doctor = req.body;
  const user = await prisma.user.update({ where: { id: req.params.id }, data: { ...other } });
  const doctor = await prisma.doctor.update({
    where: { id: req.params.id },
    data: { experience, qualifications, specialization },
  });
  res.json({ status: 'success', data: { doctor: { ...doctor, ...user } } });
};

export const deleteDoctor: RequestHandler = async (req, res) => {
  const isDoctorExist = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!isDoctorExist) return res.json({ status: 'fail', message: 'Doctor does not exist' });
  await prisma.doctor.delete({ where: { id: req.params.id } });
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ status: 'success', data: {} });
};

export const deleteDoctors: RequestHandler = async (req, res) => {
  const ids = req.query.ids;
  if (!ids) {
    await prisma.doctor.deleteMany();
    await prisma.user.deleteMany({ where: { role: 'doctor' } });
    return res.json({ status: 'success', data: {} });
  }

  const q = ids.toString().split(',');
  await prisma.doctor.deleteMany({ where: { id: { in: q } } });
  await prisma.user.deleteMany({ where: { AND: [{ role: 'doctor', id: { in: q } }] } });
  return res.json({ status: 'success', data: {} });
};

export const deleteAllDoctors: RequestHandler = async (req, res) => {
  await prisma.doctor.deleteMany();
  await prisma.user.deleteMany({ where: { role: 'doctor' } });
  res.json({ status: 'success', data: {} });
};
