import type { ApiPath, HttpMethods, ValueOf } from '@skill-sphere/shared';
import { type RequestHandler } from 'express';
import type { APIHandler } from './handler.type.js';

export interface IControllerOptions<T extends string> {
	method: HttpMethods;
	path: T;
	middlewares: RequestHandler[];
	handler: APIHandler;
}
