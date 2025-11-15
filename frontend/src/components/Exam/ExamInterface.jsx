import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight, Flag, Loader } from 'lucide-react';
import axios from 'axios';

const ExamInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [flagged, setFlagged] = useState(new Set());

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { subject, questionCount } = location.state || { subject: 'Mathematics', questionCount: 20 };
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const response = await axios.get(`${apiUrl}/questions`, {
        params: {
          subject: subject,
          limit: questionCount
        }
      });

      if (response.data.success && response.data.data.length > 0) {
        setQuestions(response.data.data);
      } else {
        setError('No questions available for this subject');
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md text-center">
          <p className="text-red-600 mb-4">{error || 'No questions available'}</p>
          <button
            onClick={() => navigate('/app/practice')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Practice
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: option
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFlag = () => {
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentQuestion.id)) {
      newFlagged.delete(currentQuestion.id);
    } else {
      newFlagged.add(currentQuestion.id);
    }
    setFlagged(newFlagged);
  };

  const handleSubmit = () => {
    const score = questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
    
    navigate('/app/results', { 
      state: { 
        score, 
        total: questions.length,
        answers,
        questions
      } 
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm mb-4 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-sm text-gray-600">
              Question {currentIndex + 1} of {questions.length}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Answered: {answeredCount}/{questions.length}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentQuestion.question}
            </h2>
            <button
              onClick={handleFlag}
              className={`p-2 rounded ${flagged.has(currentQuestion.id) ? 'text-yellow-600' : 'text-gray-400'}`}
            >
              <Flag className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left border rounded-lg transition-all ${
                  answers[currentQuestion.id] === option
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit Exam
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Question Navigator</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-10 h-10 rounded-lg border-2 text-sm font-medium ${
                  idx === currentIndex
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : answers[q.id]
                    ? 'bg-blue-100 border-blue-400 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-600'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;
