import jwt from 'jsonwebtoken';
import type { IUserResponse } from 'src/modules/users/user.js';

export const generateToken = (user: IUserResponse): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign({ user }, jwtSecret, {
    expiresIn: '7d',
  });

  return token;
};
