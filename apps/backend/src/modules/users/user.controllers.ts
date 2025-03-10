import type { Request, Response } from 'express';
import { Controller } from '../../libs/modules/controller/controller.js';

import { HttpCode, HttpMethods, UserApiPath } from '@skill-sphere/shared';
import path from 'path';
import type { APIHandlerResponse } from 'src/libs/types/api-handler-response.type.js';
import { authMiddleware } from '../auth/auth.middleware.js';
import type { IUpdateUser } from './libs/types/update-user.interface.js';
import {
	changePassword,
	deleteUser,
	getUser,
	getUserByToken,
	getUserImage,
	getUsers,
	updateUser,
	updateUserImage,
} from './user.service.js';
import { errors } from '@vinejs/vine';
import { MongoServerError } from 'mongodb';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a user
 *         firstName:
 *           type: string
 *           description: first name
 *         lastName:
 *           type: string
 *           descripton: last name
 *         email:
 *           type: string
 *           description: email
 *         password:
 *          type: string
 *          description: password
 *       example:
 *         id: 1
 *         firstName: John
 *         lastName: Doe
 *         email: user@email.com
 *         password: password
 *
 * @swagger
 *   tags:
 *    name: User
 *    description: Get user information
 */

class UserController extends Controller {
	constructor() {
		super();

		this.addRoute({
			method: HttpMethods.GET,
			path: UserApiPath.ME,
			middlewares: [authMiddleware],
			handler: this.getUserMe,
		});

		this.addRoute({
			method: HttpMethods.GET,
			path: UserApiPath.USER_BY_ID,
			middlewares: [authMiddleware],
			handler: this.getUser,
		});

		this.addRoute({
			method: HttpMethods.PATCH,
			path: UserApiPath.USER_BY_ID,
			middlewares: [authMiddleware],
			handler: this.updateUser,
		});

		this.addRoute({
			method: HttpMethods.DELETE,
			path: UserApiPath.USER_BY_ID,
			middlewares: [authMiddleware],
			handler: this.deleteUser,
		});

		this.addRoute({
			method: HttpMethods.POST,
			path: UserApiPath.UPLOAD_AVATAR,
			middlewares: [authMiddleware, this.upload.single('file')],
			handler: this.uploadAvatar,
		});

		this.addRoute({
			method: HttpMethods.GET,
			path: UserApiPath.USER_AVATAR,
			middlewares: [authMiddleware],
			handler: this.getUserAvatar,
		});

		this.addRoute({
			method: HttpMethods.DELETE,
			path: UserApiPath.USER_AVATAR,
			middlewares: [authMiddleware],
			handler: this.deleteUserImage,
		});

		this.addRoute({
			method: HttpMethods.GET,
			path: UserApiPath.USERS,
			middlewares: [authMiddleware],
			handler: this.getAllUsers,
		});

		this.addRoute({
			method: HttpMethods.POST,
			path: UserApiPath.CHANGE_PASSWORD,
			middlewares: [authMiddleware],
			handler: this.changeUserPassword,
		});
	}

	/**
	 * @swagger
	 * /users/{id}:
	 *   get:
	 *     tags:
	 *       - User
	 *     description: Get user information by user ID
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: User ID
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: User information
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: string
	 *                 firstName:
	 *                   type: string
	 *                 lastName:
	 *                   type: string
	 *                 email:
	 *                   type: string
	 *                 createdAt:
	 *                   type: string
	 *                   format: date-time
	 *                 updatedAt:
	 *                   type: string
	 *                   format: date-time
	 */

	async getUser(
		req: Request<{ id?: string }, unknown, { id: string }>,
		_: Response,
	): Promise<APIHandlerResponse> {
		const { id: tokenId } = req.body;
		const { id } = req.params;

		if (!id) {
			return {
				status: HttpCode.BAD_REQUEST,
				payload: {
					error: {
						message: 'User ID is required',
					},
				},
			};
		}

		if (tokenId !== id) {
			return {
				status: HttpCode.FORBIDDEN,
				payload: {
					error: {
						message: 'Forbidden',
					},
				},
			};
		}

		try {
			const user = getUser(id);

			return {
				status: HttpCode.OK,
				payload: user,
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					status: HttpCode.NOT_FOUND,
					payload: {
						error: {
							message: error.message,
						},
					},
				};
			}
		}

