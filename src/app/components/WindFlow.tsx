import { motion } from 'framer-motion';

export function WindFlow() {
  const flows = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    startY: 10 + i * 15,
    delay: i * 0.8,
    duration: 12 + Math.random() * 8,
    thickness: 2 + Math.random() * 4,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {flows.map((flow) => (
        <motion.div
          key={flow.id}
          className="absolute"
          style={{
            top: `${flow.startY}%`,
            left: '-100px',
            height: `${flow.thickness}px`,
            opacity: flow.opacity,
          }}
          initial={{
            width: 0,
            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), rgba(34, 197, 194, 0.5), transparent)',
          }}
          animate={{
            width: ['0px', '200px', `${window.innerWidth + 200}px`],
            x: [0, 50, window.innerWidth + 100],
            background: [
              'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), rgba(34, 197, 194, 0.5), transparent)',
              'linear-gradient(90deg, transparent, rgba(34, 197, 194, 0.7), rgba(59, 130, 246, 0.4), transparent)',
              'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.3), rgba(6, 182, 212, 0.2), transparent)',
            ],
          }}
          transition={{
            duration: flow.duration,
            delay: flow.delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 3,
            times: [0, 0.3, 1],
          }}
        />
      ))}
      
      {/* Additional curved flow lines */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 4 }, (_, i) => (
          <motion.path
            key={`curve-${i}`}
            d={`M -50 ${100 + i * 80} Q ${window.innerWidth * 0.3} ${80 + i * 80} ${window.innerWidth * 0.7} ${120 + i * 80} T ${window.innerWidth + 50} ${100 + i * 80}`}
            fill="none"
            stroke="rgba(59, 130, 246, 0.4)"
            strokeWidth={2 + Math.random() * 3}
            strokeLinecap="round"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              delay: i * 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 4,
              times: [0, 0.7, 1],
            }}
          />
        ))}
      </svg>
    </div>
  );
}