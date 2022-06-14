import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';

const checkAdmin: RequestHandler = async (req, res, next) => {
  if (res.locals.user.role !== 'admin') return res.json({ status: 'fail', message: 'Forbidden' });
  next();
};

export default checkAdmin;
