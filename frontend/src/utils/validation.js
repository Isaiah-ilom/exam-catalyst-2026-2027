import { VALIDATION_RULES } from './constants';

export const validators = {
  required: (value, message = 'This field is required') => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return message;
    }
    return null;
  },

  email: (value, message = 'Please enter a valid email address') => {
    if (!value) return null;
    if (!VALIDATION_RULES.EMAIL.test(value)) {
      return message;
    }
    return null;
  },

  password: (value, message = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character') => {
    if (!value) return null;
    if (!VALIDATION_RULES.PASSWORD.test(value)) {
      return message;
    }
    return null;
  },

  confirmPassword: (value, password, message = 'Passwords do not match') => {
    if (!value) return null;
    if (value !== password) {
      return message;
    }
    return null;
  },

  phone: (value, message = 'Please enter a valid Nigerian phone number') => {
    if (!value) return null;
    if (!VALIDATION_RULES.PHONE.test(value)) {
      return message;
    }
    return null;
  },

  name: (value, message = 'Name must be 2-50 characters and contain only letters and spaces') => {
    if (!value) return null;
    if (!VALIDATION_RULES.NAME.test(value)) {
      return message;
    }
    return null;
  },

  minLength: (value, min, message) => {
    if (!value) return null;
    if (value.length < min) {
      return message || `Must be at least ${min} characters long`;
    }
    return null;
  },

  maxLength: (value, max, message) => {
    if (!value) return null;
    if (value.length > max) {
      return message || `Must be no more than ${max} characters long`;
    }
    return null;
  },

  numeric: (value, message = 'Must be a valid number') => {
    if (!value) return null;
    if (isNaN(value) || isNaN(parseFloat(value))) {
      return message;
    }
    return null;
  },

  integer: (value, message = 'Must be a whole number') => {
    if (!value) return null;
    if (!Number.isInteger(Number(value))) {
      return message;
    }
    return null;
  },

  min: (value, min, message) => {
    if (!value) return null;
    if (Number(value) < min) {
      return message || `Must be at least ${min}`;
    }
    return null;
  },

  max: (value, max, message) => {
    if (!value) return null;
    if (Number(value) > max) {
      return message || `Must be no more than ${max}`;
    }
    return null;
  },

  range: (value, min, max, message) => {
    if (!value) return null;
    const num = Number(value);
    if (num < min || num > max) {
      return message || `Must be between ${min} and ${max}`;
    }
    return null;
  },

  url: (value, message = 'Please enter a valid URL') => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return message;
    }
  },

  date: (value, message = 'Please enter a valid date') => {
    if (!value) return null;
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return message;
    }
    return null;
  },

  futureDate: (value, message = 'Date must be in the future') => {
    if (!value) return null;
    const date = new Date(value);
    if (date <= new Date()) {
      return message;
    }
    return null;
  },

  pastDate: (value, message = 'Date must be in the past') => {
    if (!value) return null;
    const date = new Date(value);
    if (date >= new Date()) {
      return message;
    }
    return null;
  },

  pattern: (value, pattern, message = 'Invalid format') => {
    if (!value) return null;
    if (!pattern.test(value)) {
      return message;
    }
    return null;
  },

  oneOf: (value, options, message) => {
    if (!value) return null;
    if (!options.includes(value)) {
      return message || `Must be one of: ${options.join(', ')}`;
    }
    return null;
  },

  arrayMinLength: (value, min, message) => {
    if (!value) return null;
    if (!Array.isArray(value) || value.length < min) {
      return message || `Must select at least ${min} option${min !== 1 ? 's' : ''}`;
    }
    return null;
  },

  arrayMaxLength: (value, max, message) => {
    if (!value) return null;
    if (!Array.isArray(value) || value.length > max) {
      return message || `Can select at most ${max} option${max !== 1 ? 's' : ''}`;
    }
    return null;
  },
};

export const validateField = (value, rules) => {
  for (const rule of rules) {
    let error;
    
    if (typeof rule === 'function') {
      error = rule(value);
    } else if (typeof rule === 'object' && rule.validator) {
      error = rule.validator(value, ...rule.params || []);
    }
    
    if (error) {
      return error;
    }
  }
  
  return null;
};

export const validateForm = (values, schema) => {
  const errors = {};
  let isValid = true;
  
  for (const field in schema) {
    const value = values[field];
    const rules = schema[field];
    const error = validateField(value, rules);
    
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  }
  
  return { isValid, errors };
};

export const createValidator = (rules) => {
  return (value) => validateField(value, rules);
};

