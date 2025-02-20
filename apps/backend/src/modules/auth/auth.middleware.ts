import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '@skill-sphere/shared';
import { verifyToken } from '../../libs/utils/utils.js';

export const authMiddleware = async (
  req: Request<{ id?: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(HttpCode.UNAUTHORIZED).json({
      message: 'Token is required',
    });
    return;
  }

  try {
    const user = verifyToken(token);

    req.body.user = user;
    next();
  } catch (error) {
    res.status(HttpCode.UNAUTHORIZED).json({
      message: 'Invalid token',
    });
    return;
  }
};
