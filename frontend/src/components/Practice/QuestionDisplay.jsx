import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flag, RotateCcw } from 'lucide-react';

const QuestionDisplay = ({ questions, onSubmit, mode = 'practice' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (index) => {
    setAnswers({
      ...answers,
      [currentIndex]: index,
    });
  };

  const handleToggleFlag = () => {
    setFlagged({
      ...flagged,
      [currentIndex]: !flagged[currentIndex],
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.keys(flagged).filter(k => flagged[k]).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {mode === 'practice' ? 'Practice Mode' : 'Mock Exam'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {formatTime(timeLeft)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Time Remaining</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        answers[currentIndex] === idx
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        checked={answers[currentIndex] === idx}
                        onChange={() => handleSelectAnswer(idx)}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="ml-4 text-gray-900 dark:text-white font-medium">
                        {String.fromCharCode(65 + idx)}. {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation and Flag Button */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleToggleFlag}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    flagged[currentIndex]
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Flag className="w-5 h-5" />
                  <span>{flagged[currentIndex] ? 'Flagged' : 'Flag'}</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Submit {mode === 'practice' ? 'Practice' : 'Exam'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Question Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Question Tracker
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Answered:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{answeredCount}/{questions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Flagged:</span>
                  <span className="font-semibold text-yellow-500">{flaggedCount}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full aspect-square rounded text-sm font-semibold transition-all ${
                      idx === currentIndex
                        ? 'bg-indigo-600 text-white scale-105'
                        : answers[idx] !== undefined
                        ? 'bg-green-500 text-white'
                        : flagged[idx]
                        ? 'bg-yellow-400 text-gray-900'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
