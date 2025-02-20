import jwt from 'jsonwebtoken';

export const verifyToken = (token: string): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const jwtPayload = jwt.verify(token, jwtSecret);

  if (typeof jwtPayload === 'string') {
    throw new Error('Invalid token');
  }

  return jwtPayload.id;
};
