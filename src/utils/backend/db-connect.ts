// Importing built-in dependencies
import { Pool } from 'pg';

// Create a new PostgreSQL connection pool
export const pool = new Pool({
	user: process.env.DB_USERNAME,
	host: process.env.DB_HOST,
	database:  process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.POSTGRES_PORT) || 5432,
});

module.exports = pool;