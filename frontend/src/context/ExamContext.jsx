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
      return { ...state, currentQuestionIndex: action.payload };
    
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    
    case 'TOGGLE_FLAG':
      const newFlagged = new Set(state.flaggedQuestions);
      if (newFlagged.has(action.payload)) {
        newFlagged.delete(action.payload);
      } else {
        newFlagged.add(action.payload);
      }
      return { ...state, flaggedQuestions: newFlagged };
    
    case 'UPDATE_TIME':
      return { ...state, timeRemaining: Math.max(0, action.payload) };
    
    case 'END_EXAM':
      return {
        ...state,
        currentExam: null,
        questions: [],
        answers: {},
        flaggedQuestions: new Set(),
        currentQuestionIndex: 0,
        timeRemaining: 0,
        examStartTime: null,
      };
    
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    
    case 'ADD_RESULT':
      return { ...state, results: [action.payload, ...state.results] };
    
    case 'SET_ANALYTICS':
      return { ...state, analytics: action.payload };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        examSettings: { ...state.examSettings, ...action.payload },
      };
    
    default:
      return state;
  }
};

export const ExamProvider = ({ children }) => {
  const [state, dispatch] = useReducer(examReducer, initialState);

  const startExam = useCallback(async (examConfig) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const examData = await examService.createExam(examConfig);
      const questions = await questionService.getQuestions({
        subjects: examConfig.subjects,
        questionsPerSubject: examConfig.questionsPerSubject,
        difficulty: examConfig.difficulty || 'mixed',
      });

      dispatch({
        type: 'START_EXAM',
        payload: {
          exam: examData,
          questions: questions,
          timeLimit: examConfig.timeLimit,
          mode: examConfig.mode || 'practice',
        },
      });

      toast.success('Exam started successfully!');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error(error.message || 'Failed to start exam');
      return { success: false, error: error.message };
    }
  }, []);

  const startPractice = useCallback(async (practiceConfig) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const questions = await questionService.getPracticeQuestions({
        subject: practiceConfig.subject,
        topic: practiceConfig.topic,
        difficulty: practiceConfig.difficulty,
        count: practiceConfig.questionCount || 20,
      });

      dispatch({
        type: 'START_EXAM',
        payload: {
          exam: { id: `practice_${Date.now()}`, type: 'practice' },
          questions: questions,
          timeLimit: practiceConfig.timeLimit || 60,
          mode: 'practice',
        },
      });

      toast.success('Practice session started!');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error(error.message || 'Failed to start practice');
      return { success: false, error: error.message };
    }
  }, []);

  const submitAnswer = useCallback((questionId, answer) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { questionId, answer },
    });
  }, []);

  const navigateToQuestion = useCallback((index) => {
    if (index >= 0 && index < state.questions.length) {
      dispatch({ type: 'SET_CURRENT_QUESTION', payload: index });
    }
  }, [state.questions.length]);

  const nextQuestion = useCallback(() => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({
        type: 'SET_CURRENT_QUESTION',
        payload: state.currentQuestionIndex + 1,
      });
    }
  }, [state.currentQuestionIndex, state.questions.length]);

  const previousQuestion = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      dispatch({
        type: 'SET_CURRENT_QUESTION',
        payload: state.currentQuestionIndex - 1,
      });
    }
  }, [state.currentQuestionIndex]);

  const toggleFlag = useCallback((questionId) => {
    dispatch({ type: 'TOGGLE_FLAG', payload: questionId });
  }, []);

  const updateTimer = useCallback((timeRemaining) => {
    dispatch({ type: 'UPDATE_TIME', payload: timeRemaining });
  }, []);

  const submitExam = useCallback(async (forceSubmit = false) => {
    try {
      dispatch({ type: 'SET_SUBMITTING', payload: true });

      const examResult = await examService.submitExam({
        examId: state.currentExam.id,
        answers: state.answers,
        timeSpent: state.examSettings.timeLimit * 60 - state.timeRemaining,
        flaggedQuestions: Array.from(state.flaggedQuestions),
        startTime: state.examStartTime,
        endTime: new Date(),
        mode: state.examMode,
      });

      dispatch({ type: 'ADD_RESULT', payload: examResult });
      dispatch({ type: 'END_EXAM' });

      if (forceSubmit) {
        toast.success('Exam auto-submitted due to time limit');
      } else {
        toast.success('Exam submitted successfully!');
      }

      return { success: true, result: examResult };
    } catch (error) {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
      toast.error(error.message || 'Failed to submit exam');
      return { success: false, error: error.message };
    }
  }, [state.currentExam, state.answers, state.timeRemaining, state.flaggedQuestions, state.examStartTime, state.examMode, state.examSettings.timeLimit]);

  const endExam = useCallback(() => {
    dispatch({ type: 'END_EXAM' });
  }, []);

  const loadResults = useCallback(async () => {
    try {
      const results = await examService.getUserResults();
      dispatch({ type: 'SET_RESULTS', payload: results });
      return { success: true };
    } catch (error) {
      toast.error('Failed to load results');
      return { success: false, error: error.message };
    }
  }, []);

  const loadAnalytics = useCallback(async () => {
    try {
      const analytics = await examService.getUserAnalytics();
      dispatch({ type: 'SET_ANALYTICS', payload: analytics });
      return { success: true };
    } catch (error) {
      toast.error('Failed to load analytics');
      return { success: false, error: error.message };
    }
  }, []);

  const updateSettings = useCallback((newSettings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
  }, []);

  const getQuestionStatus = useCallback((questionIndex) => {
    const question = state.questions[questionIndex];
    if (!question) return 'unanswered';
    
    const hasAnswer = state.answers[question.id] !== undefined;
    const isFlagged = state.flaggedQuestions.has(question.id);
    const isCurrent = questionIndex === state.currentQuestionIndex;
    
    if (isCurrent) return 'current';
    if (isFlagged) return 'flagged';
    if (hasAnswer) return 'answered';
    return 'unanswered';
  }, [state.questions, state.answers, state.flaggedQuestions, state.currentQuestionIndex]);

  const getExamProgress = useCallback(() => {
    const totalQuestions = state.questions.length;
    const answeredQuestions = Object.keys(state.answers).length;
    const percentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
    
    return {
      total: totalQuestions,
      answered: answeredQuestions,
      remaining: totalQuestions - answeredQuestions,
      percentage: Math.round(percentage),
    };
  }, [state.questions.length, state.answers]);

  const getCurrentQuestion = useCallback(() => {
    return state.questions[state.currentQuestionIndex] || null;
  }, [state.questions, state.currentQuestionIndex]);

  const value = {
    ...state,
    startExam,
    startPractice,
    submitAnswer,
    navigateToQuestion,
    nextQuestion,
    previousQuestion,
    toggleFlag,
    updateTimer,
    submitExam,
    endExam,
    loadResults,
    loadAnalytics,
    updateSettings,
    getQuestionStatus,
    getExamProgress,
    getCurrentQuestion,
  };

  return (
    <ExamContext.Provider value={value}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};