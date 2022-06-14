import { Bed, PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getBeds: RequestHandler = async (req, res) => {
  const beds = await prisma.bed.findMany({ include: { room: true } });
  const beds1 = beds.map(({ room: { roomNo }, ...other }) => ({ ...other, roomNo }));
  res.json({ status: 'success', data: { beds: beds1 } });
};

export const getBed: RequestHandler = async (req, res) => {
  const bed = await prisma.bed.findUnique({ where: { id: req.params.id }, include: { room: true } });
  if (!bed) return res.json({ status: 'fail', message: 'Bed does not exist' });
  const { room, ...other } = bed;
  res.json({ status: 'success', data: { bed: { ...other, roomNo: room.roomNo } } });
};

export const addBed: RequestHandler = async (req, res) => {
  const { id, roomId, roomNo, ...other }: Bed & { roomNo: string } = req.body;
  const isBedExist = await prisma.bed.findFirst({ where: { AND: [{ bedNo: other.bedNo }, { room: { roomNo } }] } });
  console.log(isBedExist);
  if (isBedExist) return res.json({ status: 'fail', message: 'Bed already exist' });
  const bed = await prisma.bed.create({ data: { ...other, room: { connect: { roomNo } } } });
  res.json({ status: 'success', data: { bed } });
};

export const updateBed: RequestHandler = async (req, res) => {
  const { id, roomId, roomNo, ...other }: Bed & { roomNo: string } = req.body;
  const bed = await prisma.bed.update({
    where: { id: req.params.id },
    data: { ...other, room: { connect: { roomNo } } },
  });
  res.json({ status: 'success', data: { bed } });
};

export const deleteBed: RequestHandler = async (req, res) => {
  const isBedExist = await prisma.bed.findUnique({ where: { id: req.body.id } });
  if (!isBedExist) return res.json({ status: 'fail', message: 'Bed does not exist' });
  await prisma.bed.delete({ where: { id: req.body.id } });
  res.json({ status: 'success', data: {} });
};
