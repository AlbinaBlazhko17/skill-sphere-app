import { http, HttpResponse } from 'msw';
import { ApiPath } from '@skill-sphere/shared';
import type { SignUpFormValues } from '../src/modules/auth/libs/types';
import { log } from 'console';

export const handlers = [
  http.post<{}, SignUpFormValues>(`undefined/api/v1/auth/sign-up`, () => {
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
  }),
];
