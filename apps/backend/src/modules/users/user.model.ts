import mongoose, { type SchemaType } from 'mongoose';

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	createdAt: {
		type: Date,
	},
	updatedAt: {
		type: Date,
	},
});

userSchema.set('timestamps', true);

export const User = mongoose.model('User', userSchema);
