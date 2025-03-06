import { verifyToken } from 'src/libs/utils/verify-token.js';
import type { IUpdateUser } from './libs/types/update-user.interface.js';
import {
	updateUserById,
	getUserById,
	deleteUserById,
	attachImageToUser,
	getUserImageById,
	getAllUsers,
} from './user.repository.js';

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

export const deleteUser = async (id: string): Promise<void> => {
	const user = await deleteUserById(id);

	if (!user) {
		throw new Error('User not found');
	}

	return;
};

export const updateUserImage = async (id: string, image: string | null) => {
	const user = await attachImageToUser(id, image);

	if (!user) {
		throw new Error('User not found');
	}

	return user;
};

export const getUserImage = async (id: string) => {
	const image = await getUserImageById(id);

	if (!image) {
		throw new Error('User not found');
	}

	return image;
};

export const getUsers = async () => {
	const users = await getAllUsers();

	if (!users.length) {
		throw new Error('Users not found');
	}

	return users;
};

export const getUserByToken = async (token: string) => {
	const userId = verifyToken(token);

	const user = await getUserById(userId);

	if (!user) {
		throw new Error('User not found');
	}

	return user;
};
