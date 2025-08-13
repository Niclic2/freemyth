import { motion } from 'framer-motion';
import { GlowButton } from '../GlowButton';

interface GamesPageProps {
  onGameSelect?: (gameId: string) => void;
}

export function GamesPage({ onGameSelect }: GamesPageProps) {
  const games = [
    {
      id: 'mystic-realms',
      title: 'Мистические Царства',
      description: 'Отправляйтесь в эпическое приключение через мистические земли, полные магии и тайн. Исследуйте древние руины, сражайтесь с мифическими существами и раскройте секреты царства.',
      status: 'Доступна',
      genre: 'Фэнтези RPG',
      features: ['Открытый Мир', 'Система Магии', 'Развитие Персонажа', 'Эпический Сюжет'],
      gameIcon: '🏰',
    },
    {
      id: 'pixel-warriors',
      title: 'Пиксельные Воины',
      description: 'Сражайтесь в подземельях и побеждайте легендарных боссов в этом классическом RPG опыте. Овладейте различными стилями боя и собирайте легендарное оружие.',
      status: 'Доступна',
      genre: 'Экшен RPG',
      features: ['Исследование Подземелий', 'Битвы с Боссами', 'Создание Оружия', 'Мультиплеер Кооп'],
      gameIcon: '⚔️',
    },
    {
      id: 'crystal-legends',
      title: 'Кристальные Легенды',
      description: 'Собирайте мощные кристаллы и создавайте свою судьбу в этом стратегическом приключении. Создайте свою команду и завоюйте сложные тактические битвы.',
      status: 'Доступна',
      genre: 'Стратегия RPG',
      features: ['Пошаговый Бой', 'Сбор Кристаллов', 'Создание Команды', 'Стратегическая Глубина'],
      gameIcon: '💎',
    },
    {
      id: 'shadow-realm',
      title: 'Царство Теней',
      description: 'Отправляйтесь в тёмные измерения, где тени оживают. RPG с хоррор тематикой, психологическими элементами и атмосферным повествованием.',
      status: 'Скоро',
      genre: 'Хоррор RPG',
      features: ['Атмосферный Хоррор', 'Психологические Элементы', 'Тёмная Магия', 'Механики Выживания'],
      gameIcon: '🌑',
    },
    {
      id: 'elemental-saga',
      title: 'Стихийная Сага',
      description: 'Овладейте четырьмя стихиями в этом эпическом путешествии через стихийные планы. Комбинируйте огонь, воду, землю и воздух для преодоления вызовов.',
      status: 'В Разработке',
      genre: 'Стихийная RPG',
      features: ['Стихийная Магия', 'Перемещение Планов', 'Система Комбо', 'Головоломки Окружения'],
      gameIcon: '🔥',
    },
    {
      id: 'time-runners',
      title: 'Бегуны Времени',
      description: 'Мчитесь сквозь время, чтобы предотвратить коллапс реальности. Быстрая RPG с механиками манипуляции времени и параллельными сюжетными линиями.',
      status: 'В Разработке',
      genre: 'Научная Фантастика RPG',
      features: ['Путешествие Во Времени', 'Параллельные Миры', 'Быстрый Бой', 'Множественные Временные Линии'],
      gameIcon: '⏰',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Доступна':
        return 'var(--freemyth-accent)';
      case 'Скоро':
        return '#4ade80';
      case 'В Разработке':
        return '#f59e0b';
      default:
        return 'var(--freemyth-light)';
    }
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
            Наши Игры
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--freemyth-light)' }}
          >
            Откройте для себя нашу коллекцию пиксельных RPG приключений, каждое из которых создано с любовью и вниманием к деталям.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="rounded-lg overflow-hidden"
              style={{ backgroundColor: 'var(--freemyth-secondary)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: '0 10px 30px rgba(113, 122, 125, 0.3)',
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="text-center">
                  <div className="text-6xl mb-4">{game.gameIcon}</div>
                  <div 
                    className="text-xl font-bold"
                    style={{ color: 'var(--freemyth-highlight)' }}
                  >
                    {game.title}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: getStatusColor(game.status),
                      color: 'var(--freemyth-dark)'
                    }}
                  >
                    {game.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className="text-xl font-bold"
                    style={{ color: 'var(--freemyth-highlight)' }}
                  >
                    {game.title}
                  </h3>
                  <span
                    className="text-sm px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: 'var(--freemyth-dark)',
                      color: 'var(--freemyth-accent)'
                    }}
                  >
                    {game.genre}
                  </span>
                </div>
                
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: 'var(--freemyth-light)' }}
                >
                  {game.description}
                </p>
                
                <div className="mb-4">
                  <h4
                    className="text-sm font-medium mb-2"
                    style={{ color: 'var(--freemyth-accent)' }}
                  >
                    Ключевые Особенности:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {game.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: 'var(--freemyth-dark)',
                          color: 'var(--freemyth-light)'
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <GlowButton 
                    size="sm" 
                    onClick={() => onGameSelect?.(game.id)}
                    className="flex-1"
                  >
                    Подробности
                  </GlowButton>
                  {game.status === 'Доступна' && (
                    <GlowButton size="sm" variant="secondary">
                      Скачать
                    </GlowButton>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}