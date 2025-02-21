import { Router, type Request, type Response } from 'express';
import type { IControllerOptions } from './types/options.interface.js';
import type { APIHandler } from './types/handler.type.js';
import type { Multer } from 'multer';
import { configureMulter } from 'src/libs/utils/configure-multer.js';

class Controller {
  router: Router;
  upload: Multer;

  constructor() {
    this.router = Router();
    this.upload = configureMulter();
  }

  private async wrapHandler(handler: APIHandler, req: Request, res: Response) {
    try {
      const { status, payload, filePath } = await handler(req, res);

      if (filePath) {
        res.status(status).sendFile(filePath);
      } else {
        res.status(status).json(payload);
      }
    } catch (error) {
      console.error('Error in wrapHandler:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async addRoute<T extends string>(options: IControllerOptions<T>) {
    const { method, path, middlewares, handler } = options;

    this.router[method](path, ...middlewares, (req, res) => this.wrapHandler(handler, req, res));
  }
}

export { Controller };
