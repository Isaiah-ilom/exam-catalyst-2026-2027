import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, FileText, BarChart3, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [subjectCount, setSubjectCount] = useState(0);

  useEffect(() => {
    fetchSubjectCount();
  }, []);

  const fetchSubjectCount = async () => {
    try {
      const response = await axios.get('/api/questions/subjects');
      if (response.data.success) {
        setSubjectCount(response.data.data.length);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSubjectCount(15);
    }
  };

  const quickActions = [
    {
      title: 'Start Practice',
      description: 'Practice with subject questions',
      icon: Play,
      color: 'bg-green-500',
      href: '/practice',
    },
    {
      title: 'Take Mock Exam',
      description: 'Full UTME simulation',
      icon: FileText,
      color: 'bg-blue-500',
      href: '/exam',
    },
    {
      title: 'View Results',
      description: 'Check your performance',
      icon: BarChart3,
      color: 'bg-purple-500',
      href: '/results',
    },
    {
      title: 'Study Materials',
      description: 'Access notes and lessons',
      icon: BookOpen,
      color: 'bg-orange-500',
      href: '/study',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName || 'Student'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Ready to continue your UTME preparation?
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {action.title}
            </h3>
            <p className="text-sm text-gray-600">
              {action.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Available Subjects</h3>
          <p className="text-3xl font-bold text-blue-600">{subjectCount}</p>
          <p className="text-sm text-gray-500 mt-1">All UTME subjects</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Tests Taken</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
          <p className="text-sm text-gray-500 mt-1">Start practicing!</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-purple-600">0%</p>
          <p className="text-sm text-gray-500 mt-1">Take a test to see</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
