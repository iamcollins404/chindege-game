import { motion } from 'framer-motion';
import { useState } from 'react';
import { DepositModal } from '../components/DepositModal';
import { useSoundEffects } from '../hooks/useSoundEffects';

export const WalletPage = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const { playClick } = useSoundEffects();

  return (
    <>
      <div className="p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 w-full">
        <h1 className="text-2xl font-bold text-white mb-6">Wallet</h1>
        <div className="space-y-4">
          <div className="bg-gray-900/50 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Available Balance</p>
            <p className="text-2xl font-bold text-green-400">$1,000.00</p>
          </div>
          
          <div className="grid gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playClick();
                setShowDepositModal(true);
              }}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-bold"
            >
              Deposit
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white font-bold"
            >
              Withdraw
            </motion.button>
          </div>
        </div>
      </div>

      <DepositModal 
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        playClick={playClick}
      />
    </>
  );
};