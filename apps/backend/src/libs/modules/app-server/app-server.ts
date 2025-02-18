import dotenv from 'dotenv';
import { Router, type Request, type Response } from 'express';
import { BaseServerAppApi } from './base-server-app-api.js';
import { BaseServerApp } from './base-server-app.js';
import { ApiPath } from '@skill-sphere/shared';
import { authController } from '../../../modules/auth/auth.js';

dotenv.config();

const port = parseInt(process.env.PORT || '8000');
const router = Router();

const baseServerAppApi = new BaseServerAppApi('v1', [
  {
    routePath: ApiPath.TEST,
    router: router.get('/', (req: Request, res: Response) => {
      res.send('Hello World!');
    }),
  },
  {
    routePath: ApiPath.AUTH,
    router: authController.router,
  },
]);

const appServer = new BaseServerApp(port, baseServerAppApi);

export { appServer };
