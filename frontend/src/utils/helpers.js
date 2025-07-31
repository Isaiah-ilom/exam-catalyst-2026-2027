import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

export const formatDate = (date, formatStr = 'PPP') => {
  return format(new Date(date), formatStr);
};

export const formatRelativeTime = (date) => {
  const targetDate = new Date(date);
  
  if (isToday(targetDate)) {
    return `Today at ${format(targetDate, 'HH:mm')}`;
  }
  
  if (isYesterday(targetDate)) {
    return `Yesterday at ${format(targetDate, 'HH:mm')}`;
  }
  
  return formatDistanceToNow(targetDate, { addSuffix: true });
};

export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

export const calculateGrade = (score, total) => {
  const percentage = calculatePercentage(score, total);
  
  if (percentage >= 80) return { grade: 'A', label: 'Excellent', color: 'green' };
  if (percentage >= 70) return { grade: 'B', label: 'Very Good', color: 'blue' };
  if (percentage >= 60) return { grade: 'C', label: 'Good', color: 'yellow' };
  if (percentage >= 50) return { grade: 'D', label: 'Fair', color: 'orange' };
  return { grade: 'F', label: 'Poor', color: 'red' };
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const capitalizeWords = (string) => {
  return string.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const generatePassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const downloadFile = (data, filename, type = 'text/plain') => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getColorByScore = (score, total) => {
  const percentage = calculatePercentage(score, total);
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 70) return 'text-blue-600';
  if (percentage >= 60) return 'text-yellow-600';
  if (percentage >= 50) return 'text-orange-600';
  return 'text-red-600';
};

export const getBgColorByScore = (score, total) => {
  const percentage = calculatePercentage(score, total);
  if (percentage >= 80) return 'bg-green-100 text-green-800';
  if (percentage >= 70) return 'bg-blue-100 text-blue-800';
  if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
  if (percentage >= 50) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};

export const getSubjectColor = (subject) => {
  const colors = {
    'Mathematics': 'bg-blue-500',
    'English Language': 'bg-green-500',
    'Physics': 'bg-purple-500',
    'Chemistry': 'bg-red-500',
    'Biology': 'bg-emerald-500',
    'Geography': 'bg-orange-500',
    'Economics': 'bg-yellow-500',
    'Government': 'bg-indigo-500',
    'Literature in English': 'bg-pink-500',
    'History': 'bg-gray-500',
  };
  return colors[subject] || 'bg-gray-500';
};

export const getSubjectIcon = (subject) => {
  const icons = {
    'Mathematics': '📊',
    'English Language': '📚',
    'Physics': '⚛️',
    'Chemistry': '🧪',
    'Biology': '🧬',
    'Geography': '🌍',
    'Economics': '💰',
    'Government': '🏛️',
    'Literature in English': '📖',
    'History': '🏺',
  };
  return icons[subject] || '📝';
};

export const sortArrayByKey = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (direction === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });
};

export const groupArrayByKey = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {});
};

export const filterArrayBySearch = (array, searchTerm, searchKeys) => {
  if (!searchTerm) return array;
  
  const lowercaseSearch = searchTerm.toLowerCase();
  
  return array.filter(item => {
    return searchKeys.some(key => {
      const value = item[key];
      return value && value.toString().toLowerCase().includes(lowercaseSearch);
    });
  });
};

export const calculateProgress = (current, total) => {
  if (total === 0) return 0;
  return Math.min(100, Math.max(0, (current / total) * 100));
};

export const getTimeDifference = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return Math.floor((end - start) / 1000); // in seconds
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const mergeObjects = (...objects) => {
  return objects.reduce((merged, obj) => ({ ...merged, ...obj }), {});
};

export const pickObjectKeys = (obj, keys) => {
  return keys.reduce((picked, key) => {
    if (obj.hasOwnProperty(key)) {
      picked[key] = obj[key];
    }
    return picked;
  }, {});
};

export const omitObjectKeys = (obj, keys) => {
  const omitted = { ...obj };
  keys.forEach(key => delete omitted[key]);
  return omitted;
};