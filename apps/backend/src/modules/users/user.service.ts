import type { IUpdateUser } from './libs/types/update-user.interface.js';
import type { IUserResponse } from './user.js';
import { updateUserById, getUserById } from './user.repository.js';

export const getUser = async (id: string) => {
  const user = await getUserById(id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const updateUser = async (id: string, userData: IUpdateUser) => {
  const updatedUser = await updateUserById(id, userData);

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};
