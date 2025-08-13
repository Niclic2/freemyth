import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WindParticleProps {
  delay?: number;
  duration?: number;
  size?: number;
  opacity?: number;
}

export function WindParticle({ 
  delay = 0, 
  duration = 8, 
  size = 4, 
  opacity = 0.6 
}: WindParticleProps) {
  const [startPosition, setStartPosition] = useState({ x: -20, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Randomize starting and ending positions
    const startY = Math.random() * window.innerHeight;
    const endY = startY + (Math.random() - 0.5) * 200; // Slight vertical drift
    const endX = window.innerWidth + 50;

    setStartPosition({ x: -20, y: startY });
    setEndPosition({ x: endX, y: endY });
  }, []);

  return (
    <motion.div
      className="absolute rounded-full bg-gray-300/60"
      style={{
        width: size,
        height: size,
        opacity: opacity,
      }}
      initial={startPosition}
      animate={endPosition}
      transition={{
        duration: duration,
        delay: delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
    />
  );
}