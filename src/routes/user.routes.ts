import { Patient, PrismaClient, User } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

export const me: RequestHandler = async (req, res) => {
  res.json(
    await prisma.user.findUnique({
      where: { id: res.locals.userId },
      include: { doctor: true, patient: true, staff: true },
    })
  );
};
