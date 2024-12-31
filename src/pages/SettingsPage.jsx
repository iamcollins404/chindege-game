import { motion } from 'framer-motion';
import { Volume2, VolumeX, Bell, BellOff } from 'lucide-react';
import { useState } from 'react';

export const SettingsPage = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Add password change logic here
    setShowPasswordModal(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <>
      <div className="p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
            <div>
              <p className="font-semibold text-white">Sound Effects</p>
              <p className="text-sm text-gray-400">Enable or disable game sounds</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-3 rounded-lg ${
                soundEnabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </motion.button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
            <div>
              <p className="font-semibold text-white">Notifications</p>
              <p className="text-sm text-gray-400">Get alerts for important events</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`p-3 rounded-lg ${
                notificationsEnabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {notificationsEnabled ? <Bell size={24} /> : <BellOff size={24} />}
            </motion.button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
            <div>
              <p className="font-semibold text-white">Password</p>
              <p className="text-sm text-gray-400">Update your account password</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Change Password
            </motion.button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPasswordModal(false)}
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
                <h2 className="text-2xl font-bold text-white">Change Password</h2>
                <p className="text-gray-400 mt-2">Enter your current password and choose a new one</p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 p-3 rounded-xl bg-gray-700 text-gray-300 font-medium hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                  >
                    Update Password
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};