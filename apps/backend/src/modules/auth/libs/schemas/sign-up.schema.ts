import { PASSWORD_VALIDATION_REGEX } from '@skill-sphere/shared';
import vine, { SimpleMessagesProvider } from '@vinejs/vine';

const signUpSchema = vine.object({
	firstName: vine.string().minLength(3),
	lastName: vine.string().minLength(2),
	email: vine.string().email(),
	password: vine.string().minLength(8).regex(PASSWORD_VALIDATION_REGEX),
});

const messages = {
	'firstName.minLength': 'First name must be at least 3 characters long',
	'lastName.minLength': 'Last name must be at least 2 characters long',
	'email.email': 'Invalid email',
	'password.minLength': 'Password must be at least 8 characters long',
	'password.regex':
		'Password must contain at least one uppercase letter, one lowercase letter, and one number',
};

vine.messagesProvider = new SimpleMessagesProvider(messages);

export default vine.compile(signUpSchema);
