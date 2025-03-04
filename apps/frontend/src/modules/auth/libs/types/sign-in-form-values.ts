import { z } from 'zod';
import { signInFormSchema } from '../schemas';

export type SignInFormValues = z.infer<typeof signInFormSchema>;
