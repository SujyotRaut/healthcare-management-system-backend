import { Doctor, Patient, PrismaClient, Room, Staff, User, Ward } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getRooms: RequestHandler = async (req, res) => {
  const rooms = await prisma.room.findMany({ include: { ward: true } });
  const rooms1 = rooms.map(({ ward: { name }, ...other }) => ({ ...other, wardName: name }));
  res.json({ status: 'success', data: { rooms: rooms1 } });
};

export const getRoom: RequestHandler = async (req, res) => {
  const room = await prisma.room.findUnique({ where: { id: req.body.id }, include: { ward: true } });
  if (!room) return res.json({ status: 'fail', message: 'Room does not exist' });
  const { ward, ...other } = room;
  res.json({ status: 'success', data: { room: { ...other, wardName: ward.name } } });
};

export const addRoom: RequestHandler = async (req, res) => {
  const { id, wardId, wardName, ...other }: Room & { wardName: string } = req.body;
  const isWardExist = await prisma.room.findUnique({ where: { roomNo: other.roomNo } });
  if (isWardExist) return res.json({ status: 'fail', message: 'Ward already exist' });
  const room = await prisma.room.create({ data: { ...other, ward: { connect: { name: wardName } } } });
  res.json({ status: 'success', data: { room } });
};

export const updateRoom: RequestHandler = async (req, res) => {
  const { id, wardId, wardName, ...other }: Room & { wardName: string } = req.body;
  const room = await prisma.room.update({ where: { id }, data: { ...other, ward: { connect: { name: wardName } } } });
  res.json({ status: 'success', data: { room } });
};

export const deleteRoom: RequestHandler = async (req, res) => {
  const isWardExist = await prisma.room.findUnique({ where: { id: req.body.id } });
  if (!isWardExist) return res.json({ status: 'fail', message: 'Room does not exist' });
  await prisma.room.delete({ where: { id: req.body.id } });
  res.json({ status: 'success', data: {} });
};
