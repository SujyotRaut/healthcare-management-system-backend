import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

const auth: RequestHandler = async (req, res, next) => {
  const accessToken = req.headers['authorization']?.split(' ')[1] || '';
  try {
    const token = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;
    res.locals.userId = token.userId;
  } catch {
    res.json({ status: 'fail', message: 'Unauthorized' });
  } finally {
    next();
  }
};

export default auth;
