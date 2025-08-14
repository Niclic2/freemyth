import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlowButton } from '../GlowButton';

type DbNews = {
  id: number;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  author?: string;
  category?: string;
  icon?: string | null;
  read_time?: string | null;
  published: boolean;
  created_at: string;
  updated_at?: string | null;
};

export function NewsPage() {
  const [news, setNews] = useState<DbNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/.netlify/functions/news?limit=50');
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data: DbNews[] = await res.json();
        if (!mounted) return;
        setNews(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        if (!mounted) return;
        const msg =
          err instanceof Error ? err.message : typeof err === 'string' ? err : 'Неизвестная ошибка';
        setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const featured = news.length > 0 ? news[0] : null;
  const previous = news.length > 1 ? news.slice(1) : [];

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      'Разработка': '#3b82f6',
      'Особенности': '#10b981',
      'События': '#f59e0b',
      'Награды': '#8b5cf6',
      'За Кулисами': '#ef4444',
      'Трейлеры': '#06b6d4',
    };
    if (!category) return 'var(--freemyth-accent)';
    return colors[category] || 'var(--freemyth-accent)';
  };

  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: 'var(--freemyth-dark)' }}>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--freemyth-highlight)' }}>
            Последние Новости
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--freemyth-light)' }}>
            Официальная лента — главная новость сверху и предыдущие записи внизу.
          </p>
        </motion.div>

        {loading && (
          <div className="mb-8 text-center" style={{ color: 'var(--freemyth-light)' }}>
            Загрузка новостей...
          </div>
        )}
        {error && (
          <div className="mb-8 text-center" style={{ color: 'var(--freemyth-accent)' }}>
            Ошибка при загрузке новостей: {error}
          </div>
        )}

        {/* Featured */}
        {featured && (
          <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--freemyth-secondary)' }}>
              <div className="md:flex">
                <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-12">
                  <div className="text-center">
                    <div className="text-8xl mb-4">{featured.icon || '📰'}</div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--freemyth-highlight)' }}>
                      Последняя Новость
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: getCategoryColor(featured.category || featured.author || 'Из базы'), color: 'white' }}
                    >
                      {featured.category || featured.author || 'Из базы'}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--freemyth-accent)' }}>
                      {new Date(featured.created_at).toLocaleString()}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--freemyth-highlight)' }}>
                    {featured.title}
                  </h2>

                  <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--freemyth-light)' }}>
                    {featured.excerpt ? featured.excerpt : summarize(featured.content || '', 350)}
                  </p>

                  <div className="flex items-center justify-between">
                    <GlowButton>Читать Полную Статью</GlowButton>
                    <span className="text-sm" style={{ color: 'var(--freemyth-accent)' }}>
                      {featured.read_time || estimateReadTime(featured.content || '')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid: 1 / 2 / 3 columns */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          {previous.length === 0 && !loading && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center" style={{ color: 'var(--freemyth-light)' }}>
              Пока нет предыдущих новостей.
            </div>
          )}

          {previous.map((item, index) => (
            <motion.article key={item.id} className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--freemyth-secondary)' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 * index }} whileHover={{ scale: 1.02 }}>
              <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="text-center">
                  <div className="text-6xl mb-2">{item.icon || '📰'}</div>
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: getCategoryColor(item.category || item.author), color: 'white' }}>
                      {item.category || item.author || 'Из базы'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm" style={{ color: 'var(--freemyth-accent)' }}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--freemyth-accent)' }}>
                    {item.read_time || estimateReadTime(item.content || '')}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--freemyth-highlight)' }}>
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--freemyth-light)' }}>
                  {item.excerpt ? item.excerpt : summarize(item.content || '', 140)}
                </p>

                <GlowButton size="sm" className="w-full">
                  Читать Далее
                </GlowButton>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* Helpers */

function summarize(text: string, maxChars = 200) {
  if (!text) return '';
  const stripped = text.replace(/(<([^>]+)>)/gi, '');
  if (stripped.length <= maxChars) return stripped;
  return stripped.slice(0, maxChars).trim() + '…';
}

function estimateReadTime(text: string) {
  if (!text) return '1 мин чтения';
  const stripped = text.replace(/(<([^>]+)>)/gi, '');
  const words = stripped.trim().split(/\s+/).length || 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} мин чтения`;
}

export default NewsPage;