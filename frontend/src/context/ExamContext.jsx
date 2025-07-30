import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { examService } from '../services/examService';
import { questionService } from '../services/questionService';
import toast from 'react-hot-toast';

const ExamContext = createContext();

const initialState = {
  currentExam: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  flaggedQuestions: new Set(),
  timeRemaining: 0,
  examStartTime: null,
  examMode: 'practice',
  isLoading: false,
  isSubmitting: false,
  examSettings: {
    subjects: ['Mathematics', 'English', 'Physics', 'Chemistry'],
    questionsPerSubject: 40,
    timeLimit: 180,
    showExplanations: true,
  },
  results: [],
  analytics: null,
};

const examReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    
    case 'START_EXAM':
      return {
        ...state,
        currentExam: action.payload.exam,
        questions: action.payload.questions,
        answers: {},
        flaggedQuestions: new Set(),
        currentQuestionIndex: 0,
        timeRemaining: action.payload.timeLimit * 60,
        examStartTime: new Date(),
        examMode: action.payload.mode,
        isLoading: false,
      };
    
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    
    case 'SET_CURRENT_QUESTION':
      return { ...state, current