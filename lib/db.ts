import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

declare global {
  var _pgPool: Pool | undefined;
}

const pool = global._pgPool ?? new Pool({
  connectionString,
  max: 5,
  ssl: { rejectUnauthorized: false },
});

global._pgPool = pool;

export default pool;