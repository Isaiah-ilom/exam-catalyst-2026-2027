import React from 'react';
import { Heart, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <span>© 2026 Exam Catalyst. All rights reserved.</span>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for Nigerian students</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>Nigeria</span>
            </div>
            <span className="text-xs">
              Server Status: <span className="text-green-500">Online</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;