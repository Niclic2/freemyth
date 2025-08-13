import { motion } from 'framer-motion';

export function AboutPage() {
  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: 'var(--freemyth-dark)' }}>
      {/* Hero Section */}
      <motion.section
        className="py-20 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl font-bold mb-8"
            style={{ color: 'var(--freemyth-highlight)' }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            О Freemyth Studios
          </motion.h1>
          
          <motion.p
            className="text-xl leading-relaxed mb-8"
            style={{ color: 'var(--freemyth-light)' }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Мы - страстная команда разработчиков, художников и рассказчиков, посвятивших себя созданию 
            захватывающих пиксельных RPG опытов. Основанная в 2019 году, наша миссия - создавать игры, 
            которые переносят игроков в фантастические миры, полные приключений, тайн и чудес.
          </motion.p>
          
          <motion.p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--freemyth-accent)' }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Наши игры сочетают классическую пиксельную эстетику с современными игровыми механиками, 
            создавая уникальные опыты, которые чтят золотой век RPG, одновременно раздвигая 
            границы возможного в жанре.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission & Values */}
      <motion.section
        className="py-20 px-8"
        style={{ backgroundColor: 'var(--freemyth-secondary)' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--freemyth-highlight)' }}
          >
            Наша Миссия и Ценности
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Инновации',
                description: 'Мы постоянно раздвигаем границы дизайна пиксельных RPG, внедряя свежие механики и техники повествования.',
                icon: '⚡',
              },
              {
                title: 'Качество',
                description: 'Каждый пиксель, каждая строка кода, каждая музыкальная нота создаются с тщательным вниманием к деталям.',
                icon: '💎',
              },
              {
                title: 'Сообщество',
                description: 'Мы слушаем наших игроков и создаём игры, которые объединяют людей через общие приключения.',
                icon: '🤝',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-6 rounded-lg"
                style={{ backgroundColor: 'var(--freemyth-dark)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: 'var(--freemyth-light)' }}
                >
                  {value.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--freemyth-accent)' }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Studio Philosophy */}
      <motion.section
        className="py-20 px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl font-bold mb-8"
            style={{ color: 'var(--freemyth-highlight)' }}
          >
            Наша Философия
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'var(--freemyth-secondary)' }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--freemyth-light)' }}
              >
                🎨 Пиксельно Точное Искусство
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: 'var(--freemyth-accent)' }}
              >
                Каждый спрайт, каждая анимация, каждый фон тщательно создаются, чтобы вызвать ностальгию 
                при соблюдении современных визуальных стандартов.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'var(--freemyth-secondary)' }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--freemyth-light)' }}
              >
                📚 Богатое Повествование
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: 'var(--freemyth-accent)' }}
              >
                Мы верим, что отличные RPG строятся на захватывающих повествованиях, которые заставляют игроков 
                заботиться о мире и персонажах, которых они встречают.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'var(--freemyth-secondary)' }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--freemyth-light)' }}
              >
                🎮 Увлекательный Геймплей
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: 'var(--freemyth-accent)' }}
              >
                От пошагового боя до механик исследования, каждая система разработана так, чтобы быть 
                интуитивной, но достаточно глубокой для любителей стратегии.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'var(--freemyth-secondary)' }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--freemyth-light)' }}
              >
                🌟 Опыт Игрока
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: 'var(--freemyth-accent)' }}
              >
                Мы приоритизируем доступность, плавную производительность и обратную связь игроков, 
                чтобы создать игры, которыми все могут наслаждаться.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}