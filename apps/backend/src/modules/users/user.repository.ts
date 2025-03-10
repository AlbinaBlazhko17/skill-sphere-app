import type { ISignUpRequest } from '../auth/libs/types/sign-up-request.interface.js';
import type { IUpdateUser } from './libs/types/update-user.interface.js';
import { User } from './user.model.js';

export const createUser = async (userData: ISignUpRequest) => {
	const user = await User.create(userData);

	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		imageUrl: user.image ? 'http://localhost:8000/' + user.image : '',
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
		imageUrl: user.image ? 'http://localhost:8000/' + user.image : '',
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
		password: user.password,
		imageUrl: user.image ? 'http://localhost:8000/' + user.image : '',
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
		imageUrl: user.image ? 'http://localhost:8000/' + user.image : '',
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

export const attachImageToUser = async (id: string, image: string | null) => {
	const user = await User.findByIdAndUpdate(id, { image }, { new: true });

	if (!user) return null;

	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		imageUrl: user.image ? 'http://localhost:8000/' + user.image : '',
		createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
		updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
	};
};

export const getUserImageById = async (id: string) => {
	const user = await User.findById(id, 'image');

	if (!user) return null;

	return user.image;
};

export const getAllUsers = async () => {
	const users = await User.find();

	return users.map((user) => ({
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		imageUrl: user.image ? 'http://localhost:8000/' + user.image : '',
		createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
		updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
	}));
};

export const changeUserPassword = async (id: string, password: string) => {
	const user = await User.findByIdAndUpdate(id, {
		password,
		updatedAt: new Date(),
	});

	if (!user) return null;

	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		imageUrl: user.image ? 'http://localhost:8000/' + user.image : '',
		createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
		updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
	};
};