export const registrationSchema = {
  firstName: [
    validators.required,
    (value) => validators.name(value, 'First name must contain only letters and spaces'),
    (value) => validators.minLength(value, 2, 'First name must be at least 2 characters'),
    (value) => validators.maxLength(value, 50, 'First name must be no more than 50 characters'),
  ],
  lastName: [
    validators.required,
    (value) => validators.name(value, 'Last name must contain only letters and spaces'),
    (value) => validators.minLength(value, 2, 'Last name must be at least 2 characters'),
    (value) => validators.maxLength(value, 50, 'Last name must be no more than 50 characters'),
  ],
  email: [
    validators.required,
    validators.email,
  ],
  password: [
    validators.required,
    validators.password,
  ],
  confirmPassword: [
    validators.required,
    (value, formValues) => validators.confirmPassword(value, formValues.password),
  ],
  phone: [
    (value) => value ? validators.phone(value) : null,
  ],
  dateOfBirth: [
    validators.required,
    validators.date,
    (value) => validators.pastDate(value, 'Date of birth must be in the past'),
  ],
  agreeToTerms: [
    (value) => !value ? 'You must agree to the terms and conditions' : null,
  ],
};

export const loginSchema = {
  email: [
    validators.required,
    validators.email,
  ],
  password: [
    validators.required,
  ],
};

export const profileSchema = {
  firstName: [
    validators.required,
    validators.name,
    (value) => validators.minLength(value, 2),
    (value) => validators.maxLength(value, 50),
  ],
  lastName: [
    validators.required,
    validators.name,
    (value) => validators.minLength(value, 2),
    (value) => validators.maxLength(value, 50),
  ],
  phone: [
    (value) => value ? validators.phone(value) : null,
  ],
  bio: [
    (value) => value ? validators.maxLength(value, 500, 'Bio must be no more than 500 characters') : null,
  ],
  school: [
    (value) => value ? validators.maxLength(value, 100, 'School name must be no more than 100 characters') : null,
  ],
  location: [
    (value) => value ? validators.maxLength(value, 100, 'Location must be no more than 100 characters') : null,
  ],
};

export const changePasswordSchema = {
  currentPassword: [
    validators.required,
  ],
  newPassword: [
    validators.required,
    validators.password,
  ],
  confirmNewPassword: [
    validators.required,
    (value, formValues) => validators.confirmPassword(value, formValues.newPassword),
  ],
};

export const examConfigSchema = {
  subjects: [
    (value) => validators.arrayMinLength(value, 1, 'Please select at least one subject'),
    (value) => validators.arrayMaxLength(value, 4, 'Please select at most 4 subjects'),
  ],
  questionsPerSubject: [
    validators.required,
    validators.integer,
    (value) => validators.range(value, 1, 60, 'Questions per subject must be between 1 and 60'),
  ],
  timeLimit: [
    validators.required,
    validators.integer,
    (value) => validators.range(value, 5, 300, 'Time limit must be between 5 and 300 minutes'),
  ],
  difficulty: [
    validators.required,
    (value) => validators.oneOf(value, ['easy', 'medium', 'hard', 'mixed']),
  ],
};

export const forgotPasswordSchema = {
  email: [
    validators.required,
    validators.email,
  ],
};

export const resetPasswordSchema = {
  newPassword: [
    validators.required,
    validators.password,
  ],
  confirmNewPassword: [
    validators.required,
    (value, formValues) => validators.confirmPassword(value, formValues.newPassword),
  ],
};

export const contactSchema = {
  name: [
    validators.required,
    validators.name,
    (value) => validators.minLength(value, 2),
    (value) => validators.maxLength(value, 100),
  ],
  email: [
    validators.required,
    validators.email,
  ],
  subject: [
    validators.required,
    (value) => validators.minLength(value, 5, 'Subject must be at least 5 characters'),
    (value) => validators.maxLength(value, 200, 'Subject must be no more than 200 characters'),
  ],
  message: [
    validators.required,
    (value) => validators.minLength(value, 20, 'Message must be at least 20 characters'),
    (value) => validators.maxLength(value, 1000, 'Message must be no more than 1000 characters'),
  ],
};

export const searchSchema = {
  query: [
    validators.required,
    (value) => validators.minLength(value, 2, 'Search query must be at least 2 characters'),
    (value) => validators.maxLength(value, 100, 'Search query must be no more than 100 characters'),
  ],
};

export const reportQuestionSchema = {
  reason: [
    validators.required,
    (value) => validators.oneOf(value, [
      'incorrect_answer',
      'typo_error',
      'inappropriate_content',
      'duplicate_question',
      'unclear_question',
      'other'
    ]),
  ],
  description: [
    validators.required,
    (value) => validators.minLength(value, 10, 'Description must be at least 10 characters'),
    (value) => validators.maxLength(value, 500, 'Description must be no more than 500 characters'),
  ],
};