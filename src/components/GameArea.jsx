import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Plane } from './Plane';
import { GameBackground } from './GameBackground';

const PauseIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="mr-2"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

export const GameArea = ({ multiplier, isFlying, onStart, canStart, onCashOut, betAmount }) => {
  const currentWinAmount = (betAmount * multiplier).toFixed(2);

  const breathingAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      className="relative bg-gradient-radial from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl h-[400px] overflow-hidden border border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <GameBackground isFlying={isFlying} multiplier={multiplier} />
      
      {/* Ground line with glow effect */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute bottom-0 w-full h-[1px] bg-green-500/10" />
          <motion.div 
            className="h-[2px] bg-gradient-to-r from-green-500/20 via-green-500 to-green-500/20 mb-20 w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-green-500/5 to-transparent" />
        </motion.div>
        <Plane multiplier={multiplier} isFlying={isFlying} />
      </div>

      {/* Multiplier display */}
      <motion.div 
        className="absolute top-4 right-4 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
        initial={{ opacity: 0, scale: 0.5, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-4xl font-bold text-green-400">
          {multiplier.toFixed(1)}x
        </p>
      </motion.div>

      {/* Take Money Button */}
      {isFlying && (
        <motion.div 
          className="absolute top-4 left-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <motion.button
            onClick={onCashOut}
            animate={breathingAnimation}
            className="relative group bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 flex items-center"
          >
            <PauseIcon />
            <span className="relative z-10">Take Money ${currentWinAmount}</span>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </motion.button>
        </motion.div>
      )}

      {/* Start Flight Button Modal */}
      {!isFlying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <button
            onClick={onStart}
            disabled={!canStart}
            className={`relative group px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center gap-2 ${
              canStart
                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-5 h-5" />
              {canStart ? 'Play Now' : 'Insufficient Balance'}
            </span>
            {canStart && (
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};