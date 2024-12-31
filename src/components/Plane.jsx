import { motion } from 'framer-motion';

export const Plane = ({ multiplier, isFlying }) => {
  // Calculate horizontal position to use more screen space
  const xPosition = Math.min((multiplier - 0.1) * 80, 300);
  
  // Smoother height calculation with softer curve
  const height = -Math.min(Math.pow(multiplier, 1.2) * 15, 200);
  
  // More gradual rotation that peaks earlier
  const rotation = Math.min(25, Math.pow(multiplier - 0.1, 0.7) * 12);
  
  return (
    <motion.div
      className="relative ml-4"
      animate={{
        x: xPosition,
        y: height,
        rotate: isFlying ? rotation : 0,
        scale: isFlying ? 1 : 0.8
      }}
      transition={{ 
        duration: 0.2,
        type: "tween",
        ease: "linear"
      }}
    >
      <motion.div 
        className="relative"
        animate={{ 
          scale: isFlying ? [1, 1.02, 1] : 1,
        }}
        transition={{ 
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-5xl inline-block transform -rotate-12">✈️</span>
        {isFlying && (
          <>
            {/* Main engine trail */}
            <motion.div
              className="absolute -right-6 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0.7, 0],
                scale: [0.8, 2],
                x: [-5, -40]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "easeOut"
              }}
            >
              <div className="w-8 h-2 bg-blue-500/40 rounded-full blur-sm" />
            </motion.div>
            
            {/* Secondary trails */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute -right-4 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ 
                  opacity: [0.5, 0],
                  scale: [0.6, 1.5],
                  x: [-5, -25]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              >
                <div className="w-6 h-1.5 bg-blue-400/30 rounded-full blur-sm" />
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};