import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=skill-sphere`;
console.log('Connecting', url);
mongoose
	.connect(url)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Failed to connect to MongoDB', err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, 'migrations');
const migrationFiles = fs.readdirSync(migrationsDir).sort();

async function runMigrations() {
	for (const file of migrationFiles) {
		const migration = await import(path.join(migrationsDir, file));
		console.log(`Running migration: ${file}`);
		await migration.up();
	}
	console.log('All migrations completed.');
}

async function revertMigrations() {
	for (const file of migrationFiles.reverse()) {
		const migration = await import(path.join(migrationsDir, file));
		console.log(`Reverting migration: ${file}`);
		await migration.down();
	}
	console.log('All migrations reverted.');
}

const command = process.argv[2];
if (command === 'up') {
	runMigrations().then(() => process.exit());
} else if (command === 'down') {
	revertMigrations().then(() => process.exit());
} else {
	console.log('Usage: node migrate.js [up|down]');
	process.exit(1);
}
