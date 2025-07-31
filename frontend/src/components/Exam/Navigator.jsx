import React from 'react';
import { Flag, CheckCircle, Circle } from 'lucide-react';

const Navigator = ({ 
  questions, 
  currentIndex, 
  answers, 
  flaggedQuestions, 
  onNavigate 
}) => {
  const getQuestionStatus = (index) => {
    const question = questions[index];
    if (!question) return 'unanswered';
    
    const hasAnswer = answers[question.id] !== undefined;
    const isFlagged = flaggedQuestions.has(question.id);
    const isCurrent = index === currentIndex;
    
    if (isCurrent) return 'current';
    if (isFlagged) return 'flagged';
    if (hasAnswer) return 'answered';
    return 'unanswered';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'answered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'flagged':
        return <Flag className="w-4 h-4 text-yellow-600" />;
      case 'current':
        return <div className="w-4 h-4 bg-accent-600 rounded-full" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getQuestionClasses = (status) => {
    const baseClasses = 'question-nav-item';
    return `${baseClasses} ${status}`;
  };

  const groupedQuestions = questions.reduce((groups, question, index) => {
    const subject = question.subject;
    if (!groups[subject]) {
      groups[subject] = [];
    }
    groups[subject].push({ question, index });
    return groups;
  }, {});

  const stats = {
    total: questions.length,
    answered: Object.keys(answers).length,
    flagged: flaggedQuestions.size,
    remaining: questions.length - Object.keys(answers).length
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.answered}
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            Answered
          </div>
        </div>
        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {stats.flagged}
          </div>
          <div className="text-sm text-yellow-600 dark:text-yellow-400">
            Flagged
          </div>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {stats.remaining}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Remaining
          </div>
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.total}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            Total
          </div>
        </div>
      </div>

      {Object.keys(groupedQuestions).length > 1 ? (
        <div className="space-y-6">
          {Object.entries(groupedQuestions).map(([subject, subjectQuestions]) => (
            <div key={subject}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="w-3 h-3 bg-primary-600 rounded-full mr-2"></span>
                {subject}
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({subjectQuestions.length} questions)
                </span>
              </h3>
              <div className="exam-navigation-grid">
                {subjectQuestions.map(({ question, index }) => {
                  const status = getQuestionStatus(index);
                  return (
                    <button
                      key={index}
                      onClick={() => onNavigate(index)}
                      className={getQuestionClasses(status)}
                      title={`Question ${index + 1} - ${question.topic || subject}`}
                    >
                      <span className="text-xs font-medium">
                        {index + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            All Questions
          </h3>
          <div className="exam-navigation-grid">
            {questions.map((question, index) => {
              const status = getQuestionStatus(index);
              return (
                <button
                  key={index}
                  onClick={() => onNavigate(index)}
                  className={getQuestionClasses(status)}
                  title={`Question ${index + 1} - ${question.topic || question.subject}`}
                >
                  <span className="text-xs font-medium">
                    {index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-100 dark:bg-primary-900 border-2 border-primary-300 dark:border-primary-600 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Answered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-300 dark:border-yellow-600 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Flagged</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent-100 dark:bg-accent-900 border-2 border-accent-400 dark:border-accent-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Unanswered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigator;