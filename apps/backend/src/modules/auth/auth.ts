import { AuthController } from './auth.controllers.js';

const authController = new AuthController();

export { authController };
export { authMiddleware } from './auth.middleware.js';
