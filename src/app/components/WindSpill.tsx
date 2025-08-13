import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SpillParticle {
  id: number;
  startX: number;
  startY: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export function WindSpill() {
  const [particles, setParticles] = useState<SpillParticle[]>([]);

  useEffect(() => {
    // Generate spill particles
    const newParticles: SpillParticle[] = [];
    
    // Create multiple spill sources
    const spillSources = [
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.1 },
      { x: window.innerWidth * 0.7, y: window.innerHeight * 0.15 },
      { x: window.innerWidth * 0.1, y: window.innerHeight * 0.3 },
    ];

    spillSources.forEach((source, sourceIndex) => {
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: sourceIndex * 100 + i,
          startX: source.x + (Math.random() - 0.5) * 40,
          startY: source.y,
          size: 3 + Math.random() * 8,
          color: [
            'bg-blue-400/60',
            'bg-cyan-400/70',
            'bg-sky-300/50',
            'bg-blue-300/40',
            'bg-teal-400/60'
          ][Math.floor(Math.random() * 5)],
          delay: Math.random() * 3 + sourceIndex * 0.5,
          duration: 8 + Math.random() * 6,
        });
      }
    });

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particle.color} blur-sm`}
          style={{
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            x: particle.startX,
            y: particle.startY,
            opacity: 0,
          }}
          animate={{
            x: [
              particle.startX,
              particle.startX + 50 + Math.random() * 100, // Initial spill spread
              particle.startX + 200 + Math.random() * 400, // Wind drift
              window.innerWidth + 100, // Exit screen
            ],
            y: [
              particle.startY,
              particle.startY + 100 + Math.random() * 200, // Fall down
              particle.startY + 150 + Math.random() * 100, // Slight rise from wind
              particle.startY + 200 + Math.random() * 300, // Final descent
            ],
            opacity: [0, 0.8, 0.6, 0],
            scale: [0.5, 1, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 2 + Math.random() * 4,
            times: [0, 0.2, 0.7, 1],
          }}
        />
      ))}
    </div>
  );
}