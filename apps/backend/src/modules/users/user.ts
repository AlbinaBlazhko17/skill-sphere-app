export type { IUser } from './user.entity.js';
export { User } from './user.model.js';
export { createUser } from './user.repository.js';
import { UserController } from './user.controllers.js';

const userController = new UserController();

export { userController };
