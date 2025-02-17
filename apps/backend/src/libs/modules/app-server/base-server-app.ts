import bodyParser from 'body-parser';
import express, { Express } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi, { type SwaggerOptions } from 'swagger-ui-express';
import type { ApiRoute, IBaseServerAppApi } from './types/index.js';

class BaseServerApp {
  private app: Express = express();
  api: IBaseServerAppApi;

  constructor(
    private port: number,
    api: IBaseServerAppApi
  ) {
    this.app = express();
    this.api = api;
  }

  init = () => {
    this.addMiddlewares();
    this.initRoutes();
    this.addSwagger();

    this.app.get('/test', (req, res) => {
      res.send('Welcome to Express & TypeScript Server');
    });

    this.app.listen(this.port, () => {
      console.log(`Server is working at http://localhost:${this.port}`);
    });
  };

  addMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  };

  addRoute = (parameters: ApiRoute) => {
    const { routePath, method, callback, middlewares } = parameters;

    this.app[method](`/api/${this.api.version}${routePath}`, ...middlewares, callback);
  };

  addRoutes = (routes: ApiRoute[]) => {
    routes.forEach((route) => {
      this.addRoute(route);
    });
  };

  addSwagger = () => {
    const swaggerOptions: SwaggerOptions = {
      swaggerDefinition: {
        info: {
          title: 'Skill Sphere API',
          description: 'Skill Sphere API Information',
          version: `${this.api.version}.0.0`,
          servers: [{ url: `/api/${this.api.version}` }],
        },
      },
      apis: ['./src/modules/**/*.controllers.ts'],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  };

  initRoutes = () => {
    this.addRoutes(this.api.routes);
  };
}

export { BaseServerApp };
