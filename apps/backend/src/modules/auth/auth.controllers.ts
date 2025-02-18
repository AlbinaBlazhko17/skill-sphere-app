import type { Request, Response } from 'express';

import { HttpCode, HttpMethods } from '@skill-sphere/shared';
import { errors } from '@vinejs/vine';
import bcrypt from 'bcrypt';
import { MongoServerError } from 'mongodb';
import { Controller } from '../../libs/modules/controller/controller.js';
import type { APIHandlerResponse } from '../../libs/types/types.js';
import { createUser } from '../users/user.js';
import { AuthApiPath } from './libs/enums/auth-api-path.js';
import signUpSchema from './libs/schemas/sign-up.schema.js';
import type { ISignUpRequest } from './libs/types/sign-up-request.interface.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first
 *         - last
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
 *    name: Sign Up user
 *    description: Sign up a new user
 */
class AuthController extends Controller {
  constructor() {
    super();

    this.addRoute({
      method: HttpMethods.POST,
      path: AuthApiPath.SIGN_UP,
      middlewares: [],
      handler: this.signUp,
    });
  }

  /**
   * @swagger
   * /auth/sign-up:
   *    post:
   *      tags:
   *        - Authentication
   *      description: Sign up user into the system
   *      requestBody:
   *        description: User auth data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/User"
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: object
   *                    $ref: "#/components/schemas/User"
   */

  async signUp(req: Request<{}, {}, ISignUpRequest>, _: Response): Promise<APIHandlerResponse> {
    const { firstName, lastName, email, password } = req.body;

    try {
      await signUpSchema.validate({ firstName, lastName, email, password });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return {
          status: HttpCode.BAD_REQUEST,
          payload: {
            error: {
              message: error.message,
              details: error.messages.map((message: { field: string; message: string }) => ({
                [message.field]: message.message,
              })),
            },
          },
        };
      }
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    try {
      const newUser = await createUser({ firstName, lastName, email, password: newPassword });

      return {
        status: HttpCode.CREATED,
        payload: newUser,
      };
    } catch (error) {
      if (error instanceof MongoServerError) {
        return {
          status: HttpCode.INTERNAL_SERVER_ERROR,
          payload: {
            error: {
              message: error.errmsg || 'Internal server error',
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
          message: 'Unexpected error',
        },
      },
    };
  }
}

export { AuthController };
