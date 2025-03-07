import vine from '@vinejs/vine';

const changePasswordSchema = vine.object({
	oldPassword: vine.string().minLength(1),
	newPassword: vine.string().minLength(1),
});

export default vine.compile(changePasswordSchema);
