import { motion } from 'framer-motion';
import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'games', label: 'Наши Игры' },
    { id: 'about', label: 'О Нас' },
    { id: 'news', label: 'Новости' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4"
      style={{ backgroundColor: 'var(--freemyth-dark)' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={() => onPageChange('home')}
        >
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--freemyth-secondary)' }}
          >
            <div 
              className="w-6 h-6 rounded-sm"
              style={{ backgroundColor: 'var(--freemyth-light)' }}
            />
          </div>
          <h1 
            className="text-2xl font-bold tracking-wide"
            style={{ color: 'var(--freemyth-light)' }}
          >
            FREEMYTH
          </h1>
        </motion.div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className="relative px-4 py-2 rounded-lg font-medium"
              style={{
                color: currentPage === item.id ? 'var(--freemyth-highlight)' : 'var(--freemyth-light)',
              }}
              onClick={() => onPageChange(item.id)}
              
              // Изменения здесь:
              whileHover={{ 
                scale: 1.1, 
                color: 'var(--freemyth-highlight)', 
                backgroundColor: 'var(--freemyth-secondary)', 
              }}
              transition={{ 
                duration: 0.2, // Общая длительность анимации наведения
                backgroundColor: { duration: 0.4 }, // Специфичная длительность для backgroundColor
                color: { duration: 0.2 }, // Специфичная длительность для color
                scale: { duration: 0.2 } // Специфичная длительность для scale
              }}
              whileTap={{ scale: 0.95 }}
              
              animate={{
                backgroundColor: currentPage === item.id ? 'var(--freemyth-secondary)' : 'transparent',
                color: currentPage === item.id ? 'var(--freemyth-highlight)' : 'var(--freemyth-light)',
              }}
              // transition для animate уже есть и работает хорошо
            >
              {item.label}
              
              {currentPage === item.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--freemyth-highlight)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}