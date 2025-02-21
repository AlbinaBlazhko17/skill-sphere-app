import type { ISignUpRequest } from '../auth/libs/types/sign-up-request.interface.js';
import type { IUpdateUser } from './libs/types/update-user.interface.js';
import type { IUserResponse } from './user.js';
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
  const user = await User.findById(id);

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

export const updateUserById = async (id: string, userData: IUpdateUser) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });

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

export const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id);

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

export const attachImageToUser = async (id: string, image: string) => {
  const user = await User.findByIdAndUpdate(id, { image }, { new: true });

  if (!user) return null;

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
    createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
    updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
  };
};
