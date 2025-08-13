import { motion } from 'framer-motion';

export function ContactsPage() {
  const socialLinks = [
    { name: 'Твиттер', icon: '🐦', url: '#', description: 'Последние обновления и новости' },
    { name: 'Дискорд', icon: '💬', url: '#', description: 'Общение с сообществом' },
    { name: 'YouTube', icon: '📺', url: '#', description: 'Трейлеры и геймплей видео' },
    { name: 'Инстаграм', icon: '📸', url: '#', description: 'Закулисный контент и арт' },
    { name: 'Стим', icon: '🎮', url: '#', description: 'Наши игры на Steam' },
    { name: 'Itch.io', icon: '🕹️', url: '#', description: 'Инди игры и демоверсии' },
  ];

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
            Свяжитесь с Нами
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--freemyth-light)' }}
          >
            Присоединяйтесь к нашему сообществу в социальных сетях и оставайтесь на связи 
            с последними новостями, обновлениями и закулисным контентом от Freemyth Studios.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-3xl font-bold text-center mb-12"
              style={{ color: 'var(--freemyth-highlight)' }}
            >
              Найдите Нас в Социальных Сетях
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="flex flex-col items-center gap-4 p-6 rounded-lg transition-all duration-300"
                  style={{ backgroundColor: 'var(--freemyth-secondary)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(113, 122, 125, 0.3)',
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="text-4xl">{social.icon}</span>
                  <div className="text-center">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: 'var(--freemyth-light)' }}
                    >
                      {social.name}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--freemyth-accent)' }}
                    >
                      {social.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Community Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div
              className="p-8 rounded-lg"
              style={{ backgroundColor: 'var(--freemyth-secondary)' }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: 'var(--freemyth-highlight)' }}
              >
                Присоединяйтесь к Нашему Сообществу
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">🎮</div>
                  <h4
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--freemyth-light)' }}
                  >
                    Игровое Сообщество
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--freemyth-accent)' }}
                  >
                    Обсуждайте стратегии, делитесь опытом и находите единомышленников
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📰</div>
                  <h4
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--freemyth-light)' }}
                  >
                    Новости и Обновления
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--freemyth-accent)' }}
                  >
                    Будьте первыми, кто узнает о новых играх и обновлениях
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🎨</div>
                  <h4
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--freemyth-light)' }}
                  >
                    Закулисный Контент
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--freemyth-accent)' }}
                  >
                    Смотрите процесс разработки и пиксельного искусства
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--freemyth-light)' }}
            >
              Мы активно взаимодействуем с нашим сообществом и ценим каждого игрока. 
              Присоединяйтесь к нашим социальным сетям, чтобы стать частью семьи Freemyth!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}