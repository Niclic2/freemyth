import { motion } from 'framer-motion';

interface SwayingElementProps {
  children: React.ReactNode;
  intensity?: number;
  duration?: number;
}

export function SwayingElement({ 
  children, 
  intensity = 2, 
  duration = 3 
}: SwayingElementProps) {
  return (
    <motion.div
      animate={{
        rotate: [-intensity, intensity, -intensity],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      style={{
        transformOrigin: 'bottom center',
      }}
    >
      {children}
    </motion.div>
  );
}