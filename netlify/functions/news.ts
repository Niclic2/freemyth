import { Handler } from '@netlify/functions';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon обычно требует SSL; если не нужно, удалите ssl опцию
  ssl: { rejectUnauthorized: false } as any,
});

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
};

function json(body: any, status = 200) {
  return { statusCode: status, headers: HEADERS, body: JSON.stringify(body) };
}

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

  try {
    // Поддерживаем optional ?limit= и ?id=
    const params = event.queryStringParameters || {};
    const id = params.id ? parseInt(params.id, 10) : null;
    const limit = params.limit ? Math.min(100, parseInt(params.limit, 10) || 10) : 100;

    if (event.httpMethod === 'GET') {
      if (id) {
        const { rows } = await pool.query(
          `SELECT id, title, excerpt, content, author, category, icon, read_time, published, created_at, updated_at
           FROM news WHERE id = $1 LIMIT 1`,
          [id]
        );
        return json(rows[0] || null);
      }

      const { rows } = await pool.query(
        `SELECT id, title, excerpt, content, author, category, icon, read_time, published, created_at, updated_at
         FROM news
         WHERE published = true
         ORDER BY created_at DESC
         LIMIT $1`,
        [limit]
      );

      return json(rows);
    }

    if (event.httpMethod === 'POST') {
      // Создать запись — титле и контент желательно обязательны, все остальное — с дефолтами
      const body = event.body ? JSON.parse(event.body) : {};
      const title: string = (body.title || '').trim();
      const content: string = (body.content || '').trim();

      if (!title) return json({ error: 'title is required' }, 400);
      if (!content) return json({ error: 'content is required' }, 400);

      const excerpt = typeof body.excerpt === 'string' ? body.excerpt : '';
      const author = typeof body.author === 'string' ? body.author : 'Unknown';
      const category = typeof body.category === 'string' ? body.category : 'Общее';
      const icon = typeof body.icon === 'string' ? body.icon : '📰';
      const read_time = typeof body.read_time === 'string' ? body.read_time : '1 мин чтения';
      const published = typeof body.published === 'boolean' ? body.published : false;

      const { rows } = await pool.query(
        `INSERT INTO news
         (title, excerpt, content, author, category, icon, read_time, published, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,now(),now())
         RETURNING id, title, excerpt, content, author, category, icon, read_time, published, created_at, updated_at`,
        [title, excerpt, content, author, category, icon, read_time, published]
      );

      return json(rows[0], 201);
    }

    if (event.httpMethod === 'PUT') {
      // Обновление — используем COALESCE, но передаём NULL для неуказанных полей
      const body = event.body ? JSON.parse(event.body) : {};
      const incomingId = body.id || id;
      const targetId = incomingId ? parseInt(incomingId, 10) : null;
      if (!targetId) return json({ error: 'id is required' }, 400);

      // При обновлении допускаем частичные поля; если поле не передано — передаём NULL, чтобы COALESCE
      const title = body.hasOwnProperty('title') ? body.title : null;
      const excerpt = body.hasOwnProperty('excerpt') ? body.excerpt : null;
      const content = body.hasOwnProperty('content') ? body.content : null;
      const author = body.hasOwnProperty('author') ? body.author : null;
      const category = body.hasOwnProperty('category') ? body.category : null;
      const icon = body.hasOwnProperty('icon') ? body.icon : null;
      const read_time = body.hasOwnProperty('read_time') ? body.read_time : null;
      const published = body.hasOwnProperty('published') ? body.published : null;

      const { rows } = await pool.query(
        `UPDATE news SET
           title = COALESCE($1, title),
           excerpt = COALESCE($2, excerpt),
           content = COALESCE($3, content),
           author = COALESCE($4, author),
           category = COALESCE($5, category),
           icon = COALESCE($6, icon),
           read_time = COALESCE($7, read_time),
           published = COALESCE($8, published),
           updated_at = now()
         WHERE id = $9
         RETURNING id, title, excerpt, content, author, category, icon, read_time, published, created_at, updated_at`,
        [title, excerpt, content, author, category, icon, read_time, published, targetId]
      );

      if (!rows[0]) return json({ error: 'Not found' }, 404);
      return json(rows[0]);
    }

    if (event.httpMethod === 'DELETE') {
      const incomingId = params.id || (event.body ? (() => { try { return JSON.parse(event.body).id } catch { return null } })() : null);
      const targetId = incomingId ? parseInt(incomingId, 10) : null;
      if (!targetId) return json({ error: 'id is required' }, 400);

      const { rows } = await pool.query(
        `DELETE FROM news WHERE id = $1 RETURNING id, title`,
        [targetId]
      );

      if (!rows[0]) return json({ error: 'Not found' }, 404);
      return json({ success: true, deleted: rows[0] });
    }

    return json({ error: 'Method Not Allowed' }, 405);
  } catch (err: any) {
    console.error('news function error', err);
    return json({ error: err.message || 'Internal Server Error' }, 500);
  }
};