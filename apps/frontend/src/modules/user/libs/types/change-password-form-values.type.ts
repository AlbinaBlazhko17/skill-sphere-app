import { z } from 'zod';
import { changePasswordSchema } from '../schemas';

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
