import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye } from 'lucide-react';

export const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const transactions = [
    { id: 1, type: 'win', amount: 250.00, date: '2024-01-10 14:30', category: 'game', multiplier: 2.5, betAmount: 100 },
    { id: 2, type: 'loss', amount: 100.00, date: '2024-01-10 14:25', category: 'game', multiplier: 1.2, betAmount: 100 },
    { id: 3, type: 'deposit', amount: 500.00, date: '2024-01-10 14:20', category: 'wallet', method: 'Credit Card' },
    { id: 4, type: 'win', amount: 180.00, date: '2024-01-10 14:15', category: 'game', multiplier: 1.8, betAmount: 100 },
    { id: 5, type: 'withdraw', amount: 300.00, date: '2024-01-10 14:10', category: 'wallet', method: 'Bank Transfer' },
  ];

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'deposit', label: 'Deposits' },
    { id: 'withdraw', label: 'Withdrawals' },
    { id: 'win', label: 'Wins' },
    { id: 'loss', label: 'Losses' },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === 'all') return true;
    return transaction.type === activeTab;
  });

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'win':
        return '🎉';
      case 'loss':
        return '💥';
      case 'deposit':
        return '⬇️';
      case 'withdraw':
        return '⬆️';
      default:
        return '💰';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'win':
        return 'text-green-400';
      case 'loss':
        return 'text-red-500';
      case 'deposit':
        return 'text-blue-400';
      case 'withdraw':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTransactionLabel = (transaction) => {
    switch (transaction.type) {
      case 'win':
        return 'Won';
      case 'loss':
        return 'Lost';
      case 'deposit':
        return 'Deposit';
      case 'withdraw':
        return 'Withdrawal';
      default:
        return transaction.type;
    }
  };

  const getTransactionSign = (type) => {
    switch (type) {
      case 'win':
      case 'deposit':
        return '+';
      case 'loss':
      case 'withdraw':
        return '-';
      default:
        return '+';
    }
  };

  return (
    <>
      <div className="p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6">Transaction History</h1>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500/20 to-green-500/20 text-white'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 h-[72px] p-4 rounded-xl flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  <span className="text-2xl">{getTransactionIcon(transaction.type)}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-400 truncate">{transaction.date}</p>
                  <div className="flex items-center gap-2">
                    <p className={`font-bold truncate ${getTransactionColor(transaction.type)}`}>
                      {getTransactionSign(transaction.type)}${transaction.amount.toFixed(2)}
                    </p>
                    <span className="flex-shrink-0 text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">
                      {getTransactionLabel(transaction)}
                    </span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTransaction(transaction)}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 bg-gray-700 hover:bg-gray-600 transition-all duration-200"
              >
                <Eye size={18} />
                <span className="text-sm">View</span>
              </motion.button>
            </motion.div>
          ))}

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No transactions found</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTransaction(null)}
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
                <div className="text-4xl mb-4">
                  {getTransactionIcon(selectedTransaction.type)}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Transaction Details
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Amount</p>
                  <p className={`text-xl font-bold ${getTransactionColor(selectedTransaction.type)}`}>
                    {getTransactionSign(selectedTransaction.type)}${selectedTransaction.amount.toFixed(2)}
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Date & Time</p>
                  <p className="text-white">{selectedTransaction.date}</p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="text-white">{getTransactionLabel(selectedTransaction)}</p>
                </div>

                {selectedTransaction.category === 'game' && (
                  <>
                    <div className="bg-gray-900/50 p-4 rounded-xl">
                      <p className="text-sm text-gray-400">Bet Amount</p>
                      <p className="text-white">${selectedTransaction.betAmount.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-xl">
                      <p className="text-sm text-gray-400">Multiplier</p>
                      <p className="text-white">{selectedTransaction.multiplier}x</p>
                    </div>
                  </>
                )}

                {selectedTransaction.category === 'wallet' && (
                  <div className="bg-gray-900/50 p-4 rounded-xl">
                    <p className="text-sm text-gray-400">Method</p>
                    <p className="text-white">{selectedTransaction.method}</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTransaction(null)}
                  className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-bold"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};