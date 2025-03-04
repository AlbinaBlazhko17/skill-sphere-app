import mongoose from 'mongoose';

async function up() {
	await mongoose.connection
		.collection('users')
		.updateMany({}, { $set: { image: '' } });
	console.log('Migration 001: Added image field to users collection.');
}

async function down() {
	await mongoose.connection
		.collection('users')
		.updateMany({}, { $unset: { image: '' } });
	console.log(
		'Migration 001 (Down): Removed image field from users collection.',
	);
}

export { up, down };
