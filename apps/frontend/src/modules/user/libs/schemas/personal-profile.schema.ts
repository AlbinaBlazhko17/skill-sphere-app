import { z } from 'zod';

export const personalProfileSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
});
