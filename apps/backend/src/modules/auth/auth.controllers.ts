import type { Request, Response } from 'express';

import type { APIHandlerResponse } from '../../libs/types/types.js';
import { Controller } from '../../libs/modules/controller/controller.js';
import vine from '@vinejs/vine';
import { ApiPath, HttpMethods } from '@skill-sphere/shared';
import { createUser, type IUser } from '../users/user.js';
import { AuthApiPath } from './libs/enums/auth-api-path.js';

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

  async signUp(req: Request<{}, {}, IUser>, _: Response): Promise<APIHandlerResponse> {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password) {
      return {
        status: 400,
        payload: {
          message: 'Email and password are required',
        },
      };
    }

    createUser({ firstName, lastName, email, password });

    return {
      status: 200,
      payload: {
        message: 'Sign up',
      },
    };
  }
}

export { AuthController };
