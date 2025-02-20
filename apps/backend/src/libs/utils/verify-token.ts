import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { IUser } from 'src/modules/users/user.entity.js';

export const verifyToken = (token: string): IUser => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const jwtPayload = jwt.verify(token, jwtSecret);

  if (typeof jwtPayload === 'string') {
    throw new Error('Invalid token');
  }

  return jwtPayload.user;
};
