import { z } from 'zod';
import { personalProfileSchema } from '../schemas';

export type PersonalProfileFormValues = z.infer<typeof personalProfileSchema>;
