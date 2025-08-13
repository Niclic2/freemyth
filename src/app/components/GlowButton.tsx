import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GlowButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}: GlowButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--freemyth-secondary)',
      color: 'var(--freemyth-highlight)',
      border: '2px solid var(--freemyth-accent)',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--freemyth-light)',
      border: '2px solid var(--freemyth-secondary)',
    },
  };

  return (
    <motion.button
      className={`rounded-lg font-medium relative overflow-hidden ${sizeClasses[size]} ${className}`}
      style={variantStyles[variant]}
      onClick={onClick}
      
      // Анимация при наведении:
      whileHover={{ 
        scale: 1.02, // Увеличение на 5%
        boxShadow: `0 0 20px ${variant === 'primary' ? 'rgba(113, 122, 125, 0.5)' : 'rgba(47, 69, 93, 0.5)'}`,
      }}
      transition={{ 
        duration: 0.1, // Очень быстрая длительность для всех свойств при наведении
        ease: "easeOut" // Плавное замедление в конце анимации
      }}
      
      // Анимация при нажатии:
      whileTap={{ scale: 0.95 }} // Кнопка слегка уменьшается при нажатии
      
      // Анимация появления кнопки (оставлена как в предыдущих версиях)
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}