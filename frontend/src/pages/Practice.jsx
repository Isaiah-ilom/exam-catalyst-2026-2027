import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Practice = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questionCount, setQuestionCount] = useState(20);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${apiUrl}/questions/subjects`);
      if (response.data.success) {
        setSubjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSubjects([
        { name: 'Mathematics', category: 'Science' },
        { name: 'English', category: 'Arts' },
        { name: 'Physics', category: 'Science' },
        { name: 'Chemistry', category: 'Science' },
        { name: 'Biology', category: 'Science' },
        { name: 'Economics', category: 'Social Science' },
        { name: 'Commerce', category: 'Social Science' },
        { name: 'Accounting', category: 'Social Science' },
        { name: 'Government', category: 'Social Science' },
        { name: 'CRK', category: 'Arts' },
        { name: 'Geography', category: 'Social Science' },
        { name: 'Literature', category: 'Arts' },
        { name: 'History', category: 'Arts' },
        { name: 'Civics', category: 'Social Science' },
        { name: 'Insurance', category: 'Social Science' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const groupedSubjects = subjects.reduce((acc, subject) => {
    const category = subject.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(subject);
    return acc;
  }, {});

  const handleStart = () => {
    if (!selectedSubject) {
      alert('Please select a subject');
      return;
    }
    navigate('/app/exam', { 
      state: { 
        mode: 'practice', 
        subject: selectedSubject,
        questionCount 
      } 
    });
  };

  if (loading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center">Loading subjects...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Practice Mode</h1>

      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a subject...</option>
            {Object.keys(groupedSubjects).map(category => (
              <optgroup key={category} label={category}>
                {groupedSubjects[category].map(subject => (
                  <option key={subject.name} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Questions: {questionCount}
          </label>
          <input
            type="range"
            min="10"
            max="50"
            step="10"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
            <span>50</span>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Start Practice
        </button>
      </div>
    </div>
  );
};

export default Practice;
