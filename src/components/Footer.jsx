import { motion } from 'framer-motion';
import { Twitter, Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">
            © 2024 - 2025 Chindege Game. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
            <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
            <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="text-gray-400 hover:text-white transition-colors duration-200"
  >
    {icon}
  </motion.a>
);