import { Bed, Doctor, Medicine, Patient, PrismaClient, Room, Staff, User, Ward } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getMedicines: RequestHandler = async (req, res) => {
  const medicines = await prisma.medicine.findMany();
  res.json({ status: 'success', data: { medicines } });
};

export const getMedicine: RequestHandler = async (req, res) => {
  const medicine = await prisma.medicine.findUnique({ where: { id: req.body.id } });
  if (!medicine) return res.json({ status: 'fail', message: 'Medicine does not exist' });
  res.json({ status: 'success', data: { medicine } });
};

export const addMedicine: RequestHandler = async (req, res) => {
  const { id, ...other }: Medicine = req.body;
  const medicine = await prisma.medicine.create({ data: other });
  res.json({ status: 'success', data: { medicine } });
};

export const updateMedicine: RequestHandler = async (req, res) => {
  const { id, ...other }: Medicine = req.body;
  const medicine = await prisma.medicine.update({ where: { id }, data: other });
  res.json({ status: 'success', data: { medicine } });
};

export const deleteMedicine: RequestHandler = async (req, res) => {
  const isWardExist = await prisma.medicine.findUnique({ where: { id: req.body.id } });
  if (!isWardExist) return res.json({ status: 'fail', message: 'Medicine does not exist' });
  await prisma.medicine.delete({ where: { id: req.body.id } });
  res.json({ status: 'success', data: {} });
};
