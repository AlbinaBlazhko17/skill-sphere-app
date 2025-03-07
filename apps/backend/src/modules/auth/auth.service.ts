import { createUser, getUserByEmail } from '../users/user.js';

import type {
	IUserResponse,
	IUserResponseWithToken,
} from '@skill-sphere/shared';
import { generateToken } from '../../libs/utils/utils.js';
import signInSchema from './libs/schemas/sign-in.schema.js';
import signUpSchema from './libs/schemas/sign-up.schema.js';
import type { ISignUpRequest } from './libs/types/types.js';
import { comparePassword, hashPassword } from './libs/utils/utils.js';

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
): Promise<IUserResponseWithToken> => {
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
		imageUrl: user.imageUrl,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};
