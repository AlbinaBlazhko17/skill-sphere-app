import type { RequestHandler } from 'express';
import type { HttpMethods } from '@skill-sphere/shared';

export interface ApiRoute {
  routePath: string;
  method: HttpMethods;
  callback: RequestHandler;
  middlewares: RequestHandler[];
}
