import jwt from 'jsonwebtoken';
import { IUser } from '../../modules/users/user.js';

export const verifyToken = (token: string): IUser => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const user = jwt.verify(token, jwtSecret) as IUser;

  return user;
};
