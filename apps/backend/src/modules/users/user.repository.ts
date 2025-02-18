import type { ISignUpRequest } from '../auth/libs/types/sign-up-request.interface.js';
import { User } from './user.model.js';

export const createUser = async (userData: ISignUpRequest) => {
  const user = await User.create(userData);

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
