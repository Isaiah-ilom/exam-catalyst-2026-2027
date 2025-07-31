import React from 'react';
import { Trophy, Clock, Target, TrendingUp, Award, BookOpen } from 'lucide-react';

const ResultsView = ({ result }) => {
  if (!result) return null;

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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-12 h-12 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {result.examTitle}
        </h2>
        <div className={`text-4xl font-bold ${getScoreColor(result.score.overall.percentage)} mb-2`}>
          {result.score.overall.percentage}%
        </div>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getGradeBadge(result.grade)}`}>
          Grade {result.grade.letter} - {result.grade.description}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {result.score.overall.correct}/{result.score.overall.total}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Correct Answers
          </div>
        </div>

        <div className="card text-center">
          <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {result.timeSpent} min
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Time Spent
          </div>
        </div>

        <div className="card text-center">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            #{result.rank || 'N/A'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Your Rank
          </div>
        </div>
      </div>

      {result.score.bySubject && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Subject Breakdown
          </h3>
          <div className="space-y-4">
            {result.score.bySubject.map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {subject.subject}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {subject.correct}/{subject.total}
                  </div>
                  <div className={`font-semibold ${getScoreColor(subject.percentage)}`}>
                    {subject.percentage}%
                  </div>
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${subject.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.feedback && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result.feedback.strengths && result.feedback.strengths.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {result.feedback.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.feedback.recommendations && result.feedback.recommendations.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Recommendations
              </h3>
              <ul className="space-y-2">
                {result.feedback.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultsView;