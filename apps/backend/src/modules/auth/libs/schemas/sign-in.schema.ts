import vine from '@vinejs/vine';

const signUpSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(3),
});

export default vine.compile(signUpSchema);
