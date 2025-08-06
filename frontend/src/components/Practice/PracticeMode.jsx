import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, Target, Zap, Settings, HelpCircle, BookOpen, Shuffle } from 'lucide-react';
import Button from '../Common/Button';

const PracticeMode = ({ subject, topics, config, onConfigComplete, onBack }) => {
  const [practiceConfig, setPracticeConfig] = useState({
    mode: 'practice',
    difficulty: 'mixed',
    questionCount: 20,
    timeLimit: 30,
    showExplanations: true,
    randomizeQuestions: true,
    allowReview: true,
    showTimer: true,
    ...config
  });

  const modes = [
    {
      id: 'practice',
      name: 'Practice Mode',
      description: 'Relaxed learning with instant feedback',
      icon: BookOpen,
      color: 'bg-blue-500',
      features: ['Instant feedback', 'Explanations after each question', 'No time pressure', 'Review allowed'],
      recommended: true
    },
    {
      id: 'timed',
      name: 'Timed Practice',
      description: 'Practice with time constraints',
      icon: Clock,
      color: 'bg-orange-500',
      features: ['Time pressure simulation', 'Explanations at the end', 'Review allowed', 'Performance tracking'],
      recommended: false
    },
    {
      id: 'challenge',
      name: 'Challenge Mode',
      description: 'Fast-paced competitive practice',
      icon: Zap,
      color: 'bg-purple-500',
      features: ['Speed focused', 'Leaderboard tracking', 'No explanations', 'High intensity'],
      recommended: false
    },
    {
      id: 'exam',
      name: 'Exam Simulation',
      description: 'Full exam experience',
      icon: Target,
      color: 'bg-red-500',
      features: ['Strict timing', 'No hints', 'Single attempt', 'Realistic conditions'],
      recommended: false
    }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', description: 'Basic concepts and straightforward questions' },
    { value: 'medium', label: 'Medium', description: 'Moderate difficulty with some complexity' },
    { value: 'hard', label: 'Hard', description: 'Advanced concepts and challenging problems' },
    { value: 'mixed', label: 'Mixed', description: 'Balanced mix of all difficulty levels' }
  ];

  const questionCountOptions = [10, 15, 20, 25, 30, 40, 50];
  const timeLimitOptions = [15, 20, 30, 45, 60, 90, 120];

  const handleModeChange = (mode) => {
    let updatedConfig = { ...practiceConfig, mode };
    
    switch (mode) {
      case 'practice':
        updatedConfig = {
          ...updatedConfig,
          showExplanations: true,
          allowReview: true,
          showTimer: false,
          timeLimit: 60
        };
        break;
      case 'timed':
        updatedConfig = {
          ...updatedConfig,
          showExplanations: false,
          allowReview: true,
          showTimer: true,
          timeLimit: 30
        };
        break;
      case 'challenge':
        updatedConfig = {
          ...updatedConfig,
          showExplanations: false,
          allowReview: false,
          showTimer: true,
          timeLimit: 15,
          questionCount: Math.min(practiceConfig.questionCount, 20)
        };
        break;
      case 'exam':
        updatedConfig = {
          ...updatedConfig,
          showExplanations: false,
          allowReview: false,
          showTimer: true,
          timeLimit: 45,
          randomizeQuestions: true
        };
        break;
      default:
        break;
    }
    
    setPracticeConfig(updatedConfig);
  };

  const handleConfigChange = (key, value) => {
    setPracticeConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    onConfigComplete(practiceConfig);
  };

  const totalTopics = topics?.length || 0;
  const totalQuestions = topics?.reduce((sum, topic) => sum + (topic.questionCount || 0), 0) || 0;
  const estimatedTime = Math.round((practiceConfig.questionCount * 1.5) + (practiceConfig.mode === 'practice' ? 10 : 0));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Configure Practice Session
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div className={`w-4 h-4 ${subject?.color || 'bg-gray-500'} rounded`}></div>
              <span>{subject?.name || 'Subject'}</span>
            </div>
            <span>•</span>
            <span>{totalTopics} topic{totalTopics !== 1 ? 's' : ''}</span>
            <span>•</span>
            <span>{totalQuestions} questions available</span>
          </div>
        </div>
        <Button variant="ghost" onClick={onBack} icon={ArrowLeft}>
          Back
        </Button>
      </div>

      {/* Mode Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Choose Practice Mode
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 ${
                practiceConfig.mode === mode.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md'
              } bg-white dark:bg-gray-800`}
            >
              {mode.recommended && (
                <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                  Recommended
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${mode.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                  <mode.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg mb-2 ${
                    practiceConfig.mode === mode.id ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'
                  }`}>
                    {mode.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {mode.description}
                  </p>
                  <div className="space-y-1">
                    {mode.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Settings */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Basic Settings
          </h3>
          
          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Difficulty Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              {difficultyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleConfigChange('difficulty', option.value)}
                  className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                    practiceConfig.difficulty === option.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Number of Questions
            </label>
            <div className="grid grid-cols-4 gap-2">
              {questionCountOptions.map((count) => (
                <button
                  key={count}
                  onClick={() => handleConfigChange('questionCount', count)}
                  disabled={count > totalQuestions}
                  className={`p-2 text-center rounded-lg border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    practiceConfig.questionCount === count
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Time Limit (minutes)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {timeLimitOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => handleConfigChange('timeLimit', time)}
                  className={`p-2 text-center rounded-lg border transition-all duration-200 ${
                    practiceConfig.timeLimit === time
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}
                >
                  {time}m
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Advanced Options
          </h3>
          
          <div className="space-y-4">
            {/* Show Explanations */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Show Explanations</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Display detailed explanations after answers
                </div>
              </div>
              <button
                onClick={() => handleConfigChange('showExplanations', !practiceConfig.showExplanations)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  practiceConfig.showExplanations ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    practiceConfig.showExplanations ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Randomize Questions */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Randomize Questions</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Shuffle question order for variety
                </div>
              </div>
              <button
                onClick={() => handleConfigChange('randomizeQuestions', !practiceConfig.randomizeQuestions)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  practiceConfig.randomizeQuestions ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    practiceConfig.randomizeQuestions ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Show Timer */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Show Timer</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Display countdown timer during practice
                </div>
              </div>
              <button
                onClick={() => handleConfigChange('showTimer', !practiceConfig.showTimer)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  practiceConfig.showTimer ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    practiceConfig.showTimer ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Allow Review */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Allow Review</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Enable reviewing answers before submission
                </div>
              </div>
              <button
                onClick={() => handleConfigChange('allowReview', !practiceConfig.allowReview)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  practiceConfig.allowReview ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    practiceConfig.allowReview ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Session Summary */}
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg p-6 border border-primary-200 dark:border-primary-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Session Summary
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Mode:</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {practiceConfig.mode.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Questions:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {practiceConfig.questionCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Time Limit:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {practiceConfig.timeLimit} minutes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {practiceConfig.difficulty}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Estimated Time:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ~{estimatedTime} minutes
                </span>
              </div>
              {totalTopics > 0 && (
                <div className="pt-2 mt-3 border-t border-primary-200 dark:border-primary-700">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Topics:</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right">
                      {topics.slice(0, 2).map(t => t.name).join(', ')}
                      {topics.length > 2 && ` +${topics.length - 2} more`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="ghost" onClick={onBack} icon={ArrowLeft}>
          Back to Topics
        </Button>
        
        <Button
          variant="primary"
          onClick={handleContinue}
          icon={ArrowRight}
          iconPosition="right"
          size="lg"
        >
          Start Practice Session
        </Button>
      </div>
    </div>
  );
};

export default PracticeMode;