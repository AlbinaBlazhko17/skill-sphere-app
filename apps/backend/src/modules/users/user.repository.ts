import type { ISignUpRequest } from '../auth/libs/types/sign-up-request.interface.js';
import { User } from './user.model.js';

export const createUser = async (userData: ISignUpRequest) => {
  const user = await User.create(userData);

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
    updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
  };
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) return null;

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
    updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
  };
};

export const getUserById = async (id: string) => {
  const user = await User.findOne({ id });

  if (!user) return null;

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
    updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
  };
};
