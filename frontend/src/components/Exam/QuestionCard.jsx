import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Flag } from 'lucide-react';

const QuestionCard = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  showCorrectAnswer = false,
  questionNumber,
  totalQuestions,
  isReview = false
}) => {
  if (!question) return null;

  const handleOptionSelect = (optionLabel) => {
    if (!isReview) {
      onAnswerSelect(optionLabel);
    }
  };

  const getOptionStatus = (option) => {
    if (!showCorrectAnswer && !showExplanation) return 'default';
    
    const isSelected = selectedAnswer === option.label;
    const isCorrect = question.correctAnswer === option.label;
    
    if (isSelected && isCorrect) return 'correct';
    if (isSelected && !isCorrect) return 'incorrect';
    if (!isSelected && isCorrect && showCorrectAnswer) return 'correct';
    return 'default';
  };

  const getOptionClasses = (status) => {
    const baseClasses = 'question-option';
    
    switch (status) {
      case 'correct':
        return `${baseClasses} correct`;
      case 'incorrect':
        return `${baseClasses} incorrect`;
      case 'selected':
        return `${baseClasses} selected`;
      default:
        return baseClasses;
    }
  };

  const getOptionIcon = (status) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'incorrect':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="card space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          {question.difficulty && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              question.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
              question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
              'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {question.difficulty}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          {question.subject && (
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {question.subject}
            </span>
          )}
          {question.topic && (
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {question.topic}
            </span>
          )}
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <div className="text-lg text-gray-900 dark:text-white leading-relaxed">
          {question.questionText}
        </div>
        
        {question.images && question.images.length > 0 && (
          <div className="mt-4 space-y-2">
            {question.images.filter(img => img.position === 'question').map((image, index) => (
              <div key={index} className="text-center">
                <img
                  src={image.url}
                  alt={image.caption || `Question image ${index + 1}`}
                  className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                />
                {image.caption && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Choose the correct answer:
        </h3>
        
        <div className="space-y-2">
          {question.options && question.options.map((option) => {
            const status = getOptionStatus(option);
            const isSelected = selectedAnswer === option.label;
            const optionClasses = getOptionClasses(isSelected && !showCorrectAnswer ? 'selected' : status);
            
            return (
              <div
                key={option.label}
                onClick={() => handleOptionSelect(option.label)}
                className={`${optionClasses} ${isReview ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {option.label}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-white leading-relaxed">
                      {option.text}
                    </p>
                    
                    {question.images && question.images.length > 0 && (
                      <div className="mt-2">
                        {question.images
                          .filter(img => img.position === `option_${option.label.toLowerCase()}`)
                          .map((image, index) => (
                            <div key={index} className="text-center">
                              <img
                                src={image.url}
                                alt={image.caption || `Option ${option.label} image`}
                                className="max-w-full h-32 object-contain rounded-md shadow-sm mx-auto"
                              />
                              {image.caption && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                                  {image.caption}
                                </p>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    {getOptionIcon(status)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showExplanation && question.explanation && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                Explanation
              </h4>
              <div className="prose dark:prose-invert text-sm">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
              
              {question.detailedSolution && (
                <details className="mt-3">
                  <summary className="text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300">
                    Show detailed solution
                  </summary>
                  <div className="mt-2 prose dark:prose-invert text-sm">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {question.detailedSolution}
                    </p>
                  </div>
                </details>
              )}
              
              {question.images && question.images.length > 0 && (
                <div className="mt-3">
                  {question.images
                    .filter(img => img.position === 'explanation')
                    .map((image, index) => (
                      <div key={index} className="text-center">
                        <img
                          src={image.url}
                          alt={image.caption || `Explanation image ${index + 1}`}
                          className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                        />
                        {image.caption && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;