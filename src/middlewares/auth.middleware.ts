import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

const auth: RequestHandler = async (req, res, next) => {
  const accessToken = req.headers['authorization']?.split(' ')[1] || '';
  try {
    const token = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;
    const user = await prisma.user.findUnique({ where: { id: token.userId } });
    if (!user) return res.json({ status: 'fail', message: 'User does not exist' });
    res.locals.user = user;
  } catch {
    res.json({ status: 'fail', message: 'Unauthorized' });
  } finally {
    next();
  }
};

export default auth;
