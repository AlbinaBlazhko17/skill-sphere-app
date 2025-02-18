import type { Request, Response } from 'express';

import { HttpCode, HttpMethods } from '@skill-sphere/shared';
import { errors } from '@vinejs/vine';

import { MongoServerError } from 'mongodb';
import { Controller } from '../../libs/modules/controller/controller.js';
import type { APIHandlerResponse } from '../../libs/types/types.js';
import { signIn, signUp } from './auth.service.js';
import { AuthApiPath } from './libs/enums/auth-api-path.js';
import type { ISignInRequest } from './libs/types/sign-in-request.interface.js';
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

    this.addRoute({
      method: HttpMethods.POST,
      path: AuthApiPath.SIGN_IN,
      middlewares: [],
      handler: this.signIn,
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
   *              type: object
   *              properties:
   *                firstName:
   *                  type: string
   *                lastName:
   *                  type: string
   *                email:
   *                  type: string
   *                password:
   *                  type: string
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                  user:
   *                    type: object
   *                    properties:
   *                      id:
   *                       type: string
   *                      firstName:
   *                       type: string
   *                      lastName:
   *                       type: string
   *                      email:
   *                       type: string
   */

  async signUp(req: Request<{}, {}, ISignUpRequest>, _: Response): Promise<APIHandlerResponse> {
    try {
      const user = await signUp(req.body);

      return {
        status: HttpCode.CREATED,
        payload: {
          message: 'User created successfully',
          user,
        },
      };
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

  /**
   * @swagger
   * /auth/sign-in:
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
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                password:
   *                 type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                  user:
   *                    type: object
   *                    properties:
   *                      token:
   *                        type: string
   *                      id:
   *                       type: string
   *                      firstName:
   *                       type: string
   *                      lastName:
   *                       type: string
   *                      email:
   *                       type: string
   */

  async signIn(req: Request<{}, {}, ISignInRequest>, _: Response): Promise<APIHandlerResponse> {
    const { email, password } = req.body;

    try {
      const user = await signIn(email, password);

      return {
        status: HttpCode.OK,
        payload: {
          message: 'User signed in successfully',
          user,
        },
      };
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
          message: 'Unexpected error',
        },
      },
    };
  }
}

export { AuthController };
