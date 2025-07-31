import React from 'react';
import { BookOpen, Clock, Target, TrendingUp, Award, Users } from 'lucide-react';

const Analytics = ({ analytics }) => {
  if (!analytics) return null;

  const getPerformanceLevel = (score) => {
    if (score >= 90) return { level: 'Outstanding', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' };
    if (score >= 80) return { level: 'Excellent', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' };
    if (score >= 70) return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20' };
    if (score >= 60) return { level: 'Fair', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/20' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20' };
  };

  const performance = getPerformanceLevel(analytics.averageScore);

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Performance Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {analytics.totalExams}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Exams
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {analytics.averageScore}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average Score
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {analytics.bestScore}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Best Score
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(analytics.totalTimeSpent / 60)}h
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Study Time
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Overall Performance Level
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Based on your average score across all exams
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full ${performance.bg}`}>
              <span className={`font-semibold ${performance.color}`}>
                {performance.level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {analytics.subjectPerformance && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Subject Performance
          </h3>
          
          <div className="space-y-4">
            {analytics.subjectPerformance.map((subject, index) => {
              const subjectPerformance = getPerformanceLevel(subject.averageScore);
              
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {subject.subject}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {subject.totalExams} exam{subject.totalExams !== 1 ? 's' : ''} taken
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {subject.averageScore}%
                      </div>
                      <div className={`text-sm ${subjectPerformance.color}`}>
                        {subjectPerformance.level}
                      </div>
                    </div>
                    
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${subject.averageScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Study Insights
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Average time per exam:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {Math.round(analytics.totalTimeSpent / analytics.totalExams)} min
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Most practiced subject:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {analytics.subjectPerformance && analytics.subjectPerformance.length > 0
                  ? analytics.subjectPerformance.reduce((max, subject) => 
                      subject.totalExams > max.totalExams ? subject : max
                    ).subject
                  : 'N/A'
                }
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Best performing subject:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {analytics.subjectPerformance && analytics.subjectPerformance.length > 0
                  ? analytics.subjectPerformance.reduce((max, subject) => 
                      subject.averageScore > max.averageScore ? subject : max
                    ).subject
                  : 'N/A'
                }
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Improvement trend:</span>
              <span className="font-medium text-green-600">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Improving
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recommendations
          </h3>
          
          <div className="space-y-3">
            {analytics.averageScore < 70 && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Focus on understanding fundamental concepts before attempting advanced problems.
                </p>
              </div>
            )}
            
            {analytics.subjectPerformance && (
              <>
                {analytics.subjectPerformance.find(s => s.averageScore < 60) && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      Prioritize practice in subjects where you're scoring below 60%.
                    </p>
                  </div>
                )}
                
                {analytics.subjectPerformance.find(s => s.averageScore > 85) && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Great job on your strong subjects! Use them to boost your overall confidence.
                    </p>
                  </div>
                )}
              </>
            )}
            
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Take more timed practice tests to improve your exam performance under pressure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;