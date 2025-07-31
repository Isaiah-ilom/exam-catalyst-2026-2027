import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, ArrowRight, BookOpen, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { validateForm, registrationSchema } from '../../utils/validation';
import LoadingSpinner from '../Common/LoadingSpinner';
import Button from '../Common/Button';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    const step1Fields = ['firstName', 'lastName', 'email'];
    const step1Data = {};
    step1Fields.forEach(field => {
      step1Data[field] = formData[field];
    });

    const step1Schema = {};
    step1Fields.forEach(field => {
      step1Schema[field] = registrationSchema[field];
    });

    const { isValid, errors: validationErrors } = validateForm(step1Data, step1Schema);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { isValid, errors: validationErrors } = validateForm(formData, registrationSchema);
    
    if (!isValid) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
    });

    if (result.success) {
      navigate('/app/dashboard');
    }
    
    setIsSubmitting(false);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={formData.firstName}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="John"
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={formData.lastName}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Doe"
            />
          </div>
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`input-field pl-10 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="john.doe@example.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleNextStep}
        icon={ArrowRight}
        iconPosition="right"
      >
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
        <div className="mt-2 text-xs text-gray-500">
          Password must contain at least 8 characters with uppercase, lowercase, number, and special character
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`input-field pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="+234 800 000 0000"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.dateOfBirth ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
          </div>
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="agreeToTerms" className="text-gray-600 dark:text-gray-400">
            I agree to the{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex space-x-4">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="flex-1"
          onClick={handlePrevStep}
        >
          Back
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={isSubmitting || isLoading}
          loading={isSubmitting || isLoading}
        >
          Create Account
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            <BookOpen className="w-8 h-8" />
            <span>Exam Catalyst 2026</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="card">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <span className="ml-2 text-sm font-medium">Personal Info</span>
              </div>
              
              <div className="flex-1 mx-4">
                <div className={`h-1 rounded ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
              </div>
              
              <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Account Setup</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 ? renderStep1() : renderStep2()}
          </form>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;