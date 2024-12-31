import { motion } from 'framer-motion';

export const Header = ({ balance, highScore, betAmount, onBetChange }) => {
  const betOptions = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Welcome to Chindege Game
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Current Balance</p>
          <p className="text-2xl font-bold text-white">${balance.toLocaleString()}</p>
        </div>
        
        <div className="hidden md:block bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Highest Win</p>
          <p className="text-2xl font-bold text-green-400">${highScore.toLocaleString()}</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400 mb-2">Select Bet Amount</p>
          <div className="flex gap-2">
            {betOptions.map((amount) => (
              <button
                key={amount}
                onClick={() => onBetChange(amount)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  betAmount === amount
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};