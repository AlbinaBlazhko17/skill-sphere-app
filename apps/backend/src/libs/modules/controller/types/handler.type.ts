import type { Request, Response } from 'express';
import type { APIHandlerResponse } from 'src/libs/types/api-handler-response.type.js';

export type APIHandler = (req: Request, res: Response) => Promise<APIHandlerResponse>;
