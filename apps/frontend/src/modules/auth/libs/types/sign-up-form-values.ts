import { z } from 'zod';
import { signUpFormSchema } from '../schemas';

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
