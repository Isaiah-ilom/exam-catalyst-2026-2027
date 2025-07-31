import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  FileText, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp,
  BookOpen,
  Users,
  Calendar,
  ArrowRight,
  Star,
  Award,
  Zap,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { examService } from '../services/examService';
import Button from '../components/Common/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentActivities from '../components/Dashboard/RecentActivities';
import PerformanceChart from '../components/Results/PerformanceChart';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [stats, activities, analytics] = await Promise.all([
        examService.getDashboardStats(),
        examService.getRecentActivities(),
        examService.getUserAnalytics(),
      ]);
      
      setDashboardData({
        stats,
        activities,
        analytics,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Start Practice',
      description: 'Practice with subject-specific questions',
      icon: Play,
      color: 'bg-green-500',
      href: '/app/practice',
      badge: 'Popular',
    },
    {
      title: 'Take Mock Exam',
      description: 'Full UTME simulation experience',
      icon: FileText,
      color: 'bg-blue-500',
      href: '/app/exam',
      badge: null,
    },
    {
      title: 'View Results',
      description: 'Check your performance analytics',
      icon: BarChart3,
      color: 'bg-purple-500',
      href: '/app/results',
      badge: null,
    },
    {
      title: 'Study Materials',
      description: 'Access notes and video lessons',
      icon: BookOpen,
      color: 'bg-orange-500',
      href: '/app/study',
      badge: 'New',
    },
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Completed your first practice test',
      icon: Star,
      earned: true,
      date: '2 days ago',
    },
    {
      id: 2,
      title: 'Speed Demon',
      description: 'Answered 10 questions in under 5 minutes',
      icon: Zap,
      earned: true,
      date: '1 week ago',
    },
    {
      id: 3,
      title: 'Perfect Score',
      description: 'Score 100% on any practice test',
      icon: Trophy,
      earned: false,
      progress: 85,
    },
    {
      id: 4,
      title: 'Streak Master',
      description: 'Maintain a 7-day study streak',
      icon: Award,
      earned: true,
      date: 'Today',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Mathematics Practice Session',
      time: '2:00 PM Today',
      type: 'practice',
      subjects: ['Mathematics'],
    },
    {
      id: 2,
      title: 'Full Mock Exam',
      time: '10:00 AM Tomorrow',
      type: 'exam',
      subjects: ['Mathematics', 'English', 'Physics', 'Chemistry'],
    },
    {
      id: 3,
      title: 'Weekly Challenge',
      time: 'Saturday 9:00 AM',
      type: 'challenge',
      subjects: ['Mixed'],
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    totalQuestions: 0,
    correctAnswers: 0,
    averageScore: 0,
    studyStreak: 0,
    totalExams: 0,
    currentRank: 0,
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-16 translate-y-4 opacity-10">
          <Trophy className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-primary-100 mb-6 text-lg">
            Ready to boost your UTME score today? You've practiced{' '}
            <span className="font-semibold text-white">{stats.totalQuestions}</span> questions so far!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/app/practice">
              <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Start Practicing
                <Play className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/app/exam">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Take Mock Exam
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Questions Practiced"
          value={stats.totalQuestions}
          icon={BookOpen}
          color="blue"
          change="+12%"
          changeType="positive"
        />
        <StatsCard
          title="Average Score"
          value={`${stats.averageScore}%`}
          icon={Target}
          color="purple"
          change="+5%"
          changeType="positive"
        />
        <StatsCard
          title="Study Streak"
          value={`${stats.studyStreak} days`}
          icon={Zap}
          color="green"
          change="Active"
          changeType="neutral"
        />
        <StatsCard
          title="Current Rank"
          value={`#${stats.currentRank}`}
          icon={Trophy}
          color="yellow"
          change="↑3"
          changeType="positive"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className="relative group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {action.title}
                        </h3>
                        {action.badge && (
                          <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full">
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Performance Overview
            </h2>
            <PerformanceChart data={dashboardData?.analytics?.performanceHistory || []} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Upcoming Events */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Upcoming
              </h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {event.time}
                  </p>
                  <div className="flex items-center space-x-2">
                    {event.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View Calendar
            </Button>
          </div>

          {/* Recent Achievements */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Achievements
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    achievement.earned
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.earned
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    }`}>
                      <achievement.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                      {achievement.earned ? (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Earned {achievement.date}
                        </p>
                      ) : achievement.progress && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="text-gray-900 dark:text-white">{achievement.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div 
                              className="bg-primary-600 h-1.5 rounded-full" 
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <RecentActivities activities={dashboardData?.activities || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;