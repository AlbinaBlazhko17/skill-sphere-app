import type { ApiRoute, IBaseServerAppApi } from './types/index.js';

class BaseServerAppApi implements IBaseServerAppApi {
  version: string;
  routes: ApiRoute[];

  constructor(version: string, ...routes: ApiRoute[]) {
    this.version = version;
    this.routes = routes;
  }
}

export { BaseServerAppApi };
