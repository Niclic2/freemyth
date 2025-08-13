import { motion } from 'framer-motion';
import { WindParticle } from './WindParticle';
import { WindSpill } from './WindSpill';
import { WindFlow } from './WindFlow';

export function WindEffect() {
  // Generate multiple particles with random properties
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    size: 2 + Math.random() * 6,
    opacity: 0.1 + Math.random() * 0.4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Background gradient to simulate atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-blue-50" />
      
      {/* Wind flow streams */}
      <WindFlow />
      
      {/* Wind spill effect */}
      <WindSpill />
      
      {/* Wind particles */}
      {particles.map((particle) => (
        <WindParticle
          key={particle.id}
          delay={particle.delay}
          duration={particle.duration}
          size={particle.size}
          opacity={particle.opacity}
        />
      ))}
      
      {/* Wind streaks for additional effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`streak-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-gray-300/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              width: '300px',
              left: '-300px',
            }}
            animate={{
              x: [0, window.innerWidth + 300],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              delay: i * 0.7,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}