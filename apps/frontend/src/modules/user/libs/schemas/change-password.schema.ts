import { PASSWORD_VALIDATION_REGEX } from '@skill-sphere/shared';
import { z } from 'zod';

export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(1),
		newPassword: z.string().min(8).regex(PASSWORD_VALIDATION_REGEX),
		newPasswordConfirm: z.string().min(1),
	})
	.refine((data) => data.newPassword === data.newPasswordConfirm, {
		message: "Passwords don't match",
		path: ['passwordConfirmation'],
	});
