import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Search, BookOpen, Clock, Target } from 'lucide-react';
import Button from '../Common/Button';

const TopicSelection = ({ subject, topics = [], selectedTopics = [], onTopicSelect, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [localSelectedTopics, setLocalSelectedTopics] = useState(selectedTopics);

  const defaultTopics = {
    'Mathematics': [
      { id: 1, name: 'Algebra', description: 'Linear equations, quadratic equations, polynomials', questionCount: 145, difficulty: 'Medium', estimatedTime: 25 },
      { id: 2, name: 'Geometry', description: 'Triangles, circles, polygons, coordinate geometry', questionCount: 132, difficulty: 'Hard', estimatedTime: 30 },
      { id: 3, name: 'Calculus', description: 'Differentiation, integration, limits', questionCount: 98, difficulty: 'Hard', estimatedTime: 35 },
      { id: 4, name: 'Statistics', description: 'Mean, median, mode, probability', questionCount: 87, difficulty: 'Easy', estimatedTime: 20 },
      { id: 5, name: 'Trigonometry', description: 'Sin, cos, tan, identities', questionCount: 156, difficulty: 'Medium', estimatedTime: 28 },
      { id: 6, name: 'Number Theory', description: 'Prime numbers, factors, sequences', questionCount: 74, difficulty: 'Medium', estimatedTime: 22 },
    ],
    'Physics': [
      { id: 1, name: 'Mechanics', description: 'Motion, forces, energy, momentum', questionCount: 178, difficulty: 'Medium', estimatedTime: 30 },
      { id: 2, name: 'Waves and Sound', description: 'Wave properties, sound waves, light', questionCount: 134, difficulty: 'Medium', estimatedTime: 25 },
      { id: 3, name: 'Electricity', description: 'Current, voltage, resistance, circuits', questionCount: 156, difficulty: 'Hard', estimatedTime: 32 },
      { id: 4, name: 'Magnetism', description: 'Magnetic fields, electromagnetic induction', questionCount: 89, difficulty: 'Hard', estimatedTime: 28 },
      { id: 5, name: 'Thermodynamics', description: 'Heat, temperature, gas laws', questionCount: 112, difficulty: 'Medium', estimatedTime: 26 },
      { id: 6, name: 'Modern Physics', description: 'Atomic structure, radioactivity', questionCount: 67, difficulty: 'Hard', estimatedTime: 35 },
    ],
    'Chemistry': [
      { id: 1, name: 'Organic Chemistry', description: 'Hydrocarbons, functional groups, reactions', questionCount: 198, difficulty: 'Hard', estimatedTime: 35 },
      { id: 2, name: 'Inorganic Chemistry', description: 'Metals, non-metals, compounds', questionCount: 167, difficulty: 'Medium', estimatedTime: 28 },
      { id: 3, name: 'Physical Chemistry', description: 'Chemical bonding, thermodynamics', questionCount: 143, difficulty: 'Hard', estimatedTime: 32 },
      { id: 4, name: 'Acids and Bases', description: 'pH, neutralization, indicators', questionCount: 89, difficulty: 'Easy', estimatedTime: 20 },
      { id: 5, name: 'Electrochemistry', description: 'Redox reactions, electrolysis', questionCount: 76, difficulty: 'Medium', estimatedTime: 25 },
      { id: 6, name: 'Chemical Kinetics', description: 'Reaction rates, catalysts', questionCount: 54, difficulty: 'Hard', estimatedTime: 30 },
    ],
    'English Language': [
      { id: 1, name: 'Grammar', description: 'Parts of speech, sentence structure', questionCount: 234, difficulty: 'Easy', estimatedTime: 18 },
      { id: 2, name: 'Comprehension', description: 'Reading passages, inference', questionCount: 189, difficulty: 'Medium', estimatedTime: 25 },
      { id: 3, name: 'Vocabulary', description: 'Word meanings, synonyms, antonyms', questionCount: 156, difficulty: 'Easy', estimatedTime: 20 },
      { id: 4, name: 'Essay Writing', description: 'Structure, coherence, style', questionCount: 67, difficulty: 'Medium', estimatedTime: 40 },
      { id: 5, name: 'Literature', description: 'Poetry, prose, drama analysis', questionCount: 123, difficulty: 'Medium', estimatedTime: 30 },
      { id: 6, name: 'Oral English', description: 'Pronunciation, stress, intonation', questionCount: 78, difficulty: 'Easy', estimatedTime: 15 },
    ]
  };

  const subjectTopics = topics.length > 0 ? topics : (defaultTopics[subject?.name] || []);

  const filteredTopics = subjectTopics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleTopicToggle = (topic) => {
    const isSelected = localSelectedTopics.some(t => t.id === topic.id);
    
    if (isSelected) {
      setLocalSelectedTopics(localSelectedTopics.filter(t => t.id !== topic.id));
    } else {
      setLocalSelectedTopics([...localSelectedTopics, topic]);
    }
  };

  const handleSelectAll = () => {
    if (localSelectedTopics.length === filteredTopics.length) {
      setLocalSelectedTopics([]);
    } else {
      setLocalSelectedTopics(filteredTopics);
    }
  };

  const handleContinue = () => {
    if (localSelectedTopics.length === 0) {
      return;
    }
    onTopicSelect(localSelectedTopics);
  };

  const totalQuestions = localSelectedTopics.reduce((sum, topic) => sum + topic.questionCount, 0);
  const averageTime = localSelectedTopics.length > 0 
    ? Math.round(localSelectedTopics.reduce((sum, topic) => sum + topic.estimatedTime, 0) / localSelectedTopics.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Select Topics
          </h2>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <div className={`w-8 h-8 ${subject?.color || 'bg-gray-500'} rounded-lg flex items-center justify-center text-white text-sm`}>
              {subject?.icon || '📚'}
            </div>
            <span className="font-medium">{subject?.name}</span>
          </div>
        </div>
        <Button variant="ghost" onClick={onBack} icon={ArrowLeft}>
          Back
        </Button>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
          >
            {localSelectedTopics.length === filteredTopics.length ? 'Deselect All' : 'Select All'}
          </Button>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {localSelectedTopics.length} of {filteredTopics.length} selected
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {localSelectedTopics.length > 0 && (
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {localSelectedTopics.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Topics Selected
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {totalQuestions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Questions
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ~{averageTime}m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg. Time/Topic
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => {
          const isSelected = localSelectedTopics.some(t => t.id === topic.id);
          
          return (
            <div
              key={topic.id}
              onClick={() => handleTopicToggle(topic)}
              className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md'
              } bg-white dark:bg-gray-800`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <h3 className={`font-semibold text-lg mb-2 ${
                    isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'
                  }`}>
                    {topic.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {topic.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {topic.questionCount} questions
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        ~{topic.estimatedTime}m
                      </span>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                    {topic.difficulty}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No topics found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="ghost" onClick={onBack} icon={ArrowLeft}>
          Back to Subjects
        </Button>
        
        <Button
          variant="primary"
          onClick={handleContinue}
          disabled={localSelectedTopics.length === 0}
          icon={ArrowRight}
          iconPosition="right"
        >
          Continue ({localSelectedTopics.length})
        </Button>
      </div>
    </div>
  );
};

export default TopicSelection;