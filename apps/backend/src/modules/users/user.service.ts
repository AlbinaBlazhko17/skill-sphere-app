import type { IUserResponse } from './libs/types/types.js';
import { getUserById } from './user.repository.js';

export const getUserInfo = async (userId: string): Promise<IUserResponse> => {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
