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

export async function fetchNewsList(limit?: number) {
  const url = limit ? `${base}?limit=${encodeURIComponent(limit)}` : base;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Failed to fetch news');
  return r.json();
}

export async function createNews(payload: NewsInput, token?: string) {
  const headers: any = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  // Ensure required fields presence on client side too
  if (!payload.title) throw new Error('title is required');
  if (!payload.content) throw new Error('content is required');

  const r = await fetch(base, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error || 'Create failed');
  }
  return r.json();
}

export async function updateNews(id: number, payload: Partial<NewsInput>, token?: string) {
  const headers: any = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  // We send partial payload; server будет COALESCE и не сломает NOT NULL
  const r = await fetch(`${base}?id=${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ id, ...payload }),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error || 'Update failed');
  }
  return r.json();
}

export async function deleteNews(id: number, token?: string) {
  const headers: any = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const r = await fetch(`${base}?id=${id}`, { method: 'DELETE', headers });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error || 'Delete failed');
  }
  return r.json();
}