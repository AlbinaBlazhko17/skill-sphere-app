import type { IUser } from './user.entity.js';
import { User } from './user.model.js';

export const createUser = async (userData: IUser) => {
  return await User.create(userData);
};
