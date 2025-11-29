import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionDisplay from '../components/Practice/QuestionDisplay';

const ExamPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const { mode = 'practice', subject = 'Mathematics', questionCount = 20 } = location.state || {};

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      console.log(`Fetching questions for ${subject} (${questionCount} questions)`);
      const response = await axios.get(`/api/questions?subject=${subject}&limit=${questionCount}`);
      
      console.log('Response:', response.data);
      
      if (response.data && response.data.success && response.data.data) {
        const questions = response.data.data.map((q, idx) => ({
          ...q,
          id: q.id || idx,
          subject: q.subject || subject,
          question: q.question || '',
          options: Array.isArray(q.options) ? q.options : [],
          correct: typeof q.correct === 'number' ? q.correct : 0
        }));
        console.log('Setting questions:', questions);
        setQuestions(questions);
      } else {
        console.log('Invalid response format:', response.data);
        setQuestions([]);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (answers) => {
    let correctCount = 0;
    const detailedResults = questions.map((q, idx) => {
      const userAnswer = answers[idx];
      const isCorrect = userAnswer === q.correct;
      if (isCorrect) correctCount++;
      return {
        question: q.question,
        userAnswer: userAnswer !== undefined ? q.options[userAnswer] : 'Not answered',
        correctAnswer: q.options[q.correct],
        isCorrect,
      };
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    
    setResults({
      totalQuestions: questions.length,
      correctCount,
      wrongCount: questions.length - correctCount,
      percentage,
      detailedResults,
      mode,
      subject,
    });
    setShowResults(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
              {mode === 'practice' ? 'Practice' : 'Exam'} Completed!
            </h1>

            {/* Score Display */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white mb-8">
              <div className="text-center">
                <p className="text-lg opacity-90 mb-2">Your Score</p>
                <div className="text-6xl font-bold mb-2">{results.percentage}%</div>
                <p className="text-xl opacity-90">
                  {results.correctCount} out of {results.totalQuestions} correct
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                <p className="text-green-600 dark:text-green-400 font-semibold text-sm mb-1">Correct</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">{results.correctCount}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
                <p className="text-red-600 dark:text-red-400 font-semibold text-sm mb-1">Wrong</p>
                <p className="text-3xl font-bold text-red-700 dark:text-red-300">{results.wrongCount}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-1">Total</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{results.totalQuestions}</p>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
              {results.detailedResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    result.isCorrect
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                  }`}
                >
                  <p className={`font-semibold mb-2 ${
                    result.isCorrect ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'
                  }`}>
                    Q{idx + 1}. {result.question}
                  </p>
                  {!result.isCorrect && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Your answer: {result.userAnswer}
                    </p>
                  )}
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                    Correct answer: {result.correctAnswer}
                  </p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <QuestionDisplay questions={questions} onSubmit={handleSubmit} mode={mode} />;
};

export default ExamPage;
