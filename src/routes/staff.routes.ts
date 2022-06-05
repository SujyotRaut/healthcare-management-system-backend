import { Doctor, Patient, PrismaClient, Staff, User } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getStaffs: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany({ where: { role: 'staff' }, include: { staff: true } });
  const staffs = users.map(({ staff, ...other }) => ({ ...staff, ...other }));
  res.json({ status: 'success', data: { staffs: staffs } });
};

export const getStaff: RequestHandler = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.body.id }, include: { staff: true } });
  if (!user) return res.json({ status: 'fail', message: `Staff does not exist` });
  const { staff, ...other } = user as User & { staff: Staff };
  res.json({ status: 'success', data: { staff: { ...staff, ...other } } });
};

export const addStaff: RequestHandler = async (req, res) => {
  const { id, role, experience, qualification, ...other }: User & Staff = req.body;
  const isUserNameExist = await prisma.user.findUnique({ where: { username: other.username } });
  if (isUserNameExist) return res.json({ status: 'fail', message: 'Username already exist' });
  const user = await prisma.user.create({ data: { ...other, role: 'staff' } });
  const staff = await prisma.staff.create({ data: { id: user.id, experience, qualification } });
  res.json({ status: 'success', data: { staff: { ...staff, ...user } } });
};

export const updateStaff: RequestHandler = async (req, res) => {
  const { id, role, username, experience, qualification, ...other }: User & Staff = req.body;
  const user = await prisma.user.update({ where: { id }, data: { ...other } });
  const staff = await prisma.staff.update({ where: { id }, data: { experience, qualification } });
  res.json({ status: 'success', data: { staff: { ...staff, ...user } } });
};

export const deleteStaff: RequestHandler = async (req, res) => {
  const isStaffExist = await prisma.user.findUnique({ where: { id: req.body.id } });
  if (!isStaffExist) return res.json({ status: 'fail', message: 'Staff does not exist' });
  await prisma.staff.delete({ where: { id: req.body.id } });
  await prisma.user.delete({ where: { id: req.body.id } });
  res.json({ status: 'success', data: {} });
};
