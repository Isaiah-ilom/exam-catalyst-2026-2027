import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  TrendingUp, 
  Clock, 
  Target, 
  Eye, 
  Download, 
  Share2,
  Filter,
  Calendar,
  BarChart3,
  BookOpen,
  Medal,
  Award
} from 'lucide-react';
import { examService } from '../services/examService';
import Button from '../components/Common/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ResultsView from '../components/Results/ResultsView';
import PerformanceChart from '../components/Results/PerformanceChart';
import Analytics from '../components/Results/Analytics';

const Results = () => {
  const [results, setResults] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('recent');
  const [filterSubject, setFilterSubject] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    loadResults();
    loadAnalytics();
  }, []);

  const loadResults = async () => {
    try {
      setIsLoading(true);
      const data = await examService.getUserResults();
      setResults(data.results || []);
    } catch (error) {
      console.error('Failed to load results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const data = await examService.getUserAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const mockResults = [
    {
      id: 1,
      examTitle: 'UTME Practice Test 1',
      type: 'practice',
      subjects: ['Mathematics', 'English', 'Physics', 'Chemistry'],
      score: { overall: { percentage: 85, correct: 136, total: 160 } },
      timeSpent: 125,
      date: new Date('2024-01-15'),
      grade: { letter: 'A', description: 'Excellent' },
      isPassed: true
    },
    {
      id: 2,
      examTitle: 'Mathematics Practice',
      type: 'practice',
      subjects: ['Mathematics'],
      score: { overall: { percentage: 78, correct: 31, total: 40 } },
      timeSpent: 35,
      date: new Date('2024-01-14'),
      grade: { letter: 'B', description: 'Very Good' },
      isPassed: true
    },
    {
      id: 3,
      examTitle: 'Physics Mock Exam',
      type: 'mock',
      subjects: ['Physics'],
      score: { overall: { percentage: 92, correct: 37, total: 40 } },
      timeSpent: 38,
      date: new Date('2024-01-13'),
      grade: { letter: 'A', description: 'Excellent' },
      isPassed: true
    }
  ];

  const mockAnalytics = {
    totalExams: 15,
    averageScore: 82.3,
    bestScore: 95,
    totalTimeSpent: 720,
    subjectPerformance: [
      { subject: 'Mathematics', averageScore: 78, totalExams: 8 },
      { subject: 'English', averageScore: 85, totalExams: 6 },
      { subject: 'Physics', averageScore: 80, totalExams: 5 },
      { subject: 'Chemistry', averageScore: 79, totalExams: 4 }
    ],
    performanceHistory: [
      { date: '2024-01-10', score: 75 },
      { date: '2024-01-11', score: 78 },
      { date: '2024-01-12', score: 82 },
      { date: '2024-01-13', score: 85 },
      { date: '2024-01-14', score: 88 },
      { date: '2024-01-15', score: 85 }
    ]
  };

  const displayResults = results.length > 0 ? results : mockResults;
  const displayAnalytics = analytics || mockAnalytics;

  const filteredResults = displayResults.filter(result => {
    if (filterSubject === 'all') return true;
    return result.subjects.includes(filterSubject);
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.score.overall.percentage - a.score.overall.percentage;
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'time':
        return a.timeSpent - b.timeSpent;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBadge = (grade) => {
    const colors = {
      A: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      B: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      C: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      D: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      F: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    
    return colors[grade.letter] || colors.F;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" text="Loading results..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Exam Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your performance and progress over time
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" icon={Download}>
            Export Results
          </Button>
          <Button variant="primary" size="sm" icon={BarChart3}>
            View Analytics
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {displayAnalytics.totalExams}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Exams
          </div>
        </div>
        
        <div className="card text-center">
          <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {displayAnalytics.averageScore}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Average Score
          </div>
        </div>
        
        <div className="card text-center">
          <Medal className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {displayAnalytics.bestScore}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Best Score
          </div>
        </div>
        
        <div className="card text-center">
          <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(displayAnalytics.totalTimeSpent / 60)}h
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Study Time
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setCurrentTab('recent')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            currentTab === 'recent'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Recent Results
        </button>
        <button
          onClick={() => setCurrentTab('analytics')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            currentTab === 'analytics'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Analytics
        </button>
        <button
          onClick={() => setCurrentTab('performance')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            currentTab === 'performance'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Performance Chart
        </button>
      </div>

      {currentTab === 'recent' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="input-field text-sm"
              >
                <option value="all">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="score">Sort by Score</option>
                <option value="time">Sort by Time</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {sortedResults.length} results
            </div>
          </div>

          <div className="space-y-4">
            {sortedResults.map((result) => (
              <div key={result.id} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {result.examTitle}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeBadge(result.grade)}`}>
                        Grade {result.grade.letter}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        result.type === 'practice' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        result.type === 'mock' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {result.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>
                          {result.score.overall.correct}/{result.score.overall.total}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{result.timeSpent} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{result.date.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      {result.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreColor(result.score.overall.percentage)}`}>
                      {result.score.overall.percentage}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {result.grade.description}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" icon={Eye}>
                        View
                      </Button>
                      <Button size="sm" variant="ghost" icon={Share2}>
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedResults.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't taken any exams yet. Start practicing to see your results here.
              </p>
              <Link to="/app/practice">
                <Button variant="primary">
                  Start Practice
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {currentTab === 'analytics' && (
        <Analytics analytics={displayAnalytics} />
      )}

      {currentTab === 'performance' && (
        <div className="card">
          <PerformanceChart data={displayAnalytics.performanceHistory} />
        </div>
      )}
    </div>
  );
};

export default Results;