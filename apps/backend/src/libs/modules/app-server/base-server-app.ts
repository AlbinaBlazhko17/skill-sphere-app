import bodyParser from 'body-parser';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import type {
	ApiRoute,
	IBaseServerApp,
	IBaseServerAppApi,
} from './types/index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BaseServerApp implements IBaseServerApp {
	private app: Express = express();
	api: IBaseServerAppApi;

	constructor(
		private port: number,
		api: IBaseServerAppApi,
	) {
		this.app = express();
		this.api = api;
	}

	init = () => {
		this.addMiddlewares();
		this.initRoutes();
		this.addSwagger();

		this.api.connectToDB();

		this.app.listen(this.port, () => {
			console.log(`Server is working at http://localhost:${this.port}`);
		});
	};

	addMiddlewares = () => {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(
			cors({
				origin: 'http://localhost:5173',
				credentials: true,
			}),
		);
		this.app.use(express.static(__dirname + '/public'));
		this.app.use('/uploads', express.static('uploads'));
	};

	addSwagger = () => {
		this.app.use(
			`/api-docs`,
			swaggerUi.serve,
			swaggerUi.setup(this.api.generateDocs()),
		);
	};

	addRouterPath = (parameters: ApiRoute) => {
		const { routePath, router } = parameters;

		const fullRoutePath = `/api/${this.api.version}${routePath}`;
		this.app.use(`${fullRoutePath}`, router);
	};

	initRoutes = () => {
		for (const route of this.api.routes) {
			this.addRouterPath(route);
		}
	};
}

export { BaseServerApp };
