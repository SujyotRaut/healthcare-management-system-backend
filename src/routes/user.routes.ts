import { Patient, PrismaClient, User } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

export const me: RequestHandler = async (req, res) => {
  if (!res.locals.user) return res.json({ status: 'fail', message: 'Unautherized' });
  res.json({ status: 'success', data: { me: res.locals.user } });
};

export const getUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ status: 'success', data: { users } });
};
