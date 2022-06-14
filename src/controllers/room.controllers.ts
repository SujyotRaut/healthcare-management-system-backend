import { PrismaClient, Room } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const getRooms: RequestHandler = async (req, res) => {
  const rooms = await prisma.room.findMany({ include: { ward: true } });
  const rooms1 = rooms.map(({ ward: { name }, ...other }) => ({ ...other, wardName: name }));
  res.json({ status: 'success', data: { rooms: rooms1 } });
};

export const getRoom: RequestHandler = async (req, res) => {
  const room = await prisma.room.findUnique({ where: { id: req.params.id }, include: { ward: true } });
  if (!room) return res.json({ status: 'fail', message: 'Room does not exist' });
  const { ward, ...other } = room;
  res.json({ status: 'success', data: { room: { ...other, wardName: ward.name } } });
};

export const addRoom: RequestHandler = async (req, res) => {
  const { id, wardId, wardName, ...other }: Room & { wardName: string } = req.body;
  const isRoomExist = await prisma.room.findUnique({ where: { roomNo: other.roomNo } });
  if (isRoomExist) return res.json({ status: 'fail', message: 'Ward already exist' });
  const room = await prisma.room.create({ data: { ...other, ward: { connect: { name: wardName } } } });
  res.json({ status: 'success', data: { room } });
};

export const updateRoom: RequestHandler = async (req, res) => {
  const { id, wardId, wardName, ...other }: Room & { wardName: string } = req.body;
  const room = await prisma.room.update({
    where: { id: req.params.id },
    data: { ...other, ward: { connect: { name: wardName } } },
  });
  res.json({ status: 'success', data: { room } });
};

export const deleteRoom: RequestHandler = async (req, res) => {
  const isRoomExist = await prisma.room.findUnique({ where: { id: req.params.id } });
  if (!isRoomExist) return res.json({ status: 'fail', message: 'Room does not exist' });
  await prisma.room.delete({ where: { id: req.params.id } });
  res.json({ status: 'success', data: {} });
};
