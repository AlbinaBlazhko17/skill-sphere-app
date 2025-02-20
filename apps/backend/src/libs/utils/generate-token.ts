import jwt from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign({ id }, jwtSecret, {
    expiresIn: '7d',
  });

  return token;
};
