import { Insurance, PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getAllInsurance: RequestHandler = async (req, res) => {
  const insurances = await prisma.insurance.findMany();
  res.json({ status: 'success', data: { insurances } });
};

export const getInsurance: RequestHandler = async (req, res) => {
  const insurance = await prisma.insurance.findUnique({ where: { id: req.params.id } });
  if (!insurance) return res.json({ status: 'fail', message: 'Insurance does not exist' });
  res.json({ status: 'success', data: { insurance } });
};

export const addInsurance: RequestHandler = async (req, res) => {
  const { id, ...other }: Insurance & { patientName: string } = req.body;
  const insurance = await prisma.insurance.create({ data: { ...other } });
  res.json({ status: 'success', data: { insurance } });
};

export const updateInsurance: RequestHandler = async (req, res) => {
  const { id, ...other }: Insurance = req.body;
  const insurance = await prisma.insurance.update({ where: { id: req.params.id }, data: other });
  res.json({ status: 'success', data: { insurance } });
};

export const deleteInsurance: RequestHandler = async (req, res) => {
  const isInsuranceExist = await prisma.insurance.findUnique({ where: { id: req.params.id } });
  if (!isInsuranceExist) return res.json({ status: 'fail', message: 'Insurance does not exist' });
  await prisma.insurance.delete({ where: { id: req.params.id } });
  res.json({ status: 'success', data: {} });
};
