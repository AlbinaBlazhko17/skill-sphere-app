import { http, HttpResponse } from 'msw';
import type { SignUpFormValues } from '../src/modules/auth/libs/types';
import { VITE_BE_URL } from '../src/libs/constants';
import { ApiPath, AuthApiPath } from '@skill-sphere/shared';

export const handlers = [
	http.post<never, SignUpFormValues>(
		`${VITE_BE_URL}/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
		() => {
			return HttpResponse.json({
				message: 'User created successfully',
				user: {
					id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
					firstName: 'John',
					lastName: 'Doe',
					email: 'email14@example.com',
					createdAt: Date.now(),
					updatedAt: Date.now(),
				},
			});
		},
	),
];
