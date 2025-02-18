import jwt from 'jsonwebtoken';
import type { IUser } from '../users/user.js';

export const generateToken = (user: IUser): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign(user, jwtSecret, {
    expiresIn: '7d',
  });

  return token;
};

export const verifyToken = (token: string): IUser => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const user = jwt.verify(token, jwtSecret) as IUser;

  return user;
};
