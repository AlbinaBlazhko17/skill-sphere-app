export type { IUserResponse } from './libs/types/types.js';
export type { IUser } from './user.entity.js';
export { User } from './user.model.js';
export { createUser } from './user.repository.js';
import { UserController } from './user.contoller.js';

const userController = new UserController();

export { userController };
