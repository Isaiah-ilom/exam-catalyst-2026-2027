import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Home, 
  Play, 
  FileText, 
  BarChart3, 
  User, 
  Settings, 
  Trophy,
  Target,
  Clock,
  BookMarked,
  HelpCircle,
  X,
  Zap
} from 'lucide-react';
import Button from '../Common/Button';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/app/dashboard',
      icon: Home,
      badge: null,
    },
    {
      name: 'Practice',
      href: '/app/practice',
      icon: Play,
      badge: 'Hot',
    },
    {
      name: 'Mock Exams',
      href: '/app/exam',
      icon: FileText,
      badge: null,
    },
    {
      name: 'Results',
      href: '/app/results',
      icon: BarChart3,
      badge: null,
    },
  ];

  const secondaryNavigation = [
    {
      name: 'Study Materials',
      href: '/app/study',
      icon: BookMarked,
    },
    {
      name: 'Challenges',
      href: '/app/challenges',
      icon: Trophy,
    },
    {
      name: 'Goals',
      href: '/app/goals',
      icon: Target,
    },
    {
      name: 'Schedule',
      href: '/app/schedule',
      icon: Clock,
    },
  ];

  const bottomNavigation = [
    {
      name: 'Profile',
      href: '/app/profile',
      icon: User,
    },
    {
      name: 'Settings',
      href: '/app/settings',
      icon: Settings,
    },
    {
      name: 'Help Center',
      href: '/app/help',
      icon: HelpCircle,
    },
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  const NavItem = ({ item, onClick }) => (
    <Link
      to={item.href}
      onClick={onClick}
      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive(item.href)
          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
      }`}
    >
      <item.icon
        className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${
          isActive(item.href)
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
        }`}
      />
      <span className="flex-1">{item.name}</span>
      {item.badge && (
        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200">
          {item.badge}
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <Link to="/app/dashboard" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Exam Catalyst
            </span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
            icon={X}
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-full">
          <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {/* Main Navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} onClick={onClose} />
              ))}
            </nav>

            {/* Study Tools */}
            <div>
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Study Tools
              </h3>
              <nav className="space-y-2">
                {secondaryNavigation.map((item) => (
                  <NavItem key={item.name} item={item} onClick={onClose} />
                ))}
              </nav>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg p-4 border border-primary-100 dark:border-primary-800">
              <div className="flex items-center mb-3">
                <Zap className="w-5 h-5 text-primary-600 mr-2" />
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Study Streak
                </h4>
              </div>
              <div className="text-2xl font-bold text-primary-600 mb-1">7 Days</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Keep it up! You're on fire 🔥
              </p>
              <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg p-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">78%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>

            {/* Upgrade Card */}
            <div className="bg-gradient-to-br from-accent-500 to-primary-600 rounded-lg p-4 text-white">
              <h4 className="font-semibold mb-2">Upgrade to Pro</h4>
              <p className="text-sm text-white/80 mb-3">
                Unlock advanced analytics and unlimited practice tests
              </p>
              <Button
                size="sm"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Upgrade Now
              </Button>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="space-y-2">
              {bottomNavigation.map((item) => (
                <NavItem key={item.name} item={item} onClick={onClose} />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;