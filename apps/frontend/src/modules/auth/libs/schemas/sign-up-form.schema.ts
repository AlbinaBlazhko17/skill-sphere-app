import { PASSWORD_VALIDATION_REGEX } from '@skill-sphere/shared';
import { z } from 'zod';

export const signUpFormSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8).regex(PASSWORD_VALIDATION_REGEX),
});
