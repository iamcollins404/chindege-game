import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const paymentMethods = [
  { id: 'ecocash', label: 'EcoCash', icon: '📱' },
  { id: 'onemoney', label: 'OneMoney', icon: '📱' },
  { id: 'innbucks', label: 'InnBucks', icon: '📱' }
];

export const DepositModal = ({ isOpen, onClose, playClick }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle deposit logic here
    console.log('Deposit submitted:', {
      method: selectedMethod,
      amount,
      phoneNumber
    });
    onClose();
  };

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
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Deposit Funds</h2>
                <p className="text-gray-400 mt-2">Choose your preferred payment method</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div className="grid grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        playClick();
                        setSelectedMethod(method.id);
                      }}
                      className={`p-4 rounded-xl border ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      } transition-all duration-200`}
                    >
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <div className="text-sm font-medium text-white">{method.label}</div>
                    </motion.button>
                  ))}
                </div>

                {selectedMethod && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Amount Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Amount (USD)
                      </label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                        min="1"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g., +263 7X XXX XXXX"
                        className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          playClick();
                          onClose();
                        }}
                        className="flex-1 px-6 py-3 rounded-xl font-bold text-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all duration-200"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => playClick()}
                        className="flex-1 px-6 py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                      >
                        Deposit
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};