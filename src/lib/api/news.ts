export type NewsInput = {
  title: string;
  content: string;
  author?: string;
  published?: boolean;
};

const base = '/.netlify/functions/news';

export async function fetchNewsList() {
  const r = await fetch(base);
  if (!r.ok) throw new Error('Failed to fetch news');
  return r.json();
}

export async function createNews(payload: NewsInput, token?: string) {
  const headers: any = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
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
  const r = await fetch(`${base}?id=${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ id, ...payload }),
  });
  if (!r.ok) throw new Error('Update failed');
  return r.json();
}

export async function deleteNews(id: number, token?: string) {
  const headers: any = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const r = await fetch(`${base}?id=${id}`, { method: 'DELETE', headers });
  if (!r.ok) throw new Error('Delete failed');
  return r.json();
}