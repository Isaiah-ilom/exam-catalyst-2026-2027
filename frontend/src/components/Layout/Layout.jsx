import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Home, FileText, BarChart3, User, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/app/dashboard' },
    { name: 'Practice', icon: FileText, path: '/app/practice' },
    { name: 'Results', icon: BarChart3, path: '/app/results' },
    { name: 'Profile', icon: User, path: '/app/profile' },
    { name: 'Settings', icon: Settings, path: '/app/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:flex">
        <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />
        
        <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out z-50 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">CBT Practice</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map(item => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t">
              <div className="text-sm text-gray-600 mb-2">
                {user?.firstName} {user?.lastName}
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="bg-white border-b lg:hidden">
            <div className="px-4 py-3 flex items-center justify-between">
              <button onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <Link to="/" className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">CBT Practice</span>
              </Link>
              <div className="w-6" />
            </div>
          </header>

          <main className="min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
