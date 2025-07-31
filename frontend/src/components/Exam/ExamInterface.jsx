import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  Calculator, 
  BookOpen,
  AlertTriangle,
  CheckCircle,
  X,
  Pause,
  Play
} from 'lucide-react';
import { useExam } from '../../context/ExamContext';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import Timer from './Timer';
import QuestionCard from './QuestionCard';
import Navigator from './Navigator';
import Calculator from './Calculator';

const ExamInterface = () => {
  const navigate = useNavigate();
  const {
    currentExam,
    questions,
    currentQuestionIndex,
    answers,
    flaggedQuestions,
    timeRemaining,
    submitAnswer,
    navigateToQuestion,
    nextQuestion,
    previousQuestion,
    toggleFlag,
    updateTimer,
    submitExam,
    endExam,
    getCurrentQuestion,
    getExamProgress,
    isSubmitting
  } = useExam();

  const [showCalculator, setShowCalculator] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [violations, setViolations] = useState([]);

  const currentQuestion = getCurrentQuestion();
  const progress = getExamProgress();

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining <= 0 && currentExam) {
      handleAutoSubmit();
    }
  }, [timeRemaining, currentExam]);

  // Show warning when 5 minutes remaining
  useEffect(() => {
    if (timeRemaining <= 300 && timeRemaining > 0 && !showTimeWarning) {
      setShowTimeWarning(true);
    }
  }, [timeRemaining, showTimeWarning]);

  // Detect tab/window changes for exam integrity
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && currentExam && !isPaused) {
        addViolation('tab_change', 'User switched tabs during exam');
      }
    };

    const handleBeforeUnload = (e) => {
      if (currentExam && !isSubmitting) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your progress may be lost.';
        return e.returnValue;
      }
    };

    const handleContextMenu = (e) => {
      if (currentExam) {
        e.preventDefault();
        addViolation('right_click', 'User attempted to right-click');
      }
    };

    const handleKeyDown = (e) => {
      // Prevent certain key combinations during exam
      if (currentExam && (
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')
      )) {
        e.preventDefault();
        addViolation('key_combination', `User pressed ${e.ctrlKey ? 'Ctrl+' : ''}${e.key}`);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentExam, isSubmitting, isPaused]);

  const addViolation = useCallback((type, details) => {
    setViolations(prev => [...prev, {
      type,
      details,
      timestamp: new Date(),
      severity: 'medium'
    }]);
  }, []);

  const handleAnswerSelect = useCallback((answer) => {
    if (currentQuestion) {
      submitAnswer(currentQuestion.id, answer);
    }
  }, [currentQuestion, submitAnswer]);

  const handleFlagToggle = useCallback(() => {
    if (currentQuestion) {
      toggleFlag(currentQuestion.id);
    }
  }, [currentQuestion, toggleFlag]);

  const handleAutoSubmit = useCallback(async () => {
    await submitExam(true);
    navigate('/app/results');
  }, [submitExam, navigate]);

  const handleSubmit = useCallback(async () => {
    setShowSubmitModal(false);
    const result = await submitExam();
    if (result.success) {
      navigate('/app/results');
    }
  }, [submitExam, navigate]);

  const handleEndExam = useCallback(() => {
    endExam();
    navigate('/app/dashboard');
  }, [endExam, navigate]);

  const handlePauseToggle = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  if (!currentExam || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Active Exam
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start a practice session or exam to begin.
          </p>
          <Button onClick={() => navigate('/app/practice')} variant="primary">
            Start Practice
          </Button>
        </div>
      </div>
    );
  }

  const isQuestionFlagged = flaggedQuestions.has(currentQuestion.id);
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {currentExam.title || 'Practice Session'}
                </span>
              </div>
              
              <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>•</span>
                <span>{progress.percentage}% Complete</span>
              </div>
            </div>

            {/* Center - Timer */}
            <div className="flex items-center space-x-4">
              {timeRemaining > 0 && (
                <Timer
                  timeRemaining={timeRemaining}
                  onTimeUpdate={updateTimer}
                  isPaused={isPaused}
                  showWarning={timeRemaining <= 300}
                />
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePauseToggle}
                icon={isPaused ? Play : Pause}
                disabled={currentExam.mode === 'exam'}
              >
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCalculator(true)}
                icon={Calculator}
                className="hidden sm:flex"
              >
                Calculator
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNavigator(true)}
                icon={BookOpen}
              >
                Navigator
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowSubmitModal(true)}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1">
        <div
          className="progress-bar h-1 transition-all duration-300"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Section */}
          <div className="lg:col-span-3">
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              onAnswerSelect={handleAnswerSelect}
              showExplanation={false}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Question Info */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Question Info</h3>
                <Button
                  variant={isQuestionFlagged ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={handleFlagToggle}
                  icon={Flag}
                >
                  {isQuestionFlagged ? 'Flagged' : 'Flag'}
                </Button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subject:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {currentQuestion.subject}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Topic:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {currentQuestion.topic}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                  <span className={`font-medium capitalize ${
                    currentQuestion.difficulty === 'easy' ? 'text-green-600' :
                    currentQuestion.difficulty === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <div className="flex items-center space-x-1">
                    {currentAnswer ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                    )}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {currentAnswer ? 'Answered' : 'Unanswered'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {progress.answered}/{progress.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-green-100 dark:bg-green-900/20 rounded">
                    <div className="font-semibold text-green-600 dark:text-green-400">
                      {progress.answered}
                    </div>
                    <div className="text-green-600 dark:text-green-400">Answered</div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="font-semibold text-gray-600 dark:text-gray-400">
                      {flaggedQuestions.size}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Flagged</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Calculator Button */}
            <div className="sm:hidden">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowCalculator(true)}
                icon={Calculator}
              >
                Calculator
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            icon={ArrowLeft}
          >
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>

          <Button
            variant="secondary"
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            icon={ArrowRight}
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        title="Calculator"
        size="sm"
      >
        <Calculator />
      </Modal>

      <Modal
        isOpen={showNavigator}
        onClose={() => setShowNavigator(false)}
        title="Question Navigator"
        size="lg"
      >
        <Navigator
          questions={questions}
          currentIndex={currentQuestionIndex}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          onNavigate={(index) => {
            navigateToQuestion(index);
            setShowNavigator(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Exam"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Are you sure you want to submit?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Once submitted, you cannot make any changes to your answers.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Questions Answered:</span>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {progress.answered} of {progress.total}
                </div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Questions Remaining:</span>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {progress.remaining}
                </div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Flagged Questions:</span>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {flaggedQuestions.size}
                </div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Time Remaining:</span>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowSubmitModal(false)}
              className="flex-1"
            >
              Continue Exam
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={isSubmitting}
              className="flex-1"
            >
              Submit Exam
            </Button>
          </div>
        </div>
      </Modal>

      {/* Time Warning Modal */}
      <Modal
        isOpen={showTimeWarning}
        onClose={() => setShowTimeWarning(false)}
        title="Time Running Out"
        size="sm"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              5 Minutes Remaining!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your exam will be automatically submitted when time runs out.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowTimeWarning(false)}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ExamInterface;