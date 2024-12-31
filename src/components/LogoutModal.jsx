import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export const LogoutModal = ({ isOpen, onClose, onConfirm, playClick }) => {
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
                <h2 className="text-2xl font-bold mb-4 text-white">Confirm Logout</h2>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to logout?
                </p>
                
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
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playClick();
                      onConfirm();
                      onClose();
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                  >
                    Logout
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