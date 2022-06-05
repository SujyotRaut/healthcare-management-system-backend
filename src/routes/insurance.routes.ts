import { Bed, Doctor, Medicine, Patient, PrismaClient, Room, Staff, User, Ward } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getInsurances: RequestHandler = async (req, res) => {
  const insurance = await prisma.insurance.findMany();
  const rooms1 = insurance.map(async ({ patientId, ...other }) => {
    const { firstName } = (await prisma.user.findUnique({ where: { id: patientId } }))!;
    return { ...other, name: firstName };
  });

  res.json({ status: 'success', data: { insurances: rooms1 } });
};

export const getInsurance: RequestHandler = async (req, res) => {
  const medicine = await prisma.medicine.findUnique({ where: { id: req.body.id } });
  if (!medicine) return res.json({ status: 'fail', message: 'Medicine does not exist' });
  res.json({ status: 'success', data: { medicine } });
};

export const addInsurance: RequestHandler = async (req, res) => {
  const { id, ...other }: Medicine = req.body;
  const medicine = await prisma.medicine.create({ data: other });
  res.json({ status: 'success', data: { medicine } });
};

export const updateInsurance: RequestHandler = async (req, res) => {
  const { id, ...other }: Medicine = req.body;
  const medicine = await prisma.medicine.update({ where: { id }, data: other });
  res.json({ status: 'success', data: { medicine } });
};

export const deleteInsurance: RequestHandler = async (req, res) => {
  const isWardExist = await prisma.medicine.findUnique({ where: { id: req.body.id } });
  if (!isWardExist) return res.json({ status: 'fail', message: 'Medicine does not exist' });
  await prisma.medicine.delete({ where: { id: req.body.id } });
  res.json({ status: 'success', data: {} });
};
