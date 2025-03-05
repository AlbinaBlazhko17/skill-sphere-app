import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '@skill-sphere/shared';
import { verifyToken } from '../../libs/utils/utils.js';
import { blocklist } from '../auth/auth.js';

export const authMiddleware = async (
	req: Request<{ id?: string }>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const token =
		req.headers.authorization && req.headers.authorization.split(' ')[1];

	if (!token) {
		res.status(HttpCode.UNAUTHORIZED).json({
			error: {
				message: 'Token is required',
			},
		});
		return;
	}

	if (blocklist.has(token)) {
		res.status(HttpCode.UNAUTHORIZED).json({
			error: {
				message: 'Invalid token',
			},
		});
		return;
	}

	try {
		const id = verifyToken(token);

		req.body = {
			...req.body,
			id,
		};

		next();
	} catch (error) {
		res.status(HttpCode.UNAUTHORIZED).json({
			error: {
				message: 'Invalid token',
			},
		});
		return;
	}
};
