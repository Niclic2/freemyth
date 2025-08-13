import { motion } from 'framer-motion';
import { GlowButton } from '../GlowButton';

export function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: 'Обновление Разработки Царства Теней',
      excerpt: 'Получите эксклюзивный взгляд на тёмные измерения и новые хоррор-механики, появляющиеся в нашем самом амбициозном проекте.',
      date: '15 января 2024',
      category: 'Разработка',
      readTime: '5 мин чтения',
      icon: '🌑',
    },
    {
      id: 2,
      title: 'Стихийная Сага: Раскрытие Боевой Системы',
      excerpt: 'Откройте, как стихийные комбинации революционизируют стратегический бой в нашем предстоящем RPG приключении.',
      date: '8 января 2024',
      category: 'Особенности',
      readTime: '4 мин чтения',
      icon: '🔥',
    },
    {
      id: 3,
      title: 'Кристальные Легенды: Зимний Фестивальный Ивент',
      excerpt: 'Присоединяйтесь к ограниченному по времени зимнему ивенту с эксклюзивными кристаллами, новыми квестами и праздничными наградами.',
      date: '20 декабря 2023',
      category: 'События',
      readTime: '3 мин чтения',
      icon: '💎',
    },
    {
      id: 4,
      title: 'Freemyth Studios Выигрывает Награду Инди Превосходства',
      excerpt: 'Мы гордимся получением признания за наш вклад в инди-игровое сообщество и возрождение пиксельного искусства.',
      date: '15 декабря 2023',
      category: 'Награды',
      readTime: '2 мин чтения',
      icon: '🏆',
    },
    {
      id: 5,
      title: 'За Кулисами: Процесс Пиксельного Искусства',
      excerpt: 'Погрузитесь глубоко в рабочий процесс нашего художника и изучите техники, которые оживляют наши миры.',
      date: '1 декабря 2023',
      category: 'За Кулисами',
      readTime: '6 мин чтения',
      icon: '🎨',
    },
    {
      id: 6,
      title: 'Бегуны Времени: Первые Кадры Геймплея',
      excerpt: 'Смотрите первый официальный трейлер геймплея, демонстрирующий механики манипуляции времени и исследование параллельных миров.',
      date: '22 ноября 2023',
      category: 'Трейлеры',
      readTime: '1 мин чтения',
      icon: '⏰',
    },
  ];

  const categories = ['Все', 'Разработка', 'Особенности', 'События', 'Награды', 'За Кулисами', 'Трейлеры'];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Разработка': '#3b82f6',
      'Особенности': '#10b981',
      'События': '#f59e0b',
      'Награды': '#8b5cf6',
      'За Кулисами': '#ef4444',
      'Трейлеры': '#06b6d4',
    };
    return colors[category as keyof typeof colors] || 'var(--freemyth-accent)';
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
          <h1
            className="text-5xl font-bold mb-6"
            style={{ color: 'var(--freemyth-highlight)' }}
          >
            Последние Новости
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--freemyth-light)' }}
          >
            Оставайтесь в курсе последних разработок, объявлений и закулисного контента от Freemyth Studios.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className="px-4 py-2 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: index === 0 ? 'var(--freemyth-secondary)' : 'transparent',
                color: index === 0 ? 'var(--freemyth-highlight)' : 'var(--freemyth-light)',
                border: `2px solid ${index === 0 ? 'var(--freemyth-accent)' : 'var(--freemyth-secondary)'}`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Article */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div
            className="rounded-lg overflow-hidden"
            style={{ backgroundColor: 'var(--freemyth-secondary)' }}
          >
            <div className="md:flex">
              <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-12">
                <div className="text-center">
                  <div className="text-8xl mb-4">{newsArticles[0].icon}</div>
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: 'var(--freemyth-highlight)' }}
                  >
                    Главная Новость
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: getCategoryColor(newsArticles[0].category),
                      color: 'white'
                    }}
                  >
                    {newsArticles[0].category}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: 'var(--freemyth-accent)' }}
                  >
                    {newsArticles[0].date}
                  </span>
                </div>
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ color: 'var(--freemyth-highlight)' }}
                >
                  {newsArticles[0].title}
                </h2>
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: 'var(--freemyth-light)' }}
                >
                  {newsArticles[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <GlowButton>Читать Полную Статью</GlowButton>
                  <span
                    className="text-sm"
                    style={{ color: 'var(--freemyth-accent)' }}
                  >
                    {newsArticles[0].readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.slice(1).map((article, index) => (
            <motion.article
              key={article.id}
              className="rounded-lg overflow-hidden"
              style={{ backgroundColor: 'var(--freemyth-secondary)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: '0 10px 30px rgba(113, 122, 125, 0.3)',
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="text-center">
                  <div className="text-6xl mb-2">{article.icon}</div>
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: getCategoryColor(article.category),
                        color: 'white'
                      }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span
                    className="text-sm"
                    style={{ color: 'var(--freemyth-accent)' }}
                  >
                    {article.date}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: 'var(--freemyth-accent)' }}
                  >
                    {article.readTime}
                  </span>
                </div>
                
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: 'var(--freemyth-highlight)' }}
                >
                  {article.title}
                </h3>
                
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--freemyth-light)' }}
                >
                  {article.excerpt}
                </p>
                
                <GlowButton size="sm" className="w-full">
                  Читать Далее
                </GlowButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}