		return {
			status: HttpCode.INTERNAL_SERVER_ERROR,
			payload: {
				error: {
					message: 'Internal server error',
				},
			},
		};
	}

	/**
	 * @swagger
	 * /users/{id}:
	 *   patch:
	 *     tags:
	 *       - User
	 *     description: Update user information by user ID
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: User ID
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               firstName:
	 *                 type: string
	 *               lastName:
	 *                 type: string
	 *               email:
	 *                 type: string
	 *     responses:
	 *       200:
	 *         description: User information
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: string
	 *                 firstName:
	 *                   type: string
	 *                 lastName:
	 *                   type: string
	 *                 email:
	 *                   type: string
	 *                 createdAt:
	 *                   type: string
	 *                   format: date-time
	 *                 updatedAt:
	 *                   type: string
	 *                   format: date-time
	 */

	async updateUser(
		req: Request<{ id?: string }, unknown, IUpdateUser & { id: string }>,
		_: Response,
	): Promise<APIHandlerResponse> {
		const user = req.body;
		const { id } = req.params;

		if (!id) {
			return {
				status: HttpCode.BAD_REQUEST,
				payload: {
					message: 'User ID is required',
				},
			};
		}

		if (user.id !== id) {
			return {
				status: HttpCode.FORBIDDEN,
				payload: {
					error: {
						message: 'Forbidden',
					},
				},
			};
		}

		try {
			const updatedUser = await updateUser(id, {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			});

			return {
				status: HttpCode.OK,
				payload: updatedUser,
			};
		} catch (error) {
			return {
				status: HttpCode.INTERNAL_SERVER_ERROR,
				payload: {
					error: {
						message: 'Internal server error',
					},
				},
			};
		}
	}

	/**
	 * @swagger
	 * /users/{id}:
	 *   delete:
	 *     tags:
	 *       - User
	 *     description: Delete user by user ID
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: User ID
	 *         schema:
	 *           type: string
	 *   responses:
	 *     204:
	 *       message: User deleted successfully
	 *       description: User deleted successfully
	 *     404:
	 *       message: User not found
	 *       description: User not found
	 */

	deleteUser = async (
		req: Request<{ id?: string }>,
		_: Response,
	): Promise<APIHandlerResponse> => {
		const { id } = req.params;

		if (!id) {
			return {
				status: HttpCode.BAD_REQUEST,
				payload: {
					error: {
						message: 'User ID is required',
					},
				},
			};
		}

		try {
			deleteUser(id);

			return {
				status: HttpCode.DELETE,
				payload: {
					message: 'User deleted successfully',
				},
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					status: HttpCode.NOT_FOUND,
					payload: {
						error: {
							message: error.message,
						},
					},
				};
			}
		}

		return {
			status: HttpCode.INTERNAL_SERVER_ERROR,
			payload: {
				error: {
					message: 'Internal server error',
				},
			},
		};
	};

	/**
	 * @swagger
	 * /users/{id}/upload-avatar:
	 *   post:
	 *     tags:
	 *       - User
	 *     description: Upload user avatar
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: User ID
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         multipart/form-data:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               file:
	 *                 type: string
	 *                 format: binary
	 *                 description: File to upload
	 *     responses:
	 *       200:
	 *         description: User avatar uploaded successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: string
	 *                 firstName:
	 *                   type: string
	 *                 lastName:
	 *                   type: string
	 *                 email:
	 *                   type: string
	 *                 createdAt:
	 *                   type: string
	 *                   format: date-time
	 *                 updatedAt:
	 *                   type: string
	 *                   format: date-time
	 */

	uploadAvatar = async (
		req: Request,
		_: Response,
	): Promise<APIHandlerResponse> => {
		const { id } = req.params;
		const { file } = req;

		if (!id) {
			return {
				status: HttpCode.BAD_REQUEST,
				payload: {
					error: {
						message: 'User ID is required',
					},
				},
			};
		}

		if (!file) {
			return {
				status: HttpCode.BAD_REQUEST,
				payload: {
					error: {
						message: 'File is required',
					},
				},
			};
		}

		try {
			const user = await updateUserImage(id, file.path);

			return {
				status: HttpCode.OK,
				payload: user,
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					status: HttpCode.INTERNAL_SERVER_ERROR,
					payload: {
						error: {
							message: error.message,
						},
					},
				};
			}
		}

		return {
			status: HttpCode.INTERNAL_SERVER_ERROR,
			payload: {
				message: 'Internal server error',
			},
		};
	};

	/**
	 * @swagger
	 * /users/{id}/avatar:
	 *   delete:
	 *     tags:
	 *       - User
	 *     description: Delete user avatar by user ID
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: User ID
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: User avatar deleted successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: string
	 *                 firstName:
	 *                   type: string
	 *                 lastName:
	 *                   type: string
	 *                 email:
	 *                   type: string
	 *                 createdAt:
	 *                   type: string
	 *                   format: date-time
	 *                 updatedAt:
	 *                   type: string
	 *                   format: date-time
	 */

	deleteUserImage = async (req: Request): Promise<APIHandlerResponse> => {
		const { id } = req.params;

		if (!id) {
			return {
				status: HttpCode.BAD_REQUEST,
				payload: {
					message: 'User ID is required',
				},
			};
		}

		try {
			const user = await updateUserImage(id, null);

			return {
				status: HttpCode.OK,
				payload: user,
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					status: HttpCode.INTERNAL_SERVER_ERROR,
					payload: {
						error: {
							message: error.message,
						},
					},
				};
			}
		}

		return {
			status: HttpCode.INTERNAL_SERVER_ERROR,
			payload: {
				message: 'Internal server error',
			},
		};
	};

	/**
	 * @swagger
	 * /users/{id}/avatar:
	 *   get:
	 *     tags:
	 *       - User
	 *     description: Get user avatar by user ID
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: User ID
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: User avatar
	 *         content:
	 *           image/png:
	 *             schema:
	 *               type: string
	 *               format: binary
	 */

	getUserAvatar = async (
		req: Request,
		_: Response,
	): Promise<APIHandlerResponse> => {
		const { id } = req.params;

		if (!id) {
			return {
				status: HttpCode.BAD_REQUEST,
				payload: {
					message: 'User ID is required',
				},
			};
		}

		try {
			const image = await getUserImage(id);

			return {
				status: HttpCode.OK,
				filePath: path.resolve(image),
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					status: HttpCode.NOT_FOUND,
					payload: {
						message: error.message,
					},
				};
			}
		}

		return {
			status: HttpCode.INTERNAL_SERVER_ERROR,
			payload: {
				message: 'Internal server error',
			},
		};
	};

	/**
	 * @swagger
	 * /users:
	 *   get:
	 *     tags:
	 *       - User
	 *     description: Get all users
	 *     responses:
	 *       200:
	 *         description: Get all users
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: string
	 *                 firstName:
	 *                   type: string
	 *                 lastName:
	 *                   type: string
	 *                 email:
	 *                   type: string
	 *                 createdAt:
	 *                   type: string
	 *                   format: date-time
	 *                 updatedAt:
	 *                   type: string
	 *                   format: date-time
	 */

	getAllUsers = async (): Promise<APIHandlerResponse> => {
		try {
			const users = await getUsers();

			return {
				status: HttpCode.OK,
				payload: users,
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					status: HttpCode.INTERNAL_SERVER_ERROR,
					payload: {
						error: {
							message: error.message,
						},
					},
				};
			}
		}

		return {
			status: HttpCode.INTERNAL_SERVER_ERROR,
			payload: {
				error: {
					message: 'Internal server error',
				},
			},
		};
	};

	/**
	 * @swagger
	 * /users/me:
	 *   get:
	 *     tags:
	 *       - User
	 *     description: Get user information by token
	 *     responses:
	 *       200:
	 *         description: User information
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: string
	 *                 firstName:
	 *                   type: string
	 *                 lastName:
	 *                   type: string
	 *                 email:
	 *                   type: string
	 *                 createdAt:
	 *                   type: string
	 *                   format: date-time
	 *                 updatedAt:
	 *                   type: string
	 *                   format: date-time
	 */

	getUserMe = async (
		req: Request,
		_: Response,
	): Promise<APIHandlerResponse> => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) {
			return {
				status: HttpCode.UNAUTHORIZED,
				payload: {
					error: {
						message: 'Unauthorized',
					},
				},
			};
		}

		try {
			const user = await getUserByToken(token);

			return {
				status: HttpCode.OK,
				payload: user,
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					status: HttpCode.INTERNAL_SERVER_ERROR,
					payload: {
						error: {
							message: error.message,
						},
					},
				};
			}
		}

		return {
			status: HttpCode.INTERNAL_SERVER_ERROR,
			payload: {
				error: {
					message: 'Internal server error',
				},
			},
		};
	};

	/**
	 * @swagger
	 * /users/{id}/change-password:
	 *   post:
	 *     tags:
	 *       - User
	 *     description: Change user password
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: User ID
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               oldPassword:
	 *                 type: string
	 *               newPassword:
	 *                 type: string
	 *     responses:
	 *       200:
	 *         description: User password changed successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *       400:
	 *         description: User ID is required
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: object
	 *                   properties:
	 *                     message:
	 *                       type: string
	 *       500:
	 *         description: Unexpected error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: object
	 *                   properties:
	 *                     message:
	 *                       type: string
	 */

	async changeUserPassword(
		req: Request,
		_: Response,
	): Promise<APIHandlerResponse> {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		const { id } = req.params;

		if (!id) {
			return {
				status: HttpCode.BAD_REQUEST,
				payload: {
					error: {
						message: 'User ID is required',
					},
				},
			};
		}

		try {
			await changePassword(id, req.body.oldPassword, req.body.newPassword);

			return {
				status: HttpCode.OK,
				payload: {
					message: 'User password changed successfully',
				},
			};
		} catch (error) {
			if (error instanceof errors.E_VALIDATION_ERROR) {
				return {
					status: HttpCode.BAD_REQUEST,
					payload: {
						error: {
							message: error.message,
							details: error.messages
								.map((message: { field: string; message: string }) => ({
									[message.field]: message.message,
								}))
								.reduce(
									(
										acc: Record<string, string>,
										curr: { field: string; message: string },
									) => ({ ...acc, ...curr }),
									[],
								),
						},
					},
				};
			} else if (error instanceof MongoServerError) {
				return {
					status: HttpCode.INTERNAL_SERVER_ERROR,
					payload: {
						error: {
							message: error.errmsg || 'Internal server error',
							details: error.cause,
						},
					},
				};
			} else if (error instanceof Error) {
				return {
					status: HttpCode.UNAUTHORIZED,
					payload: {
						error: {
							message: error.message,
							details: error.cause,
						},
					},
				};
			}
		}

		return {
			status: HttpCode.INTERNAL_SERVER_ERROR,
			payload: {
				error: {
					message: 'Internal server error',
				},
			},
		};
	}
}

export { UserController };
