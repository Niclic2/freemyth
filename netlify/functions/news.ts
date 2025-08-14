import { Handler } from '@netlify/functions';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon обычно требует SSL; если не нужно, удалите ssl опцию
  ssl: { rejectUnauthorized: false } as any,
});

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // по необходимости ограничьте
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        ...HEADERS,
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: HEADERS,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Поддерживаем optional ?limit= и ?id=
    const params = event.queryStringParameters || {};
    const id = params.id ? parseInt(params.id, 10) : null;
    const limit = params.limit ? Math.min(100, parseInt(params.limit, 10) || 10) : 100;

    if (id) {
      const { rows } = await pool.query(
        `SELECT id, title, excerpt, content, author, category, icon, read_time, published, created_at, updated_at
         FROM news WHERE id = $1 LIMIT 1`,
        [id]
      );
      const row = rows[0] || null;
      return { statusCode: 200, headers: HEADERS, body: JSON.stringify(row) };
    }

    const { rows } = await pool.query(
      `SELECT id, title, excerpt, content, author, category, icon, read_time, published, created_at, updated_at
       FROM news
       WHERE published = true
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    );

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(rows),
    };
  } catch (err: any) {
    console.error('news function error', err);
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};