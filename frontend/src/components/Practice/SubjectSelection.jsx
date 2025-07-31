import React, { useState } from 'react';
import { Search, CheckCircle, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../Common/Button';
import { getSubjectIcon } from '../../utils/helpers';

const SubjectSelection = ({ subjects = [], selectedSubject, onSubjectSelect, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const defaultSubjects = [
    {
      id: 1,
      name: 'Mathematics',
      description: 'Algebra, Geometry, Calculus, Statistics',
      questionCount: 1250,
      difficulty: 'Medium',
      topics: 45,
      color: 'bg-blue-500',
      icon: '🔢',
    },
    {
      id: 2,
      name: 'English Language',
      description: 'Grammar, Comprehension, Literature, Essay Writing',
      questionCount: 980,
      difficulty: 'Easy',
      topics: 32,
      color: 'bg-green-500',
      icon: '📚',
    },
    {
      id: 3,
      name: 'Physics',
      description: 'Mechanics, Waves, Electricity, Modern Physics',
      questionCount: 890,
      difficulty: 'Hard',
      topics: 38,
      color: 'bg-purple-500',
      icon: '⚛️',
    },
    {
      id: 4,
      name: 'Chemistry',
      description: 'Organic, Inorganic, Physical Chemistry',
      questionCount: 760,
      difficulty: 'Hard',
      topics: 41,
      color: 'bg-red-500',
      icon: '🧪',
    },
    {
      id: 5,
      name: 'Biology',
      description: 'Botany, Zoology, Genetics, Ecology',
      questionCount: 650,
      difficulty: 'Medium',
      topics: 36,
      color: 'bg-emerald-500',
      icon: '🧬',
    },
    {
      id: 6,
      name: 'Geography',
      description: 'Physical, Human, Economic Geography',
      questionCount: 520,
      difficulty: 'Easy',
      topics: 28,
      color: 'bg-orange-500',
      icon: '🌍',
    },
    {
      id: 7,
      name: 'Economics',
      description: 'Microeconomics, Macroeconomics, Development',
      questionCount: 480,
      difficulty: 'Medium',
      topics: 24,
      color: 'bg-yellow-500',
      icon: '💰',
    },
    {
      id: 8,
      name: 'Government',
      description: 'Political Science, Public Administration',
      questionCount: 420,
      difficulty: 'Medium',
      topics: 22,
      color: 'bg-indigo-500',
      icon: '🏛️',
    },
    {
      id: 9,
      name: 'Literature in English',
      description: 'Poetry, Prose, Drama, African Literature',
      questionCount: 380,
      difficulty: 'Medium',
      topics: 20,
      color: 'bg-pink-500',
      icon: '📖',
    },
    {
      id: 10,
      name: 'History',
      description: 'African History, World History, Nigerian History',
      questionCount: 350,
      difficulty: 'Easy',
      topics: 26,
      color: 'bg-gray-500',
      icon: '🏺',
    },
  ];

  const displaySubjects = subjects.length > 0 ? subjects : defaultSubjects;

  const filteredSubjects = displaySubjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  const coreSubjects = filteredSubjects.filter(subject => 
    ['Mathematics', 'English Language', 'Physics', 'Chemistry'].includes(subject.name)
  );

  const optionalSubjects = filteredSubjects.filter(subject => 
    !['Mathematics', 'English Language', 'Physics', 'Chemistry'].includes(subject.name)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Choose Your Subject
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select a subject to start practicing questions
          </p>
        </div>
        {onBack && (
          <Button variant="ghost" onClick={onBack} icon={ArrowLeft}>
            Back
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10 w-full"
        />
      </div>

      {/* Core Subjects */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Core Subjects
          <span className="ml-2 text-sm font-normal text-primary-600 bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded-full">
            Required
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coreSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              isSelected={selectedSubject?.id === subject.id}
              onClick={() => onSubjectSelect(subject)}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </div>
      </div>

      {/* Optional Subjects */}
      {optionalSubjects.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Optional Subjects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {optionalSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                isSelected={selectedSubject?.id === subject.id}
                onClick={() => onSubjectSelect(subject)}
                getDifficultyColor={getDifficultyColor}
              />
            ))}
          </div>
        </div>
      )}

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No subjects found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms
          </p>
        </div>
      )}
    </div>
  );
};

const SubjectCard = ({ subject, isSelected, onClick, getDifficultyColor }) => (
  <div
    onClick={onClick}
    className={`relative group cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 ${
      isSelected
        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg scale-105'
        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md'
    } bg-white dark:bg-gray-800`}
  >
    {isSelected && (
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
        <CheckCircle className="w-4 h-4 text-white" />
      </div>
    )}
    
    <div className="flex items-start space-x-4">
      <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}>
        {subject.icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-lg mb-2 ${
          isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'
        } group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors`}>
          {subject.name}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {subject.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              {subject.questionCount} questions
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {subject.topics} topics
            </span>
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}>
            {subject.difficulty}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default SubjectSelection;