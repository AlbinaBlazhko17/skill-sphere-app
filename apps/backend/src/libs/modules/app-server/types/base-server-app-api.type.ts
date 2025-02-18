import type { SwaggerUiOptions } from 'swagger-ui-express';
import { ApiRoute } from './api-route.interface.js';

export interface IBaseServerAppApi {
  version: string;
  routes: ApiRoute[];
  generateDocs(): SwaggerUiOptions;
  connectToDB(): void;
}
