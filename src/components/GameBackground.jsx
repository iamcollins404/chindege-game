import { motion } from 'framer-motion';

export const GameBackground = ({ isFlying, multiplier }) => {
  return (
    <>
      {/* Rain effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-0.5 h-4 bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: -20,
              opacity: 0.3
            }}
            animate={isFlying ? {
              y: ['0%', '120%'],
              opacity: [0.3, 0]
            } : {}}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.25
            }}
            animate={isFlying ? {
              x: [null, '-100%'],
              opacity: [0.5, 0]
            } : {}}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Cloud effects */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute w-32 h-32 bg-white rounded-full filter blur-xl opacity-20"
            initial={{ 
              x: '100%',
              y: Math.random() * 100 + '%',
              scale: Math.random() * 1 + 0.5
            }}
            animate={isFlying ? {
              x: [null, '-100%']
            } : {}}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Speed lines effect */}
      {isFlying && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`speed-${i}`}
              className="absolute h-[1px] bg-blue-400/30"
              style={{
                width: Math.random() * 50 + 50,
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%'
              }}
              animate={{
                x: [0, -200],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random()
              }}
            />
          ))}
        </div>
      )}

      {/* Lightning effect */}
      {isFlying && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5 + 3,
              ease: 'easeInOut'
            }}
          />
        </div>
      )}
    </>
  );
};