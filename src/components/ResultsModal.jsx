import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export const ResultsModal = ({ 
  isOpen, 
  onClose, 
  onPlayAgain, 
  multiplier, 
  winAmount, 
  type,
  playClick
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-[90vw] max-w-md mx-auto"
          >
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mb-4 text-6xl"
                >
                  {type === 'win' ? '🎉' : '💥'}
                </motion.div>

                <h2 className={`text-3xl font-bold mb-4 ${type === 'win' ? 'text-green-400' : 'text-red-500'}`}>
                  {type === 'win' ? 'Money Collected!' : 'Plane Crashed!'}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Final Multiplier</p>
                    <p className={`text-3xl font-bold ${type === 'win' ? 'text-green-400' : 'text-red-500'}`}>
                      {multiplier.toFixed(2)}x
                    </p>
                  </div>

                  {type === 'win' && (
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Amount Won</p>
                      <p className="text-3xl font-bold text-green-400">
                        ${winAmount.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playClick();
                      onClose();
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all duration-200"
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playClick();
                      onPlayAgain();
                      onClose();
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                  >
                    Play Again
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};