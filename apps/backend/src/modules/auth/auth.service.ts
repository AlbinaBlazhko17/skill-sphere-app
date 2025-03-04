import { createUser, getUserByEmail } from '../users/user.repository.js';

import { generateToken } from '../../libs/utils/utils.js';
import signInSchema from './libs/schemas/sign-in.schema.js';
import signUpSchema from './libs/schemas/sign-up.schema.js';
import type { ISignInResponse, ISignUpRequest } from './libs/types/types.js';
import { comparePassword, hashPassword } from './libs/utils/utils.js';
import type { IUserResponse } from '../users/user.js';

export const signUp = async (
	userData: ISignUpRequest,
): Promise<IUserResponse> => {
	await signUpSchema.validate({ ...userData });

	const hashedPassword = await hashPassword(userData.password);

	const user = await createUser({
		...userData,
		password: hashedPassword,
	});

	return user;
};

export const signIn = async (
	email: string,
	password: string,
): Promise<ISignInResponse> => {
	await signInSchema.validate({ email, password });
	const user = await getUserByEmail(email);

	if (!user) {
		throw new Error('User not found');
	}

	const isPasswordValid = await comparePassword(password, user.password);

	if (!isPasswordValid) {
		throw new Error('Invalid password');
	}

	const token = generateToken(user.id);

	return {
		token,
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};
