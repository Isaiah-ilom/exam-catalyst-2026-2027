import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Play } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold">CBT Practice</span>
            </Link>
            <div className="flex gap-3">
              <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            UTME CBT Practice
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Practice for your UTME exams with our simple and effective CBT platform
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg">
            <Play className="w-5 h-5" />
            Start Practice
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Practice Questions</h3>
            <p className="text-gray-600">Access UTME questions across all subjects</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Timed Tests</h3>
            <p className="text-gray-600">Simulate real exam conditions with timers</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your performance and improve</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Available Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Geography', 'Government'].map(subject => (
              <div key={subject} className="p-4 border rounded-lg text-center hover:border-blue-600 hover:bg-blue-50 cursor-pointer">
                {subject}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-white border-t mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2026 CBT Practice. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;