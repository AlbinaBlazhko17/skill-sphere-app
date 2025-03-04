import type { ApiPath } from '@skill-sphere/shared';
import type { Router } from 'express';

export interface ApiRoute {
	routePath: ApiPath;
	router: Router;
}
