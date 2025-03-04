import type { SwaggerUiOptions } from 'swagger-ui-express';
import { ApiRoute } from './api-route.interface.js';
import type { Multer } from 'multer';

export interface IBaseServerAppApi {
	version: string;
	routes: ApiRoute[];

	generateDocs(): SwaggerUiOptions;
	connectToDB(): void;
}
