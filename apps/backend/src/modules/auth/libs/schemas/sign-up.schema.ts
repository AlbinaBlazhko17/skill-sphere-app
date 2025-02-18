import vine from '@vinejs/vine';

const signUpSchema = vine.object({
  firstName: vine.string(),
  lastName: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(3),
});

export default vine.compile(signUpSchema);
