import { Doctor, Patient, PrismaClient, Staff, User, Ward } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getWards: RequestHandler = async (req, res) => {
  const wards = await prisma.user.findMany();
  res.json({ status: 'success', data: { wards } });
};

export const getWard: RequestHandler = async (req, res) => {
  const ward = await prisma.ward.findUnique({ where: { id: req.body.id } });
  if (!ward) return res.json({ status: 'fail', message: 'Ward does not exist' });
  res.json({ status: 'success', data: { ward } });
};

export const addWard: RequestHandler = async (req, res) => {
  const { id, ...other }: Ward = req.body;
  const isWardExist = await prisma.ward.findUnique({ where: { name: other.name } });
  if (isWardExist) return res.json({ status: 'fail', message: 'Ward already exist' });
  const ward = await prisma.ward.create({ data: other });
  res.json({ status: 'success', data: { ward } });
};

export const updateWard: RequestHandler = async (req, res) => {
  const { id, ...other }: Ward = req.body;
  const ward = await prisma.ward.update({ where: { id }, data: other });
  res.json({ status: 'success', data: { ward } });
};

export const deleteWard: RequestHandler = async (req, res) => {
  const isWardExist = await prisma.ward.findUnique({ where: { id: req.body.id } });
  if (!isWardExist) return res.json({ status: 'fail', message: 'Staff does not exist' });
  await prisma.ward.delete({ where: { id: req.body.id } });
  res.json({ status: 'success', data: {} });
};
