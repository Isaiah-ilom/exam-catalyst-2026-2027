import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy, 
  BookOpen, 
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import { formatRelativeTime } from '../../utils/helpers';

const RecentActivities = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    const icons = {
      exam_completed: CheckCircle,
      practice_session: BookOpen,
      achievement_unlocked: Trophy,
      goal_achieved: Target,
      badge_earned: Award,
      score_improved: TrendingUp,
      exam_failed: XCircle,
      session_timeout: Clock,
    };
    return icons[type] || BookOpen;
  };

  const getActivityColor = (type) => {
    const colors = {
      exam_completed: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      practice_session: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      achievement_unlocked: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      goal_achieved: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
      badge_earned: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20',
      score_improved: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      exam_failed: 'text-red-600 bg-red-100 dark:bg-red-900/20',
      session_timeout: 'text-gray-600 bg-gray-100 dark:bg-gray-800',
    };
    return colors[type] || 'text-gray-600 bg-gray-100 dark:bg-gray-800';
  };

  const defaultActivities = [
    {
      id: 1,
      type: 'exam_completed',
      title: 'Completed Mock Exam',
      description: 'Mathematics, English, Physics, Chemistry',
      score: 85,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 2,
      type: 'achievement_unlocked',
      title: 'Achievement Unlocked',
      description: 'Streak Master - 7 day study streak',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: 3,
      type: 'practice_session',
      title: 'Practice Session',
      description: 'Physics - Mechanics (20 questions)',
      score: 90,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: 4,
      type: 'score_improved',
      title: 'Score Improvement',
      description: 'Chemistry average improved by 15%',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: 5,
      type: 'goal_achieved',
      title: 'Goal Achieved',
      description: 'Weekly target of 100 questions completed',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Recent Activity
      </h2>
      
      <div className="space-y-4">
        {displayActivities.slice(0, 5).map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.title}
                  </p>
                  {activity.score && (
                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded-full">
                      {activity.score}%
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {activity.description}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;