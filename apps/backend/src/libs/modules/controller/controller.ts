import { Router, type Request, type Response } from 'express';
import type { IControllerOptions } from './types/options.interface.js';
import type { APIHandler } from './types/handler.type.js';

class Controller {
  router: Router;

  constructor() {
    this.router = Router();
  }

  private async wrapHandler(handler: APIHandler, req: Request, res: Response) {
    try {
      const { status, payload } = await handler(req, res);

      res.status(status).json(payload);
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
