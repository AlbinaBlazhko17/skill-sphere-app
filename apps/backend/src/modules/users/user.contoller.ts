import type { Request, Response } from 'express';
import { Controller } from '../../libs/modules/controller/controller.js';

import { HttpCode, HttpMethods } from '@skill-sphere/shared';
import type { APIHandlerResponse } from 'src/libs/types/api-handler-response.type.js';
import { authMiddleware } from '../auth/auth.middleware.js';
import { UserApiPath } from './libs/enums/enums.js';
import type { IUserResponse } from './user.js';

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
 *  tags:
 *    name: User
 *    description: Get user information
 */

class UserController extends Controller {
  constructor() {
    super();

    this.addRoute({
      method: HttpMethods.GET,
      path: UserApiPath.USER_ME,
      middlewares: [authMiddleware],
      handler: this.getUser,
    });
  }

  /**
   * @swagger
   * /users/me:
   *  get:
   *   tags:
   *    - User
   *   description: Get user information by user ID
   *   parameters:
   *    - in: path
   *      name: userId
   *      required: true
   *      description: User ID
   *        schema:
   *          type: string
   *  responses:
   *   200:
   *   description: User information
   *    content:
   *      application/json:
   *        schema:
   *          type: object
   *            properties:
   *              id:
   *                type: string
   *              firstName:
   *                type: string
   *              lastName:
   *                type: string
   *              email:
   *                type: string
   */

  async getUser(req: Request<{}, {}, { user: IUserResponse }>, _: Response): Promise<APIHandlerResponse> {
    const { user } = req.body;

    if (!user) {
      return {
        status: HttpCode.BAD_REQUEST,
        payload: {
          message: 'User not found',
        },
      };
    }

    return {
      status: HttpCode.OK,
      payload: user,
    };
  }
}

export { UserController };
