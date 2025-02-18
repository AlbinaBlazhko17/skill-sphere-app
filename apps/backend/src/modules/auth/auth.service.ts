import jwt from 'jsonwebtoken';
import { type IUser } from '../users/user.js';
import { getUserByEmail } from '../users/user.repository.js';

import signUpSchema from './libs/schemas/sign-up.schema.js';
import type { ISignInResponse } from './libs/types/sign-in-response.interface.js';
import type { ISignUpRequest } from './libs/types/sign-up-request.interface.js';
import { comparePassword, hashPassword } from './libs/utils/utils.js';
import signInSchema from './libs/schemas/sign-in.schema.js';

const createUser = async (userData: ISignUpRequest): Promise<IUser> => {
  const hashedPassword = await hashPassword(userData.password);

  const user = await createUser({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

export const signUp = async (userData: ISignUpRequest): Promise<IUser> => {
  await signUpSchema.validate({ ...userData });

  const user = await createUser(userData);

  return user;
};

export const signIn = async (email: string, password: string): Promise<ISignInResponse> => {
  await signInSchema.validate({ email, password });
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = generateToken(user.email);

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

export const generateToken = (email: string): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign({ email }, jwtSecret, {
    expiresIn: '7d',
  });

  return token;
};

export const verifyToken = (token: string): IUser => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const user = jwt.verify(token, jwtSecret) as IUser;

  return user;
};
