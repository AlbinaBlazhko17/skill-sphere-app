import { ApiRoute } from './api-route.interface.js';

export interface IBaseServerAppApi {
  version: string;
  routes: ApiRoute[];
}
