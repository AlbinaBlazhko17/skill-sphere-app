import vine from '@vinejs/vine';

const signUpSchema = vine.object({
	email: vine.string().email(),
	password: vine.string().minLength(1),
});

export default vine.compile(signUpSchema);
