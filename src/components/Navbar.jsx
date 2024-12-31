import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LogoutModal } from './LogoutModal';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { playClick } = useSoundEffects();
  const location = useLocation();

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  // Close sidebar when location changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const handleLogout = () => {
    // Add logout logic here
    console.log('User logged out');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-md border-b border-gray-700 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/game">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center"
                >
                  <span className="text-xl transform -rotate-12">✈️</span>
                </motion.div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-400 to-blue-400">
                  Chindege
                </span>
              </motion.div>
            </Link>
            
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center gap-3"
            >
              <NavLink to="/game" text="Home" isActive={isActive('/game')} />
              <NavLink to="/game/wallet" text="Wallet" isActive={isActive('/game/wallet')} />
              <NavLink to="/game/history" text="History" isActive={isActive('/game/history')} />
              <NavLink to="/game/settings" text="Settings" isActive={isActive('/game/settings')} />
              <NavLink 
                text="Logout" 
                onClick={() => setIsLogoutModalOpen(true)}
              />
            </motion.div>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-blue-500/20 to-green-500/20 text-white hover:bg-gradient-to-br hover:from-blue-500/30 hover:to-green-500/30 transition-all duration-200"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-gradient-to-b from-gray-900/90 via-blue-900/90 to-gray-900/90 backdrop-blur-md shadow-xl z-50 md:hidden border-l border-gray-700"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-white">Menu</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-gray-300 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <MobileNavLink 
                    to="/game"
                    text="Home" 
                    isActive={isActive('/game')}
                    onClick={() => setIsSidebarOpen(false)}
                  />
                  <MobileNavLink 
                    to="/game/wallet"
                    text="Wallet"
                    isActive={isActive('/game/wallet')}
                    onClick={() => setIsSidebarOpen(false)}
                  />
                  <MobileNavLink 
                    to="/game/history"
                    text="History"
                    isActive={isActive('/game/history')}
                    onClick={() => setIsSidebarOpen(false)}
                  />
                  <MobileNavLink 
                    to="/game/settings"
                    text="Settings"
                    isActive={isActive('/game/settings')}
                    onClick={() => setIsSidebarOpen(false)}
                  />
                  <MobileNavLink 
                    text="Logout"
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        playClick={playClick}
      />
    </>
  );
};

const NavLink = ({ to, text, isActive, onClick }) => {
  if (onClick) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-green-500/20 hover:text-white transition-all duration-200"
      >
        {text}
      </motion.button>
    );
  }

  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
          transition-all duration-200
          ${isActive 
            ? 'bg-gradient-to-br from-blue-500/20 to-green-500/20 text-white' 
            : 'text-gray-300 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-green-500/20 hover:text-white'
          }
        `}
      >
        {text}
      </motion.div>
    </Link>
  );
};

const MobileNavLink = ({ to, text, isActive, onClick }) => {
  if (onClick && !to) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium w-full text-gray-300 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-green-500/20 hover:text-white transition-all duration-200"
      >
        {text}
      </motion.button>
    );
  }

  return (
    <Link to={to}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium w-full
          transition-all duration-200
          ${isActive 
            ? 'bg-gradient-to-br from-blue-500/20 to-green-500/20 text-white' 
            : 'text-gray-300 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-green-500/20 hover:text-white'
          }
        `}
      >
        {text}
      </motion.div>
    </Link>
  );
};