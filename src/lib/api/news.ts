export type NewsInput = {
  title: string;
  content: string;
  excerpt?: string;      // '' by default
  author?: string;       // 'Unknown' by default
  category?: string;     // 'Общее' by default
  icon?: string;         // '📰' by default
  read_time?: string;    // '1 мин чтения' by default
  published?: boolean;   // false by default
};

const base = '/.netlify/functions/news';

function parseErrorJson(obj: unknown, fallback = 'Request failed') {
  if (obj && typeof obj === 'object') {
    const o = obj as Record<string, unknown>;
    if (typeof o.error === 'string') return o.error;
  }
  return fallback;
}

export async function fetchNewsList(limit?: number) {
  const url = limit ? `${base}?limit=${encodeURIComponent(limit)}` : base;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Failed to fetch news');
  return r.json();
}

export async function createNews(payload: NewsInput, token?: string) {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    // HeadersInit can be a Record<string,string>
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  if (!payload.title) throw new Error('title is required');
  if (!payload.content) throw new Error('content is required');

  const r = await fetch(base, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!r.ok) {
    const err = await r.json().catch(() => null);
    const msg = parseErrorJson(err, 'Create failed');
    throw new Error(msg);
  }
  return r.json();
}

export async function updateNews(id: number, payload: Partial<NewsInput>, token?: string) {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;

  const r = await fetch(`${base}?id=${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ id, ...payload }),
  });

  if (!r.ok) {
    const err = await r.json().catch(() => null);
    const msg = parseErrorJson(err, 'Update failed');
    throw new Error(msg);
  }
  return r.json();
}

export async function deleteNews(id: number, token?: string) {
  const headers: HeadersInit = {};
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;

  const r = await fetch(`${base}?id=${id}`, { method: 'DELETE', headers });
  if (!r.ok) {
    const err = await r.json().catch(() => null);
    const msg = parseErrorJson(err, 'Delete failed');
    throw new Error(msg);
  }
  return r.json();
}