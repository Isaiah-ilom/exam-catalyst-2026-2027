import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Moon, 
  Sun, 
  Monitor,
  Save,
  Key,
  Trash2,
  Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { validateForm, changePasswordSchema } from '../utils/validation';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal';

const Settings = () => {
  const { user, changePassword, updateProfile } = useAuth();
  const { theme, setTheme, isDarkMode } = useTheme();
  
  const [activeTab, setActiveTab] = useState('account');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  
  const [settings, setSettings] = useState({
    notifications: {
      email: user?.preferences?.notifications?.email ?? true,
      push: user?.preferences?.notifications?.push ?? true,
      examReminders: user?.preferences?.notifications?.examReminders ?? true,
      resultNotifications: user?.preferences?.notifications?.resultNotifications ?? true,
      weeklyReports: user?.preferences?.notifications?.weeklyReports ?? true
    },
    exam: {
      showTimer: user?.preferences?.exam?.showTimer ?? true,
      autoSave: user?.preferences?.exam?.autoSave ?? true,
      showProgress: user?.preferences?.exam?.showProgress ?? true,
      allowCalculator: user?.preferences?.exam?.allowCalculator ?? true,
      confirmSubmit: user?.preferences?.exam?.confirmSubmit ?? true
    },
    privacy: {
      showProfile: user?.preferences?.privacy?.showProfile ?? true,
      showStats: user?.preferences?.privacy?.showStats ?? true,
      allowMessages: user?.preferences?.privacy?.allowMessages ?? true
    }
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'exam', label: 'Exam Settings', icon: SettingsIcon },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Eye }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      await updateProfile({ preferences: settings });
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    const { isValid, errors } = validateForm(passwordData, changePasswordSchema);
    
    if (!isValid) {
      setPasswordErrors(errors);
      return;
    }

    setIsLoading(true);
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    
    if (result.success) {
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setPasswordErrors({});
    }
    
    setIsLoading(false);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Account Information
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <p className="text-gray-900 dark:text-white">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <p className="text-gray-900 dark:text-white">
                {user?.email}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowPasswordModal(true)}
              icon={Key}
            >
              Change Password
            </Button>
            <Button variant="outline" icon={Download}>
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <div className="card border-red-200 dark:border-red-800">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
          Danger Zone
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button
          variant="danger"
          onClick={() => setShowDeleteModal(true)}
          icon={Trash2}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Notification Preferences
      </h3>
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900 dark:text-white capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {key === 'email' && 'Receive notifications via email'}
                {key === 'push' && 'Receive push notifications in browser'}
                {key === 'examReminders' && 'Get reminded about scheduled exams'}
                {key === 'resultNotifications' && 'Get notified when results are ready'}
                {key === 'weeklyReports' && 'Receive weekly performance reports'}
              </p>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', key, !value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExamSettings = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Exam Preferences
      </h3>
      <div className="space-y-4">
        {Object.entries(settings.exam).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900 dark:text-white capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {key === 'showTimer' && 'Display countdown timer during exams'}
                {key === 'autoSave' && 'Automatically save answers as you progress'}
                {key === 'showProgress' && 'Show progress bar during exams'}
                {key === 'allowCalculator' && 'Enable built-in calculator during exams'}
                {key === 'confirmSubmit' && 'Ask for confirmation before submitting'}
              </p>
            </div>
            <button
              onClick={() => handleSettingChange('exam', key, !value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Privacy Settings
      </h3>
      <div className="space-y-4">
        {Object.entries(settings.privacy).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900 dark:text-white capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {key === 'showProfile' && 'Make your profile visible to other users'}
                {key === 'showStats' && 'Display your statistics on leaderboards'}
                {key === 'allowMessages' && 'Allow other users to send you messages'}
              </p>
            </div>
            <button
              onClick={() => handleSettingChange('privacy', key, !value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Theme Preferences
      </h3>
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Choose how Exam Catalyst 2026 looks to you. Select a single theme, or sync with your system.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleThemeChange('light')}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === 'light'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="font-medium text-gray-900 dark:text-white">Light</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Clean and minimal</div>
          </button>
          
          <button
            onClick={() => handleThemeChange('dark')}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === 'dark'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            <Moon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="font-medium text-gray-900 dark:text-white">Dark</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Easy on the eyes</div>
          </button>
          
          <button
            onClick={() => handleThemeChange('system')}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === 'system'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            <Monitor className="w-8 h-8 mx-auto mb-2 text-gray-500" />
            <div className="font-medium text-gray-900 dark:text-white">System</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Follow system setting</div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'exam':
        return renderExamSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Button
          onClick={handleSaveSettings}
          variant="primary"
          loading={isLoading}
          icon={Save}
        >
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
              className={`input-field ${passwordErrors.currentPassword ? 'border-red-500' : ''}`}
              placeholder="Enter current password"
            />
            {passwordErrors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              className={`input-field ${passwordErrors.newPassword ? 'border-red-500' : ''}`}
              placeholder="Enter new password"
            />
            {passwordErrors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmNewPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
              className={`input-field ${passwordErrors.confirmNewPassword ? 'border-red-500' : ''}`}
              placeholder="Confirm new password"
            />
            {passwordErrors.confirmNewPassword && (
              <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmNewPassword}</p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowPasswordModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handlePasswordChange}
              loading={isLoading}
              className="flex-1"
            >
              Change Password
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Are you absolutely sure?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </p>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
              What will be deleted:
            </h4>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              <li>• Your profile and account information</li>
              <li>• All exam results and performance data</li>
              <li>• Study progress and achievements</li>
              <li>• Settings and preferences</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="flex-1"
            >
              Yes, delete my account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;