import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const { score, total, answers } = location.state || {};

  if (!score && score !== 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Results</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-600">No test results yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Take a practice test or mock exam to see your results here
          </p>
          <Link to="/app/practice" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Start Practice
          </Link>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / total) * 100);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Exam Results</h1>

      <div className="bg-white p-8 rounded-lg shadow-sm mb-6">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
            percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            {percentage >= 70 ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">{percentage}%</h2>
          <p className="text-gray-600">
            You scored {score} out of {total}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{score}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{total - score}</div>
            <div className="text-sm text-gray-600">Wrong</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/app/practice" className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center">
          Practice Again
        </Link>
        <Link to="/app/dashboard" className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-center">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Results;
