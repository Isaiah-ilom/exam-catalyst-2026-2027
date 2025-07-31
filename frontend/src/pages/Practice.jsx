import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Target, 
  Settings, 
  Star,
  TrendingUp,
  Filter,
  Search,
  ChevronRight,
  Zap,
  Award
} from 'lucide-react';
import { useExam } from '../context/ExamContext';
import { questionService } from '../services/questionService';
import Button from '../components/Common/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import SubjectSelection from '../components/Practice/SubjectSelection';
import TopicSelection from '../components/Practice/TopicSelection';
import PracticeMode from '../components/Practice/PracticeMode';

const Practice = () => {
  const navigate = useNavigate();
  const { startPractice, isLoading } = useExam();
  
  const [currentStep, setCurrentStep] = useState('subject'); // subject, topic, config, start
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [practiceConfig, setPracticeConfig] = useState({
    mode: 'practice', // practice, timed, challenge
    difficulty: 'mixed',
    questionCount: 20,
    timeLimit: 30,
    showExplanations: true,
    randomizeQuestions: true,
  });
  
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [recentPractice, setRecentPractice] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoadingData(true);
      const [subjectsData, recentData] = await Promise.all([
        questionService.getSubjects(),
        // Load recent practice sessions (mock data for now)
        Promise.resolve([
          {
            id: 1,
            subject: 'Mathematics',
            topic: 'Algebra',
            score: 85,
            questions: 20,
            timeSpent: 15,
            date: new Date(Date.now() - 2 * 60 * 60 * 1000),
          },
          {
            id: 2,
            subject: 'Physics',
            topic: 'Mechanics',
            score: 78,
            questions: 15,
            timeSpent: 12,
            date: new Date(Date.now() - 5 * 60 * 60 * 1000),
          },
          {
            id: 3,
            subject: 'Chemistry',
            topic: 'Organic Chemistry',
            score: 92,
            questions: 25,
            timeSpent: 18,
            date: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        ])
      ]);
      
      setSubjects(subjectsData);
      setRecentPractice(recentData);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const loadTopics = async (subject) => {
    try {
      const topicsData = await questionService.getTopics(subject);
      setTopics(topicsData);
    } catch (error) {
      console.error('Failed to load topics:', error);
      setTopics([]);
    }
  };

  const handleSubjectSelect = async (subject) => {
    setSelectedSubject(subject);
    await loadTopics(subject.name);
    setCurrentStep('topic');
  };

  const handleTopicSelect = (topics) => {
    setSelectedTopics(topics);
    setCurrentStep('config');
  };

  const handleConfigComplete = (config) => {
    setPracticeConfig(config);
    setCurrentStep('start');
  };

  const handleStartPractice = async () => {
    const practiceData = {
      subject: selectedSubject?.name,
      topics: selectedTopics.map(t => t.name),
      ...practiceConfig,
    };

    const result = await startPractice(practiceData);
    
    if (result.success) {
      navigate('/app/exam');
    }
  };

  const handleQuickStart = (subject) => {
    const quickConfig = {
      subject: subject,
      difficulty: 'mixed',
      questionCount: 20,
      timeLimit: 30,
      mode: 'practice',
    };
    
    startPractice(quickConfig).then((result) => {
      if (result.success) {
        navigate('/app/exam');
      }
    });
  };

  const quickStartSubjects = [
    { name: 'Mathematics', icon: '🔢', color: 'bg-blue-500', questions: 1250 },
    { name: 'English Language', icon: '📚', color: 'bg-green-500', questions: 980 },
    { name: 'Physics', icon: '⚛️', color: 'bg-purple-500', questions: 890 },
    { name: 'Chemistry', icon: '🧪', color: 'bg-red-500', questions: 760 },
    { name: 'Biology', icon: '🧬', color: 'bg-emerald-500', questions: 650 },
    { name: 'Geography', icon: '🌍', color: 'bg-orange-500', questions: 520 },
  ];

  const practiceStats = {
    totalSessions: 45,
    averageScore: 82,
    totalQuestions: 1250,
    streak: 7,
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" text="Loading practice data..." />
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'subject':
        return (
          <SubjectSelection
            subjects={subjects}
            selectedSubject={selectedSubject}
            onSubjectSelect={handleSubjectSelect}
            onBack={() => setCurrentStep('overview')}
          />
        );
      case 'topic':
        return (
          <TopicSelection
            subject={selectedSubject}
            topics={topics}
            selectedTopics={selectedTopics}
            onTopicSelect={handleTopicSelect}
            onBack={() => setCurrentStep('subject')}
          />
        );
      case 'config':
        return (
          <PracticeMode
            subject={selectedSubject}
            topics={selectedTopics}
            config={practiceConfig}
            onConfigComplete={handleConfigComplete}
            onBack={() => setCurrentStep('topic')}
          />
        );
      case 'start':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto">
              <Play className="w-12 h-12 text-primary-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to Start Practice
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedSubject?.name} • {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} • {practiceConfig.questionCount} questions
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Mode:</span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {practiceConfig.mode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Time Limit:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {practiceConfig.timeLimit} min
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {practiceConfig.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Explanations:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {practiceConfig.showExplanations ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setCurrentStep('config')}
                className="flex-1"
              >
                Back to Settings
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartPractice}
                loading={isLoading}
                className="flex-1"
                icon={Play}
              >
                Start Practice
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (currentStep !== 'overview') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <button
              onClick={() => setCurrentStep('overview')}
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              Practice
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="capitalize">{currentStep}</span>
          </div>
        </div>
        
        <div className="card">
          {renderStepContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Practice Sessions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sharpen your skills with targeted practice questions
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            icon={Settings}
          >
            Settings
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setCurrentStep('subject')}
            icon={Play}
          >
            Custom Practice
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{practiceStats.totalSessions}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{practiceStats.averageScore}%</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Questions Practiced</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{practiceStats.totalQuestions}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{practiceStats.streak} days</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Quick Start Practice
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep('subject')}
          >
            View All Subjects
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickStartSubjects.map((subject, index) => (
            <div
              key={index}
              className="group relative p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => handleQuickStart(subject.name)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                  {subject.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {subject.questions} questions available
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Practice Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Sessions
            </h2>
            
            <div className="space-y-4">
              {recentPractice.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {session.subject} - {session.topic}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {session.questions} questions • {session.timeSpent} minutes
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${session.score >= 80 ? 'text-green-600' : session.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {session.score}%
                    </div>
                    <p className="text-xs text-gray-500">
                      {session.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View All Sessions
            </Button>
          </div>
        </div>

        {/* Practice Tips */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Practice Tips
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-400">
                  Focus on your weakest subjects first for maximum improvement
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-blue-500 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-400">
                  Practice for 30-45 minutes daily to build consistency
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-green-500 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-400">
                  Review explanations for wrong answers to understand concepts
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Award className="w-4 h-4 text-purple-500 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-400">
                  Take timed practice to simulate real exam conditions
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Challenge Mode
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Test your speed and accuracy with time-pressured questions
              </p>
              <Button variant="primary" size="sm" className="w-full">
                Start Challenge
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;