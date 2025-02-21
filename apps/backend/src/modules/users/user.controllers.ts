import type { Request, Response } from 'express';
import { Controller } from '../../libs/modules/controller/controller.js';

import { HttpCode, HttpMethods } from '@skill-sphere/shared';
import type { APIHandlerResponse } from 'src/libs/types/api-handler-response.type.js';
import { authMiddleware } from '../auth/auth.middleware.js';
import { UserApiPath } from './libs/enums/enums.js';
import type { IUpdateUser } from './libs/types/update-user.interface.js';
import { getUser, updateUser, deleteUser, updateUserImage } from './user.service.js';
import { configureMulter } from '../../libs/utils/utils.js';

export const upload = configureMulter();

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

  async getUser(req: Request<{ id?: string }, {}, { id: string }>, _: Response): Promise<APIHandlerResponse> {
    const { id: tokenId } = req.body;
    const { id } = req.params;

    if (!id) {
      return {
        status: HttpCode.BAD_REQUEST,
        payload: {
          message: 'User ID is required',
        },
      };
    }

    if (tokenId !== id) {
      return {
        status: HttpCode.FORBIDDEN,
        payload: {
          message: 'Forbidden',
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
    req: Request<{ id?: string }, {}, IUpdateUser & { id: string }>,
    _: Response
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
          message: 'Forbidden',
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
          message: 'Internal server error',
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

  deleteUser = async (req: Request<{ id?: string }>, _: Response): Promise<APIHandlerResponse> => {
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

  uploadAvatar = async (req: Request, _: Response): Promise<APIHandlerResponse> => {
    const { id } = req.params;
    const { file } = req;

    if (!id) {
      return {
        status: HttpCode.BAD_REQUEST,
        payload: {
          message: 'User ID is required',
        },
      };
    }

    if (!file) {
      return {
        status: HttpCode.BAD_REQUEST,
        payload: {
          message: 'File is required',
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
}

export { UserController };
