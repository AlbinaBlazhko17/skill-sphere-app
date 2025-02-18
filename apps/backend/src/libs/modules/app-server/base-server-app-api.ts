import swaggerJsDoc from 'swagger-jsdoc';
import { type SwaggerOptions } from 'swagger-ui-express';
import type { ApiRoute, IBaseServerAppApi } from './types/index.js';
import mongoose from 'mongoose';

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
        openapi: '3.0.0',
        info: {
          title: 'Skill Sphere API',
          description: 'Skill Sphere API Information',
          version: `${this.version}.0.0`,
          servers: [{ url: `/api/${this.version}` }],
        },
      },
      apis: ['./src/modules/**/*.controllers.ts', './src/modules/**/*.controllers.js'],
    };

    return swaggerJsDoc(swaggerOptions);
  };

  connectToDB = () => {
    try {
      const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=skill-sphere`;

      mongoose.connect(url);
      mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to DB.');
      });

      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected from DB.');
      });

      mongoose.connection.on('error', (error) => {
        console.error('Mongoose connection error:', error);
      });

      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('Mongoose connection closed due to application shutdown.');
        process.exit(0);
      });
    } catch (error) {
      console.error('Error in connectToDB:', error);
    }
  };
}

export { BaseServerAppApi };
