import swaggerJsDoc from 'swagger-jsdoc';
import { type SwaggerOptions } from 'swagger-ui-express';
import type { ApiRoute, IBaseServerAppApi } from './types/index.js';

class BaseServerAppApi implements IBaseServerAppApi {
  version: string;
  routes: ApiRoute[];

  constructor(version: string, routes: ApiRoute[]) {
    this.version = version;
    this.routes = routes;
  }

  generateDocs = () => {
    const swaggerOptions: SwaggerOptions = {
      swaggerDefinition: {
        info: {
          title: 'Skill Sphere API',
          description: 'Skill Sphere API Information',
          version: `${this.version}.0.0`,
          servers: [{ url: `/api/${this.version}` }],
        },
      },
      apis: ['./src/modules/**/*.controllers.ts'],
    };

    return swaggerJsDoc(swaggerOptions);
  };
}

export { BaseServerAppApi };
