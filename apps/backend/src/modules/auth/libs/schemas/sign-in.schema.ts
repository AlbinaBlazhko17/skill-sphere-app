import vine from '@vinejs/vine';
import { PASSWORD_VALIDATION_REGEX } from '@skill-sphere/shared';

const signUpSchema = vine.object({
	email: vine.string().email(),
	password: vine.string().minLength(8).regex(PASSWORD_VALIDATION_REGEX),
});

export default vine.compile(signUpSchema);
