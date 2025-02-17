import { BaseServerApp } from './base-server-app.js';
import { BaseServerAppApi } from './base-server-app-api.js';
import dotenv from 'dotenv';
import { HttpMethods } from '@skill-sphere/shared';
import type { Request, Response } from 'express';

dotenv.config();

const port = parseInt(process.env.PORT || '8000');

const baseServerAppApi = new BaseServerAppApi(
  'v1',
  ...[
    {
      routePath: '/test',
      method: HttpMethods.GET,
      callback: (req: Request, res: Response) => {
        res.send('Hello World');
      },
      middlewares: [],
    },
  ]
);

const appServer = new BaseServerApp(port, baseServerAppApi);

export { appServer };
