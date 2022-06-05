import { DoctorSchedule, Patient, PrismaClient, User } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

export const getDoctorSchedules: RequestHandler = async (req, res) => {
  const schedules = await prisma.doctorSchedule.findMany();
  res.json({ status: 'success', data: { doctorShedules: schedules } });
};

export const addDoctorSchedule: RequestHandler = async (req, res) => {
  const { id, doctorId, ...other }: DoctorSchedule = req.body;
  const schedule = await prisma.doctorSchedule.create({
    data: { ...other, doctor: { connect: { id: res.locals.user.id } } },
  });
  res.json({ status: 'success', data: { schedule } });
};
