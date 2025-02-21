import { ApiPath } from '@skill-sphere/shared';
import dotenv from 'dotenv';
import { Router, type Request, type Response } from 'express';
import { authController } from '../../../modules/auth/auth.js';
import { userController } from '../../../modules/users/user.js';
import { BaseServerAppApi } from './base-server-app-api.js';
import { BaseServerApp } from './base-server-app.js';

dotenv.config();

const port = parseInt(process.env.PORT || '8000');
const router = Router();

const baseServerAppApi = new BaseServerAppApi('v1', [
  {
    routePath: ApiPath.AUTH,
    router: authController.router,
  },
  {
    routePath: ApiPath.USERS,
    router: userController.router,
  },
  {
    routePath: ApiPath.TEST,
    router: router.get('/', (req: Request, res: Response) => {
      res.send('Hello World!');
    }),
  },
]);

const appServer = new BaseServerApp(port, baseServerAppApi);

export { appServer };
