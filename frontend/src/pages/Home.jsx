import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Target, 
  Clock, 
  BarChart3, 
  Play, 
  CheckCircle, 
  Star,
  ArrowRight,
  Zap,
  Shield,
  Award,
  Brain,
  TrendingUp,
  Globe
} from 'lucide-react';
import Button from '../components/Common/Button';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Question Banks',
      description: 'Access thousands of UTME questions across all subjects with detailed explanations.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      icon: Clock,
      title: 'Timed Practice Sessions',
      description: 'Simulate real exam conditions with our advanced timer and auto-submit features.',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed analytics and identify areas for improvement.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      icon: Trophy,
      title: 'Competitive Learning',
      description: 'Challenge friends and climb leaderboards while improving your scores.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      icon: Brain,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized study recommendations based on your performance patterns.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100 dark:bg-pink-900/20',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security and regular backups.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
    },
  ];

  const stats = [
    { label: 'Questions Available', value: '50,000+', icon: BookOpen },
    { label: 'Active Students', value: '25,000+', icon: Users },
    { label: 'Success Rate', value: '92%', icon: Trophy },
    { label: 'Average Score Improvement', value: '35%', icon: TrendingUp },
  ];

  const subjects = [
    'Mathematics',
    'English Language',
    'Physics',
    'Chemistry',
    'Biology',
    'Geography',
    'Economics',
    'Government',
    'Literature',
    'History',
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Exam Catalyst 2026
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
                Features
              </Link>
              <Link to="#subjects" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
                Subjects
              </Link>
              <Link to="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
                Pricing
              </Link>
              <Link to="#contact" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Master Your
                <span className="gradient-text block">UTME Preparation</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Join thousands of students who have improved their UTME scores with our comprehensive 
                CBT practice platform. Experience real exam conditions and track your progress.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button variant="primary" size="lg" icon={Play} className="w-full sm:w-auto">
                    Start Practicing Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Already have an account?
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Free to start
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Instant access
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Practice Session
                  </h3>
                  <div className="flex items-center space-x-2 text-green-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">2:45:30</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mathematics</span>
                    <span className="text-sm text-green-600">38/40</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">English</span>
                    <span className="text-sm text-green-600">35/40</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Physics</span>
                    <span className="text-sm text-yellow-600">25/40</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chemistry</span>
                    <span className="text-sm text-gray-400">0/40</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Overall Progress
                    </span>
                    <span className="text-sm font-semibold text-primary-600">78%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides all the tools and resources you need to excel in your UTME examinations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-hover group">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All UTME Subjects Covered
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Practice with questions from all UTME subjects. Build confidence across every area of the curriculum.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {subject}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to Boost Your UTME Score?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful students who have improved their scores with Exam Catalyst 2026.
          </p>
          <Link to="/register">
            <Button variant="secondary" size="xl" icon={ArrowRight} iconPosition="right">
              Start Your Free Trial Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-8 h-8 text-primary-400" />
                <span className="text-xl font-bold">Exam Catalyst 2026</span>
              </Link>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering students to achieve their UTME goals with comprehensive practice tests, 
                analytics, and personalized learning experiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zm5.624 13.783c-.003.48-.395.872-.874.872h-9.496c-.48 0-.871-.392-.874-.872V10.217c.003-.48.395-.872.874-.872h9.496c.48 0 .871.392.874.872v3.566z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Practice Tests</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 Exam Catalyst 2026. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Made with ❤️ for Nigerian students</span>
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;