import { verifyToken } from 'src/libs/utils/verify-token.js';
import type { IUpdateUser } from './libs/types/update-user.interface.js';
import {
	updateUserById,
	getUserById,
	deleteUserById,
	attachImageToUser,
	getUserImageById,
	getAllUsers,
	changeUserPassword,
} from './user.repository.js';
import changePasswordSchema from './libs/schemas/change-password.schema.js';
import { comparePassword } from '../auth/libs/utils/compare-passwords.js';

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

	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		imageUrl: user.imageUrl,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};

export const changePassword = async (
	id: string,
	oldPassword: string,
	newPassword: string,
) => {
	await changePasswordSchema.validate({ oldPassword, newPassword });
	const oldUser = await getUserById(id);

	if (!oldUser) {
		throw new Error('User not found');
	}

	const isOldPasswordValid = await comparePassword(
		oldPassword,
		oldUser.password,
	);

	if (!isOldPasswordValid) {
		throw new Error('Invalid password');
	}

	const user = await changeUserPassword(id, newPassword);

	if (!user) {
		throw new Error('User not found');
	}

	return user;
};
