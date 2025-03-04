import type { Multer } from 'multer';
import type { ApiRoute } from './api-route.interface.js';
import type { IBaseServerAppApi } from './base-server-app-api.type.js';

export interface IBaseServerApp {
	api: IBaseServerAppApi;

	init(): void;
	addMiddlewares(): void;
	addSwagger(): void;
	addRouterPath(parameters: ApiRoute): void;
	initRoutes(): void;
}
