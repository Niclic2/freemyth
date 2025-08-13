import { motion } from 'framer-motion';
import { GlowButton } from '../GlowButton';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const featuredGames = [
    {
      id: 'mystic-realms',
      title: 'Мистические Царства',
      description: 'Отправляйтесь в эпическое приключение через мистические земли, полные магии и тайн.',
    },
    {
      id: 'pixel-warriors',
      title: 'Пиксельные Воины',
      description: 'Сражайтесь в подземельях и побеждайте легендарных боссов в этой классической RPG.',
    },
    {
      id: 'crystal-legends',
      title: 'Кристальные Легенды',
      description: 'Собирайте мощные кристаллы и создавайте свою судьбу в этом стратегическом приключении.',
    },
  ];

  // Варианты анимации для простого появления
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }, // Плавное появление за 0.6 секунды
  };

  const fadeInWithDelay = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: delay } },
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--freemyth-dark)' }}>
      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-20 px-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn} // Применяем общий плавный fadeIn для секции
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-6xl font-bold mb-6 tracking-wide"
            style={{ color: 'var(--freemyth-highlight)' }}
            variants={fadeInWithDelay(0.1)} // Появляется чуть позже
          >
            FREEMYTH STUDIOS
          </motion.h1>
          
          <motion.p
            className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--freemyth-light)' }}
            variants={fadeInWithDelay(0.2)} // Появляется еще чуть позже
          >
            Создаём захватывающие пиксельные RPG, которые переносят игроков в миры приключений, 
            магии и бесконечных возможностей. Откройте для себя нашу коллекцию рукотворных игр.
          </motion.p>
          
          <motion.div
            className="flex gap-6 justify-center"
            variants={fadeInWithDelay(0.3)} // Появляется последней
          >
            <GlowButton size="lg" onClick={() => onPageChange('games')}>
              Исследовать Наши Игры
            </GlowButton>
            <GlowButton size="lg" variant="secondary" onClick={() => onPageChange('about')}>
              О Нашей Студии
            </GlowButton>
          </motion.div>
        </div>

        {/* Floating particles effect - Оставлен минималистичный вариант, можно убрать полностью если не нужен */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => ( // Уменьшено количество частиц
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full" // Меньший размер
              style={{ 
                backgroundColor: 'var(--freemyth-accent)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0], // Меньшее движение
                opacity: [0.1, 0.4, 0.1], // Едва заметное мерцание
              }}
              transition={{
                duration: 3 + Math.random() * 2, // Чуть дольше, чтобы было спокойнее
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* Featured Games */}
      <motion.section
        className="py-20 px-8"
        style={{ backgroundColor: 'var(--freemyth-secondary)' }}
        initial="hidden"
        animate="visible"
        variants={fadeInWithDelay(0.4)} // Секция появляется после Hero
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--freemyth-highlight)' }}
          >
            Рекомендуемые Игры
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <motion.div
                key={game.id}
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: 'var(--freemyth-dark)' }}
                initial="hidden"
                animate="visible"
                variants={fadeInWithDelay(0.5 + index * 0.1)} // Каждая карточка появляется с небольшой задержкой
                whileHover={{ scale: 1.02, transition: { duration: 0.1 } }} // Очень легкий эффект при наведении
              >
                <div 
                  className="h-48 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden flex items-center justify-center"
                >
                  <div 
                    className="text-center p-6"
                    style={{ color: 'var(--freemyth-highlight)' }}
                  >
                    <div className="text-4xl mb-4">🎮</div>
                    <div className="text-lg font-bold">{game.title}</div>
                    <div className="text-sm opacity-75">Пиксельная RPG Игра</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: 'var(--freemyth-light)' }}
                  >
                    {game.title}
                  </h3>
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: 'var(--freemyth-accent)' }}
                  >
                    {game.description}
                  </p>
                  <GlowButton size="sm">
                    Узнать Больше
                  </GlowButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}