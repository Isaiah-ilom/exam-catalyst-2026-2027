import React, { useState, useEffect, useRef } from 'react';
import { Camera, Edit, Save, X, User, Mail, Phone, MapPin, Calendar, School, Award, Trophy, Target, Globe, Facebook, Twitter, Linkedin, Instagram, Upload, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Common/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    school: '',
    location: '',
    dateOfBirth: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      website: ''
    }
  });

  const [stats, setStats] = useState({
    totalExams: 0,
    averageScore: 0,
    bestScore: 0,
    totalStudyHours: 0,
    completedTopics: 0,
    achievements: []
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        bio: user.bio || '',
        school: user.school || '',
        location: user.location || '',
        dateOfBirth: user.dateOfBirth || '',
        socialLinks: {
          facebook: user.socialLinks?.facebook || '',
          twitter: user.socialLinks?.twitter || '',
          linkedin: user.socialLinks?.linkedin || '',
          instagram: user.socialLinks?.instagram || '',
          website: user.socialLinks?.website || ''
        }
      });

      setStats({
        totalExams: user.stats?.totalExams || 0,
        averageScore: user.stats?.averageScore || 0,
        bestScore: user.stats?.bestScore || 0,
        totalStudyHours: user.stats?.totalStudyHours || 0,
        completedTopics: user.stats?.completedTopics || 0,
        achievements: user.achievements || []
      });
    }
  }, [user]);

  const validateField = (name, value) => {
    const fieldErrors = {};

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          fieldErrors[name] = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (value.length < 2) {
          fieldErrors[name] = `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          fieldErrors[name] = `${name === 'firstName' ? 'First' : 'Last'} name can only contain letters`;
        }
        break;

      case 'phone':
        if (value && !/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
          fieldErrors[name] = 'Please enter a valid phone number';
        }
        break;

      case 'bio':
        if (value && value.length > 500) {
          fieldErrors[name] = 'Bio must not exceed 500 characters';
        }
        break;

      case 'school':
        if (value && value.length < 3) {
          fieldErrors[name] = 'School name must be at least 3 characters';
        }
        break;

      case 'socialLinks.website':
        if (value && !/^https?:\/\/.+$/.test(value)) {
          fieldErrors['socialLinks.website'] = 'Please enter a valid URL (including http:// or https://)';
        }
        break;

      default:
        break;
    }

    return fieldErrors;
  };

  const validateForm = () => {
    let formErrors = {};
    
    Object.keys(profileData).forEach(key => {
      if (key === 'socialLinks') {
        Object.keys(profileData.socialLinks).forEach(socialKey => {
          const fieldErrors = validateField(`socialLinks.${socialKey}`, profileData.socialLinks[socialKey]);
          formErrors = { ...formErrors, ...fieldErrors };
        });
      } else {
        const fieldErrors = validateField(key, profileData[key]);
        formErrors = { ...formErrors, ...fieldErrors };
      }
    });

    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      const fieldErrors = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name] || null
      }));
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        avatar: 'Image size must be less than 5MB'
      }));
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        avatar: 'Please select a valid image file (JPEG, PNG, WebP)'
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setIsUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      // Simulate avatar upload - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setErrors(prev => ({ ...prev, avatar: null }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        avatar: 'Failed to upload avatar. Please try again.'
      }));
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateProfile(profileData);
      if (result.success) {
        setIsEditing(false);
        setErrors({});
      } else {
        setErrors({ general: result.error || 'Failed to update profile' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        bio: user.bio || '',
        school: user.school || '',
        location: user.location || '',
        dateOfBirth: user.dateOfBirth || '',
        socialLinks: {
          facebook: user.socialLinks?.facebook || '',
          twitter: user.socialLinks?.twitter || '',
          linkedin: user.socialLinks?.linkedin || '',
          instagram: user.socialLinks?.instagram || '',
          website: user.socialLinks?.website || ''
        }
      });
    }
    setErrors({});
    setIsEditing(false);
    setAvatarPreview(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="card">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              {avatarPreview || user?.avatar ? (
                <img
                  src={avatarPreview || user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
              
              {isUploadingAvatar && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                  <LoadingSpinner size="md" />
                </div>
              )}
            </div>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors shadow-lg"
              disabled={isUploadingAvatar}
            >
              <Camera className="w-4 h-4" />
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 dark:text-gray-400 mt-1">
              <Mail className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            {user?.school && (
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <School className="w-4 h-4" />
                <span>{user.school}</span>
              </div>
            )}
            {user?.location && (
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  icon={Edit}
                  variant="primary"
                  size="sm"
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    icon={Save}
                    variant="success"
                    size="sm"
                    loading={isSaving}
                    disabled={isSaving}
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    icon={X}
                    variant="secondary"
                    size="sm"
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Avatar Upload Error */}
        {errors.avatar && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{errors.avatar}</span>
            </div>
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{errors.general}</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalExams}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Exams</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageScore}%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.bestScore}%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Best Score</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStudyHours}h</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Study Hours</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="+234 xxx xxx xxxx"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={profileData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                School
              </label>
              <input
                type="text"
                name="school"
                value={profileData.school}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`input-field ${errors.school ? 'border-red-500' : ''}`}
                placeholder="Your current school"
              />
              {errors.school && (
                <p className="text-red-500 text-xs mt-1">{errors.school}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field"
                placeholder="City, State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={3}
                className={`input-field resize-none ${errors.bio ? 'border-red-500' : ''}`}
                placeholder="Tell us about yourself..."
              />
              <div className="flex justify-between items-center mt-1">
                {errors.bio && (
                  <p className="text-red-500 text-xs">{errors.bio}</p>
                )}
                <p className="text-gray-500 text-xs ml-auto">
                  {profileData.bio.length}/500
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Social Links</h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Globe className="w-4 h-4" />
                Website
              </label>
              <input
                type="url"
                name="socialLinks.website"
                value={profileData.socialLinks.website}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`input-field ${errors['socialLinks.website'] ? 'border-red-500' : ''}`}
                placeholder="https://yourwebsite.com"
              />
              {errors['socialLinks.website'] && (
                <p className="text-red-500 text-xs mt-1">{errors['socialLinks.website']}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Facebook className="w-4 h-4" />
                Facebook
              </label>
              <input
                type="text"
                name="socialLinks.facebook"
                value={profileData.socialLinks.facebook}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field"
                placeholder="Facebook username or URL"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Twitter className="w-4 h-4" />
                Twitter
              </label>
              <input
                type="text"
                name="socialLinks.twitter"
                value={profileData.socialLinks.twitter}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field"
                placeholder="Twitter username or URL"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </label>
              <input
                type="text"
                name="socialLinks.linkedin"
                value={profileData.socialLinks.linkedin}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field"
                placeholder="LinkedIn profile URL"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Instagram className="w-4 h-4" />
                Instagram
              </label>
              <input
                type="text"
                name="socialLinks.instagram"
                value={profileData.socialLinks.instagram}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field"
                placeholder="Instagram username or URL"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      {stats.achievements.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Achievements</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;